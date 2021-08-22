import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import VenuesMarker from "./VenuesMarker";

import {useSelector} from 'react-redux';


const VenuesMap = withScriptjs(withGoogleMap(() => {
    const filteredVenueResults = useSelector(state => state.filteredVenueResults)

    // const markers = filteredVenueResults.map(v => 
    //     (<VenuesMarker
    //         key={v.id}
    //         venue={v}
    //         location={{lat: v.location.lat, lng: v.location.lng}}
    //     />)
    // );

    return (
        <GoogleMap
            defaultZoom={12}
            center={ { lat:  30.26715, lng: -97.74306 } }
        >
            {/* DEVELOPMENT: */}
            {/* <VenuesMarker
                key={filteredVenueResults[0].id}
                venue={filteredVenueResults[0]}
                location={{lat: filteredVenueResults[0].location.lat, lng: filteredVenueResults[0].location.lng}}
            /> */}
            {/* PRODUCTION: */}
            {/* {filteredVenueResults.map(v => 
                    (<VenuesMarker
                        key={v.id}
                        venue={filteredVenueResults[0]}
                        location={{lat: filteredVenueResults[0].location.lat, lng: filteredVenueResults[0].location.lng}}
                    />)
                } */}
      </GoogleMap>
    );

}))

export default VenuesMap;

