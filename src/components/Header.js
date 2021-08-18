import {useDispatch, useSelector} from 'react-redux';
import {NavLink, useHistory} from 'react-router-dom';
// ***---V2 CODE---***
// import {changeUser, changeIsLoggedIn} from '.././usersSlice';

// ***---V1 CODE---***
import {changeUser} from '../usersSlice';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const HeaderButton = withStyles({
    root: {
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 14,
      padding: '6px 12px',
      border: '1px solid',
      lineHeight: 1.5,
      backgroundColor: 'none',
      borderColor: 'gray',
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
        boxShadow: '0 0 0 0.2rem rgba(255,236,169,1)',
      },
    },
  })(Button);


function Header() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const classes = useSelector(state => state.classes)
    const citySelection = useSelector(state => state.citySelection);
    const history = useHistory();

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

    return (
        <>
            <Grid item xs={12} className="header-container">
                <Grid item xs={6} className="nav-left">
                    <NavLink exact to="/" style={{color: 'inherit', textDecoration: 'none'}}>
                        {citySelection.city 
                            ? <h1 className={classes.logo}>{`New To: ${citySelection.city}`}</h1>
                            : <h1 className={classes.logo}>{`New To: _____`}</h1>
                        }
                    </NavLink>
                    {user ? <h4 className={classes.logo}>{`Welcome, ${user.name}!`}</h4> : null}
                </Grid>
                {user
                    ? <>
                        <Grid item xs={6} className="nav-right">
                            <NavLink to="/account" className="nav-link" style={{ textDecoration: 'none' }}>
                                <HeaderButton variant="outlined" className={classes.headerMargin}>ACCOUNT</HeaderButton>
                            </NavLink>
                            <NavLink to="/profile" className="nav-link" style={{ textDecoration: 'none' }}>
                                <HeaderButton variant="outlined" className={classes.headerMargin}>PROFILE</HeaderButton>
                            </NavLink>
                            <NavLink to="/results" className="nav-link" style={{ textDecoration: 'none' }}>
                                <HeaderButton variant="outlined" className={classes.headerMargin}>RESULTS</HeaderButton>
                            </NavLink>
                            <NavLink to="/logout" className="nav-link" style={{ textDecoration: 'none' }}>
                                <HeaderButton variant="outlined" className={classes.headerMargin} onClick={()=>onLogout()}>LOGOUT</HeaderButton>
                            </NavLink>
                        </Grid>
                    </>
                    : <Grid item xs={6} className="nav-right">
                        <NavLink to="/login" className="nav-link" style={{ textDecoration: 'none' }}>
                            <HeaderButton variant="outlined" className={classes.headerMargin}>LOGIN</HeaderButton>
                            {/* <button>Login</button> */}
                        </NavLink>
                        <NavLink to="/signup" className="nav-link" style={{ textDecoration: 'none' }}>
                            <HeaderButton variant="outlined" className={classes.headerMargin}>SIGN UP</HeaderButton>
                            {/* <button>Sign Up</button> */}
                        </NavLink>
                    </Grid>
                }
            </Grid>
        </>
    );
}
    
export default Header;
