import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react'
import {changeVenuesResultsArray, changeMapCenter, changeVenuesDetailsArray} from '../../usersSlice';
import VenueList from './VenueList';

import Grid from '@material-ui/core/Grid';

function Results() {
    const dispatch = useDispatch();
    const categoryArray = useSelector(state => state.categoryArray);
    const citySelection = useSelector(state => state.citySelection);
    const venuesResultsArray = useSelector(state => state.venuesResultsArray);
    const client_id = useSelector(state => state.clientId);
    const client_secret = useSelector(state => state.clientSecret);
    const version = useSelector(state => state.version);
    const near = citySelection.city;

    useEffect(() => {
        if (categoryArray.length >= 1) {
            venueFetch()
        }
    }, [])

    const venueFetch = async () => {
        dispatch(changeVenuesResultsArray([]))
        const venueArray = [];
        categoryArray.forEach(cat => {
            fetch(`https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=${version}&near=${near}&limit=3&categoryId=${cat.fs_category_id}`)
            .then(res => res.json())
            .then(data => {
                const vArr = data.response.groups[0].items
                const mapCenter = data.response.geocode.center
                dispatch(changeMapCenter([mapCenter]))
                vArr.map(v => venueArray.push(v.venue))
                dispatch(changeVenuesResultsArray([...venueArray]))
                console.log(venueArray)
            })
            .catch(error => console.log(error))
        })
    }

    return (
        <Grid container>
            {venuesResultsArray.length >= 1
                ? (<VenueList />)
                : null
            }
        </Grid>
    );
}
    
export default Results;