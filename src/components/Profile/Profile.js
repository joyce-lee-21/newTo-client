import {useDispatch, useSelector} from 'react-redux';
import {changeCitySelection, changeCategoryArray} from '../../usersSlice';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'

import ProfileSelection from './ProfileSelection';
import ProfileView from './ProfileView';
import ProfileCity from './ProfileCity';

function Profile() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.user);
    const citySelection = useSelector(state => state.citySelection);
    const categoryArray = useSelector(state => state.categoryArray);
    const [errors, setErrors] = useState([])

    // console.log(categoryArray.length === 0 ? "category array is empty" : "category array has something")

    
    return (
        <div>
            {/* if there are more than one city, and a citySelection === "" */}
            {user.city_profiles.length > 1 && citySelection === ""
                ? <ProfileCity />
                // since all category_selections under each user instance has empty arrays, we have to go into the first array and see if there are any categories selected. categoryArray is declared at the Login component after signing in
                : categoryArray[0].length === 0
                    ? <ProfileSelection />
                    : <ProfileView />
            }
        </div>
    );
}
    
export default Profile;