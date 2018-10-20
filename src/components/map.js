import React, { Component } from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{lat: 29.424122, lng: -98.493628}}
    >
        {
            props.isMarkerShown && < Marker position = {
                {
                    lat: 29.424122,
                    lng: -98.493628
                }
            }
            />}
    </GoogleMap>
))

class Map extends Component {
    render() {
        return (
            < MyMapComponent
                isMarkerShown
                googleMapURL = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAOVpJh6ZP06deNCZ7xABAuBqbhjd5NEDk"
                loadingElement={< div style={{height: `100%`}} />}
                containerElement={< div style={{height: `100vh`}} />}
                mapElement={< div style={{height: `100%`}} />}
            />
        );
    }
}

export default Map;