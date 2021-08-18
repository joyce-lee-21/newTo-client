import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react'
import {changeVenuesResultsArray} from '../../usersSlice';
import VenueList from './VenueList';

import Grid from '@material-ui/core/Grid';

function Results() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);

    const categoryArray = useSelector(state => state.categoryArray);
    const citySelection = useSelector(state => state.citySelection);
    const venuesResultsArray = useSelector(state => state.venuesResultsArray);
    const client_id = useSelector(state => state.clientId);
    const client_secret = useSelector(state => state.clientSecret);
    const version = useSelector(state => state.version);
    const near = citySelection.city;
    const user = useSelector(state => state.user);

    const venueArray = [];


    useEffect(() => {
        if (categoryArray.length >= 1) {
            return venueFetch()
        } else {
            return null
        }
    }, [user.category_selections])

    const venueFetch = () => {
        async function fsVenue(cat){
            // console.log(cat.fs_category_id)
            const res = await fetch(`https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=${version}&near=${near}&limit=5&categoryId=${cat.fs_category_id}`, {
                method: "GET"
            })
            if(res.ok){
                const arr = await res.json()
                const vArr = arr.response.groups[0].items
                vArr.map(v=> venueArray.push(v.venue))
                // console.log(`formatted array from venue recommendations API: ${vArr}`)
                dispatch(changeVenuesResultsArray(venueArray))
            } else {
                const err = await res.json()
                console.log(err.errors)
            }
        };
        // limiting category to one, change to categoryArray after fetches work:
        fsVenue(categoryArray[0])
        // console.log(categoryArray[0])
        // categoryArray.forEach(cat => fsVenue(cat))
    }

    return (
        <Grid container>
            {venuesResultsArray.length >= 1
                ? (<VenueList venuesResultsArray={venuesResultsArray}/>)
                : null
            }
        </Grid>
    );
}
    
export default Results;