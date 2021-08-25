import {useDispatch, useSelector} from 'react-redux';
import {NavLink, useHistory} from 'react-router-dom';
import {useState} from 'react';
// ***---V2 CODE---***
// import {changeUser, changeIsLoggedIn} from '.././usersSlice';

// ***---V1 CODE---***
import {changeUser} from '../usersSlice';

import { withStyles } from '@material-ui/core/styles';
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


function Header() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const classes = useSelector(state => state.classes)
    const citySelection = useSelector(state => state.citySelection);
    const history = useHistory();
    const [index, setIndex] = useState(1);


    // ***---V2 CODE---***
    // const onLogout = () => {
    //     fetch("http://localhost:3000/logout", { 
    //         method: "POST" 
    //     })
    //     .then((r) => {
    //         if (r.ok) {
    //             dispatch(changeUser(null))
    //             dispatch(changeIsLoggedIn(false))
    //             history.push("/")
    //         }
    //     });
    // }
    
    // ***---V1 CODE---***
    const onLogout = () => {
        fetch("http://localhost:3000/logout", { 
            method: "DELETE" 
        })
        .then((r) => {
            if (r.ok) {
                dispatch(changeUser(null))
                history.push("/")
            }
        });
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
                    <Grid item xs={4} className="nav-left">
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
                        <Grid item xs={8} className="nav-right">
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
                                    <NavLink to="/trending" style={{ textDecoration: 'none' }}>
                                        <TrendyButton>RANDOMIZE</TrendyButton>
                                    </NavLink>
                                </NavItem>
                            </>
                            }
                            <NavItem as={'div'} active={index === 4} onClick={handleClick(4)}>
                                <NavLink to="/logout" style={{ textDecoration: 'none', color: 'black' }}>
                                    <Typography onClick={()=>onLogout()}>Logout</Typography>
                                </NavLink>
                            </NavItem>
                        </Grid>
                    </>
                    : <Grid item xs={8} className="nav-right">
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
