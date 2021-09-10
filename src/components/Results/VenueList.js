import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {changeVenuesDetailsArray, changeFilteredVenueResults} from '../../usersSlice';

import VenueItem from './VenueItem';
import VenuesMapContainer from '../Maps/VenuesMapContainer';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import MapIcon from '@material-ui/icons/Map';
import RoomIcon from '@material-ui/icons/Room';

function VenueList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useSelector(state => state.classes);
    const [errors, setErrors] = useState([]);
    const [category, setCategory] = useState("All");
    const [map, setMap] = useState(false);
    const client_id = useSelector(state => state.clientId);
    const client_secret = useSelector(state => state.clientSecret);
    const version = useSelector(state => state.version);
    const venuesResultsArray = useSelector(state => state.venuesResultsArray);
    const venuesDetailsArray = useSelector(state => state.venuesDetailsArray);
    const filteredVenueResults = useSelector(state => state.filteredVenueResults);
    const categoryArray = useSelector(state => state.categoryArray);
    const user = useSelector(state => state.user);
    

    // console.log(venuesResultsArray)

    // grab fs_venue_ids from resultsArray
    useEffect(() => {
        detailsFetch();
    }, [venuesResultsArray])

    const detailsFetch = () => {
    //     const detailsArray = [];
    //     async function venueDetails(venue){
    //     // console.log(venue.venue.id)
    //         const res = await fetch(
    //             `http://localhost:4000/venue_details/${venue.id}`,
    //             // *---PRODUCTION CHANGE:
    //             // `https://api.foursquare.com/v2/venues/${venue.id}?client_id=${client_id}&client_secret=${client_secret}&v=${version}`, 
    //             {method: "GET"}
    //         ) 
    //         // .then(res => res.json())
    //         // .then(data => {
    //         //     const v = data.response.venue
    //         //     detailsArray.push(v)
    //         //     // console.log(detailsArray)
    //         //     const fArr = detailsArray.sort((a, b) => {return b.rating - a.rating})
    //         //     dispatch(changeVenuesDetailsArray([...detailsArray]))
    //         //     dispatch(changeFilteredVenueResults([...detailsArray]))
    //         //     return fArr
    //         // })
    //         if(res.ok){
    //             const arr = await res.json()
    //             const v = arr.response.venue
    //             detailsArray.push(v)
    //             // console.log(detailsArray)
    //             detailsArray.sort((a, b) => {return b.rating - a.rating})
    //             dispatch(changeVenuesDetailsArray([...detailsArray]))
    //             dispatch(changeFilteredVenueResults([...detailsArray]))
    //         }
    //     };
    //     // use this to test one venue detail fetch:
    //     // venueDetails(venuesResultsArray[0]);

    // //  use this to fetch details for all venues in array:
    //     venuesResultsArray.map(venue=>venueDetails(venue));
    // const fsVenueDetails = async() => {
        dispatch(changeVenuesDetailsArray([]))
        dispatch(changeFilteredVenueResults([]))
        const detailsArray = [];
        // console.log(detailsArray)
        venuesResultsArray.forEach(venue => {
            // console.log(venue)
            // return fetch(`http://localhost:4000/venue_details/${venue.id}`)
            // *---PRODUCTION CHANGE:
                fetch(`https://api.foursquare.com/v2/venues/${venue.id}?client_id=${client_id}&client_secret=${client_secret}&v=${version}`) 
                // if(details.ok){
                //     const arr = details.json()
                //     const v = arr.response.venue
                //     detailsArray.push(v)
                //     detailsArray.sort((a, b) => {return b.rating - a.rating})
                //     // dispatch(changeVenuesDetailsArray([...detailsArray]))
                //     console.log(detailsArray)
                .then(res => res.json())
                .then(data => {
                    const v = data.response.venue
                    detailsArray.push(v)
                    detailsArray.sort((a, b) => {return b.rating - a.rating})
                    dispatch(changeVenuesDetailsArray([...detailsArray]))
                    dispatch(changeFilteredVenueResults([...detailsArray]))
                    // console.log(detailsArray)
                    // console.log(data)
                })
        })
    }
    // STRETCH GOAL AFTER SECONDARY CATEGORIES BROUGHT IN
    const onCategoryFilter = (e) => {
        // console.log(e.target.value)
        setCategory(e.target.value);
        if (e.target.value !== "All") {
            // let results = venuesDetailsArray.map(v => v.categories.filter((cat) => cat.name === e.target.value)).filter(v => v.length > 0)
            const filterVenue = venuesDetailsArray.filter(v => {
                let catMatch = v.categories.filter(cat => cat.name === e.target.value)
                if (catMatch.length > 0) {
                    return v
                }
            })
            filterVenue.sort((a, b) => {return b.rating - a.rating})
            // console.log(filterVenue)
            dispatch(changeFilteredVenueResults(filterVenue))
        } else {
            dispatch(changeFilteredVenueResults(venuesDetailsArray))
        }
    }

    const onQuery = (e) => {
        console.log(e.target.value)
        const query = e.target.value
        const filtered = venuesDetailsArray.filter(v=> v.name.toLowerCase().includes(query.toLowerCase()))
            // console.log(venuesDetailsArray.filter(v=> v.name.toLowerCase().includes(query.toLowerCase())))
        dispatch(changeFilteredVenueResults(filtered))
    }

    // console.log(filteredVenueResults.sort((a, b) => {return b.rating - a.rating}))
    // defineLordIconElement(loadAnimation);

    return (
        <>
        <Grid item xs={1}></Grid>
        <Grid item xs={10} style={{display: 'inline'}}>
            <div style={{height: '100px', width: '65%', margin: 'auto', textAlign: 'center'}}>
                <h3>
                    Based on your selected categories, these are the top rated places.
                    <br></br>
                    ❤️ to save venues to your profile!
                </h3>
            </div>
            <Grid container>
                <Grid item xs={5}>
                    <TextField id="outlined-basic" label="Filter Results by Name:" variant="outlined" style={{width: '300px', marginBottom: '20px'}} onChange={(e)=>onQuery(e)}/>
                </Grid>    
                <Grid item xs={5}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Filter Results by Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={(e)=>onCategoryFilter(e)}
                            label="Filter Results by Category"
                            value={category}
                        >
                            <MenuItem value="All">All</MenuItem>
                            {categoryArray.map(cat=> 
                                (<MenuItem key={`${cat.id}`} value={`${cat.name}`}>{cat.name}</MenuItem>)
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <Fab onClick={()=>setMap(!map)}>
                        <RoomIcon style={{fontSize: '48px', backgroundColor: '#9fcbb4', borderRadius: '30px', padding: '5px'}}/>
                    </Fab>
                </Grid>
            </Grid>
            <Grid className="results-map">
                {map 
                    ? <VenuesMapContainer /> 
                    : null
                }
            </Grid>
            <Grid container spacing={3}>
                {filteredVenueResults.length >= 1 
                    ? filteredVenueResults.map(v => <VenueItem key={v.id} venue={v}/>)
                    : null
                }
            </Grid>
        </Grid>
        </>
        
    );
}
    
export default VenueList;