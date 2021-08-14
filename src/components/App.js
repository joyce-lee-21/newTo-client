import '../App.css';
import { 
  BrowserRouter as Router
} from "react-router-dom";
import Header from './Header';
import Content from './Content';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeUser} from '.././usersSlice';


function App() {
  const dispatch = useDispatch();

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
