import React from 'react';

interface IBookingProps {

}

export class BookingComponent extends React.Component<IBookingProps,{}> {
  constructor(props: any) {
    super(props);
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

      </main>
    );
  }
}