import * as React from "react";
import "./AdminComponent.scss";
import UpdateComponent from "../UpdateComponent/UpdateComponent";
import axios from 'axios';

export interface IBooking {
  customer_id: number,
  date: string,
  email: string,
  first_name: string,
  last_name: string,
  order_id: number,
  phone: number,
  seats: number,
  time: string
}

interface IBookingState {
  bookings: IBooking[],
  bookingNr: number,
  selectedBooking: IBooking
}

class AdminComponent extends React.Component<{}, IBookingState> {
  constructor(props: any) {
    super(props);

    this.state = {
      bookings: [],
      bookingNr: 0,
      selectedBooking: {
        customer_id: 0,
        date: "",
        email: "",
        first_name: "",
        last_name: "",
        order_id: 0,
        phone: 0,
        seats: 0,
        time: ""
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.adminDeleteOrder = this.adminDeleteOrder.bind(this);
    this.adminUpdateOrder = this.adminUpdateOrder.bind(this);
  }

  //saves database bookings to state array
  componentDidMount() {
    this.setState({bookings:[]})
    axios.get("http://localhost:8888/order/readAll.php")
      .then((result: any) => {
        let array = this.state.bookings;
        let data:[] = result.data.records;
        for(let i = 0; i < data.length; i++) {
          array.push(data[i]);
        }
        this.setState({bookings: array});
      })
  }
  
  //updates booking array with changes
  handleChange(event: any){
    this.setState({bookings:[]})
    axios({
      method: "GET",
      url: "http://localhost:8888/order/search.php?s=" + event.target.value,
    })
    .then((result: any) => {
      let array = this.state.bookings;
      let data:[] = result.data.records;

      for(let i = 0; i < data.length; i++) {
        array.push(data[i]);
      }
      this.setState({bookings: array});
    })
  }
  
  //deletes order by id
  adminDeleteOrder(id: number) {
    axios.delete(`http://localhost:8888/order/delete.php?id=${id}`)
      .then((result: any) => {
        console.log(result);
        this.componentDidMount();
      })
  }

  //sets a selected booking
  adminShowUpdate(id: number) {
    for(let i = 0; i < this.state.bookings.length; i++) {
      if(this.state.bookings[i].order_id === id) {
        this.setState({selectedBooking: this.state.bookings[i]});
        break;
      }
    }
  } 
  //populates last state with form values and sets state to populated state
  adminUpdateOrder(updatedState: any) {
    let upState = {...this.state};

    //converts back to int from the all string UpdateComponent state
    const customer_idInt = parseInt(updatedState.customer_id);
    const order_idInt = parseInt(updatedState.order_id);
    const phoneInt = parseInt(updatedState.phone);
    const seatsInt = parseInt(updatedState.seats);

    upState.selectedBooking = {
      customer_id: customer_idInt,
      date: updatedState.date,
      email: updatedState.email,
      first_name: updatedState.first_name,
      last_name: updatedState.last_name,
      order_id: order_idInt,
      phone: phoneInt,
      seats: seatsInt,
      time: updatedState.time
    }
    this.setState(upState, this.finishUpdate);
  }
  //calls database to replace values
  finishUpdate() {
    //replaces order table values
    axios({
      method: "PUT",
      url: "http://localhost:8888/order/update.php",
      data: JSON.stringify({
        seats: this.state.selectedBooking.seats,
        id: this.state.selectedBooking.order_id
      })
    });
    //replaces guest table values
    axios({
      method: "PUT",
      url: "http://localhost:8888/guest/update.php",
      data: JSON.stringify({
        first_name: this.state.selectedBooking.first_name,
        last_name: this.state.selectedBooking.last_name,
        phone: this.state.selectedBooking.phone,
        email: this.state.selectedBooking.email,
        id: this.state.selectedBooking.customer_id
      })
    });

    //resets state
    let resetState = {...this.state};
    resetState.selectedBooking = {
      customer_id: 0,
      date: "",
      email: "",
      first_name: "",
      last_name: "",
      order_id: 0,
      phone: 0,
      seats: 0,
      time: ""
    }
    //refresh admin table
    this.setState(resetState, this.componentDidMount);
  }

  render() {
    let update = <section></section>;

    //conditional render, when booking is selected
    if(this.state.selectedBooking.order_id !== 0) {
      update = <UpdateComponent booking={this.state.selectedBooking} 
      updateOrder={this.adminUpdateOrder} />
    }

    //maps orders to table with buttons calling the respective bookings
    const orders = this.state.bookings;
 
    const mappedOrders = orders.map(order => 
      <tr key={order.order_id}>
        <td>{order.order_id}</td>
        <td>{order.date}</td>
        <td>{order.time}</td>
        <td>{order.first_name} {order.last_name}</td>
        <td>{order.seats}</td>
        <td>{order.email}</td>
                                      
        <td><button onClick={this.adminShowUpdate.bind(this, order.order_id)} className="updateOrder" value={order.order_id}>
        </button></td>
        <td><button onClick={this.adminDeleteOrder.bind(this, order.order_id)} className="deleteOrder" value={order.order_id}>
        </button></td>
      </tr>
    )
    
    return (
    <main id="admin">
      <section>
        <h2 className="admin__h2">Bookings</h2>
        <input  className="admin__input" type="text" placeholder="Sök på bokningsnummer eller efternamn" onChange={this.handleChange}/>
      </section>
      <article>
        <table>
          <thead>
            <tr>
              <th>Bookingnr</th>
              <th>Date</th>
              <th>Time</th>
              <th>Name</th>
              <th>Seats</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
           {mappedOrders}
          </tbody>
        </table>
      </article>
      <section id="update">
        {update}
      </section>
    </main>
  )}
}
export default AdminComponent;