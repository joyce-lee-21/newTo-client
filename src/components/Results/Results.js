import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react'
import {changeVenuesResultsArray} from '../../usersSlice';
import VenueList from './VenueList';

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

    // console.log(venuesResultsArray.length >= 1 ? "venue results array >= 1" : "venue results array = 0")
    // console.log(categoryArray)

    // useEffect(() => {
    //     async function venueResults(cat){
    //         console.log(cat)
    //         const res = await fetch(
    //             `https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=${version}&near=${near}&limit=5&categoryId=${cat.fs_category_id}`, 
    //             {method: "GET"}
    //         )
    //         if(res.ok){
    //             const arr = await res.json()
    //             // console.log(arr.response.groups[0].items)
    //             dispatch(changeVenuesResultsArray([...venuesResultsArray, ...arr.response.groups[0].items])) 
    //         } else {
    //             const err = await res.json()
    //             // console.log(err.errors)
    //             setErrors(err.errors)
    //         }
    //     };
    //     // venueResults();
    //     categoryArray.forEach(cat=>venueResults(cat))
    // }, [])

    // const venueFetch = await Promise.all(
    //     categoryArray.map
    // )

    const venueArray = [];

    useEffect(() => {
        venueFetch();
    }, [])

    const venueFetch = () => {
        async function fsVenue(cat){
            const res = await fetch(`https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=${version}&near=${near}&limit=5&categoryId=${cat.fs_category_id}`, {
                method: "GET"
            })
            if(res.ok){
                const arr = await res.json()
                const vArr = arr.response.groups[0].items
                vArr.map(v=> venueArray.push(v))
                // console.log(venueArray)
                dispatch(changeVenuesResultsArray([...venuesResultsArray, ...venueArray]))
            } else {
                const err = await res.json()
                console.log(err.errors)
            }
        };
        categoryArray.forEach(cat => fsVenue(cat))
    }

    return (
        <div>
            {venuesResultsArray.length >= 1
                ? (<VenueList venuesResultsArray={venuesResultsArray}/>)
                : null
            }
        </div>
    );
}
    
export default Results;