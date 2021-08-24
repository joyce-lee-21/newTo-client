import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'
import {changeProfileView, changeCitySelection} from '../../usersSlice';

import ViewVenuesList from './ViewVenuesList';
import ViewCategoryList from './ViewCategoryList';
import ViewCompleted from './ViewCompleted';

import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() => ({
    toggle: {
      boxShadow: 'none',
      fontSize: 14,
      backgroundColor: '#ffeca9',
      '&:hover': {
        boxShadow: 'none',
        backgroundColor: '#9fcbb4',
        borderColor: '#9fcbb4',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#9fcbb4',
        borderColor: '#9fcbb4',
      },
      '&:focused': {
        boxShadow: '0 0 0 0.2rem #9fcbb4',
        backgroundColor: '#9fcbb4',
        borderColor: '#9fcbb4',
      },
    },
  }));

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
        boxShadow: 'none',
        backgroundColor: '#9fcbb4',
        borderColor: '#9fcbb4',
      },
      '&:active': {
        boxShadow: 'none',
        background: '#9fcbb4',
        borderColor: '#9fcbb4',
        color: 'white'
      },
      '&:focus': {
        boxShadow: 'none',
        backgroundColor: '#9fcbb4',
        borderColor: '#9fcbb4',
      },
    },
  })(Button);

function ProfileView() {
    const dispatch = useDispatch();
    const history = useHistory();
    const buttons = useStyles();
    const classes = useSelector(state => state.classes);
    const profileView = useSelector(state => state.profileView);
    const [alignment, setAlignment] = useState('left');

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const onChangeCity = () => {
        dispatch(changeCitySelection(""))
        history.push('/profile')
    }

    return (
        <>
        <Grid item xs={1}></Grid>
        <Grid item xs={10} className={classes.viewCategoryContainer}>
            <Paper className="category-container">
                <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
                    >
                    <ToggleButton className={buttons.toggle} value="left" onClick={()=>dispatch(changeProfileView("categories"))}>Categories</ToggleButton>
                    <ToggleButton className={buttons.toggle} value="center" onClick={()=>dispatch(changeProfileView("venues"))}>Venues</ToggleButton>
                    <ToggleButton className={buttons.toggle} value="right" onClick={()=>dispatch(changeProfileView("completed"))}>Completed</ToggleButton>
                </ToggleButtonGroup> 
                {/* <ProfileViewButton value="left" onClick={()=>dispatch(changeProfileView("categories"))}>Categories</ProfileViewButton>
                <ProfileViewButton value="center" onClick={()=>dispatch(changeProfileView("venues"))}>Venues</ProfileViewButton>
                <ProfileViewButton value="right" onClick={()=>dispatch(changeProfileView("completed"))}>Completed</ProfileViewButton> */}
                {profileView === "categories"
                    ? (<ViewCategoryList />)
                    : profileView === "venues"
                        ? (<ViewVenuesList />)
                        : (<ViewCompleted />)
                }
            </Paper>
            <ProfileViewButton onClick={()=>onChangeCity()}><strong>Change City</strong></ProfileViewButton>
        </Grid>
        </>
    );
}
    
export default ProfileView;