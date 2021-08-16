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
            // url: ,
            // rating: ,
            fs_venue_id: venue.id,
            lat: venue.location.lat,
            long: venue.location.lng,
            category: venue.categories[0].name
        }
        console.log(v)
        // dispatch(changeSavedVenuesArray([...savedVenuesArray, venue]))
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