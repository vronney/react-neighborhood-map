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
         .map((marker, idx) => {
            const venueInfo = props.venues.find(venue => venue.id === marker.id);
            return (
              < Marker 
                key={idx} 
                position = {{ lat: marker.lat, lng: marker.lng }} 
                onClick={() => props.handleMarkerClick(marker)} >
                {marker.isOpen && venueInfo.bestPhoto && (
                    <InfoWindow>
                        <React.Fragment>
                            <img src={`${venueInfo.bestPhoto.prefix}150x150${venueInfo.bestPhoto.suffix}`} alt={"Venue Info"}/>
                            <p>}{venueInfo.name}</p>    
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
                containerElement={< div style={{height: `100vh`}} />}
                mapElement={< div style={{height: `100%`}} />}
            />
        );
    }
}

export default Map;