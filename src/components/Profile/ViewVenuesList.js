import {useDispatch, useSelector} from 'react-redux';
import {changeUser} from '../../usersSlice';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'

import ViewVenueItem from './ViewVenueItem';

function ViewVenuesList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const usernameInput = useSelector(state => state.usernameInput);
    const [errors, setErrors] = useState([])

    return (
        <div>
            {/* {categoryArray.map(cat => (
                <ViewVenueItem />
            ))} */}
        </div>
    );
}
    
export default ViewVenuesList;