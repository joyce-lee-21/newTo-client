import '../App.css';
import { 
  BrowserRouter as Router
} from "react-router-dom";
import Header from './Header';
import Content from './Content';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// ***---V2 CODE---***
// import {changeUser, changeIsLoggedIn} from '.././usersSlice';

// ***---V1 CODE---***
import {
  changeUser, 
  changeCitySelection, 
  changeCategoryArray, 
  changeSavedVenuesArray, 
  changeIsLoggedIn,
  changeCityProfiles,
  changeClasses,
} from '../usersSlice';

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
  },
  logo: {
    marginLeft: '20px',
  },
  contentContainer: {
    minHeight: '40vh',
    minWidth: '100vw',
    marginTop: '50px',
    alignItems: "center",
    textAlign: 'center',
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
  accountBoxes: {
    alignItems: "center",
    textAlign: 'center',
    border: '1px solid black',
    borderRadius: '5px',
    marginLeft: '10px',
    marginRight: '10px'
  },
  viewCategoryContainer: {
    alignItems: "center",
    minHeight: '20vh',
    // textAlign: 'center',
    // justify: "center",
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
  resultsList: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
    flexDirection: 'row',
    // margin: '5px',
    // padding: '5px',
    height: '150px',
    borderBottom: '1px black dotted',
    backgroundColor: '#fcf3d3',
  },
  results2List: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
    textAlign: 'center',
    flexDirection: 'column',
  },
  square: {
    backgroundColor: '#68166c',
    borderRadius: '5px',
  }
}));


function App() {
  const dispatch = useDispatch();
  const classes = useStyles();

  dispatch(changeClasses(classes))

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

  // ***---CODE FOR SESSION NOT PERSISTING (V1) ---***
  useEffect(() => {
    fetch("http://localhost:3000/me", {
      method: "GET",
      credentials: "include"
    })
    .then((r) => {
      if (r.ok) {
        r.json()
        .then((user) => {
          // console.log('App useEffect fetch:', user)
          dispatch(changeUser(user))
          dispatch(changeIsLoggedIn(true))
          if (user.cities.length === 1) {
            dispatch(changeCitySelection(user.cities[0]))
            dispatch(changeCategoryArray(user.category_selections))
            dispatch(changeSavedVenuesArray(user.venue_selections))
            dispatch(changeCityProfiles(user.city_profiles))
          }
          else {
              dispatch(changeCategoryArray(user.category_selections))
              dispatch(changeSavedVenuesArray(user.venue_selections))
              dispatch(changeCityProfiles(user.city_profiles))
          }
        });
      }
    })
  }, []);

  return (
    <div className="app-container">
      <Router>
        <Grid container>
          <Header />
          <Content />
        </Grid>
      </Router>
    </div>
    
  );
}

export default App; 
// (){
//   <Provider store={store}>
//     <App/>
//   </Provider>
// }
