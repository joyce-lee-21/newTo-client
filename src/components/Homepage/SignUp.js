import {useDispatch, useSelector} from 'react-redux';
import {changePasswordInput, changeUsernameInput, changeCityInput, changeNameInput, changeUser, changeCitySelection, changeCityProfiles} from '../../usersSlice';
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
      marginTop: '20px',
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
    signupButton: {
        marginBottom: '20px',
    },
    textFields: {
        marginBottom: '30px', 
        backgroundColor: 'white', 
        borderRadius: '5px', 
        width: '80%',
    }
});

function SignUp() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const usernameInput = useSelector(state => state.usernameInput);
    const passwordInput = useSelector(state => state.passwordInput);
    const nameInput = useSelector(state => state.nameInput);
    const cityInput = useSelector(state => state.cityInput);
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        async function signup(){
            const res = await fetch("https://newto-backend.herokuapp.com/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ 
                    name: nameInput, 
                    city: cityInput,                         
                    username: usernameInput, 
                    password: passwordInput 
                    }),
            })
            if(res.ok){
                const result = await res.json()
                const user = result.user
                dispatch(changeUser(user))
                dispatch(changeCitySelection(user.city_profiles[0]))
                dispatch(changeNameInput(user.name))
                dispatch(changeUsernameInput(user.username))
                dispatch(changeCityProfiles(user.city_profiles))
                localStorage.setItem("token", result.jwt)
                history.push('/profile')
            } else {
                const err = await res.json()
                setErrors(err.errors)
            }
        }
        signup();
    }

    return (
        <Grid container 
            className={classes.login}
        >
            <Grid item xs={10}>
                <h1>Sign Up</h1>
                {errors ? errors.map(error => (<p style={{color: 'red'}}>{`${error}`}</p>)) : null}
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <TextField 
                        label="Name" 
                        variant="outlined" 
                        className={classes.textFields}
                        onChange={(e)=>dispatch(changeNameInput(e.target.value))}
                    />
                    <TextField 
                        label="City" 
                        variant="outlined" 
                        className={classes.textFields}
                        onChange={(e)=>dispatch(changeCityInput(e.target.value))}
                    />
                    <TextField 
                        label="Username" 
                        variant="outlined" 
                        className={classes.textFields}
                        onChange={(e)=>dispatch(changeUsernameInput(e.target.value))}
                    />
                    <TextField 
                        type="password"
                        label="Password" 
                        variant="outlined" 
                        className={classes.textFields}
                        style={{marginBottom: '0px'}}
                        onChange={(e)=>dispatch(changePasswordInput(e.target.value))}
                    />
                    <br></br>
                    <HeaderButton 
                        type="submit" 
                        variant="outlined" 
                        className={classes.signupButton}
                    >
                        SIGN UP
                    </HeaderButton>
                </form>
            </Grid>
        </Grid>
    );
}
    
export default SignUp;