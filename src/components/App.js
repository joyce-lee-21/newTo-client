import '../App.css';
import { 
  BrowserRouter as Router
} from "react-router-dom";
import Header from './Header';
import Content from './Content';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  changeUsernameInput, 
  changeNameInput, 
  changeUser, 
  changeCitySelection, 
  changeCategoryArray, 
  changeSavedVenuesArray, 
  changeIsLoggedIn, 
  changeCityProfiles, 
  changeCompletedVenuesArray,
} from '../usersSlice';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Work Sans', 
      'sans-serif'
    ].join(','),
  },});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      fetch("http://localhost:3000/auto_login", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(r => r.json())
      .then(user => {
        dispatch(changeUser(user))
        dispatch(changeIsLoggedIn(true))
        if (user.cities.length === 1) {
          dispatch(changeCitySelection(user.city_profiles[0]))
          dispatch(changeCategoryArray(user.category_selections[0]))
          dispatch(changeSavedVenuesArray(user.venue_selections[0].filter(v=> v.is_completed !== true)))
          dispatch(changeCompletedVenuesArray(user.venue_selections[0].filter(v=> v.is_completed === true)))
          dispatch(changeNameInput(user.name))
          dispatch(changeUsernameInput(user.username))
          dispatch(changeCityProfiles(user.city_profiles[0]))
        }
        else {
          dispatch(changeCategoryArray(user.category_selections))
          dispatch(changeSavedVenuesArray(user.venue_selections))
          dispatch(changeNameInput(user.name))
          dispatch(changeUsernameInput(user.username))
          dispatch(changeCityProfiles(user.city_profiles))
        }
      });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <Router>
          <Grid container>
            <Typography>
              <Header />
              <Content />
            </Typography>
          </Grid>
        </Router>
      </div>
    </ThemeProvider>
    
  );
}

export default App; 