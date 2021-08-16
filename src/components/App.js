import '../App.css';
import { 
  BrowserRouter as Router
} from "react-router-dom";
import Header from './Header';
import Content from './Content';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeUser, changeIsLoggedIn} from '.././usersSlice';


function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const handleLogin = (data) => {
    dispatch(changeIsLoggedIn(true))
    dispatch(changeUser(data.user))
  }

  const handleLogout = () => {
    dispatch(changeIsLoggedIn(false))
    dispatch(changeUser(null))
  }

  useEffect(() => {
    loginStatus();
  }, []);

  const loginStatus = () => {
    fetch("http://localhost:3000/logged_in", {
      method: "GET",
      credentials: "include"
    })
    .then((r) => r.json())
    .then(data=> {
      // console.log(data)
      if (data.logged_in) {
        handleLogin(data)
      } else {
        handleLogout()
      }
    })
  }

  return (
    <>
      <Router>
        <Header />
        <Content />
      </Router>
    </>
    
  );
}

export default App; 
// (){
//   <Provider store={store}>
//     <App/>
//   </Provider>
// }
