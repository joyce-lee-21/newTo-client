import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'
import {changeCitySelection, changeCategoryArray} from '../../usersSlice';

function ProfileCity() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [errors, setErrors] = useState([])

    const getCityProfile = (e) => {
        dispatch(changeCitySelection(e.target.textContent))
        // console.log(e.target.id)
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
                dispatch(changeCategoryArray(selections.category_selections))
            } else {
                const err = await res.json()
                // console.log(err.errors)
                setErrors(err.errors)
            }
        };
        select();
    }

    return (
        <div>
            <h1>Select a city:</h1> 
            {user.city_profiles.map(profile => (
                <button id={profile.id} onClick={(e)=>getCityProfile(e)}>{profile.city}</button>
            ))}
        </div>
    );
}
    
export default ProfileCity;