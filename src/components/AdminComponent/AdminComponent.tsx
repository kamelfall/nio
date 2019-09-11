import * as React from "react";
import "./AdminComponent.scss";
import UpdateComponent from "../UpdateComponent/UpdateComponent";
import axios from 'axios';
import moment from 'moment';

export interface IBooking {
  customer_id: number,
  date: string,
  email: string,
  first_name: string,
  last_name: string,
  order_id: number,
  phone: string,
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
        phone: "",
        seats: 0,
        time: ""
      }
    }

    this.adminDeleteOrder = this.adminDeleteOrder.bind(this);
  }
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
      console.log(this.state.bookings);
  }
  adminDeleteOrder(id: number) {
    axios.delete(`http://localhost:8888/order/delete.php?id=${id}`)
      .then((result: any) => {
        console.log(result);
        this.componentDidMount();
      })
  }
  adminUpdateOrder(id: number) {
    this.setState({selectedBooking: this.state.bookings[id]});
  } 

  public render() {
    let update = <section></section>;

    if(this.state.selectedBooking.order_id !== 0) {
      update = <UpdateComponent booking={this.state.selectedBooking} 
      updateOrder={this.adminUpdateOrder} />
    }

    const orders = this.state.bookings;
    const mappedOrders = orders.map(order => 
      <tr>
        <td>{order.order_id}</td>
        <td>{order.date}</td>
        <td>{order.time}</td>
        <td>{order.first_name} {order.last_name}</td>
        <td>{order.seats}</td>
        <td>{order.email}</td>
        <button onClick={this.adminUpdateOrder.bind(this, order.order_id)} className="updateOrder" value={order.order_id}>
        </button>
        <button onClick={this.adminDeleteOrder.bind(this, order.order_id)} className="deleteOrder" value={order.order_id}>
        </button>
      </tr>
    )
    
    return (
    <main id="admin">
      <section>
        <h2 className="admin__h2">Bookings</h2>
        <input  className="admin__input" type="text" placeholder="Bookingnr"/>
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
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
           {mappedOrders}
          </tbody>
        </table>
      </article>
      <section id="update">
      </section>
    </main>
  )}
}
export default AdminComponent;