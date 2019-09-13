import React from 'react';
import './FormComponent.scss';

interface IFormProps {
  formSubmit(state:any):void;
  pickedDate: string;
}

interface IFormState {
  [key: string]: string,
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
      GDPRChecked: "false",
      GDPRInfoState: "false",

    }
    this.showGdprInfo = this.showGdprInfo.bind(this);
  }

  //validate email address and requires to include @ sign.
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
  //sets state values dynamically
  handleChange = (e: any) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    }, this.setTimeButtonStyling);
  }

  // reset and add highlight for active time
  setTimeButtonStyling(){
    let earlyButton = document.getElementById('earlyButton');
    let lateButton = document.getElementById('lateButton');
    earlyButton!.classList.remove('form__timebutton--active')
    lateButton!.classList.remove('form__timebutton--active')

    if(this.state.time === "18:00") {
      earlyButton!.classList.add('form__timebutton--active');
    } else if(this.state.time === "21:00") {
      lateButton!.classList.add('form__timebutton--active');
    }
  }
  // toggles states of gdpr checkbox when clicked
  handleCheckBox = (e: any) => {
    const target = e.target;
    const gdprCheck = target.value;
    if(this.state.GDPRChecked === "true"){
      this.setState({
        GDPRChecked: "false",
      })
    }else {
      this.setState({
        GDPRChecked: gdprCheck,
      })
    }
  }
  // Toggles the state of GDPRInfoState when clicked
  showGdprInfo() {
    if(this.state.GDPRInfoState === "false"){
      this.setState({
        GDPRInfoState: "true",
      })
    }else {
      this.setState({
        GDPRInfoState: "false",
      })
    }
  }
  //checks that the form is valid and GDPR box is checked before submitting the form
  createBooking = () => {
    const isValid:any = this.validate();    
    if(isValid && this.state.GDPRChecked === "true") {
      this.props.formSubmit(this.state);
    }
  }
  render() {
    let form = <p></p>;
    const time = this.state.time;

    // gets state for GDPR adds diffrent css to class "isShown" depending on state
    const GDPRshown = this.state.GDPRInfoState;
    let isShown: any;

    if (GDPRshown === "false") {
      isShown = {
        display: 'none',
      }
    }else {
      isShown = {
        display: 'block',
      }
    }
    //checks that a date and time is picked before rendering the customer form
    if((time === "18:00" || time === "21:00") && this.props.pickedDate !== "") {
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
        <p onClick={this.showGdprInfo} className="gdpr">Vad är GDPR?</p>
        
        <div style={isShown} className="gdprInfo">
            <p>
              Vi behöver spara och behandla personuppgifter om dig, så som namn, emailadress och 
              telefonnummer. Syftet med en sådan behandling är för att kunna skapa en bordsbokning 
              på det datum och tid ni önskar, vi behöver lagra din kontaktuppgifter för att kunna 
              skicka dig en bekräftelse på bokningen samt att kunna kontakta dig vid eventuella 
              ändringar. 
            </p>
            <p>
              Vi har fått dina uppgifter från personuppgiftsinnehavande på vår webbplats 
              genom det bokningsformulär du bokar ett bord hos oss. Vi tillämpar vid var tid gällande 
              integritetslagstiftning vid all behandling av personuppgifter. Den rättsliga grunden för 
              att behandla dina personuppgifter är samtycke. Du har när som helst rätt att återkalla 
              ditt samtycke till behandlingen. Ett återkallande påverkar inte lagligheten av behandlingen 
              innan samtycket återkallades.Dina uppgifter kommer att sparas på obestämd tid. 
            </p>
            <p>  
              De 
              personuppgifter vi behandlar om dig delas med ingen annan än restaurang nio . Vi kan dock 
              komma att dela dina personuppgifter med en tredje part, förutsatt att vi är skyldiga att 
              göra så enligt lag. Däremot kommer vi aldrig att överföra dina uppgifter till ett land 
              utanför EU. 
            </p>
            <p>  
              Personuppgiftsansvarig är Erik Målsäter på restaurang nio. Du har rätt att 
              kontakta oss om du vill ha ut information om de uppgifter vi har om dig, för att begära 
              rättelse, överföring eller för att begära att vi begränsar behandlingen, för att göra 
              invändningar eller begära radering av  dina uppgifter. Detta gör du enklast genom att 
              kontakta oss på +46(0) 820 50 10. Du når vårt dataskyddsombud på +46(0) 820 50 10. Om du 
              har klagomål på vår behandling av dina personuppgifter har du rätt att inge klagomål till 
              tillsynsmyndigheten Datainspektionen.
            </p>
          </div>
          <input id="check" type="checkbox" className="form__GDPR"  value="true" onChange={this.handleCheckBox}/>
        <input type="button" className="form__submit" value="Boka"
          onClick={this.createBooking} />
      </ul>
    } else {
      form = <p className="form__prompt">Välj en tid!</p>
    }
    return (
      <form id="form">
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