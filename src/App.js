import React, {Component} from 'react';
import './App.css';
import Map from './components/map.js';
import SquareApi from './Api/ApiIndex.js';

class App extends Component {
  
  componentDidMount() {
    SquareApi.search({
      near: "San Antonio, TX",
      query: "restaurants",
      limit: 30
    }).then(results => console.log(results));
  }

    render() {
      return (
      <div className="App">
        <header className="App-header">
          <Map/>
        </header>
        
      </div>
    );
  }
}

export default App;