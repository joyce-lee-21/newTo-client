import {useDispatch, useSelector} from 'react-redux';
import {changeHpView, changePasswordInput, changeUsernameInput} from '../../usersSlice';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'

function SignUp() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(username, password)
        // async function login(){
        //     const res = await fetch("/login", {
        //         method: "POST",
        //         headers: {
        //         "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ 
        //             usernameInput, 
        //             passwordInput 
        //             }),
        //     })
        //     if(res.ok){
        //         const user = await res.json()
        //         console.log(user)
        //         // history.push('/profile')
        //     } else {
        //         const err = await res.json()
        //         console.log(err.errors)
        //         setErrors(err.errors)
        //     }
        // };
        // login()
    }

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" style={{width: '80%'}} onChange={(e)=>dispatch(changeUsernameInput(e.target.value))}></input>
                <input type="text" name="password" style={{width: '80%'}} onChange={(e)=>dispatch(changePasswordInput(e.target.value))}></input>
                <br></br>
                <input type="submit"></input>
            </form>
            {errors.map(error => 
                (<p>{`${error}`}</p>)
            )}
        </div>
    );
}
    
export default SignUp;