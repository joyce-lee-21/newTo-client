import {useDispatch, useSelector} from 'react-redux';
import MainPage from './MainPage';
import Login from './Login';
import SignUp from './SignUp';

function HomePage() {
    const dispatch = useDispatch();

    return (
        <div>
            Homepage component
            <MainPage />
        </div>
    );
}
    
export default HomePage;