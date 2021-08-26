import {useDispatch, useSelector} from 'react-redux';
import {
    changeCitySelection, 
    changeCategoryArray, 
    changeSavedVenuesArray, 
    changeCityInput, 
    changeCityProfiles, 
    changeAddCity,
    changeCompletedVenuesArray,
    changeAddSecondCity,
} from '../../usersSlice';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const ProfileCityButton = withStyles({
    root: {
      boxShadow: 'none',
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: '#fcf3d3',
      padding: '6px 15px',
      margin: '20px',
      minWidth: '120px',
      height: '80px',
      '&:hover': {
        backgroundColor: '#ffeca9',
        borderColor: '#ffeca9',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#ffeca9',
        borderColor: '#ffeca9',
      },
      '&:focused': {
        boxShadow: '0 0 0 0.2rem #ffeca9',
      },
    },
  })(Button);

const AccountButton = withStyles({
root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 14,
    fontWeight: 'bold',
    padding: '6px 15px',
    marginBottom: '20px',
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
    '&:focused': {
    boxShadow: '0 0 0 0.2rem #68166c',
    },
},
})(Button);

function ProfileCity() {
    const dispatch = useDispatch();
    const classes = useSelector(state => state.classes);
    const cityProfiles = useSelector(state => state.cityProfiles);
    const addCity = useSelector(state => state.addCity);
    const user = useSelector(state => state.user);
    const cityInput = useSelector(state => state.cityInput);

    const getCityProfile = (e, profile) => {
        // console.log(profile)
        async function select(){
            // fetch category_selection based on city_profile id from button id
            const res = await fetch(`http://localhost:3000/city_profiles/${profile.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if(res.ok){
                const selections = await res.json()
                // console.log(selections)
                dispatch(changeCategoryArray(selections.category_selections))
                dispatch(changeSavedVenuesArray(selections.saved_venues.filter(venue => venue.is_completed !== true)))
                dispatch(changeCitySelection(profile))
                dispatch(changeAddSecondCity(false))
                dispatch(changeCompletedVenuesArray(selections.saved_venues.filter(venue => venue.is_completed === true)))
            } else {
                const err = await res.json()
                console.log(err.errors)
            }
        };
        select();
    }

    const onAddCity = (e) => {
        // console.log(e)
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
                console.log(err.errors)
            }
        };
        addCity();
    }

    return (
        <>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
            {/* <Grid container> */}
                {/* <Grid> */}
                    <h1>Select a city:</h1> 
                    {cityProfiles.map(profile => (
                        <ProfileCityButton key={profile.id} id={profile.id} onClick={(e)=>getCityProfile(e, profile)}>{profile.city}</ProfileCityButton>
                    ))}
                {/* </Grid> */}
                <Grid >
                {/* <br></br> */}
                    {addCity 
                        ? <div className="add-city-container">
                            <TextField type="text" name="city" className={classes.addCity} onChange={(e)=>dispatch(changeCityInput(e.target.value))}></TextField>
                            <AccountButton style={{width: '50%'}} onClick={(e)=>onAddCity(e)}>Add</AccountButton>
                        </div>
                        : <AccountButton onClick={()=>dispatch(changeAddCity(true))}>Add New City</AccountButton>
                    }
                </Grid>
            {/* </Grid> */}
        </Grid>
        </>
    );
}
    
export default ProfileCity;