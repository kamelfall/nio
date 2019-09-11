import React from 'react';
import './UpdateComponent.scss';

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

interface IUpdateProps {
  booking: IBooking,
  updateOrder(state:any): void 
}

interface IUpdateState {
  [key: string]: string
}

export class UpdateComponent extends React.Component<IUpdateProps, IUpdateState> {
  constructor(props: any) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: ""
    }
  }
  
  handleChange = (e: any) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log(value);
  }

  updateBooking = () => {
    this.props.updateOrder(this.state);
  }

  render() {

    return (
      <form id="update">
        <ul className="update__credentials">
          <li className="update__row">
            <label htmlFor="firstName">Namn:</label>
            <input type="text" className="update__textbox" 
              name="firstName" 
              onSubmit={this.handleChange} 
              defaultValue={this.props.booking.first_name}
              pattern="[a-z]\w{4,}\d+" required/>
          </li>
          <li className="update__row">
            <label htmlFor="lastName">Efternamn:</label>
            <input type="text" className="update__textbox" 
              name="lastName" 
              onSubmit={this.handleChange} 
              defaultValue={this.props.booking.last_name}
              pattern="[a-z]\w{4,}\d+" required/>
          </li>
          <li className="update__row">
            <label htmlFor="phoneNumber">Telefon:</label>
            <input type="number" className="update__textbox" 
              name="phoneNumber"
              onSubmit={this.handleChange} 
              defaultValue={this.props.booking.phone}
              required/>
          </li>
          
          {/* <input type="checkbox"/> */}
          <input type="button" className="update__submit" value="Uppdatera"
            onClick={this.updateBooking} />
        </ul>
      </form>
    );
  }
}

export default UpdateComponent;