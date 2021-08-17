import '../App.css';
import { 
  BrowserRouter as Router
} from "react-router-dom";
import Header from './Header';
import Content from './Content';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// ***---V2 CODE---***
// import {changeUser, changeIsLoggedIn} from '.././usersSlice';

// ***---V1 CODE---***
import {changeUser} from '.././usersSlice';


function App() {
  const dispatch = useDispatch();

  // ***---CODE FOR WIP SESSION PERSIST SOLUTION (V2)---***

  // const isLoggedIn = useSelector(state => state.isLoggedIn);

  // const handleLogin = (data) => {
  //   dispatch(changeIsLoggedIn(true))
  //   dispatch(changeUser(data.user))
  // }

  // const handleLogout = () => {
  //   dispatch(changeIsLoggedIn(false))
  //   dispatch(changeUser(null))
  // }

  // useEffect(() => {
  //   loginStatus();
  // }, []);

  // const loginStatus = () => {
  //   fetch("http://localhost:3000/logged_in", {
  //     method: "GET",
  //     credentials: "include"
  //   })
  //   .then((r) => r.json())
  //   .then(data=> {
  //     // console.log(data)
  //     if (data.logged_in) {
  //       handleLogin(data)
  //     } else {
  //       handleLogout()
  //     }
  //   })
  // }

  // ***---CODE FOR SESSION NOT PERSISTING (V1) ---***
  useEffect(() => {
    fetch("http://localhost:3000/me", {
      method: "GET",
      credentials: "include"
    })
    .then((r) => {
      if (r.ok) {
        r.json()
        .then((user) => {
          // console.log('App useEffect fetch:', user)
          dispatch(changeUser(user))
        });
      }
    })
  }, []);

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
