import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const username = "jvn"
    const password = "123"

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(username, password)
        async function login(){
            const res = await fetch("/login", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    username, 
                    password 
                    }),
            })
            if(res.ok){
                const user = await res.json()
                console.log(user)
                history.push('/profile')
            } else {
                const err = await res.json()
                console.log(err.errors)
            }
        };
        login()
    }

    return (
        <div>
            Login component
        </div>
    );
}
    
export default Login;