import {useDispatch, useSelector} from 'react-redux';
import {changeProfileView} from '../../usersSlice';

import ViewVenuesList from './ViewVenuesList';
import ViewCategoryList from './ViewCategoryList';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ProfileViewButton = withStyles({
    root: {
      boxShadow: 'none',
      fontSize: 14,
      border: '1px solid',
      lineHeight: 1.5,
      backgroundColor: '#ffeca9',
      borderColor: '#ffeca9',
      padding: '6px 15px',
      margin: '10px',
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

function ProfileView() {
    const dispatch = useDispatch();
    const classes = useSelector(state => state.classes);
    const profileView = useSelector(state => state.profileView);

    return (
        <>
        <Grid item xs={2}></Grid>
        <Grid item xs={8} className={classes.viewCategoryContainer}>
            <ProfileViewButton onClick={()=>dispatch(changeProfileView("categories"))}>Categories</ProfileViewButton>
            <ProfileViewButton onClick={()=>dispatch(changeProfileView("venues"))}>Venues</ProfileViewButton>
            {profileView === "categories"
                ? <ViewCategoryList />
                : <ViewVenuesList />
            }
        </Grid>
        </>
    );
}
    
export default ProfileView;