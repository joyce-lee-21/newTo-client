import { Switch, Route } from "react-router-dom";
import MainPage from './Homepage/MainPage';
import Profile from './Profile/Profile';
import Results from './Results/Results';
import Account from './Account';
import Login from './Homepage/Login';
import SignUp from './Homepage/SignUp';
import Randomize from './Results/Randomize';
import VenuesMapContainer from './Maps/VenuesMapContainer';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    contentContainer: {
        minHeight: '50vh',
        minWidth: '100vw',
        alignItems: "center",
        textAlign: 'center',
        marginTop: '100px',
    }
});

function Content() {
    const classes = useStyles();

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