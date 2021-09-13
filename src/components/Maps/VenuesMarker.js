import React, {useState} from "react";
import { Marker, InfoWindow } from "react-google-maps";
import RoomIcon from '@material-ui/icons/Room';

function VenuesMarker({venue, location}) {
    const [toggleInfoWindow, setToggleInfoWindow] = useState(false)

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