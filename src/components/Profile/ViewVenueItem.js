import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {changeSavedVenuesArray, changeCompletedVenuesArray} from '../../usersSlice';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    fontSize: 14,
    backgroundColor: '#ffeca9',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    margin: '20px',
    width: '250px',
    height: '150px',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    },
    content: {
      fontSize: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    venue: {
        backgroundColor: '#fcf3d3',
        color: 'black',
        borderRadius: '5px',
        fontSize: 14,
        margin: '10px',
        padding: '3px',
    },
    social: {
      bottom: 0,
      position: 'relative',
      justifyContent: 'center',
    },
    cardCatSquare: {
      backgroundColor: '#fcf3d3',
      color: 'black',
      borderRadius: '5px',
      fontSize: 14,
      margin: '10px',
      padding: '3px',
    },
  });

const VenueViewButton = withStyles({
    root: {
      boxShadow: 'none',
      fontSize: 14,
      backgroundColor: '#b2d6ef',
      borderColor: '#b2d6ef',
      borderRadius: '20px',
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
            {/* <Paper elevation={2} className={classes.root}>
              <p style={{fontWeight: "bold"}}>{venue.name}
              <br></br>
              {venue.rating}
              <br></br>
              {venue.address}</p>
              {venue.url 
                ? (<a href={venue.url}>{`Visit Website`}</a>)
                : null
              }
              <br></br>
              <VenueViewButton onClick={(e)=>onRemove(e, venue)}>Remove</VenueViewButton>
              <Button onClick={(e)=>onCompleted(e, venue)}>
                {checked ? <CheckCircleIcon/> : <CheckCircleOutlineIcon/>}
              </Button>
            </Paper> */}
            <Card className={classes.root}>
                <CardContent>
                  <Typography className={classes.content} color="textSecondary">
                      <div>
                          <p style={{fontWeight: 'bold'}}>{venue.name}</p>
                          <p>
                              {venue.address}
                              <br></br>
                              {venue.url ? (<a href={venue.url} target="_blank" rel="noreferrer noopener">{`Visit Website`}</a>) : null}
                              <br></br>
                              {venue.category 
                                ? venue.category.map(cat => 
                                  (<Card key={cat.id} className={classes.cardCatSquare}>{cat.name}</Card>)) 
                                : null}
                          </p> 
                      </div>
                  </Typography>
                </CardContent>
                <CardActions className={classes.social}>
                  <div>
                    <VenueViewButton onClick={(e)=>onRemove(e, venue)}>Remove</VenueViewButton>
                    <Button onClick={(e)=>onCompleted(e, venue)}>
                      {checked ? <CheckCircleIcon/> : <CheckCircleOutlineIcon/>}
                    </Button>
                  </div>
                </CardActions>
            </Card>
        </>
    );
}
    
export default ViewVenueItem;