import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {changeSavedVenuesArray, changeCompletedVenuesArray} from '../../usersSlice';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


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

function ViewVenueItem({venue}) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const savedVenuesArray = useSelector(state => state.savedVenuesArray);
    const completedVenuesArray = useSelector(state => state.completedVenuesArray);
    const [checked, setChecked] = useState(false);

    const onRemove = (e, venue) => {
        dispatch(changeSavedVenuesArray(savedVenuesArray.filter(v=>v.id !== venue.id)))
        fetch(`http://localhost:3000/saved_venues/${venue.id}`, { 
            method: "DELETE" 
        })
    }

    const onCompleted = (e, venue) => {
      setChecked(true)
      async function acctChange(){
          const res = await fetch(`http://localhost:3000/saved_venues/${venue.id}`, {
              method: "PATCH",
              headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify({ 
                  venue: {
                      is_completed: true,   
                  }          
              }),
          })
          if(res.ok){
              const venue = await res.json()
              console.log(venue)
              dispatch(changeCompletedVenuesArray([venue]))
              dispatch(changeSavedVenuesArray(savedVenuesArray.filter(v=>v.is_completed !== true)))
          } else {
              const err = await res.json()
              console.log(err.errors)
          }
      };
      acctChange();
    }

    return (
        <>
            <Card className={classes.root} variant="outlined">
              <p style={{fontWeight: "bold"}}>{venue.name}</p>
              <p>{venue.rating}</p>
              <p>{venue.address}</p>
              {venue.url 
                ? (<a href={venue.url}>{`Visit Website`}</a>)
                : null
              }
              <br></br>
              <VenueViewButton onClick={(e)=>onRemove(e, venue)}>Remove</VenueViewButton>
              <Button onClick={(e)=>onCompleted(e, venue)}>
                {checked ? <CheckCircleIcon/> : <CheckCircleOutlineIcon/>}
              </Button>
            </Card>
        </>
    );
}
    
export default ViewVenueItem;