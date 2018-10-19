import React, { Component } from 'react';
import axios from 'axios';

class MapMarker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            venues: []
        };
    }
    // Api request from Foursquare

   componentDidMount() {
       this.getVenues()
   }

   getVenues = () => {
       const endPoint = "https://api.foursquare.com/v2/venues/explore?"
       const parameters = {
           client_id: "1YGG0W2AHG3BWHL1CKC0ZN5TOEMSXGJSEZ4QQXC2WC5XB3EA",
           client_secret: "LK3GPKNUEPGIYKG540ZHQ0BDDSK1NYMVMAEJLNCVAVBGNJDZ",
           query: "food",
           near: "San Jose, Costa Rica",
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

   // Create an infowindow
       var infowindow = new google.maps.InfoWindow()


       this.state.venues.map(myVenue => {

           var contentString = `<div id="content-name">${myVenue.venue.name}</div><div id="content-address">${myVenue.venue.location.formattedAddress}</div>`

           // Create markers
           var marker = new google.maps.Marker({
               position: {
                   lat: myVenue.venue.location.lat,
                   lng: myVenue.venue.location.lng
               },
               map: map,
               title: myVenue.venue.name,
               animation: window.google.maps.Animation.DROP
           });

           // Click on marker for infowindow
           marker.addListener('click', function () {
               // Add contact to infowindow
               infowindow.setContent(contentString)
               // Opens infowindow
               infowindow.open(map, marker);
           });

       })

    render() {
            return (
              < MapMarker />  
            )
        }
}

export default MapMarker;