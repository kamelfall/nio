import React from 'react';

import './App.scss';

import HomeComponent from './components/HomeComponent/HomeComponent';
import Navbar from './Navbar/navbar';

class App extends React.Component<{},{}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Navbar/>
        <HomeComponent />
      </div>
    );
  }
}

export default App;
