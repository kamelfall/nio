import React from 'react';
import './App.css';
import { BookingComponent } from './components/BookingComponent/BookingComponent';

class App extends React.Component<{},{}> {
  render() {
    return (
      <div className="App">
        <BookingComponent />
      </div>
    );
  }
}

export default App;
