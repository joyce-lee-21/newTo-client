import '../App.css';
import { 
  BrowserRouter as Router
} from "react-router-dom";
import Header from './Header';
import Content from './Content';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// ***---V2 CODE---***
// import {changeUser, changeIsLoggedIn} from '.././usersSlice';

// ***---V1 CODE---***
import {
  changePasswordInput, 
  changeUsernameInput, 
  changeNameInput, 
  changeUser, 
  changeCitySelection, 
  changeCategoryArray, 
  changeSavedVenuesArray, 
  changeIsLoggedIn, 
  changeCityProfiles, 
  changeCompletedVenuesArray,
  changeClasses,
} from '../usersSlice';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Work Sans', 
      'sans-serif'
    ].join(','),
  },});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  headerMargin: {
    marginTop: '5px',
    marginRight: '30px',
    width: '120px',
  },
  navbar: {
    // flexGrow: 1,
    backgroundColor: 'white',
    position: "fixed",
    width: "100%",
    height: '60px',
    paddingTop: '5px',
    zIndex: 1000,
  },
  logo: {
    marginLeft: '20px',
    textTransform: 'capitalize',
    margin: '5px',
  },
  contentContainer: {
    minHeight: '50vh',
    minWidth: '100vw',
    alignItems: "center",
    textAlign: 'center',
    marginTop: '100px',
  },
  mainPageButtons: {
    margin: '20px',
  },
  mainpage: {
    textAlign: 'center',
  },
  login: {
    flexDirection: 'column',
    alignItems: "center",
    justify: "center",
    marginLeft: '30vw',
    border: '1px solid black',
    borderRadius: '5px',
    width: '40vw',
    backgroundColor: '#9fcbb4',
  },
  loginBox:{
    padding: '40px',
    paddingTop: '0',
  },
  signupButton: {
    // marginTop: '20px',
    marginBottom: '20px',
  },
  addCity: {
    width: '50%',
    paddingBottom: '20px',
  },
  accountBoxes: {
    alignItems: "center",
    textAlign: 'center',
    border: '1px solid black',
    borderRadius: '5px',
    marginLeft: '10px',
    marginRight: '10px',
    backgroundColor: 'white',
  },
  viewCategoryContainer: {
    alignItems: "center",
    minHeight: '30vh',
  },
  categoryView: {
    height: '70px',
    width: '100%',
    justify: 'center',
    alignItems: "center",
    textAlign: 'center',
    marginLeft: '10px',
    marginRight: '10px',
    backgroundColor: '#fcf3d3',
  },
  venueView: {
    width: 300,
    height: 160,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '5px',
  },
  venueList: {
    justifyContent: 'center'
  },
  savedCatArray: {
    justifyContent: 'center'
  },
  formControl: {
    minWidth: 300,
  },
}));

function App() {
  const dispatch = useDispatch();
  const classes = useStyles();

  dispatch(changeClasses(classes))

  // ***---CODE FOR SESSION PERSIST SOLUTION W/ JWT (V4)---***

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
        // console.log('App useEffect fetch:', user)
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

  // ***---CODE FOR WIP SESSION PERSIST SOLUTION (V2)---***

  // const isLoggedIn = useSelector(state => state.isLoggedIn);

  // const handleLogin = (data) => {
  //   dispatch(changeIsLoggedIn(true))
  //   dispatch(changeUser(data.user))
  // }

  // const handleLogout = () => {
  //   dispatch(changeIsLoggedIn(false))
  //   dispatch(changeUser(null))
  // }

  // useEffect(() => {
  //   loginStatus();
  // }, []);

  // const loginStatus = () => {
  //   fetch("http://localhost:3000/logged_in", {
  //     method: "GET",
  //     credentials: "include"
  //   })
  //   .then((r) => r.json())
  //   .then(data=> {
  //     // console.log(data)
  //     if (data.logged_in) {
  //       handleLogin(data)
  //     } else {
  //       handleLogout()
  //     }
  //   })
  // }

  // ***---CODE FOR SESSION NOT PERSISTING (V1/V3) ---***

  // useEffect(() => {
  //   // console.log(localStorage.token)
  //   if (localStorage.token) {
  //     fetch("http://localhost:3000/me", {
  //       method: "GET",
  //       // credentials: "include"
  //       headers: {
  //         "Content-Type": "application/json",
  //         // "Authorization": `Bearer ${localStorage.token}` -- V3
  //         "Authorization": `Bearer ${jwt-token}`
  //       }
  //     })
  //     .then((r) => {
  //       if (r.ok) {
  //         r.json()
  //         .then((user) => {
  //           // console.log('App useEffect fetch:', user)
  //           dispatch(changeUser(user))
  //           dispatch(changeIsLoggedIn(true))
  //           if (user.cities.length === 1) {
  //             dispatch(changeCitySelection(user.cities[0]))
  //             dispatch(changeCategoryArray(user.category_selections))
  //             dispatch(changeSavedVenuesArray(user.venue_selections))
  //             dispatch(changeCityProfiles(user.city_profiles))
  //           }
  //           else {
  //               dispatch(changeCategoryArray(user.category_selections))
  //               dispatch(changeSavedVenuesArray(user.venue_selections))
  //               dispatch(changeCityProfiles(user.city_profiles))
  //           }
  //         });
  //       }
  //     })
  //   }
  // }, []);

  // console.log(process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET)

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
// (){
//   <Provider store={store}>
//     <App/>
//   </Provider>
// }
