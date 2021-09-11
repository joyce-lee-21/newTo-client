import {useSelector} from 'react-redux';
import ViewVenuesItem from './ViewVenuesItem';
import Grid from '@material-ui/core/Grid';

function ViewVenuesList() {
    const savedVenuesArray = useSelector(state => state.savedVenuesArray);

    return (
        <>
        <h4>Saved Venues</h4>
            <Grid container style={{justifyContent: 'center'}}>
                {savedVenuesArray && savedVenuesArray.length >= 1 
                ? savedVenuesArray.filter(venue=> venue.is_completed !== true).map(venue => 
                    <ViewVenuesItem key={venue.id} venue={venue}/>
                    )
                : <p>No venues are saved to your profile. View your results to ❤️ and add venues to your profile!</p>
                }
            </Grid>
        </>
    );
}
    
export default ViewVenuesList;