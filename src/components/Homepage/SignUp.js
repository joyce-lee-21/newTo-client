import {useDispatch, useSelector} from 'react-redux';
import {changePasswordInput, changeUsernameInput, changeCityInput, changeNameInput, changeUser} from '../../usersSlice';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
                const user = await res.json()
                dispatch(changeUser(user))
                history.push('/profile')
            } else {
                const err = await res.json()
                // console.log(err.errors)
                setErrors(err.errors)
            }
        };
        signup();
    }

    return (
        <Grid container 
            className={classes.login}
        >
            <Grid item xs={10} classes={classes.loginBox}>
                <h1 style={{textAlign: 'center'}}>Sign Up</h1>
                <form style={{textAlign: 'center'}} onSubmit={(e)=>handleSubmit(e)}>
                    <p>Name</p>
                    <input type="text" name="name" onChange={(e)=>dispatch(changeNameInput(e.target.value))}></input>
                    <p>City</p>
                    <input type="text" name="city" onChange={(e)=>dispatch(changeCityInput(e.target.value))}></input>
                    <p>Username</p>
                    <input type="text" name="username" onChange={(e)=>dispatch(changeUsernameInput(e.target.value))}></input>
                    <p>Password</p>
                    <input type="text" name="password" onChange={(e)=>dispatch(changePasswordInput(e.target.value))}></input>
                    <br></br>
                    <HeaderButton 
                        type="submit" 
                        variant="outlined" 
                        className={classes.signupButton} 
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
    
export default SignUp;