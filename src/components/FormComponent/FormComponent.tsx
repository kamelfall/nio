import React from 'react';
import './FormComponent.scss';

interface IFormProps {
  formSubmit(state:any):void;
}

interface IFormState {
  [key: string]: string
}

export class FormComponent extends React.Component<IFormProps, IFormState> {
  constructor(props: any) {
    super(props);

    this.state = {
      time: "",
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: ""
    }
  }

  handleChange = (e: any) => {
    const target = e.target;
    const value = target.value;
    console.log(value);
    
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  createBooking = () => {
    console.log(this.state);
    this.props.formSubmit(this.state);
  }

  render() {
    return (
      <form>
        <input type="radio" name="time" className="form__radiobutton" 
          id="earlyRadio"
          value="18:00"
          checked={this.state.time === "18:00"} 
          onChange={this.handleChange} />

        <p className="form__radioText">18:00</p>

        <input type="radio" name="time" className="form__radiobutton" 
          id="lateRadio"
          value="21:00"
          checked={this.state.time === "21:00"} 
          onChange={this.handleChange} />

        <p className="form__radioText">21:00</p>
        
        <label htmlFor="firstName">Namn:</label>
        <input type="text" className="form__textbox" 
          name="firstName" 
          onChange={this.handleChange} />
        <label htmlFor="lastName">Efternamn:</label>
        <input type="text" className="form__textbox" 
          name="lastName" 
          onChange={this.handleChange} />
        <label htmlFor="emailAddress">E-mail:</label>
        <input type="text" className="form__textbox" 
          name="emailAddress"
          onChange={this.handleChange} />
        <label htmlFor="phoneNumber">Telefon:</label>
        <input type="number" className="form__textbox" 
          name="phoneNumber"
          onChange={this.handleChange} />

        <input type="button" value="Boka"
          onClick={this.createBooking} />
      </form>
    );
  }
}

export default FormComponent;