import {useSelector} from 'react-redux';

import ViewVenueItem from './ViewVenueItem';

import Grid from '@material-ui/core/Grid';


function ViewVenuesList() {
    const savedVenuesArray = useSelector(state => state.savedVenuesArray);

    return (
        <div>
            {savedVenuesArray.map(venue => 
                (<ViewVenueItem key={venue.id} venue={venue}/>)
            )}
        </div>
    );
}
    
export default ViewVenuesList;