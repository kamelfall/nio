import React from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import moment from 'moment';
import './BookingComponent.scss';
import FormComponent from '../FormComponent/FormComponent';

interface IBookingProps {

}

interface IBookingState {
  seats: number,
  date: Date,
  form: object,
  bookings: object
}

export class BookingComponent extends React.Component<IBookingProps, IBookingState> {
  constructor(props: any) {
    super(props);

    this.state = {
      seats: 2,
      date: new Date(),
      form: {

      },
      bookings: {

      }
    }
  }


  componentDidMount() {
    axios.get("http://localhost:8888/order/readAll.php")
      .then((result: any) => {
        this.setState({bookings: result.data.records});
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
      
      //Fri Aug 30 2019 00:00:00 GMT+0200 (Central European Summer Time)
      console.log(date);
      const trimmedDate = date!.replace(",", "");
      const splitDate = trimmedDate!.split(" ");
      const realDate = splitDate[2] +"-"+ splitDate[0] +"-"+ splitDate[1];
      const yearMonthDateTime = moment(realDate, "YYYY-MMMM-DD").format("YYYY-MM-DD") + " 00:00:00";
      console.log(yearMonthDateTime);

      
      for(let id in this.state.bookings) {
      
      }
    
    })
  }


  setSeats = (seatNumber: any) => {
    this.setState({seats: seatNumber.target.value}, this.handleBooking);
  }

  datePick = (pickedDate: any) => {
    this.setState({date: pickedDate}, this.disableUnavailableDates);
  }

  handleForm = (formContent:object) => {
    this.setState({form: formContent}, this.handleBooking);
  }

  handleBooking = () => {
    console.log(this.state.date, this.state.seats, this.state.form);
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