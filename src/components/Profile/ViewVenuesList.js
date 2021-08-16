import {useDispatch, useSelector} from 'react-redux';
import {changeUser} from '../../usersSlice';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'

import ViewVenueItem from './ViewVenueItem';

function ViewVenuesList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const savedVenuesArray = useSelector(state => state.savedVenuesArray);
    const [errors, setErrors] = useState([])

    return (
        <div>
            {savedVenuesArray.map(venue => 
                (<ViewVenueItem key={venue.id} venue={venue}/>)
            )}
        </div>
    );
}
    
export default ViewVenuesList;