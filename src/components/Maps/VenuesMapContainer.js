import React from "react";
import VenuesMap from './VenuesMap';

function VenuesMapContainer() {
    
    return (
        <VenuesMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `500px`, width: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    );
}

export default VenuesMapContainer;