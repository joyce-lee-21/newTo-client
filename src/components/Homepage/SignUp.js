import {useDispatch, useSelector} from 'react-redux';
import {changePasswordInput, changeUsernameInput, changeCityInput, changeNameInput, changeUser, changeCitySelection, changeCityProfiles} from '../../usersSlice';
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

function SignUp() {
    const dispatch = useDispatch();
    const classes = useSelector(state => state.classes);
    const history = useHistory();
    const usernameInput = useSelector(state => state.usernameInput);
    const passwordInput = useSelector(state => state.passwordInput);
    const nameInput = useSelector(state => state.nameInput);
    const cityInput = useSelector(state => state.cityInput);
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(usernameInput, passwordInput, cityInput, nameInput)
        async function signup(){
            const res = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
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
                localStorage.token = result.token
                history.push('/profile')
            } else {
                const err = await res.json()
                console.log(err)
                console.log(errors)
                setErrors(err.error)
            }
        };
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
                    {/* <p>Name</p> */}
                    {/* <input type="text" name="name" onChange={(e)=>dispatch(changeNameInput(e.target.value))}></input> */}
                    <TextField 
                        // id="outlined-basic" 
                        label="Name" 
                        variant="outlined" 
                        style={{marginBottom: '30px', backgroundColor: 'white', borderRadius: '5px', width: '80%'}}
                        onChange={(e)=>dispatch(changeNameInput(e.target.value))}
                    />
                    {/* <p>City</p> */}
                    {/* <input type="text" name="city" onChange={(e)=>dispatch(changeCityInput(e.target.value))}></input> */}
                    <TextField 
                        // id="outlined-basic" 
                        label="City" 
                        variant="outlined" 
                        style={{marginBottom: '30px', backgroundColor: 'white', borderRadius: '5px', width: '80%'}} 
                        onChange={(e)=>dispatch(changeCityInput(e.target.value))}
                    />
                    {/* <p>Username</p> */}
                    {/* <input type="text" name="username" onChange={(e)=>dispatch(changeUsernameInput(e.target.value))}></input> */}
                    <TextField 
                        // id="outlined-basic" 
                        label="Username" 
                        variant="outlined" 
                        style={{marginBottom: '30px', backgroundColor: 'white', borderRadius: '5px', width: '80%'}}
                        onChange={(e)=>dispatch(changeUsernameInput(e.target.value))}
                    />
                    {/* <p>Password</p> */}
                    {/* <input type="text" name="password" onChange={(e)=>dispatch(changePasswordInput(e.target.value))}></input> */}
                    <TextField 
                        // id="outlined-basic" 
                        type="password"
                        label="Password" 
                        variant="outlined" 
                        style={{backgroundColor: 'white', borderRadius: '5px', width: '80%'}}
                        onChange={(e)=>dispatch(changePasswordInput(e.target.value))}
                    />
                    <br></br>
                    <HeaderButton 
                        type="submit" 
                        variant="outlined" 
                        className={classes.signupButton} 
                        // onClick={()=>history.push("/login")}
                    >
                        SIGN UP
                    </HeaderButton>
                </form>
            </Grid>
        </Grid>
    );
}
    
export default SignUp;