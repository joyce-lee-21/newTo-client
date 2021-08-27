import {useSelector, useDispatch} from 'react-redux';
import {useState} from 'react';
// import {changeSavedVenuesArray, changeCompletedVenuesArray} from '../../usersSlice';
import ViewVenueItem from './ViewVenueItem';

import { makeStyles, withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


// const useStyles = makeStyles({
//     root: {
//         width: 300,
//         height: 160,
//         display: 'flex',
//         justifyContent: 'center',
//         textAlign: 'center',
//         alignItems: 'center',
//         flexDirection: 'row',
//         padding: '5px',
//     }
//   });


function ViewVenuesList() {
    // const dispatch = useDispatch();
    const classes = useSelector(state => state.classes);
    const savedVenuesArray = useSelector(state => state.savedVenuesArray);
    // const completedVenuesArray = useSelector(state => state.completedVenuesArray);
    // const [checked, setChecked] = useState(false);

    // const onRemove = (e, venue) => {
    //     dispatch(changeSavedVenuesArray(savedVenuesArray.filter(v=>v.id !== venue.id)))
    //     fetch(`http://localhost:3000/saved_venues/${venue.id}`, { 
    //         method: "DELETE" 
    //     })
    // }

    // const onCompleted = (e, venue) => {
    //     setChecked(true)
    //     async function acctChange(){
    //         const res = await fetch(`http://localhost:3000/saved_venues/${venue.id}`, {
    //             method: "PATCH",
    //             headers: {
    //             "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ 
    //                 venue: {
    //                     is_completed: true,   
    //                 }          
    //             }),
    //         })
    //         if(res.ok){
    //             const venue = await res.json()
    //             console.log(venue)
    //             dispatch(changeCompletedVenuesArray([venue]))
    //             dispatch(changeSavedVenuesArray(savedVenuesArray.filter(v=>v.is_completed !== true)))
    //         } else {
    //             const err = await res.json()
    //             console.log(err.errors)
    //         }
    //     };
    //     acctChange();
    // }


    return (
        <>
        <h4>Saved Venues</h4>
            <Grid container className={classes.venueList}>
                {savedVenuesArray && savedVenuesArray.length >= 1 
                ? savedVenuesArray.filter(venue=> venue.is_completed !== true).map(venue => 
                    // (<Card key={venue.id} className={classes.root} variant="outlined">
                    //     <p style={{fontWeight: "bold"}}>{venue.name}</p>
                    //     <p>{venue.rating}</p>
                    //     <p>{venue.address}</p>
                    //     {venue.url 
                    //         ? (<a href={venue.url}>{`Visit Website`}</a>)
                    //         : null
                    //     }
                    //     <br></br>
                    //     <VenueViewButton onClick={(e)=>onRemove(e, venue)}>Remove</VenueViewButton>
                    //     <Button onClick={(e)=>onCompleted(e, venue)}>
                    //         {checked ? <CheckCircleIcon/> : <CheckCircleOutlineIcon/>}
                    //     </Button>
                    // </Card>)
                    <ViewVenueItem key={venue.id} venue={venue}/>
                    )
                : <p>No venues are saved to your profile. View your results to ❤️ and add venues to your profile!</p>
                }
            </Grid>
        </>
    );
}
    
export default ViewVenuesList;