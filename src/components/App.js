import '../App.css';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {store} from '../store';
import Header from './Header';
import Content from './Content';


function App() {
  const dispatch = useDispatch();

  const usernameInput = useSelector(state => state.usernameInput);
  const passwordInput = useSelector(state => state.passwordInput);

  const handleUsernameChange = (e) => {
    console.log(e)
    dispatch({
      type: "CHANGE_USERNAME_INPUT",
      payload: e.target.value
    })
  }

  const handlePasswordChange = (e) => {
    console.log(e)
    dispatch({
      type: "CHANGE_PASSWORD_INPUT",
      payload: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(usernameInput, passwordInput)
  }

  return (
    <>
      <Header />
      <Content />
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleUsernameChange}></input>
        <input type="text" onChange={handlePasswordChange}></input>
        <input type="submit" value="Submit"></input>
      </form>
    </>
    
  );
}

export default ()=>(
  <Provider store={store}>
    <App />
  </Provider>
);
