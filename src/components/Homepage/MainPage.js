// import {useDispatch, useSelector} from 'react-redux';
// import {changeHpView, changePasswordInput, changeUsernameInput} from '../../usersSlice';
import {useHistory} from 'react-router-dom';

function MainPage() {
    // const dispatch = useDispatch();
    const history = useHistory();


    return (
        <div>
            <h1>Welcome!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia porttitor laoreet. Fusce dui tellus, ornare id vehicula nec, elementum et ligula. Pellentesque felis arcu, aliquam at dolor vel, malesuada aliquet dui. Suspendisse varius vel nulla ac convallis. Donec auctor ligula in odio condimentum, non accumsan ligula mollis. Ut sed elit ut arcu tincidunt mattis. Nunc non bibendum mi. Phasellus diam nunc, dignissim quis laoreet eu, molestie et massa. Vestibulum id maximus dui. Ut et metus varius, malesuada neque id, condimentum nulla. Sed dapibus interdum suscipit. Duis mi odio, tristique in augue non, porttitor luctus ex. Nam dapibus convallis ipsum, vitae ullamcorper tellus pharetra et.</p>
            <button onClick={()=>history.push("/login")}>Login</button>
            <button onClick={()=>history.push("/signup")}>Sign Up</button>
        </div>
    );
}
    
export default MainPage;