import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {changeSavedVenuesArray, changeCompletedVenuesArray} from '../../usersSlice';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
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
    width: '25%',
    height: '170px',
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
    },
    social: {
      bottom: 0,
      position: 'relative',
      justifyContent: 'center',
      height: '60px',
    },
    cardCatSquare: {
      backgroundColor: '#fcf3d3',
      color: 'black',
      borderRadius: '5px',
      fontSize: 14,
      margin: '10px',
    },
  });

const VenueViewButton = withStyles({
    root: {
      boxShadow: 'none',
      fontSize: 14,
      backgroundColor: '#955698',
      color: 'white',
      margin: '10px',
      '&:hover': {
        backgroundColor: '#68166c',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#68166c',
      },
      '&:focused': {
        boxShadow: '0 0 0 0.2rem #68166c',
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
      fetch(`http://localhost:3000/saved_venues/${venue.id}`, {
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
      .then(r => r.json())
      .then(venue => {
        // console.log(venue)
        dispatch(changeCompletedVenuesArray([...completedVenuesArray, venue]))
        dispatch(changeSavedVenuesArray(savedVenuesArray.filter(v=>v.id !== venue.id)))
      })
      .catch(errors => console.log(errors))
    }

    return (
        <>
          <Card className={classes.root}>
              <CardContent style={{height: '120px', padding: '5px'}}>
                <Typography className={classes.content}>
                    <div style={{marginTop: '15px'}}>
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
                    {checked ? <CheckCircleIcon style={{fontSize: 32}}/> : <CheckCircleOutlineIcon style={{fontSize: 32}}/>}
                  </Button>
                </div>
              </CardActions>
          </Card>
        </>
    );
}
    
export default ViewVenueItem;