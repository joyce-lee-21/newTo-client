import {useDispatch, useSelector} from 'react-redux';
import { 
    Switch, 
    Route
  } from "react-router-dom";
import HomePage from './Homepage/HomePage';
import Profile from './Profile/Profile';
import Results from './Results/Results';
import Account from './Account';
import Login from './Homepage/Login';
import SignUp from './Homepage/SignUp';

function Content() {
    const dispatch = useDispatch();

    return (
        <div className="content-container">
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/account">
                    <Account />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Route path="/results">
                    <Results />
                </Route>
            </Switch>
        </div>
    );
}
    
export default Content;