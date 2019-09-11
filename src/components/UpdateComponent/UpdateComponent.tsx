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
  updateOrder(id: number): void 
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
  }

  updateBooking = () => {
    // this.props.updateOrder();
  }

  render() {

    return (
      <form id="update">
        <ul className="form__credentials">
          <li className="form__row">
            <label htmlFor="firstName">Namn:</label>
            <input type="text" className="form__textbox" 
              name="firstName" 
              onChange={this.handleChange} 
              pattern="[a-z]\w{4,}\d+" required/>
          </li>
          <li className="form__row">
            <label htmlFor="lastName">Efternamn:</label>
            <input type="text" className="form__textbox" 
              name="lastName" 
              onChange={this.handleChange} 
              pattern="[a-z]\w{4,}\d+" required/>
          </li>
          <li className="form__row">
            <label htmlFor="phoneNumber">Telefon:</label>
            <input type="number" className="form__textbox" 
              name="phoneNumber"
              onChange={this.handleChange} required/>
          </li>
          
          {/* <input type="checkbox"/> */}
          <input type="button" className="form__submit" value="Boka"
            onClick={this.updateBooking} />
        </ul>
      </form>
    );
  }
}

export default UpdateComponent;