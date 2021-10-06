import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {
    changePasswordInput, 
    changeUsernameInput, 
    changeNameInput, 
    changeUser, 
    changeEditStatus, 
    changeCityProfiles,
} from '../usersSlice';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const AccountButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 14,
        padding: '6px 15px',
        marginBottom: '20px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#955698',
        color: 'white',
        '&:hover': {
            backgroundColor: '#68166c',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#68166c',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem #9fcbb4',
        },
    },
  })(Button);

const AccountCityDeleteButton = withStyles({
    root: {
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 14,
      padding: '6px 15px',
      backgroundColor: '#955698',
      color: 'white',
      '&:hover': {
        backgroundColor: '#68166c',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#68166c',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem #9fcbb4',
      },
    },
})(Button);

const useStyles = makeStyles({
    accountCityEditContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    accountCities: {
        width: "50%", 
        display: 'inline', 
        textTransform: 'capitalize',
    },
    accountContainer: {
        minHeight: '40vh',
        margin: '10px',
        padding: '10px'
    },
});

function Account() {
    const dispatch = useDispatch();
    const usernameInput = useSelector(state => state.usernameInput);
    const passwordInput = useSelector(state => state.passwordInput);
    const nameInput = useSelector(state => state.nameInput);
    const cityInput = useSelector(state => state.cityInput);
    const editStatus = useSelector(state => state.editStatus);
    const user = useSelector(state => state.user);
    const cityProfiles = useSelector(state => state.cityProfiles);
    const [errors, setErrors] = useState([]);
    const classes = useStyles();


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(usernameInput, passwordInput, cityInput, nameInput)
        async function acctChange(){
            const res = await fetch(`https://newto-backend.herokuapp.com/users/${user.id}`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    name: nameInput,                 
                    username: usernameInput, 
                    password: passwordInput 
                    }),
            })
            if(res.ok){
                const user = await res.json()
                dispatch(changeUser(user))
                dispatch(changeEditStatus(false))
            } else {
                const err = await res.json()
                setErrors(err.errors)
            }
        };
        acctChange();
    }

    const onDeleteCity = (e, city) => {
        fetch(`https://newto-backend.herokuapp.com/city_profiles/${city.id}`, {
            method: "DELETE",
        })
        .then(dispatch(changeCityProfiles(cityProfiles.filter(cp => cp.id !== city.id))))
    }


    return (
        <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
                <Paper className={classes.accountContainer} elevation={3}>
                    <h1>Account Details</h1>
                    {editStatus === false
                    ? 
                        (<div>
                            <p>Name: {nameInput}</p>
                            <p>Username: {usernameInput}</p>
                            <p>Password: ***</p>
                            <AccountButton onClick={()=>dispatch(changeEditStatus(true))}>Edit</AccountButton>
                        </div>)
                    :
                    <>
                    {errors ? errors.map(e => (<p style={{color: 'red'}}>{`${errors}`}</p>)) : null}
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <h5>Name</h5>
                        <input type="text" name="name" style={{width: '70%'}} value={nameInput} onChange={(e)=>dispatch(changeNameInput(e.target.value))}></input>
                        <h5>Username</h5>
                        <input type="text" name="username" style={{width: '70%'}} value={usernameInput} onChange={(e)=>dispatch(changeUsernameInput(e.target.value))}></input>
                        <h5>Password</h5>
                        <input type="text" name="password" style={{width: '70%', marginBottom: '10px'}} onChange={(e)=>dispatch(changePasswordInput(e.target.value))}></input>
                        <br></br>
                        <AccountButton type="submit" value="Save Changes">Submit</AccountButton>
                        <AccountButton onClick={()=>dispatch(changeEditStatus(false))}>Cancel</AccountButton>
                    </form>
                    </>
                    }
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper className={classes.accountContainer} elevation={3}>
                    <h1>Cities</h1>
                    {cityProfiles.length > 1 
                        ? cityProfiles.map(city=>
                            (<div key={city.id} className={classes.accountCityEditContainer}>
                            <p className={classes.accountCities}>{city.city}</p>
                            <AccountCityDeleteButton onClick={(e)=>onDeleteCity(e, city)}>Delete</AccountCityDeleteButton>
                            <br></br>
                            </div>
                            )
                        )
                        : (<div className={classes.accountCityEditContainer}>
                            <p className={classes.accountCities}>{cityProfiles[0].city}</p>
                            <AccountCityDeleteButton onClick={(e)=>onDeleteCity(e, cityProfiles)}>Delete</AccountCityDeleteButton>
                            <br></br>
                            </div>)
                    }
                </Paper>
            </Grid>
        </Grid>
    );
}
    
export default Account;