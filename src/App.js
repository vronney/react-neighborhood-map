import React, {Component} from 'react';
import './App.css';
import Map from './components/map.js';
import SquareApi from './Api/ApiIndex.js';
import SideBar from './components/SideBar';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
      markerColor: '#FFFF24' 
    };
  }
// Closes infowindow if another marker is clicked

  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({
      marker: Object.assign(this.state.markers,markers)
    });    
  };
// Opens infowindow when marker is clicked

  handleMarkerClick = (marker) => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({
      markers: Object.assign(this.state.markers,marker),
      });
    const venue = this.state.venues.find(venue => venue.id === marker.id);

    SquareApi.getVenueDetails(marker.id)
      .then(res => {const newVenue = Object.assign(venue, res.response.venue);
        this.setState({
          venues: Object.assign(this.state.venues, newVenue)
        });
      console.log(newVenue);
  });
};

// Display infowindow when the name is clicked in the searchBar
// When the listItem is clicked the infowindow opens on the map.  
handleListItemClick = venue => {
  const marker = this.state.markers.find(marker => marker.id === venue.id)
  this.handleMarkerClick(marker);
}

// Data is requested from FourSquare

  componentDidMount() {
    SquareApi.search({
      near: "San Antonio, TX",
      query: "steak",
      limit: 10
    }).then(results => {
      const {venues} = results.response;
      const {center} = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        };
      });
      this.setState({venues,center, markers});
      console.log(results);
    });
  }

    render() {
      return (
      <div className="App">
        <SideBar {...this.state} handleListItemClick={this.handleListItemClick}/>
        <Map {...this.state} handleMarkerClick={this.handleMarkerClick} />
      </div>
    );
  }
}

export default App;