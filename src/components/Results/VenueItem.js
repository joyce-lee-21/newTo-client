import {useDispatch, useSelector} from 'react-redux';

function VenueItem({venue}) {
    const dispatch = useDispatch();

    console.log(venue)

    const onHeart = (e, venue) => {
        // console.log(v)
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