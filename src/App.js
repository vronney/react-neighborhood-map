import React, {Component} from 'react';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import MapStyle from './MapStyle.json';
import NavBtn from './components/NavButton/NavButton.js';


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <NavBtn />
        </header>
        <Map
          google={this.props.google}
          styles={MapStyle}
          initialCenter={{
            lat: 9.928069,
            lng: -84.090725
          }}
          zoom={12}>
          <Marker onClick={this.onMarkerClick}
            name={'San Jose, Costa Rica'} />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div className="infoBox">
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyAOVpJh6ZP06deNCZ7xABAuBqbhjd5NEDk"),
  libraries: ['geometry', 'drawing', 'places']
})(App)
