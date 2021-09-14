import {useDispatch, useSelector} from 'react-redux';
import {NavLink, useHistory} from 'react-router-dom';
import {useState} from 'react';

import {
    changeUser, 
    changeCitySelection, 
    changeCategoryArray, 
    changeSavedVenuesArray,
    changeCompletedVenuesArray,
    changeNameInput,
    changeUsernameInput,
    changeCityProfiles,
} from '../usersSlice';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { NavMenu, NavItem } from '@mui-treasury/components/menu/navigation';
import { usePointNavigationMenuStyles } from '@mui-treasury/styles/navigationMenu/point';
import Typography from '@material-ui/core/Typography';


const TrendyButton = withStyles({
    root: {
        minWidth: 120,
        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
        background: 'linear-gradient(to right, #9fcbb4, #955698)',
        color: 'white',
        fontWeight: 'bold',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
})(Button);

const useStyles = makeStyles({
    headerContainer: {
        display: 'flex',
    },
    navbar: {
        backgroundColor: 'white',
        position: "fixed",
        width: "100%",
        height: '60px',
        paddingTop: '5px',
        zIndex: 1000,
    },
    logo: {
        marginLeft: '20px',
        textTransform: 'capitalize',
        margin: '5px',
    },
    navRight: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: '30px',
    },
    navLeft: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingRight: '30px',
    },
});


function Header() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const classes = useStyles();
    const citySelection = useSelector(state => state.citySelection);
    const history = useHistory();
    const [index, setIndex] = useState(1);

    const onLogout = () => {
        localStorage.clear()
        dispatch(changeUser(null))
        dispatch(changeCitySelection(""))
        dispatch(changeCategoryArray([]))
        dispatch(changeSavedVenuesArray([]))
        dispatch(changeCompletedVenuesArray([]))
        dispatch(changeNameInput(""))
        dispatch(changeUsernameInput(""))
        dispatch(changeCityProfiles(null))
        history.push("/")
    }

    
    const handleClick = (i) => (e) => {
      e.preventDefault();
      setIndex(i);
    };

    return (
        <>
            <Grid item xs={12}>
                <Box boxShadow={3} className={classes.navbar}>
                <NavMenu useStyles={usePointNavigationMenuStyles}>
                    <Grid item xs={4} className={classes.navLeft}>
                        <NavLink exact to="/" style={{color: 'inherit', textDecoration: 'none'}}>
                            <Box onClick={()=>handleClick(7)}>
                            {citySelection.city 
                                ? <h1 className={classes.logo}>{`New To: ${citySelection.city}`}</h1>
                                : <h1 className={classes.logo}>{`New To: _____`}</h1>
                            }
                            </Box>
                        </NavLink>
                    </Grid>
                {user
                    ? <>
                        <Grid item xs={8} className={classes.navRight}>
                            <NavItem as={'div'} active={index === 0} style={{color: 'black'}} onClick={handleClick(0)}>
                                <NavLink to="/account" style={{ textDecoration: 'none', color: 'black' }}>
                                    <Typography>Account</Typography>
                                </NavLink>
                            </NavItem>
                            <NavItem as={'div'} active={index === 1} onClick={handleClick(1)}>
                                <NavLink to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
                                    <Typography>Profile</Typography>
                                </NavLink>
                            </NavItem>
                            {citySelection &&
                            <>
                                <NavItem as={'div'} active={index === 2} onClick={handleClick(2)}>
                                    <NavLink to="/results" style={{ textDecoration: 'none', color: 'black' }}>
                                        <Typography>Results</Typography>
                                    </NavLink>
                                </NavItem>
                                <NavItem as={'div'} active={index === 3} onClick={handleClick(3)}>
                                    <NavLink to="/randomize" style={{ textDecoration: 'none' }}>
                                        <TrendyButton>RANDOMIZE</TrendyButton>
                                    </NavLink>
                                </NavItem>
                            </>
                            }
                            <NavItem as={'div'} active={index === 4} onClick={handleClick(4)}>
                                <NavLink to="/" style={{ textDecoration: 'none', color: 'black' }}>
                                    <Typography onClick={()=>onLogout()}>Logout</Typography>
                                </NavLink>
                            </NavItem>
                        </Grid>
                    </>
                    : <Grid item xs={8} className={classes.navRight}>
                        <NavItem as={'div'} active={index === 5} onClick={handleClick(5)}>
                            <NavLink to="/login" style={{ textDecoration: 'none', color: 'black'}}>
                                <Typography>Login</Typography>
                            </NavLink>
                        </NavItem>
                        <NavItem as={'div'} active={index === 6} onClick={handleClick(6)}>
                            <NavLink to="/signup" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography>Sign up</Typography>
                            </NavLink>
                        </NavItem>
                    </Grid>
                }
                </NavMenu>
                </Box>
            </Grid>
        </>
    );
}
    
export default Header;
