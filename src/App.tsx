import React from 'react';
import './App.scss';

import HomeComponent from './components/HomeComponent/HomeComponent';
import NavbarComponent from './components/NavbarComponent/NavbarComponent';
import BookingComponent from './components/BookingComponent/BookingComponent';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


class App extends React.Component<{},{}> {
  render() {
    return (
      <Router>
        <div className="App">
          <NavbarComponent/>
          <Switch>
            <Route path="/" exact component={HomeComponent} />
            <Route path="/booking" component={BookingComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
