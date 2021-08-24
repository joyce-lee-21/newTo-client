import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import VenuesMarker from "./VenuesMarker";

import {useSelector} from 'react-redux';


const VenuesMap = withScriptjs(withGoogleMap(() => {
    const filteredVenueResults = useSelector(state => state.filteredVenueResults)
    const mapCenter = useSelector(state => state.mapCenter);

    // const markers = filteredVenueResults.map(v => 
    //     (<VenuesMarker
    //         key={v.id}
    //         venue={v}
    //         location={{lat: v.location.lat, lng: v.location.lng}}
    //     />)
    // );

    console.log(mapCenter[0]);

    return (
        <GoogleMap
            defaultZoom={12}
            center={mapCenter[0]}
        >
            {/* DEVELOPMENT: */}
            {/* <VenuesMarker
                key={filteredVenueResults[1].id}
                venue={filteredVenueResults[1]}
                location={{lat: filteredVenueResults[1].location.lat, lng: filteredVenueResults[1].location.lng}}
            /> */}
            {/* PRODUCTION: */}
            {filteredVenueResults.map(v => 
                    (<VenuesMarker
                        key={v.id}
                        venue={v}
                        location={{lat: v.location.lat, lng: v.location.lng}}
                    />)
            )}
      </GoogleMap>
    );

}))

export default VenuesMap;

