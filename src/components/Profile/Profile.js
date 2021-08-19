import {useSelector} from 'react-redux';

import ProfileSelection from './ProfileSelection';
import ProfileView from './ProfileView';
import ProfileCity from './ProfileCity';

import Grid from '@material-ui/core/Grid';

function Profile() {
    const citySelection = useSelector(state => state.citySelection);
    const categoryArray = useSelector(state => state.categoryArray);
    const cityProfiles = useSelector(state => state.cityProfiles);
    

    return (
        <Grid container>
            {/* if there are more than one city, and a citySelection === "" */}
            {cityProfiles && cityProfiles.length > 1 && !citySelection
                ? <ProfileCity />
                // since all category_selections under each user instance has empty arrays, we have to go into the first array and see if there are any categories selected. categoryArray is declared at the Login component after signing in
                : categoryArray && categoryArray.length >= 1
                    ? <ProfileView />
                    : <ProfileSelection />
            }
        </Grid>
    );
}
    
export default Profile;