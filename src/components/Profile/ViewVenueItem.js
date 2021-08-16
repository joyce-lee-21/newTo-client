import {useDispatch, useSelector} from 'react-redux';
import {changeSavedVenuesArray} from '../../usersSlice';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'

function ViewVenueItem({venue}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const savedVenuesArray = useSelector(state => state.savedVenuesArray);
    const [errors, setErrors] = useState([])

    // console.log(venue === [] ? `${venue.id}: this is true` : `${venue.id}: this is false`)

    const onCompleted = (e, venue) => {
        dispatch(changeSavedVenuesArray(savedVenuesArray.filter(v=>v.id !== venue.id)))
        fetch(`http://localhost:3000/saved_venues/${venue.id}`, { 
            method: "DELETE" 
        })
        // .then((r) => console.log(r))
    }

    return (
        <div>
            {/* ViewVenueItem component */}
            <div className="venue-tile">
                <h5>{venue.name}</h5>
                <p>{venue.rating}</p>
                <p>{venue.address}</p>
                <p>{venue.url}</p>
                <button onClick={(e)=>onCompleted(e, venue)}>Completed</button>
            </div>
        </div>
    );
}
    
export default ViewVenueItem;