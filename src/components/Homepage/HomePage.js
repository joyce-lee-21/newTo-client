import {useDispatch, useSelector} from 'react-redux';
import MainPage from './MainPage';
import Login from './Login';
import SignUp from './SignUp';

function HomePage() {

    return (
        <div>
            <MainPage />
        </div>
    );
}
    
export default HomePage;