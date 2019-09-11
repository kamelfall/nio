import * as React from "react";
import "./AdminComponent.scss";
import axios from 'axios';

interface IBooking {
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
}

class AdminComponent extends React.Component<{}, IBookingState> {
  constructor(props: any) {
    super(props);

    this.state = {
      bookings: [],
    }
    this.handleChange = this.handleChange.bind(this);
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
  }
  adminDeleteOrder(id: number) {
    axios.delete(`http://localhost:8888/order/delete.php?id=${id}`)
      .then((result: any) => {
        console.log(result);
        this.componentDidMount();
      })
  }

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
  public render() {
    const orders = this.state.bookings;
    const mappedOrders = orders.map(order => 
      <tr key={order.order_id}>
        <td>{order.order_id}</td>
        <td>{order.date}</td>
        <td>{order.time}</td>
        <td>{order.first_name} {order.last_name}</td>
        <td>{order.seats}</td>
        <td>{order.email}</td>
        <td><button onClick={this.adminDeleteOrder.bind(this, order.order_id)} className="deleteOrder" value={order.order_id}>
        </button></td>
        <td><button></button></td>
      </tr>)
    
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
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {mappedOrders}
            </tbody>
          </table>
        </article>
      </main>
    )
  }
}
export default AdminComponent;