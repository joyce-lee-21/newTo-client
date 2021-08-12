import {useDispatch, useSelector} from 'react-redux';
import ProfileSelection from './ProfileSelection';
import ProfileView from './ProfileView';

function Profile() {
    const dispatch = useDispatch();

    return (
        <div>
            Profile component
        </div>
    );
}
    
export default Profile;