import React, {Component} from 'react';
import './App.css';
import Map from './components/map.js';
import SquareApi from './Api/ApiIndex.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12
    };
  }
  
  componentDidMount() {
    SquareApi.search({
      near: "San Antonio, TX",
      query: "restaurants",
      limit: 30
    }).then(results => {
      const {venues} = results.response;
      const {center} = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true
        };
      });
      this.setState({venues,center, markers});
      console.log(results);
    });
  }

    render() {
      return (
      <div className="App">
        <header className="App-header">
          <Map {...this.state} />
        </header>
        
      </div>
    );
  }
}

export default App;