import React from 'react';
import './App.css';
import Navbar from './Navbar/navbar';

class App extends React.Component<{},{}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Navbar/>
      </div>
    );
  }
}

export default App;
