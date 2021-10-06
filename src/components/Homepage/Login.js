import {useDispatch, useSelector} from 'react-redux';
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
    changeCompletedVenuesArray
} from '../../usersSlice';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const HeaderButton = withStyles({
    root: {
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 14,
      padding: '6px 15px',
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

const useStyles = makeStyles({
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
});

function Login() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const usernameInput = useSelector(state => state.usernameInput);
    const passwordInput = useSelector(state => state.passwordInput);
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();
        async function login(){ 
            const res = await fetch("https://newto-backend.herokuapp.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({                       
                    username: usernameInput, 
                    password: passwordInput 
                    }),
            })
            if(res.ok){
                const result = await res.json()
                const user = result.user
                dispatch(changeUser(user))
                dispatch(changeIsLoggedIn(true))
                if (user.cities.length === 1) {
                    dispatch(changeCitySelection(user.city_profiles[0]))
                    dispatch(changeCategoryArray(user.category_selections[0]))
                    dispatch(changeSavedVenuesArray(user.venue_selections[0].filter(v=> v.is_completed !== true)))
                    dispatch(changeCompletedVenuesArray(user.venue_selections[0].filter(v=> v.is_completed === true)))
                    dispatch(changeNameInput(user.name))
                    dispatch(changeUsernameInput(user.username))
                    dispatch(changeCityProfiles(user.city_profiles))
                }
                else {
                    dispatch(changeCategoryArray(user.category_selections))
                    dispatch(changeSavedVenuesArray(user.venue_selections))
                    dispatch(changeNameInput(user.name))
                    dispatch(changeUsernameInput(user.username))
                    dispatch(changeCityProfiles(user.city_profiles))
                }
                localStorage.setItem("token", result.jwt)
                history.push('/profile')
            } else {
                const err = await res.json()
                setErrors(err.failure)
            }
        }
        login();
    }

    return (
        <Grid container 
            className={classes.login}
        >
            <Grid item xs={10} className={classes.loginBox}>
                <h1>Login</h1>
                {errors ? (<p style={{color: 'red'}}>{`${errors}`}</p>) : null}
                <form onSubmit={handleSubmit}>
                    <TextField 
                        label="Username" 
                        variant="outlined" 
                        style={{marginBottom: '30px', backgroundColor: 'white', borderRadius: '5px', width: '80%'}} 
                        onChange={(e)=>dispatch(changeUsernameInput(e.target.value))}
                    />
                    <TextField 
                        label="Password" 
                        type="password"
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
            </Grid>
        </Grid>
    );
}
    
export default Login;