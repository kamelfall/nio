import React from 'react';

import './App.scss';

import HomeComponent from './components/HomeComponent/HomeComponent';
import Navbar from './Navbar/navbar';
import BookingComponent from './components/BookingComponent/BookingComponent';


class App extends React.Component<{},{}> {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <HomeComponent />
        <BookingComponent />
      </div>
    );
  }
}

export default App;
