import React from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import moment from 'moment';
import './BookingComponent.scss';
import FormComponent from '../FormComponent/FormComponent';

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
  seats: number,
  date: Date,
  dateString: string,
  form: IForm,
  bookings: IBooking[],
  dateOfToday: [],
  bookingDone: boolean
}

interface IForm {
  time: string,
  firstName: string,
  lastName: string,
  emailAddress: string,
  phoneNumber: string
}

export class BookingComponent extends React.Component<{}, IBookingState> {
  constructor(props: any) {
    super(props);

    this.state = {
      seats: 2,
      date: new Date(),
      dateString: "",
      form: {
        time: "",
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNumber: ""
      },
      bookings: [],
      dateOfToday: [],
      bookingDone: false

    }
    this.disableUnavailableDates = this.disableUnavailableDates.bind(this);
    this.disableUnavailableSeatings = this.disableUnavailableSeatings.bind(this);
    this.submitBooking = this.submitBooking.bind(this);
    this.createGuest = this.createGuest.bind(this);
  }

  async componentDidMount() {
    // Switch-century-function on react-calendar is disabled
    const label = document.querySelectorAll(".react-calendar__navigation__label");
    label.forEach(oneLabel => {
      oneLabel.setAttribute("disabled", "true");
    })
    // Gets all orders through API
    await this.readAllOrders();
    // Disables fully booked dates in calendar
    this.disableUnavailableDates();
    // Picks todays date in calendar as default unless it is fully booked
    let todaysDate = moment().format("YYYY-MM-DD") + " 00:00:00";
    if(this.isTodayAvailable(todaysDate)){
      this.setState({dateString: todaysDate})
    }
    // Disables unavailable seating for todays date
    this.disableUnavailableSeatings(todaysDate);
  }

  // Counts amount of bookings on todays date to determine if it is fully booked
  isTodayAvailable(todaysDate: string): boolean{
    let counter = 0;
      for(let i = 0; i < this.state.bookings.length; i++) {
        if(this.state.bookings[i].date === todaysDate) {
          counter++;
          if(counter >= 2) {
            return false;
          }
        }
      }
    return true;
  }

  //Gets all orders and saves them in state
  async readAllOrders() {
    await axios.get("http://localhost:8888/order/readAll.php")
      .then((result: any) => {
        let array = this.state.bookings;
        let data:[] = result.data.records;
        for(let i = 0; i < data.length; i++) {
          array.push(data[i]);
        }
        this.setState({bookings: array});
      });
  }

  
  disableUnavailableDates() {
    // Creates a collections of all tiles in react-calendar
    const tiles = document.querySelectorAll(".react-calendar__tile");
    // Loops through them and find the corresponding date
    tiles.forEach(tile => {
      const abbr = tile!.firstElementChild;
      const date = abbr!.getAttribute("aria-label");

      // Changes format of date in the tile's label
      const trimmedDate = date!.replace(",", "");
      const splitDate = trimmedDate!.split(" ");
      const realDate = splitDate[2] +"-"+ splitDate[1] +"-"+ splitDate[0];
      const yearMonthDateTime = moment(realDate, "YYYY-MMMM-DD").format("YYYY-MM-DD") + " 00:00:00";
      
      // Disables the tile if the corresponfing date is fully booked
      let counter = 0;
      for(let i = 0; i < this.state.bookings.length; i++) {
        if(this.state.bookings[i].date === yearMonthDateTime) {
          counter++;

          if(counter >= 2) {
            tile.setAttribute("disabled", "true");
            abbr!.setAttribute("style", "pointer-events: none");
          }
        }
      }
    })
  }

  // Checks if early or late seating is fully booked for particular date
  // and disables corresponding button
  disableUnavailableSeatings = (date:any) => {
    // Resets the buttons in case of clicking several dates
    document.getElementById("earlyButton")!.removeAttribute("disabled");
    document.getElementById("lateButton")!.removeAttribute("disabled");

    let earlyCounter = 0;
    let lateCounter = 0;

    for(let i = 0; i < this.state.bookings.length; i++) {
      if(this.state.bookings[i].date === date ) {
        if(this.state.bookings[i].time === "18:00") {
          earlyCounter++;
        } else if (this.state.bookings[i].time === "21:00") {
          lateCounter++;
        }
        
        if(earlyCounter >= 1) {
          document.getElementById("earlyButton")!.setAttribute("disabled", "true");
        }
        if(lateCounter >= 1) {
          document.getElementById("lateButton")!.setAttribute("disabled", "true");
        }
      }
    }
  }

  // Sets amount of seats selcted in in select-element to state
  setSeats = (seatNumber: any) => {
    this.setState({seats: seatNumber.target.value});
  }

