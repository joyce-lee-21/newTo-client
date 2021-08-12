import {useDispatch, useSelector} from 'react-redux';
import HomePage from './Homepage/HomePage';
import Profile from './Profile/Profile';
import Results from './Results/Results';
import Account from './Account';

function Content() {
    const dispatch = useDispatch();

    return (
        <div>
            Content component
            <HomePage />
        </div>
    );
}
    
export default Content;