import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';

function Header() {
    const dispatch = useDispatch();
    const city = "Austin";
    const user = useSelector((state) => state.user);

    return (
        <div>
            <div className="nav-left">
                <NavLink exact to="/" style={{color: 'inherit', textDecoration: 'none'}}>
                    <h1>{`New To: _____`}</h1>
                {/* <h1>{`New To: ${city}`}</h1> */}
                </NavLink>
            </div>
            {user
                ? <>
                    <h4>{`Welcome, ${user.name}!`}</h4>
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
                            <button>Logout</button>
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
