import {useDispatch, useSelector} from 'react-redux';
// import {useEffect} from 'react';
import MainPage from './MainPage';
import Login from './Login';
import SignUp from './SignUp';

function HomePage() {
    // const dispatch = useDispatch();
    const hp_view = useSelector((state) => state.hp_view);

    return (
        <div>
            <MainPage />
        </div>
    );
}
    
export default HomePage;