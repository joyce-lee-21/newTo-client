import {useDispatch, useSelector} from 'react-redux';
import {
    changePasswordInput, 
    changeUsernameInput, 
    changeCityInput, 
    changeNameInput, 
    changeUser, 
    changeEditStatus, 
    changeAddCity,
    changeCityProfiles,
} from '../usersSlice';
import {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const AccountButton = withStyles({
    root: {
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 14,
      padding: '6px 15px',
      marginBottom: '20px',
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
      '&:focus': {
        boxShadow: '0 0 0 0.2rem #9fcbb4',
      },
    },
  })(Button);

function Account() {
    const dispatch = useDispatch();
    const classes = useSelector(state => state.classes);
    const usernameInput = useSelector(state => state.usernameInput);
    const passwordInput = useSelector(state => state.passwordInput);
    const nameInput = useSelector(state => state.nameInput);
    const cityInput = useSelector(state => state.cityInput);
    const editStatus = useSelector(state => state.editStatus);
    const user = useSelector(state => state.user);
    const addCity = useSelector(state => state.addCity);
    const cityProfiles = useSelector(state => state.cityProfiles);
    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(usernameInput, passwordInput, cityInput, nameInput)
        async function acctChange(){
            const res = await fetch(`http://localhost:3000/users/${user.id}`, {
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
                // console.log(err.errors)
                setErrors(err.errors)
            }
        };
        acctChange();
    }

    const onDeleteCity = (e, city) => {
        console.log(city)
        async function deleteCity(){
            // fetch category_selection based on city_profile id from button id
            const res = await fetch(`http://localhost:3000/city_profiles/${city.id}`, {
                method: "DELETE",
            })
            .then(dispatch(changeCityProfiles(cityProfiles.filter(cp=> cp.id !== city.id))))
        };
        deleteCity();
    }

    // const onAddCity = (e) => {
    //     console.log(e)
    //     const c = {
    //         user_id: user.id, 
    //         city: cityInput
    //     }
    //     async function addCity(){
    //         // fetch category_selection based on city_profile id from button id
    //         const res = await fetch(`http://localhost:3000/city_profiles/`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({profile: c})
    //         })
    //         if(res.ok){
    //             const newCity = await res.json()
    //             const formatNewCity = {
    //                 id: newCity.id,
    //                 city: newCity.city,
    //                 user_id: newCity.user_id
    //             }
    //             // console.log(newCity)
    //             dispatch(changeCityProfiles([...cityProfiles, formatNewCity]))
    //             dispatch(changeAddCity(false))
    //         } else {
    //             const err = await res.json()
    //             setErrors(err.errors)
    //         }
    //     };
    //     addCity();
    // }

    return (
        <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={4} className={classes.accountBoxes}>
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
            </Grid>
            <Grid item xs={4} className={classes.accountBoxes}>
                <h1>Cities</h1>
                {cityProfiles.map(city=>
                    (<div key={city.id}>
                    <p style={{width: "50%", marginRight: '20px', display: 'inline'}}>{city.city}</p>
                    <AccountButton onClick={(e)=>onDeleteCity(e, city)}>Delete</AccountButton>
                    <br></br>
                    </div>
                    )
                )}
            </Grid>
        </Grid>
    );
}
    
export default Account;