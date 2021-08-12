import {useDispatch, useSelector} from 'react-redux';

function Header() {
    const dispatch = useDispatch();

    return (
        <div>
            <button>Login</button>
            <button>Sign Up</button>
        </div>
    );
}
    
export default Header;
