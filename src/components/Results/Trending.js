import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react'
import {changeTrendingResultsArray, changeTrendingCatArray, changeSavedVenuesArray} from '../../usersSlice';
import TrendingResults from './TrendingResults';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

const useStyles = makeStyles(() => ({
    root: {
        minWidth: 275,
        minHeight: 420,
    },
    buttons: {
        boxShadow: 'none',
        fontSize: 14,
        backgroundColor: '#ffeca9',
        borderColor: '#ffeca9',
        padding: '6px 15px',
        margin: '10px',
        width: '200px',
    },
    catSquare: {
        backgroundColor: '#fcf3d3',
        color: 'black',
        borderRadius: '5px',
        fontSize: 14,
        margin: '10px',
        padding: '3px',
    },
    catContainer: {
        display: 'flex',
        // alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '20px',
        minHeight: '500px',
        width: '100%'
    },
    catDiv: {
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: '#ffeca9',
        display: 'flex',
        padding: '10px',
        margin: '20px',
        width: '150px',
        height: '50px',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    catArray: {
        display: 'flex',
        // alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: '20px',
        width: '100%'
    },
    cardSocial: {
        bottom: 0,
        position: 'relative',
        justifyContent: 'center',
        marginTop: '20px',
    },
    cardRoot: {
        minWidth: 275,
        minHeight: 420,
    },
    cardContent: {
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardRatingSquare: {
        backgroundColor: '#68166c',
        borderRadius: '5px',
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        padding: '7px',
        margin: '5px',
    },
    cardCatSquare: {
        backgroundColor: '#fcf3d3',
        color: 'black',
        borderRadius: '5px',
        fontSize: 14,
        margin: '10px',
        padding: '3px',
    },
    cardCatDiv: {
        justifyContent: 'center',
        alignItems: "center",
        textAlign: 'center',
        marginTop: '25px',
    },
  }));

function Trending() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const citySelection = useSelector(state => state.citySelection);
    const trendingResultsArray = useSelector(state => state.trendingResultsArray);
    const trendingCatArray = useSelector(state => state.trendingCatArray);
    const [venueArray, setVenueArray] = useState([]);
    const savedVenuesArray = useSelector(state => state.savedVenuesArray);
    const client_id = useSelector(state => state.clientId);
    const client_secret = useSelector(state => state.clientSecret);
    const version = useSelector(state => state.version);
    const near = citySelection.city;
    const [hearted, setHearted] = useState(false);

    const catArray = [];

    // useEffect(() => {
    //     trendingFetch()
    // }, [])

    // get 3 randomly selected secondary categories from rails server 
    // fetch 3 places from each category from FS API
    // fetch details of each place (9 total)
    
    useEffect(() => {
        randomCatFetch()
    }, [])

    const randomCatFetch = () => {
        async function fsVenue(){
            await fetch('http://localhost:3000/secondary_categories/randomize')
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                data.map(c => catArray.push(c))
                // console.log(trendingCatArray)
                dispatch(changeTrendingCatArray(catArray)) 
            })
        }
        fsVenue();
    }

    // console.log(venueArray)

    const trendingFetch = () => {
        async function trendingVenues(){
            // console.log(cat.fs_category_id)
            await Promise.all(trendingCatArray.map(cat=> {
                fetch(`https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=${version}&near=${near}&limit=3&categoryId=${cat.fs_category_id}`)
                .then(res => res.json())
                .then(data => {
                    const vArr = data.response.groups[0].items
                    vArr.map(v=> venueArray.push(v.venue))
                    // console.log(venueArray)
                    return venueArray.slice(0,4)
                })
                .then(async venueArray => {
                    const detailsArray = [];
                    await Promise.all(venueArray.map(venue => {
                        // *---PRODUCTION CHANGE:
                        return fetch(`https://api.foursquare.com/v2/venues/${venue.id}?client_id=${client_id}&client_secret=${client_secret}&v=${version}`) 
                            .then(res => {
                                if (res.ok) {
                                    return res.json()
                                }
                            })
                            .then(data => {
                                if (data) {
                                    const v = data.response.venue
                                    detailsArray.push(v)
                                    detailsArray.sort((a, b) => {return b.rating - a.rating})
                                    // console.log(detailsArray)
                                }
                            })
                            .then(()=> {
                                dispatch(changeTrendingResultsArray([...detailsArray]))
                            })
                    }))
                })
            }))
        };
        trendingVenues()
    }

    const onHeart = (e, v) => {
        setHearted(true)
        const venue = {
            city_profile_id: citySelection.id,
            name: v.name,
            address: v.location.address,
            url: v.url, 
            rating: v.rating,
            fs_venue_id: v.id,
            lat: v.location.lat,
            long: v.location.lng,
            category: v.categories[0].name
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
                    category: venue.category
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
        <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10} style={{display: 'inline'}}>
                <Grid container>
                    <Paper elevation={3} className={classes.catContainer}>
                        <h4>Here are 3 randomly generated categories:</h4>
                        <Grid container className={classes.catArray}>
                            {trendingCatArray.map(cat => (
                                <Paper elevation={2} className={classes.catDiv} key={cat.id}>
                                    {cat.name}
                                </Paper>
                            ))}
                        </Grid>
                        <div>
                            <Button onClick={randomCatFetch} className={classes.buttons}>
                                Randomize Again
                            </Button>
                            <h4>Once you're satisfied with the categories, click generate below!</h4>
                            <Button onClick={trendingFetch} className={classes.buttons}>
                                Generate Results
                            </Button>
                        </div>
                        <Grid container spacing={3} className={classes.catArray}>
                        {trendingResultsArray.length > 0
                            ? trendingResultsArray.map(venue => (
                                <TrendingResults key={venue.id} venue={venue}/>
                            ))
                            : null
                        }
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
}
    
export default Trending;