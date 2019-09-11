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
      checked: ""
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
    this.setState({checked: ""});
    const target = e.target;
    const value = target.value;
    const name = target.name;
    const checked = target.value;

    this.setState({
      [name]: value,
      checked: checked
    });
  }

  createBooking = () => {
    const isValid:any = this.validate();
    if(isValid && this.state.checked === "true") {
      console.log(this.state);
      this.props.formSubmit(this.state);
    }
  }

  render() {
    let form = <p></p>;
    const time = this.state.time;

    if(time === "18:00" || time === "21:00") {
      form = 
      <ul className="form__credentials">
        <li className="form__row">
          <label htmlFor="firstName">Namn:</label>
          <input type="text" className="form__textbox" 
            name="firstName" 
            onChange={this.handleChange} pattern="[a-z]\w{4,}\d+" required/>
        </li>
        <li className="form__row">
          <label htmlFor="lastName">Efternamn:</label>
          <input type="text" className="form__textbox" 
            name="lastName" 
            onChange={this.handleChange} pattern="[a-z]\w{4,}\d+" required/>
        </li>
        <li className="form__row">
          <label htmlFor="emailAddress">E-mail:</label>
          <p className="errorMsg">{this.state.emailValidation}</p>
          <input type="text" className="form__textbox" 
            name="emailAddress"
            onChange={this.handleChange} pattern="[a-z]\w{4,}\d+" required/>
        </li>
        <li className="form__row">
          <label htmlFor="phoneNumber">Telefon:</label>
          <input type="number" className="form__textbox" 
            name="phoneNumber"
            onChange={this.handleChange} required/>
        </li>
        <p className="form__gdprInfo" >Vänligen kryssa i rutan nedan för att godkänna att vi lagrar 
          dina uppgifter enligt GDPR
        </p>
        <input type="checkbox" className="form__GDPR" value="true" onChange={this.handleChange}/>
        <input type="button" className="form__submit" value="Boka"
          onClick={this.createBooking} />
      </ul>
    } else {
      form = <p className="form__prompt">Välj en tid!</p>
    }
    return (
      <form id="form">
        <button type="button" name="time" className="form__timeButton" 
          id="earlyButton"
          value="18:00"
          onClick={this.handleChange}>18:00</button>
        {/* <input type="button" name="time" className="form__timeButton" 
          id="earlyButton"
          value="18:00"
          onClick={this.handleChange} /> */}

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