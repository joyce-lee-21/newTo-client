import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react'
import {changeTrendingResultsArray, changeSavedVenuesArray} from '../../usersSlice';
import VenueList from './VenueList';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

function Trending() {
    const dispatch = useDispatch();
    const classes = useSelector(state => state.classes);
    const citySelection = useSelector(state => state.citySelection);
    const trendingResultsArray = useSelector(state => state.trendingResultsArray);
    const savedVenuesArray = useSelector(state => state.savedVenuesArray);
    const client_id = useSelector(state => state.clientId);
    const client_secret = useSelector(state => state.clientSecret);
    const version = useSelector(state => state.version);
    const near = citySelection.city;
    const [hearted, setHearted] = useState(false);

    const trendingArray = [];

    useEffect(() => {
        trendingFetch()
    }, [])

    const trendingFetch = () => {
        async function trendingVenues(cat){
            // console.log(cat.fs_category_id)
            const res = await fetch(`https://api.foursquare.com/v2/venues/trending?&near=${near}&limit=10&radius=2000&client_id=${client_id}&client_secret=${client_secret}&v=${version}`, {
                method: "GET"
            })
            if(res.ok){
                const arr = await res.json()
                console.log(arr)
                // const vArr = arr.response.venues
                // vArr.map(v=> trendingArray.push(v.venue))
                // console.log(`formatted array from venue recommendations API: ${vArr}`)
                // console.log([...venueArray])
                // dispatch(changeTrendingResultsArray([...trendingArray]))
                // console.log(venuesResultsArray)
            } else {
                const err = await res.json()
                console.log(err.errors)
            }
        };
        trendingVenues()
    }

    const onHeart = (e, venue) => {
        setHearted(true)
        const v = {
            city_profile_id: citySelection.id,
            name: v.name,
            address: v.location.address,
            // url: venue.url,
            // rating: venue.rating,
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
                    {/* <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Search Results by Name:" variant="outlined" style={{width: '300px', marginBottom: '20px'}} onChange={(e)=>onQuery(e)}/>
                    </Grid>    
                    <Grid item xs={6}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                onChange={(e)=>onCategoryFilter(e)}
                                label="Category"
                                value={category}
                            >
                                <MenuItem value="All">All</MenuItem>
                                {categoryArray.map(cat=> 
                                    (<MenuItem key={`${cat.id}`} value={`${cat.name}`}>{cat.name}</MenuItem>)
                                )}
                            </Select>
                        </FormControl>
                    </Grid> */}
                    {trendingResultsArray.map(v => (
                        <Grid container>
                            <Grid item xs={5}>
                                <div>
                                    <p style={{fontWeight: 'bold'}}>{v.name}</p>
                                    <p>{v.location.address}</p>
                                    {/* <a href={venue.url}>{`Visit Website`}</a> */}
                                </div>
                            </Grid>
                            <Grid item xs={4} className={classes.results2List}>
                                <div>
                                    <div>
                                        {'Rating: '}
                                        <span className={classes.ratingSquare}>
                                            {/* {v.rating ? venue.rating.toFixed(1) : "N/A"} */}
                                        </span>
                                        <Button onClick={(e)=>onHeart(e, v)}>
                                        {hearted ? <FavoriteIcon /> :<FavoriteBorderIcon />}
                                    </Button>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>
                                    {v.categories.map(cat => (<p key={cat.id} className={classes.catSquare}>{cat.name}</p>))}
                                </div>
                            </Grid>
                        </Grid>
                    ))}
            </Grid>
        </Grid>
    );
}
    
export default Trending;