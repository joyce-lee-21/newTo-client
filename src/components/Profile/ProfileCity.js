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
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
    margin: '5px 20px 20px',
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

const useStyles = makeStyles({
    addCity: {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }
});

function ProfileCity() {
    const dispatch = useDispatch();
    const cityProfiles = useSelector(state => state.cityProfiles);
    const addCity = useSelector(state => state.addCity);
    const user = useSelector(state => state.user);
    const cityInput = useSelector(state => state.cityInput);
    const classes = useStyles();

    const getCityProfile = (e, profile) => {
        fetch(`http://localhost:3000/city_profiles/${profile.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(selections => {
            dispatch(changeCategoryArray(selections.category_selections))
            dispatch(changeSavedVenuesArray(selections.saved_venues.filter(venue => venue.is_completed !== true)))
            dispatch(changeCitySelection(profile))
            dispatch(changeAddSecondCity(false))
            dispatch(changeCompletedVenuesArray(selections.saved_venues.filter(venue => venue.is_completed === true)))
        })
    }

    const onAddCity = (e) => {
        const cityInfo = {
            user_id: user.id, 
            city: cityInput
        }
        fetch(`http://localhost:3000/city_profiles/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({profile: cityInfo})
        })
        .then(res => res.json())
        .then(newCity => {
            const formatNewCity = {
                id: newCity.id,
                city: newCity.city,
                user_id: newCity.user_id
            }
            dispatch(changeCityProfiles([...cityProfiles, formatNewCity]))
            dispatch(changeAddCity(false))
        })
    }

    return (
        <>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
            <h1>Select a city:</h1> 
            {cityProfiles.map(profile => (
                <ProfileCityButton key={profile.id} id={profile.id} onClick={(e)=>getCityProfile(e, profile)}>{profile.city}</ProfileCityButton>
            ))}
        <Grid >
            {addCity 
                ? <div className={classes.addCity}>
                    <TextField type="text" name="city" style={{width: '50%', paddingBottom: '20px'}} onChange={(e)=>dispatch(changeCityInput(e.target.value))}></TextField>
                    <div className={classes.addButtonsContainer}>
                        <AccountButton onClick={(e)=>onAddCity(e)}>Add</AccountButton>
                        <AccountButton onClick={()=>dispatch(changeAddCity(false))}>Cancel</AccountButton>
                    </div>
                </div>
                : <AccountButton onClick={()=>dispatch(changeAddCity(true))}>Add New City</AccountButton>
            }
        </Grid>
        </Grid>
        </>
    );
}
    
export default ProfileCity;