import {useSelector, useDispatch} from 'react-redux';
import {changeSavedVenuesArray} from '../../usersSlice';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
    root: {
      width: 300,
      height: 160,
      textAlign: 'center',
      alignItems: 'center',
      backgroundColor: '#fcf3d3',
      display: 'inline-block',
      padding: '5px',
    },
  });

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

function ViewVenuesList() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const savedVenuesArray = useSelector(state => state.savedVenuesArray);

    const onCompleted = (e, venue) => {
        dispatch(changeSavedVenuesArray(savedVenuesArray.filter(v=>v.id !== venue.id)))
        fetch(`http://localhost:3000/saved_venues/${venue.id}`, { 
            method: "DELETE" 
        })
    }


    return (
        <div>
            {savedVenuesArray && savedVenuesArray.length >= 1 
            ? savedVenuesArray.map(venue => 
                (<Card key={venue.id} className={classes.root} variant="outlined">
                    <p style={{fontWeight: "bold"}}>{venue.name}</p>
                    <p>{venue.rating}</p>
                    <p>{venue.address}</p>
                    <a href={venue.url}>{`Visit Website`}</a>
                    <br></br>
                    <VenueViewButton onClick={(e)=>onCompleted(e, venue)}>Remove</VenueViewButton>
                </Card>)
                )
            : "No venues are added to your profile. View your results to add venues to your profile!"
            }
        </div>
    );
}
    
export default ViewVenuesList;