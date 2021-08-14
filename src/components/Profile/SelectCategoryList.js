import {useDispatch, useSelector} from 'react-redux';
import {changeUser} from '../../usersSlice';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'

function SelectCategoryList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const usernameInput = useSelector(state => state.usernameInput);
    const passwordInput = useSelector(state => state.passwordInput);
    const [errors, setErrors] = useState([])

    return (
        <div>
            SelectCategoryList component
        </div>
    );
}
    
export default SelectCategoryList;