import {useDispatch, useSelector} from 'react-redux';
// ***---V2 CODE---***
// import {changePasswordInput, changeUsernameInput, changeUser, changeIsLoggedIn, changeCitySelection, changeCategoryArray, changeSavedVenuesArray} from '../../usersSlice';
// ***---V1 CODE---***
import {changePasswordInput, changeUsernameInput, changeNameInput, changeUser, changeCitySelection, changeCategoryArray, changeSavedVenuesArray, changeIsLoggedIn, changeCityProfiles} from '../../usersSlice';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const HeaderButton = withStyles({
    root: {
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 14,
      padding: '6px 15px',
    //   marginTop: '20px',
      border: '1px solid',
      lineHeight: 1.5,
      backgroundColor: 'white',
      borderColor: 'gray',
      '&:hover': {
        backgroundColor: '#9fcbb4',
        borderColor: '#9fcbb4',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#9fcbb4',
        borderColor: '#9fcbb4',
      },
      '&:focused': {
        boxShadow: '0 0 0 0.2rem #9fcbb4',
      },
    },
  })(Button);

function Login() {
    const dispatch = useDispatch();
    const classes = useSelector(state => state.classes);
    const history = useHistory();
    const usernameInput = useSelector(state => state.usernameInput);
    const passwordInput = useSelector(state => state.passwordInput);
    const [errors, setErrors] = useState([])



    // ***---V2 CODE---***
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     async function login(){
    //         const res = await fetch("http://localhost:3000/login", {
    //             method: "POST",
    //             credentials: "include",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 user: {
    //                     username: usernameInput, 
    //                     password: passwordInput 
    //                 }
    //             })
    //         })
    //         if(res.ok){
    //             // set user to state
    //             const user = await res.json()
    //             dispatch(changeUser({
    //                 id: user.user.id,
    //                 name: user.user.name,
    //                 username: user.user.username,
    //                 cities: user.cities,
    //                 category_selections: user.category_selections,
    //                 venue_selections: user.venue_selections,
    //                 city_profiles: user.city_profiles
    //             }))
    //             dispatch(changeIsLoggedIn(true))
    //             // console.log(user) 
    //             // set city selection if user only has 1 city profile
    //             if (user.cities.length === 1) {
    //                 dispatch(changeCitySelection(user.cities[0]))
    //                 dispatch(changeCategoryArray(user.category_selections))
    //                 dispatch(changeSavedVenuesArray(user.venue_selections))
    //             }
    //             else {
    //                 dispatch(changeCategoryArray(user.category_selections))
    //                 dispatch(changeSavedVenuesArray(user.venue_selections))
    //             }
    //             history.push('/profile')
    //         } else {
    //             const err = await res.json()
    //             // console.log(err.errors)
    //             setErrors(err.errors)
    //         }
    //     };
    //     login()
    // }

    // ***---V1 CODE---***
    
    const handleSubmit = (e) => {
        e.preventDefault();
        async function login(){
            const res = await fetch("http://localhost:3000/login", {
                method: "POST",
                // credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    username: usernameInput, 
                    password: passwordInput 
                    }),
            })
            if(res.ok){
                const user = await res.json()
                // set user to state
                dispatch(changeUser(user))
                dispatch(changeIsLoggedIn(true))
                // set city selection if user only has 1 city profile
                if (user.cities.length === 1) {
                    dispatch(changeCitySelection(user.city_profiles[0]))
                    dispatch(changeCategoryArray(user.category_selections[0]))
                    dispatch(changeSavedVenuesArray(user.venue_selections[0]))
                    dispatch(changeNameInput(user.name))
                    dispatch(changeUsernameInput(user.username))
                    // may not be necessary if user only has 1 city profile:
                    dispatch(changeCityProfiles(user.city_profiles))
                }
                else {
                    dispatch(changeCategoryArray(user.category_selections))
                    dispatch(changeSavedVenuesArray(user.venue_selections))
                    dispatch(changeNameInput(user.name))
                    dispatch(changeUsernameInput(user.username))
                    dispatch(changeCityProfiles(user.city_profiles))
                }
                history.push('/profile')
            } else {
                const err = await res.json()
                // console.log(err.errors)
                setErrors(err.errors)
            }
        };
        login()
    }

    return (
        <Grid container 
            className={classes.login}
        >
            <Grid item xs={10} className={classes.loginBox}>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    {/* <p>Username</p> */}
                    {/* <input 
                        type="text" 
                        name="username" 
                        onChange={(e)=>dispatch(changeUsernameInput(e.target.value))}
                    ></input> */}
                    <TextField 
                        id="outlined-basic" 
                        label="Username" 
                        variant="outlined" 
                        style={{marginBottom: '30px', backgroundColor: 'white', borderRadius: '5px', width: '80%'}} 
                        onChange={(e)=>dispatch(changeUsernameInput(e.target.value))}
                    />
                    {/* <p>Password</p> */}
                    {/* <input 
                        type="text" 
                        name="password" 
                        onChange={(e)=>dispatch(changePasswordInput(e.target.value))}
                    ></input> */}
                    <TextField 
                        id="outlined-basic" 
                        label="Password" 
                        variant="outlined" 
                        style={{marginBottom: '30px', backgroundColor: 'white', borderRadius: '5px', width: '80%'}} 
                        onChange={(e)=>dispatch(changePasswordInput(e.target.value))}
                    />
                    <br></br>
                    <HeaderButton 
                        type="submit" 
                        variant="outlined" 
                        onClick={()=>history.push("/login")}
                    >
                        SIGN IN
                    </HeaderButton>
                </form>
                {errors ? errors.map(error => (<p>{`${error}`}</p>)) : null}
            </Grid>
        </Grid>
    );
}
    
export default Login;