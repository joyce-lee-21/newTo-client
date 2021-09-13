import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react'
import {changeSavedVenuesArray} from '../../usersSlice';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(() => ({
    root: {
        minWidth: 275,
        minHeight: 420,
    },
    content: {
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    social: {
        bottom: 0,
        position: 'relative',
        justifyContent: 'center',
        marginTop: '20px',
    },
    ratingSquare: {
        backgroundColor: '#68166c',
        borderRadius: '5px',
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        padding: '7px',
        margin: '5px',
    },
    catSquare: {
        backgroundColor: '#fcf3d3',
        color: 'black',
        borderRadius: '5px',
        fontSize: 14,
        margin: '10px',
        padding: '3px',
    },
    catDiv: {
        justifyContent: 'center',
        alignItems: "center",
        textAlign: 'center',
        marginTop: '25px',
    },
  }));

function VenueItem({venue}) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const savedVenuesArray = useSelector(state => state.savedVenuesArray);
    const citySelection = useSelector(state => state.citySelection);
    const [hearted, setHearted] = useState(false);

    const onHeart = (e, venue) => {
        console.log(venue)
        setHearted(true)
        const v = {
            city_profile_id: citySelection.id,
            name: venue.name,
            address: venue.location.address,
            url: venue.url,
            rating: venue.rating,
            fs_venue_id: venue.id,
            lat: venue.location.lat,
            long: venue.location.lng,
            category: venue.categories[0].name
        }
        fetch("http://localhost:3000/saved_venues", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({venue: v}),
        })
        .then(res => res.json())
        .then(venue => {
            dispatch(changeSavedVenuesArray([...savedVenuesArray, {
                id: venue.id,
                city_profile_id: venue.city_profile_id,
                name: venue.name,
                address: venue.address,
                url: venue.url,
                rating: venue.rating,
                fs_venue_id: venue.fs_venue_id,
                lat: venue.lat,
                long: venue.long,
                category: venue.category,
                is_completed: false,
            }]))
        })
    }

    return (
        <Grid item xs={4}>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.content} color="textSecondary" gutterBottom>
                        <div>
                            <p style={{fontWeight: 'bold'}}>{venue.name}</p>
                            <p>
                                {venue.location.address}
                                <br></br>
                                {venue.contact.formattedPhone}
                                <br></br>
                                {venue.url ? (<a href={venue.url} target="_blank" rel="noreferrer noopener">{`Visit Website`}</a>) : null}
                            </p> 
                            {'Rating: '}
                            <span className={classes.ratingSquare}>
                                {venue.rating ? venue.rating.toFixed(1) : "N/A"}
                            </span>
                        </div>
                        <div className={classes.catDiv}>
                            {venue.categories.map(cat => 
                                (<Card key={cat.id} className={classes.catSquare}>{cat.name}</Card>)
                            )}
                        </div>
                    </Typography>
                </CardContent>
                <CardActions className={classes.social}>
                    <div>
                        <Button onClick={(e)=>onHeart(e, venue)}>
                            {hearted ? <FavoriteIcon style={{fontSize: '36px'}}/> :<FavoriteBorderIcon style={{fontSize: '36px'}}/>}
                        </Button>
                        {venue.contact.twitter 
                            ? (<a href={`https://twitter.com/${venue.contact.twitter}`} target="_blank" rel="noreferrer noopener">
                                <Button>
                                    <TwitterIcon style={{fontSize: '28px'}}/>
                                </Button>
                            </a>) 
                            : null
                        }
                        {venue.contact.instagram 
                            ? (<a href={`https://www.instagram.com/${venue.contact.instagram}`} target="_blank" rel="noreferrer noopener">
                                <Button>
                                    <InstagramIcon style={{fontSize: '28px'}}/>
                                </Button>
                            </a>) 
                            : null
                        }
                        {venue.contact.facebook 
                            ? (<a href={`https://www.facebook.com/${venue.contact.facebook}`} target="_blank" rel="noreferrer noopener">
                                <Button>
                                    <FacebookIcon style={{fontSize: '28px'}}/>
                                </Button>
                            </a>) 
                            : null
                        }
                    </div>
                </CardActions>
            </Card>
        </Grid>
    );
}
    
export default VenueItem;