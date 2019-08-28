import React from 'react';
import './App.scss';
import HomeComponent from './components/HomeComponent/HomeComponent';

class App extends React.Component<{},{}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <HomeComponent />
      </div>
    );
  }
}

export default App;
