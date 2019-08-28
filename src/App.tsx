
import './App.scss';
import Navbar from './Navbar/navbar';
import HomeComponent from './components/HomeComponent/HomeComponent';


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
