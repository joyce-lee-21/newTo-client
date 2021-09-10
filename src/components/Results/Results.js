import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react'
import {changeVenuesResultsArray, changeMapCenter, changeVenuesDetailsArray} from '../../usersSlice';
import VenueList from './VenueList';

import Grid from '@material-ui/core/Grid';

function Results() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const categoryArray = useSelector(state => state.categoryArray);
    const citySelection = useSelector(state => state.citySelection);
    const venuesResultsArray = useSelector(state => state.venuesResultsArray);
    const venuesDetailsArray = useSelector(state => state.venuesDetailsArray);
    const client_id = useSelector(state => state.clientId);
    const client_secret = useSelector(state => state.clientSecret);
    const version = useSelector(state => state.version);
    const near = citySelection.city;
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (categoryArray.length >= 1) {
            venueFetch()
        }
    }, [])

    const venueFetch = async () => {
        // async function fsVenue(){
            // console.log(cat.fs_category_id)
            // const res = await fetch(`https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=${version}&near=${near}&limit=5&categoryId=${cat.fs_category_id}`, {
            //     method: "GET"
            // })
            // if(res.ok){
            //     const arr = await res.json()
            //     const vArr = arr.response.groups[0].items
            //     vArr.map(v=> venueArray.push(v.venue))
            //     // console.log(`formatted array from venue recommendations API: ${vArr}`)
            //     // console.log(venueArray)
            //     dispatch(changeVenuesResultsArray([...venueArray]))
            //     // console.log(venuesResultsArray)
            // } else {
            //     const err = await res.json()
            //     console.log(err.errors)
            // }
            // await Promise.all(categoryArray.map(cat => {
                // return fetch(`https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=${version}&near=${near}&limit=3&categoryId=${cat.fs_category_id}`)
                // .then(res => res.json())
                // .then(data => {
                //     const vArr = data.response.groups[0].items
                //     const mapCenter = data.response.geocode.center
                //     dispatch(changeMapCenter([mapCenter]))
                //     vArr.map(v=> venueArray.push(v.venue))
                //     // dispatch(changeVenuesResultsArray([...venueArray]))
                //     // console.log(venueArray)
                //     return venueArray
                // })
                // .then(venueArray => {
        // const catArray = async() => {
        //     selectedCategoryArray.forEach(cat => {
        //         const selection = {
        //             name: cat.name, 
        //             city_profile_id: citySelection.id,
        //             fs_category_id: cat.fs_category_id,
        //             primary_category_id: cat.primary_category_id
        //         }
        //         fetch(`http://localhost:3000/category_selections/`, {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             body: JSON.stringify({category_selection: selection}),
        //         })
        //         .then(res => res.json())
        //         .then(data => console.log(`category_selection added: ${data}`))
        //         .catch(error => console.log(error))
        //     })
        // };
        // const fsVenue = async() => {
            dispatch(changeVenuesResultsArray([]))
            const venueArray = [];
            categoryArray.forEach(cat => {
                fetch(`https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=${version}&near=${near}&limit=3&categoryId=${cat.fs_category_id}`)
                .then(res => res.json())
                .then(data => {
                    const vArr = data.response.groups[0].items
                    const mapCenter = data.response.geocode.center
                    dispatch(changeMapCenter([mapCenter]))
                    vArr.map(v=> venueArray.push(v.venue))
                    dispatch(changeVenuesResultsArray([...venueArray]))
                    // vArr.map(v=> console.log(v.venue))
                    console.log(venueArray)
                })
                .catch(error => console.log(error))
            })
        // };

        // await Promise.all(
        // const fsVenueDetails = async() => {
        //     const detailsArray = [];
        //     console.log(detailsArray)
        //     venuesResultsArray.map(venue => {
        //         // console.log(venue)
        //         // return fetch(`http://localhost:4000/venue_details/${venue.id}`)
        //         // *---PRODUCTION CHANGE:
        //             fetch(`https://api.foursquare.com/v2/venues/${venue.id}?client_id=${client_id}&client_secret=${client_secret}&v=${version}`) 
        //             // if(details.ok){
        //             //     const arr = details.json()
        //             //     const v = arr.response.venue
        //             //     detailsArray.push(v)
        //             //     detailsArray.sort((a, b) => {return b.rating - a.rating})
        //             //     // dispatch(changeVenuesDetailsArray([...detailsArray]))
        //             //     console.log(detailsArray)
        //             .then(res => res.json())
        //             .then(data => {
        //                 const v = data.response.venue
        //                 detailsArray.push(v)
        //                 detailsArray.sort((a, b) => {return b.rating - a.rating})
        //                 dispatch(changeVenuesDetailsArray([...detailsArray]))
        //                 console.log(detailsArray)
        //             })
        //     })
        // }
        // const fetches = [fsVenue, fsVenueDetails]
        // const fetches = [fsVenue]

        // for (const fn of fetches) {
        //     await fn()
        // }
                    
                    // await Promise.all(
                    // venuesResultsArray.map(venue => {
                    // console.log(venue)
                    // return fetch(`http://localhost:4000/venue_details/${venue.id}`)
                    // *---PRODUCTION CHANGE:
                        // fetch(`https://api.foursquare.com/v2/venues/${venue.id}?client_id=${client_id}&client_secret=${client_secret}&v=${version}`) 
                        // if(details.ok){
                        //     const arr = details.json()
                        //     const v = arr.response.venue
                        //     detailsArray.push(v)
                        //     detailsArray.sort((a, b) => {return b.rating - a.rating})
                        //     // dispatch(changeVenuesDetailsArray([...detailsArray]))
                        //     console.log(detailsArray)
                        // .then(res => console.log(res.json()))
                        // .then(data => {
                            // const detailsArray = [];
                        //     const v = data.response.venue
                        //     detailsArray.push(v)
                        //     detailsArray.sort((a, b) => {return b.rating - a.rating})
                        //     // dispatch(changeVenuesDetailsArray([...detailsArray]))
                        //     console.log(detailsArray)
                        // })
                    // })
                // })
            // }))
        // };
        // PRODUCTION CHANGE:
        // categoryArray.forEach(cat => fsVenue(cat))
        // fsVenue();
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