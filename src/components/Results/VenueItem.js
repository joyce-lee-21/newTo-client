import {useDispatch, useSelector} from 'react-redux';
import {changeSavedVenuesArray} from '../../usersSlice';

function VenueItem({venue}) {
    const dispatch = useDispatch();
    const savedVenuesArray = useSelector(state => state.savedVenuesArray);
    const citySelection = useSelector(state => state.citySelection);

    const onHeart = (e, venue) => {
        const v = {
            city_profile_id: citySelection.id,
            name: venue.name,
            address: venue.location.address,
            // url: venue.url,
            // rating: venue.rating,
            fs_venue_id: venue.id,
            lat: venue.location.lat,
            long: venue.location.lng,
            category: venue.categories[0].name
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
                console.log(venue)
                dispatch(changeSavedVenuesArray([...savedVenuesArray, {
                    id: venue.id,
                    city_profile_id: venue.city_profile_id,
                    name: venue.name,
                    address: venue.address,
                    // url: venue.url,
                    // rating: venue.rating,
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
        <div className="venue-tile">
            <h5>{venue.name}</h5>
            {/* <p>{venue.rating}</p> */}
            <p>{venue.location.address}</p>
            {/* <p>{venue.url}</p> */}
            <button onClick={(e)=>onHeart(e, venue)}>Heart Icon</button>
        </div>
    );
}
    
export default VenueItem;