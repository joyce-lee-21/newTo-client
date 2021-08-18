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

    const onAddCity = (e) => {
        console.log(e)
        const c = {
            user_id: user.id, 
            city: cityInput
        }
        async function addCity(){
            // fetch category_selection based on city_profile id from button id
            const res = await fetch(`http://localhost:3000/city_profiles/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({profile: c})
            })
            if(res.ok){
                const newCity = await res.json()
                const formatNewCity = {
                    id: newCity.id,
                    city: newCity.city,
                    user_id: newCity.user_id
                }
                // console.log(newCity)
                dispatch(changeCityProfiles([...cityProfiles, formatNewCity]))
                dispatch(changeAddCity(false))
            } else {
                const err = await res.json()
                setErrors(err.errors)
            }
        };
        addCity();
    }

    return (
        <Grid container>
            <Grid item xs={2} className={classes.accountBoxes}></Grid>
            <Grid item xs={4}>
                <h1>Account Details</h1>
                {editStatus === false
                ? 
                    (<div>
                        <p>{nameInput}</p>
                        <span>
                            Cities:
                            {user.city_profiles.map(city=><p key={city.id}>{city.city}</p>)}
                        </span>
                        <p>{usernameInput}</p>
                        <p>***</p>
                        <button onClick={()=>dispatch(changeEditStatus(true))}>Edit</button>
                    </div>)
                :
                <>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <h5>Name</h5>
                    <input type="text" name="name" style={{width: '80%'}} value={nameInput} onChange={(e)=>dispatch(changeNameInput(e.target.value))}></input>
                    <h5>Username</h5>
                    <input type="text" name="username" style={{width: '80%'}} value={usernameInput} onChange={(e)=>dispatch(changeUsernameInput(e.target.value))}></input>
                    <h5>Password</h5>
                    <input type="text" name="password" style={{width: '80%'}} onChange={(e)=>dispatch(changePasswordInput(e.target.value))}></input>
                    <br></br>
                    <input type="submit" value="Save Changes"></input>
                    <button onClick={()=>dispatch(changeEditStatus(false))}>Cancel</button>
                </form>
                </>
                }
            </Grid>
            <Grid>
                <h1>Cities</h1>
                {cityProfiles.map(city=>
                    (<>
                    <p>{city.city}</p>
                    <button onClick={(e)=>onDeleteCity(e, city)}>Delete</button>
                    </>
                    )
                )}
                {addCity 
                    ? <>
                        <input type="text" name="city" style={{width: '80%'}} onChange={(e)=>dispatch(changeCityInput(e.target.value))}></input>
                        <button onClick={(e)=>onAddCity(e)}>Add</button>
                    </>
                    : <button onClick={()=>dispatch(changeAddCity(true))}>Add New City</button>
                }
            </Grid>
        </Grid>
    );
}
    
export default Account;