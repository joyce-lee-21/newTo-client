import {useDispatch, useSelector} from 'react-redux';
import { 
    Switch, 
    Route
  } from "react-router-dom";
import MainPage from './MainPage';
import Login from './Login';
import SignUp from './SignUp';

function HomePage() {
    const dispatch = useDispatch();

    return (
        <div>
            <MainPage />
        </div>
    );
}
    
export default HomePage;