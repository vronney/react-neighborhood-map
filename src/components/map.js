/*global google*/
import React, { Component } from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps";

const MyMapComponent = withScriptjs(withGoogleMap((props) => (
    <GoogleMap
        defaultZoom={8}
        zoom={props.zoom}
        defaultCenter={{lat: 29.424122, lng: -98.493628}}
        center={props.center}
    >
        {props.markers &&
         props.markers
         .filter(marker => marker.isVisible)
         .map((marker, idx, arr) => {
            const venueInfo = props.venues.find(venue => venue.id === marker.id);
            
            return (
              < Marker 
                key={idx} 
                position = {{ lat: marker.lat, lng: marker.lng }} 
                onClick={() => props.handleMarkerClick(marker)}
                defaultAnimation={window.google.maps.Animation.DROP}
                animation = {
                    arr.length === 1 ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP
                }
                
              >
                {marker.isOpen && venueInfo.bestPhoto && (
                   <InfoWindow>
                        <React.Fragment>
                            <h2>{venueInfo.name}</h2>
                            <img src={`${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`} alt={"Venue Info"}/>
                            <p>{venueInfo.location.address}</p>
                            <p>{venueInfo.location.city} {venueInfo.location.postalCode}</p>
                            <p>Rating: {venueInfo.rating} Cost: {venueInfo.price.message}</p>    
                        </React.Fragment>
                   </InfoWindow> 
                )}
             </Marker>
            );
        })}
    </GoogleMap>
    ))
);

class Map extends Component {
    render() {
        return (
            < MyMapComponent
                {...this.props}
                googleMapURL = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAOVpJh6ZP06deNCZ7xABAuBqbhjd5NEDk"
                loadingElement={< div style={{height: `100%`}} />}
                containerElement={< div style={{height: `100%`, width: `75%`}} />}
                mapElement={< div style={{height: `100%`}} />}
            />
        );
    }
}

export default Map;