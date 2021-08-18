import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {changeVenuesDetailsArray, changeFilteredVenueResults} from '../../usersSlice';

import VenueItem from './VenueItem';

import Grid from '@material-ui/core/Grid';

function VenueList({venuesResultsArray}) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);

    const client_id = useSelector(state => state.clientId);
    const client_secret = useSelector(state => state.clientSecret);
    const version = useSelector(state => state.version);
    const venuesDetailsArray = useSelector(state => state.venuesDetailsArray);
    const filteredVenueResults = useSelector(state => state.filteredVenueResults);
    const categoryArray = useSelector(state => state.categoryArray);
    const user = useSelector(state => state.user);

    // console.log(venuesResultsArray)

  

    // grab fs_venue_ids from resultsArray
    useEffect(() => {
        detailsFetch();
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
            const v = arr.response.response.venue
            // *---PRODUCTION CHANGE:
            // const v = arr.response.venue
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
    // const onCategoryFilter = (e) => {
    //     console.log(e.target.value)
    //     if (e.target.value !== "") {
    //         // const filtered = venuesDetailsArray.filter(v=> v.categories[0] === e.target.value)
    //         console.log(venuesDetailsArray.filter(v=> v.categories[0].name === e.target.value))
    // //      dispatch(changeFilteredVenueResults(filtered))
    //     }
    // }

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
        <Grid item xs={10}>
            <h5>Search by Name:</h5>
            <input type="text" label="Search" onChange={(e)=>onQuery(e)}></input>
            {/* STRETCH GOAL AFTER SECONDARY CATEGORIES BROUGHT IN */}
            {/* <select id="category" name="category" onChange={(e)=>onCategoryFilter(e)}>
                <option value="">All</option>
                {categoryArray.map(cat=> 
                    (<option key={`${cat.id}`} value={`${cat.name}`}>{cat.name}</option>)
                )}
            </select> */}
            {filteredVenueResults.map(v=>
                <VenueItem key={v.id} venue={v}/>
                // <VenueItem key={v.venue.id} venue={v.venue}/>
            )}
        </Grid>
        </>
    );
}
    
export default VenueList;