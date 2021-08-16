import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {changeVenuesDetailsArray} from '../../usersSlice';

import VenueItem from './VenueItem';

function VenueList({venuesResultsArray}) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);

    const client_id = useSelector(state => state.clientId);
    const client_secret = useSelector(state => state.clientSecret);
    const version = useSelector(state => state.version);
    const venuesDetailsArray = useSelector(state => state.venuesDetailsArray);

    // console.log(venuesResultsArray)
    // console.log(venuesResultsArray.join())

    // grab fs_venue_ids from resultsArray
    useEffect(() => {
        async function venueDetails(venue){
            console.log(venue.venue.id)
            const res = await fetch(
                `https://api.foursquare.com/v2/venues/${venue.venue.id}?client_id=${client_id}&client_secret=${client_secret}&v=${version}`, 
                {method: "GET",}
            )
            if(res.ok){
                const arr = await res.json()
                console.log(arr.response.venue)
                dispatch(changeVenuesDetailsArray([...venuesDetailsArray, arr.response.venue])) 
                // !! update VenueItem array source after successfully dispatching
            } else {
                const err = await res.json()
                console.log(err.errors)
                // setErrors(err.errors)
            }
        };
        // use this to test one venue detail fetch:
        venueDetails(venuesResultsArray[0]);
        // use this to fetch details for all venues in array:
        // venuesResultsArray.forEach(venue=>venueDetails(venue));
    }, [venuesResultsArray])

    return (
        <div>
            <button>Search bar and filter dropdown goes here</button>
            {venuesResultsArray.map(v=>
                <VenueItem key={v.venue.id} venue={v.venue}/>
            )}
        </div>
    );
}
    
export default VenueList;