import { Switch, Route } from "react-router-dom";
import MainPage from './Homepage/MainPage';
import Profile from './Profile/Profile';
import Results from './Results/Results';
import Account from './Account';
import Login from './Homepage/Login';
import SignUp from './Homepage/SignUp';
import Randomize from './Results/Randomize';
import VenuesMapContainer from './Maps/VenuesMapContainer';
import {useSelector} from 'react-redux';

import Grid from '@material-ui/core/Grid';

function Content() {
    const classes = useSelector(state => state.classes);

    return (
        <div>
            <Grid container className={classes.contentContainer}>
                <Switch>
                    <Route exact path="/">
                        <MainPage />
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
                    <Route path="/randomize">
                        <Randomize />
                    </Route>
                    <Route path="/map">
                        <VenuesMapContainer />
                    </Route>
                </Switch>
            </Grid>
        </div>
    );
}
    
export default Content;