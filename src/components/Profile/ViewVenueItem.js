import {useDispatch, useSelector} from 'react-redux';
import {changeSavedVenuesArray} from '../../usersSlice';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const VenueViewButton = withStyles({
    root: {
      boxShadow: 'none',
      fontSize: 14,
      border: '1px solid',
      lineHeight: 1.5,
      backgroundColor: '#b2d6ef',
      borderColor: '#b2d6ef',
      borderRadius: '20px',
      padding: '6px 15px',
      margin: '10px',
      '&:hover': {
        backgroundColor: '#9fcbb4',
        borderColor: '#9fcbb4',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#9fcbb4',
        borderColor: '#9fcbb4',
      },
      '&:focused': {
        boxShadow: '0 0 0 0.2rem #9fcbb4',
      },
    },
  })(Button);

function ViewVenueItem({venue}) {
    const dispatch = useDispatch();
    const savedVenuesArray = useSelector(state => state.savedVenuesArray);

    // console.log(venue === [] ? `${venue.id}: this is true` : `${venue.id}: this is false`)

    const onCompleted = (e, venue) => {
        dispatch(changeSavedVenuesArray(savedVenuesArray.filter(v=>v.id !== venue.id)))
        fetch(`http://localhost:3000/saved_venues/${venue.id}`, { 
            method: "DELETE" 
        })
    }

    return (
        <div className="venue-tile">
            <p style={{fontWeight: "bold"}}>{venue.name}</p>
            <p>{venue.rating}</p>
            <p>{venue.address}</p>
            <p>{venue.url}</p>
            <VenueViewButton onClick={(e)=>onCompleted(e, venue)}>Completed</VenueViewButton>
        </div>
    );
}
    
export default ViewVenueItem;