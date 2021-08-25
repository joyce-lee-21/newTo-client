import {useSelector} from 'react-redux';

import ProfileSelection from './ProfileSelection';
import ProfileView from './ProfileView';
import ProfileCity from './ProfileCity';

import Grid from '@material-ui/core/Grid';

function Profile() {
    const citySelection = useSelector(state => state.citySelection);
    const categoryArray = useSelector(state => state.categoryArray);
    const cityProfiles = useSelector(state => state.cityProfiles);
    const addSecondCity = useSelector(state => state.addSecondCity);
    

    return (
        <Grid container>
            {/* if there is more than one city profile, and one has not been selected */}
            {(cityProfiles && cityProfiles.length > 1 && !citySelection) || (addSecondCity)
                ? <ProfileCity />
                // if a city profile is selected, and there are category selections saved
                // : addSecondCity 
                //     ? <ProfileCity />
                    : categoryArray && categoryArray.length >= 1
                        ? <ProfileView />
                        // otherwise, user will select categories for that selected city profile
                        : <ProfileSelection />
            }
        </Grid>
    );
}
    
export default Profile;