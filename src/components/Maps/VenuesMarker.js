import React from "react";
import { Marker } from "react-google-maps";
import RoomIcon from '@material-ui/icons/Room';

function VenuesMarker({location}) {


// const places = [
//     {id: 0, name: "Clark's Oyster Bar", lat: 30.263079772965966, lng: -97.71377831697463},
//     {id: 1, name: "Veracruz Taco's", lat: 30.23597576734187, lng: -97.79584124901226},
//     {id: 2, name: "Uchiko", lat: 30.272920506352303, lng: -97.75722727459727}
// ]

    return(
        <Marker
          position={location}
          icon={RoomIcon}
        >
        </Marker>
    );
}

export default VenuesMarker;