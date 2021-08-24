import React, {useState} from "react";
import { Marker, InfoWindow } from "react-google-maps";
import RoomIcon from '@material-ui/icons/Room';

function VenuesMarker({venue, location}) {
    // const [selectedPlace, setSelectedPlace] = useState("")
    // const [activeMarker, setActiveMarker] = useState("")
    const [toggleInfoWindow, setToggleInfoWindow] = useState(false)

// const places = [
//     {id: 0, name: "Clark's Oyster Bar", lat: 30.263079772965966, lng: -97.71377831697463},
//     {id: 1, name: "Veracruz Taco's", lat: 30.23597576734187, lng: -97.79584124901226},
//     {id: 2, name: "Uchiko", lat: 30.272920506352303, lng: -97.75722727459727}
// ]
const labelSize = { width: 220};
const labelPadding = 8;

// console.log(toggleInfoWindow)

    return(
        <>
            <Marker
                position={location}
                icon={RoomIcon}
                name={venue.name}
                onClick={()=>setToggleInfoWindow(true)}
            >
                {toggleInfoWindow && 
                    <InfoWindow
                        onCloseClick={()=>setToggleInfoWindow(false)}
                    >
                        <p>
                            {venue.name}
                            <br></br>
                            {venue.location.address}
                            <br></br>
                            {venue.url && (<a href={venue.url} target="_blank" rel="noreferrer noopener">{`Visit Website`}</a>)}
                        </p>
                    </InfoWindow>
                }
            </Marker>
        </>
    );
}

export default VenuesMarker;