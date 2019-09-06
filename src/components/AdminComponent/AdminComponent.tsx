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
  bookings: IBooking[]
}

class AdminComponent extends React.Component<{}, IBookingState> {
  constructor(props: any) {
    super(props);

    this.state = {
      bookings: []
    }
  }
  componentDidMount() {
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

  public render() {

    const orders = this.state.bookings;
    const mappedOrders = orders.map(order => 
      <tr>
      <td>{order.order_id}</td>
      <td>{order.date}</td>
      <td>{order.time}</td>
      <td>{order.first_name} {order.last_name}</td>
      <td>{order.seats}</td>
      <td>{order.email}</td>
      </tr>)
    

    return (
    <main>
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


    </main>
  )}
}
export default AdminComponent;