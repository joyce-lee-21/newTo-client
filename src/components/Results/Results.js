import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react'
import {changeVenuesResultsArray} from '../../usersSlice';
import VenueList from './VenueList';

function Results() {
    const dispatch = useDispatch();
    const categoryArray = useSelector(state => state.categoryArray);
    const citySelection = useSelector(state => state.citySelection);
    const venuesResultsArray = useSelector(state => state.venuesResultsArray);
    const [errors, setErrors] = useState([]);

    const client_id = "TMPN4FQH3UGB0NX5JBBA0B4WBWRYMK51MTOO0YN10JDLDKDQ";
    const client_secret = "FXBLX5RUDZGZC34FNOVMNJTIMTLPTOIAINUO3FYUQNEQKGLN";
    const version = "20210801";
    const near = citySelection.city;


    useEffect(() => {
        async function venueResults(cat){
            const res = await fetch(
                `https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=${version}&near=${near}&limit=5&categoryId=${cat.fs_category_id}`, 
                {method: "GET",}
            )
            if(res.ok){
                const arr = await res.json()
                console.log(arr.response.groups[0].items)
                 dispatch(changeVenuesResultsArray(arr.response.groups[0].items)) 
            } else {
                const err = await res.json()
                // console.log(err.errors)
                setErrors(err.errors)
            }
        };
        venueResults(categoryArray[0]);
        // categoryArray.forEach(cat=>venueResults(cat))
    }, [])

    return (
        <div>
            <VenueList venuesResultsArray={venuesResultsArray}/>
        </div>
    );
}
    
export default Results;