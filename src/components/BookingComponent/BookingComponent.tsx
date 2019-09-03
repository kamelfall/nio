import React from 'react';
import Calendar from 'react-calendar';
import './BookingComponent.scss';
import FormComponent from '../FormComponent/FormComponent';

interface IBookingProps {

}

interface IBookingState {
  seats: number,
  date: Date,
  form: {

  }
}

export class BookingComponent extends React.Component<IBookingProps, IBookingState> {
  constructor(props: any) {
    super(props);

    this.state = {
      seats: 2,
      date: new Date(),
      form: {

      }
    }
  }

  setSeats = (seatNumber: any) => {
    this.setState({seats: seatNumber.target.value}, this.handleBooking);
  }

  datePick = (pickedDate: any) => {
    this.setState({date: pickedDate});
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
          <FormComponent formSubmit={this.handleForm} />
        </section>

      </main>
    );
  }
}
export default BookingComponent;