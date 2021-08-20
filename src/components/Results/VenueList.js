import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {changeVenuesDetailsArray, changeFilteredVenueResults} from '../../usersSlice';

import VenueItem from './VenueItem';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

function VenueList() {
    const dispatch = useDispatch();
    const classes = useSelector(state => state.classes);
    const [errors, setErrors] = useState([]);
    const [category, setCategory] = useState("All");
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
        // console.log(venuesResultsArray)
    }, [user.category_selections])

    const detailsFetch = () => {
        const detailsArray = [];
        async function venueDetails(venue){
        // console.log(venue.venue.id)
        const res = await fetch(
            `http://localhost:4000/venue_details/${venue.id}`,
            // *---PRODUCTION CHANGE:
            // `https://api.foursquare.com/v2/venues/${venue.id}?client_id=${client_id}&client_secret=${client_secret}&v=${version}`, 
            {method: "GET"}
        ) 
        if(res.ok){
            const arr = await res.json()
            // const v = arr.response.response.venue
            // *---PRODUCTION CHANGE:
            const v = arr.response.venue
            detailsArray.push(v)
            // console.log(detailsArray)
            dispatch(changeVenuesDetailsArray([...detailsArray])) 
            dispatch(changeFilteredVenueResults([...detailsArray]))
            // !! update VenueItem array source after successfully dispatching
        } else {
            const err = await res.json()
            // console.log(err.errors)
            setErrors(err.errors)
        }
        };
        // use this to test one venue detail fetch:
        // venueDetails(venuesResultsArray[0]);

    //  use this to fetch details for all venues in array:
        venuesResultsArray.map(venue=>venueDetails(venue));
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
            // console.log(filterVenue)
            dispatch(changeFilteredVenueResults(filterVenue))
        }
    }

    const onQuery = (e) => {
        console.log(e.target.value)
        const query = e.target.value
        const filtered = venuesDetailsArray.filter(v=> v.name.toLowerCase().includes(query.toLowerCase()))
            // console.log(venuesDetailsArray.filter(v=> v.name.toLowerCase().includes(query.toLowerCase())))
        dispatch(changeFilteredVenueResults(filtered))
    }

    return (
        <>
        <Grid item xs={1}></Grid>
        <Grid item xs={10} style={{display: 'inline'}}>
            <Grid container>
                <Grid item xs={6}>
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
                </Grid>
            </Grid>
            {filteredVenueResults.map(v=>
                <VenueItem key={v.id} venue={v}/>
            )}
        </Grid>
        </>
        
    );
}
    
export default VenueList;