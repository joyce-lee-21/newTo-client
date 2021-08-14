import {useDispatch, useSelector} from 'react-redux';
import {changeUser} from '../../usersSlice';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'

function ViewVenueItem() {
    const dispatch = useDispatch();
    const history = useHistory();
    const usernameInput = useSelector(state => state.usernameInput);
    const passwordInput = useSelector(state => state.passwordInput);
    const [errors, setErrors] = useState([])

    return (
        <div>
            ViewVenueItem component
            <div className="tile">
                {/* {cat.name} */}
                <button>Completed</button>
            </div>
        </div>
    );
}
    
export default ViewVenueItem;