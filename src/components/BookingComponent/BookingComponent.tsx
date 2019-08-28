import React from 'react';
import Calendar from 'react-calendar';
import './BookingComponent.scss';

interface IBookingProps {

}

interface IBookingState {
  date: any
}

export class BookingComponent extends React.Component<IBookingProps, IBookingState> {
  constructor(props: any) {
    super(props);

    this.state = {
      date: new Date()
    }
  }

  datePick = (date: any) => {
    this.setState({date});
    console.log(this.state.date);
  }

  render() {
    return (
      <main>
        <h1 className="booking__heading">Boka</h1>

        <section className="booking__guests">
          <select>
            <option value="">Antal gäster</option>
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

      </main>
    );
  }
}
export default BookingComponent;