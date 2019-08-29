import React from 'react';
import Calendar from 'react-calendar';
import './BookingComponent.scss';

interface IBookingProps {

}

interface IBookingState {
  date: Date,
  pickedDate: {
    weekday: string,
    month: string,
    date: number,
    year: number
  }
}

export class BookingComponent extends React.Component<IBookingProps, IBookingState> {
  constructor(props: any) {
    super(props);

    this.state = {
      date: new Date(),
      pickedDate: {
        weekday: "",
        month: "",
        date: 0,
        year: 0
      }
    }
  }

  datePick = (date: any) => {
    let dateArray = date.toString().split(" ");
    let formattedDate = {
      weekday: dateArray[0],
      month: dateArray[1],
      date: dateArray[2],
      year: dateArray[3]
    }
    this.setState({pickedDate: formattedDate}, this.handleBooking);
  }

  handleBooking = () => {
    console.log(this.state.pickedDate);
  }

  render() {
    return (
      <main>
        <h1>Boka</h1>

        <select id="guestSelect">
          <option value="">Antal gäster</option>
          <option value="1">1 person</option>
          <option value="2">2 personer</option>
          <option value="3">3 personer</option>
          <option value="4">4 personer</option>
          <option value="5">5 personer</option>
          <option value="6">6 personer</option>
        </select>

        <Calendar
          onChange={this.datePick}
          value={this.state.date}
        />

      </main>
    );
  }
}
export default BookingComponent;