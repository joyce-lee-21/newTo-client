import {useDispatch, useSelector} from 'react-redux';
import {changePasswordInput, changeUsernameInput, changeUser, changeCitySelection, changeCategoryArray} from '../../usersSlice';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const usernameInput = useSelector(state => state.usernameInput);
    const passwordInput = useSelector(state => state.passwordInput);
    const [errors, setErrors] = useState([])

    // console.log(typeof(usernameInput), passwordInput)

    const handleSubmit = (e) => {
        e.preventDefault();
        async function login(){
            const res = await fetch("http://localhost:3000/login", {
                method: "POST",
                // credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    username: usernameInput, 
                    password: passwordInput 
                    }),
            })
            if(res.ok){
                const user = await res.json()
                // set user to state
                dispatch(changeUser(user))
                // set city selection if user only has 1 city profile
                if (user.cities.length === 1) {
                    dispatch(changeCitySelection(user.cities[0]))
                    dispatch(changeCategoryArray(user.category_selections))
                }
                history.push('/profile')
            } else {
                const err = await res.json()
                // console.log(err.errors)
                setErrors(err.errors)
            }
        };
        login()
    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" style={{width: '80%'}} onChange={(e)=>dispatch(changeUsernameInput(e.target.value))}></input>
                <input type="text" name="password" style={{width: '80%'}} onChange={(e)=>dispatch(changePasswordInput(e.target.value))}></input>
                <br></br>
                <input type="submit"></input>
            </form>
            {errors ? errors.map(error => (<p>{`${error}`}</p>)) : null}
        </div>
    );
}
    
export default Login;