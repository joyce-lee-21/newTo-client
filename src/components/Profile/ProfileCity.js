import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react'
import {changeCitySelection, changeCategoryArray, changeSavedVenuesArray} from '../../usersSlice';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ProfileCityButton = withStyles({
    root: {
      boxShadow: 'none',
      fontSize: 14,
      fontWeight: 'bold',
      border: '1px solid',
      lineHeight: 1.5,
      backgroundColor: '#ffeca9',
      borderColor: '#ffeca9',
      padding: '6px 15px',
      margin: '20px',
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

function ProfileCity() {
    const dispatch = useDispatch();
    const cityProfiles = useSelector(state => state.cityProfiles);
    const [errors, setErrors] = useState([])

    const getCityProfile = (e, profile) => {
        dispatch(changeCitySelection(profile))
        // console.log(e.target.id)
        // console.log(profile)
        async function select(){
            // fetch category_selection based on city_profile id from button id
            const res = await fetch(`http://localhost:3000/city_profiles/${e.target.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if(res.ok){
                const selections = await res.json()
                // console.log(selections)
                dispatch(changeCategoryArray(selections.category_selections))
                dispatch(changeSavedVenuesArray(selections.saved_venues))
            } else {
                const err = await res.json()
                // console.log(err.errors)
                setErrors(err.errors)
            }
        };
        select();
    }

    return (
        <>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
            <h1>Select a city:</h1> 
            {cityProfiles.map(profile => (
                <ProfileCityButton key={profile.id} id={profile.id} onClick={(e)=>getCityProfile(e, profile)}>{profile.city}</ProfileCityButton>
            ))}
        </Grid>
        </>
    );
}
    
export default ProfileCity;