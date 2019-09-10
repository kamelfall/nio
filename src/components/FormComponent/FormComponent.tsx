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
      phoneNumber: "",
      emailValidation: "",
    }
  }
  validate = () => {
    let emailValidation = "";

    if(!this.state.emailAddress.includes('@')){
      emailValidation = "Invalid Email"
    }
    if( emailValidation ){
      this.setState({ emailValidation });
      return false;
    }
    return true;
  }

  handleChange = (e: any) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  createBooking = () => {
    const isValid:any = this.validate();
    if(isValid) {
      console.log(this.state);
      this.props.formSubmit(this.state);
    }
  }

  render() {
    let form = <p></p>;
    const time = this.state.time;

    if(time === "18:00" || time === "21:00") {
      form = <div className="form__credentials">
        <label htmlFor="firstName">Namn:</label>
        <input type="text" className="form__textbox" 
          name="firstName" 
          onChange={this.handleChange} pattern="[a-z]\w{4,}\d+"/>
        <label htmlFor="lastName">Efternamn:</label>
        <input type="text" className="form__textbox" 
          name="lastName" 
          onChange={this.handleChange} pattern="[a-z]\w{4,}\d+"/>
        <label htmlFor="emailAddress">E-mail:</label>
        <input type="email" className="form__textbox" 
          name="emailAddress"
          onChange={this.handleChange} pattern="[a-z]\w{4,}\d+"/>
          <p className="errorMsg">{this.state.emailValidation}</p>
        <label htmlFor="phoneNumber">Telefon:</label>
        <input type="number" className="form__textbox" 
          name="phoneNumber"
          onChange={this.handleChange} />
        {/* <input type="checkbox"/> */}
        <input type="button" value="Boka"
          onClick={this.createBooking} />
      </div>
    } else {
      form = <p className="form__prompt">Välj en tid!</p>
    }
    return (
      <form>
        <input type="button" name="time" className="form__timeButton" 
          id="earlyButton"
          value="18:00"
          onClick={this.handleChange} />

        <input type="button" name="time" className="form__timeButton" 
          id="lateButton"
          value="21:00"
          onClick={this.handleChange} />

        {form}
        
      </form>
    );
  }
}

export default FormComponent;