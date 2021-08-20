import {useSelector} from 'react-redux';
import ViewVenueItem from './ViewVenueItem';

function ViewVenuesList() {
    const savedVenuesArray = useSelector(state => state.savedVenuesArray);

    return (
        <div>
            {savedVenuesArray && savedVenuesArray.length >= 1 
            ? savedVenuesArray.map(venue => 
                (<ViewVenueItem key={venue.id} venue={venue}/>))
            : "No venues are added to your profile. View your results to add venues to your profile!"
            }
        </div>
    );
}
    
export default ViewVenuesList;