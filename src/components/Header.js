import {useDispatch, useSelector} from 'react-redux';
import {NavLink, useHistory} from 'react-router-dom';
// ***---V2 CODE---***
// import {changeUser, changeIsLoggedIn} from '.././usersSlice';

// ***---V1 CODE---***
import {changeUser} from '../usersSlice';

function Header() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
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
        <div>
            <div className="nav-left">
                <NavLink exact to="/" style={{color: 'inherit', textDecoration: 'none'}}>
                    {citySelection.city 
                        ? <h1>{`New To: ${citySelection.city}`}</h1>
                        : <h1>{`New To: _____`}</h1>
                    }
                {/* <h1>{`New To: ${city}`}</h1> */}
                </NavLink>
            </div>
            {user
                ? <>
                    <h5>{`Welcome, ${user.name}!`}</h5>
                    <div className="nav-right">
                        <NavLink to="/account" className="nav-link" style={{ textDecoration: 'none' }}>
                            {/* <Button variant="contained" color="primary">Account</Button> */}
                            <button>Account</button>
                        </NavLink>
                        <NavLink to="/profile" className="nav-link" style={{ textDecoration: 'none' }}>
                            {/* <Button variant="contained" color="primary">Homepage</Button> */}
                            <button>Profile</button>
                        </NavLink>
                        <NavLink to="/results" className="nav-link" style={{ textDecoration: 'none' }}>
                            <button>Results</button>
                        </NavLink>
                        <NavLink to="/logout" className="nav-link" style={{ textDecoration: 'none' }}>
                            {/* <Button variant="contained" color="primary" onClick={onLogout}>Logout</Button> */}
                            <button onClick={()=>onLogout()}>Logout</button>
                            {/* <button>Logout</button> */}
                        </NavLink>
                    </div>
                </>
                : <div className="nav-right">
                    <NavLink to="/login" className="nav-link" style={{ textDecoration: 'none' }}>
                        {/* <Button variant="contained" color="primary">Login</Button> */}
                        <button>Login</button>
                    </NavLink>
                    <NavLink to="/signup" className="nav-link" style={{ textDecoration: 'none' }}>
                        {/* <Button variant="contained" color="primary">Sign Up</Button> */}
                        <button>Sign Up</button>
                    </NavLink>
                </div>
            }
        </div>
    );
}
    
export default Header;
