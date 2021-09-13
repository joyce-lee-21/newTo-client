import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import VenuesMarker from "./VenuesMarker";
import {useSelector} from 'react-redux';


const VenuesMap = withScriptjs(withGoogleMap(() => {
    const filteredVenueResults = useSelector(state => state.filteredVenueResults)
    const mapCenter = useSelector(state => state.mapCenter);

    return (
        <GoogleMap
            defaultZoom={12}
            center={mapCenter[0]}
        >
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

