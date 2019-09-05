import React from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import moment from 'moment';
import './BookingComponent.scss';
import FormComponent from '../FormComponent/FormComponent';

interface IBookingProps {

}

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
  form: IForm,
  bookings: IBooking[]
}

interface IForm {
  firstName: string,
  lastName: string,
  emailAddress: string,
  phoneNumber: string
}

export class BookingComponent extends React.Component<IBookingProps, IBookingState> {
  constructor(props: any) {
    super(props);

    this.state = {
      seats: 2,
      date: new Date(),
      form: {
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNumber: ""
      },
      bookings: []
    }
    this.disableUnavailableDates = this.disableUnavailableDates.bind(this);
    this.disableUnavailableSeatings = this.disableUnavailableSeatings.bind(this);
  }


  componentDidMount() {
    const label = document.querySelectorAll(".react-calendar__navigation__label");
    label.forEach(oneLabel => {
      oneLabel.setAttribute("disabled", "true");
    })
    axios.get("http://localhost:8888/order/readAll.php")
      .then((result: any) => {
        let array = this.state.bookings;
        let data:[] = result.data.records;
        for(let i = 0; i < data.length; i++) {
          array.push(data[i]);
        }
        this.setState({bookings: array});
      })
      .then(() => {
        console.log(this.state.bookings);
        this.disableUnavailableDates();
      });
  }

  

  disableUnavailableDates = () => {
    const tiles = document.querySelectorAll(".react-calendar__tile");
    tiles.forEach(tile => {
      const abbr = tile!.firstElementChild;
      const date = abbr!.getAttribute("aria-label");
      const trimmedDate = date!.replace(",", "");
      const splitDate = trimmedDate!.split(" ");
      const realDate = splitDate[2] +"-"+ splitDate[1] +"-"+ splitDate[0];
      const yearMonthDateTime = moment(realDate, "YYYY-MMMM-DD").format("YYYY-MM-DD") + " 00:00:00";
      
      let counter = 0;
      for(let i = 0; i < this.state.bookings.length; i++) {
        if(this.state.bookings[i].date == yearMonthDateTime ) {
          counter++;

          console.log(counter + " on " + this.state.bookings[i].date);
          if(counter >= 2) {
            console.log("DISABLE" + this.state.bookings[i].date);
            tile.setAttribute("disabled", "true");
            abbr!.setAttribute("style", "pointer-events: none");
          }
        }
      }
    })
  }

  disableUnavailableSeatings = (date:any) => {

    const splitDate = date!.toString().split(" ");
    const realDate = splitDate[3] +"-"+ splitDate[1] +"-"+ splitDate[2];
    const yearMonthDateTime = moment(realDate, "YYYY-MMM-DD").format("YYYY-MM-DD") + " 00:00:00";
    document.getElementById("earlyRadio")!.removeAttribute("disabled");
    document.getElementById("lateRadio")!.removeAttribute("disabled");
    let earlyCounter = 0;
    let lateCounter = 0;

    for(let i = 0; i < this.state.bookings.length; i++) {
      if(this.state.bookings[i].date === yearMonthDateTime ) {
        if(this.state.bookings[i].time === "18:00") {
          earlyCounter++;
        } else if (this.state.bookings[i].time === "21:00") {
          lateCounter++;
        }
        
        if(earlyCounter >= 1) {
          document.getElementById("earlyRadio")!.setAttribute("disabled", "true");
        }
        if(lateCounter >= 1) {
          document.getElementById("lateRadio")!.setAttribute("disabled", "true");
        }
      }
    }
  }

  // TODO: HEAVY REFRACTOR


  setSeats = (seatNumber: any) => {
    this.setState({seats: seatNumber.target.value}, this.handleBooking);
  }

  datePick = (pickedDate: any) => {
    this.setState({date: pickedDate});
    this.disableUnavailableSeatings(pickedDate);
  }

  handleForm = (formContent: IForm) => {
    this.setState({form: formContent}, this.handleBooking);
  }

  handleBooking = () => {
    console.log(this.state.date, this.state.seats, this.state.form);
    this.submitBooking();
  }

  submitBooking(){

    axios({
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
      .then(function(response){
        console.log(response);
      });
  }

  render() {
    return (
      <main>
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
          />
        </section>

        <section className="booking__form">
          <FormComponent 
          formSubmit={this.handleForm} />
        </section>

      </main>
    );
  }
}
export default BookingComponent;