import {useDispatch, useSelector} from 'react-redux';
import {changePasswordInput, changeUsernameInput, changeCityInput, changeNameInput, changeUser} from '../../usersSlice';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'

function SignUp() {
    const dispatch = useDispatch();
    const history = useHistory();
    const usernameInput = useSelector(state => state.usernameInput);
    const passwordInput = useSelector(state => state.passwordInput);
    const nameInput = useSelector(state => state.nameInput);
    const cityInput = useSelector(state => state.cityInput);
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(usernameInput, passwordInput, cityInput, nameInput)
        async function signup(){
            const res = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    name: nameInput, 
                    city: cityInput,                         
                    username: usernameInput, 
                    password: passwordInput 
                    }),
            })
            if(res.ok){
                const user = await res.json()
                dispatch(changeUser(user))
                history.push('/profile')
            } else {
                const err = await res.json()
                // console.log(err.errors)
                setErrors(err.errors)
            }
        };
        signup();
    }

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                Name: <input type="text" name="name" style={{width: '80%'}} onChange={(e)=>dispatch(changeNameInput(e.target.value))}></input>
                City: <input type="text" name="city" style={{width: '80%'}} onChange={(e)=>dispatch(changeCityInput(e.target.value))}></input>
                Username: <input type="text" name="username" style={{width: '80%'}} onChange={(e)=>dispatch(changeUsernameInput(e.target.value))}></input>
                Password: <input type="text" name="password" style={{width: '80%'}} onChange={(e)=>dispatch(changePasswordInput(e.target.value))}></input>
                <br></br>
                <input type="submit" value="Sign Up"></input>
            </form>
            {errors ? errors.map(error => (<p>{`${error}`}</p>)) : null}
        </div>
    );
}
    
export default SignUp;