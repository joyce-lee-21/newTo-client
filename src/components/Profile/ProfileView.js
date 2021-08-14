import {useDispatch, useSelector} from 'react-redux';
import {changeProfileView} from '../../usersSlice';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'

import ViewVenuesList from './ViewVenuesList';
import ViewCategoryList from './ViewCategoryList';

function ProfileView() {
    const dispatch = useDispatch();
    const history = useHistory();
    const categoryArray = useSelector(state => state.categoryArray);
    const profileView = useSelector(state => state.profileView);
    const [errors, setErrors] = useState([])


    return (
        <div>
            <button onClick={()=>dispatch(changeProfileView("categories"))}>Categories</button>
            <button onClick={()=>dispatch(changeProfileView("venues"))}>Venues</button>
            {profileView === "categories"
                ? <ViewCategoryList />
                : <ViewVenuesList />
            }
        </div>
    );
}
    
export default ProfileView;