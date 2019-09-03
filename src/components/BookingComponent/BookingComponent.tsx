import React from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
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
      
      const formattedDate = this.convertAbbr(date!);
      console.log(formattedDate);
      
      for(let id in this.state.bookings) {
      
      }
    
    })
  }

  convertAbbr = (monthString: string) => {
    const array = monthString.split(" ");
    array[1] = array[1].replace(",", "");

    if(array[0].includes("January")) {
      array[0] = "01";
    }else if(array[0].includes("February")) {
      array[0] = "02";
    }else if(array[0].includes("March")) {
      array[0] = "03";
    }else if(array[0].includes("April")) {
      array[0] = "04";
    }else if(array[0].includes("May")) {
      array[0] = "05";
    }else if(array[0].includes("June")) {
      array[0] = "06";
    }else if(array[0].includes("July")) {
      array[0] = "07";
    }else if(array[0].includes("August")) {
      array[0] = "08";
    }else if(array[0].includes("September")) {
      array[0] = "09";
    }else if(array[0].includes("October")) {
      array[0] = "10";
    }else if(array[0].includes("November")) {
      array[0] = "11";
    }else if(array[0].includes("December")) {
      array[0] = "12";
    }

    if(array[1].length == 1) {
      array[1] = "0" + array[1];
    }

    const newString = array[2] + "-" + array[0] + "-" + array[1];
    return newString;
  }


  setSeats = (seatNumber: any) => {
    this.setState({seats: seatNumber.target.value}, this.handleBooking);
  }

  datePick = (pickedDate: any) => {
    this.setState({date: pickedDate}, this.handleBooking);
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