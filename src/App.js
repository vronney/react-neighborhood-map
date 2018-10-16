import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {


state = {
  venues: []
}

componentDidMount() {
  this.getVenues()
  this.renderMap()
}

renderMap = () => {
  loadScript("https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing,places&key=AIzaSyAOVpJh6ZP06deNCZ7xABAuBqbhjd5NEDk&callback=initMap")
  window.initMap = this.initMap
}

getVenues = () => {
  const endPoint = "https://api.foursquare.com/v2/venues/explore?"
  const parameters = {
    client_id: "1YGG0W2AHG3BWHL1CKC0ZN5TOEMSXGJSEZ4QQXC2WC5XB3EA",
    client_secret: "LK3GPKNUEPGIYKG540ZHQ0BDDSK1NYMVMAEJLNCVAVBGNJDZ",
    query: "food",
    near: "San Antonio, TX",
    v: "20182507"
  }

  axios.get(endPoint + new URLSearchParams(parameters))
  .then(response => {
    this.setState({
      venues: response.data.response.groups[0].items
    }, this.renderMap()) // this was needed to re-renderMap in order to gather venues array with data.
  })
  .catch(error => {
    console.log("ERROR! " + error)
  })
}

initMap = () => {
  var map = new window.google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 29.424122,
      lng: -98.493628
    },
    zoom: 11
  });

this.state.venues.map(myVenue => {


  var marker = new window.google.maps.Marker({
    position: {
      lat: myVenue.venue.location.lat,
      lng: myVenue.venue.location.lng
    },
    map: map,
    title: myVenue.venue.name
  })

})

}


  render() {
    return (
      <main>
        <div id = "map"></div>
      </main>
    );
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}


export default App;
