import React from 'react';

import './App.scss';

import HomeComponent from './components/HomeComponent/HomeComponent';
import NavbarComponent from './components/NavbarComponent/NavbarComponent';
import BookingComponent from './components/BookingComponent/BookingComponent';


class App extends React.Component<{},{}> {
  render() {
    return (
      <div className="App">
        <NavbarComponent/>
        <HomeComponent />
        <BookingComponent />
      </div>
    );
  }
}

export default App;