  // Handles clicks on dates in calendar
  datePick = (pickedDate: any) => {

    // Changeing format of date recieved from react-calendar
    const splitDate = pickedDate!.toString().split(" ");
    const realDate = splitDate[3] +"-"+ splitDate[1] +"-"+ splitDate[2];
    const date = moment(realDate, "YYYY-MMM-DD").format("YYYY-MM-DD") + " 00:00:00";

    // When changed the new selected date is set to state
    this.setState({dateString: date});

    // And seatings-buttons are disabled if fully booked
    this.disableUnavailableSeatings(date);

    // Resets time in state
    let previousForm = {...this.state.form};
    previousForm.time = "";
    this.setState({form: previousForm});
  }

  // When submitting form, form-information is set to state,
  // submitBooking runs and bookingDone is set to true so that
  // confirmation-content is rendered
  handleForm = (formContent: IForm) => {
    this.setState({form: formContent}, this.handleBooking);
    this.setState({bookingDone: true});
    console.log();
  }

  handleBooking = () => {
    this.submitBooking();
  }

  async createOrder(customerId: string){
    await axios({
      method: "POST",
      url: "http://localhost:8888/order/create.php",
      data: JSON.stringify({
        date: this.state.dateString,
        customer_id: customerId,
        time: this.state.form.time,
        seats: this.state.seats
      })
    })
  }

  // Returns id of guest with corresponging email, if existing
  async getGuestId(): Promise<any> {
    return await axios({
      method: "GET",
      url: "http://localhost:8888/guest/search.php?s=" + this.state.form.emailAddress
    })
    .then(function(response){
      return response.data.records[0].id;
    })
  }

  async createGuest() {
    await axios({
      method: "POST",
      url: "http://localhost:8888/guest/createCustomer.php",
      data: JSON.stringify({
        first_name: this.state.form.firstName,
        last_name: this.state.form.lastName,
        email: this.state.form.emailAddress,
        phone: this.state.form.phoneNumber
        })
      }
    )
  }

  // Returns true if guest with corresponding email is found in database, 
  // otherwise returns false
  async checkIfGuestAlreadyExists(): Promise<boolean> {
    let res;
    await axios({
      method: "GET",
      url: "http://localhost:8888/guest/search.php?s=" + this.state.form.emailAddress
    })
    .then(function(response) {
      res = response;
    })
    .catch(function(){});
    if(res === undefined){
      return false;
    } else {
      return true;
    }
  }

  sendEmail() {
    // Removes hours-minutes-seconds from date-data
    let dateForEmail = this.state.dateString.split(" ");
    axios({
      method: "POST",
      url: "http://localhost:8888/email/sendEmail.php",
      data: JSON.stringify({
        first_name: this.state.form.firstName,
        last_name: this.state.form.lastName,
        email: this.state.form.emailAddress,
        date: dateForEmail[0],
        time: this.state.form.time,
        seats: this.state.seats
      })
    })
  }

  submitBooking = async () => {
    let isGuestExisting: boolean;
    let guestId: string;
    // Checks if guest already exists in database
    isGuestExisting = await this.checkIfGuestAlreadyExists()
    // If not, creates a new guest
    if(!isGuestExisting){
      await this.createGuest();
    }
    // Receives id of the guest creating the order to set as foreign key in order
    guestId = await this.getGuestId();
    await this.createOrder(guestId);
    this.sendEmail();

  }
  render() {
    let name = this.state.form.firstName;
    let dateForConfirmation = this.state.dateString.split(" ");
    let time = this.state.form.time;
    let seats = this.state.seats;

    let booking: any;

    if (this.state.bookingDone === true) {
      booking = 
        <div className="confirmSpace">
          <h2>Tack {name} för din bokning!</h2>
          <p>En bekräftelse är påväg till den e-mail du angav.</p>
          <p>Du har bokat bord den {dateForConfirmation[0]}klockan {time} för {seats} person(er)</p>
          <p>Vi på restaurang nio ser framemot din vistelse hos oss.</p>
          <p>Ses snart!</p>
          <p>/nio</p>
          <p className="finstilta">Om du önskar att ändra eller avboka din bordsbokning så är det bara</p>
          <p className="finstilta">att höra av sig till oss på +46(0) 820 50 10</p>

        </div>
    }else {
      booking =
        <div>
          <h1 className="booking__heading">Boka</h1>
          <section className="booking__guests">
            <select onChange={this.setSeats}
              value={this.state.seats}>
              <option value="1">1 person</option>
              <option value="2">2 personer</option>
              <option value="3">3 personer</option>
              <option value="4">4 personer</option>
              <option value="5">5 personer</option>
              <option value="6">6 personer</option>
            </select>
          </section>
          <section className="booking__calendar">
            <Calendar
              onChange={this.datePick}
              onActiveDateChange={this.disableUnavailableDates}
              value={this.state.date}
              minDate= {new Date()}
            />
          </section>
          <section className="booking__form">
            <FormComponent 
            formSubmit={this.handleForm}
             pickedDate={this.state.dateString} />
          </section>
        </div>
    }
    return (
      <main id="booking">
        {booking}
      </main>
    );
  }
}
export default BookingComponent;