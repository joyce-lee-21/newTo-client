import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react'
import {changeSavedVenuesArray} from '../../usersSlice';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

import Grid from '@material-ui/core/Grid';


function VenueItem({venue}) {
    const dispatch = useDispatch();
    const classes = useSelector(state => state.classes);
    const savedVenuesArray = useSelector(state => state.savedVenuesArray);
    const citySelection = useSelector(state => state.citySelection);
    const [hearted, setHearted] = useState(false);

    const onHeart = (e, venue) => {
        setHearted(true)
        const v = {
            city_profile_id: citySelection.id,
            name: venue.name,
            address: venue.location.address,
            // url: venue.url,
            // rating: venue.rating,
            fs_venue_id: venue.id,
            lat: venue.location.lat,
            long: venue.location.lng,
            category: venue.categories[0].name
        }
        async function heartLike(){
            const res = await fetch("http://localhost:3000/saved_venues", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({venue: v}),
            })
            if(res.ok){
                const venue = await res.json()
                // console.log(venue)
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
            } else {
                const err = await res.json()
                console.log(err.errors)
                // setErrors(err.errors)
            }
        };
        heartLike();
        
        console.log("Hearted!")
    }

    return (
        <Grid container className={classes.resultsList}>
            <Grid item xs={1}>
                <Button onClick={(e)=>onHeart(e, venue)}>
                    {hearted ? <FavoriteIcon style={{fontSize: '36px'}}/> :<FavoriteBorderIcon style={{fontSize: '36px'}}/>}
                </Button>
            </Grid>
            <Grid item xs={3}>
                <div>
                    <p style={{fontWeight: 'bold'}}>{venue.name}</p>
                    <p>
                        {venue.location.address}
                        <br></br>
                        {venue.contact.formattedPhone}
                        <br></br>
                        {venue.url ? (<a href={venue.url}>{`Visit Website`}</a>) : null}
                    </p>
                </div>
            </Grid>
            <Grid item xs={4} className={classes.results2List}>
                <div>
                    <div>
                        {'Rating: '}
                        <span className={classes.ratingSquare}>
                            {venue.rating ? venue.rating.toFixed(1) : "N/A"}
                        </span>
                        
                        <div className="social-icons">
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
                    </div>
                </div>
            </Grid>
            <Grid item xs={3}>
                <div>
                    {venue.categories.map(cat => (<p key={cat.id} className={classes.catSquare}>{cat.name}</p>))}
                </div>
            </Grid>
            {/* <Grid item xs={2}></Grid> */}
        </Grid>
    );
}
    
export default VenueItem;