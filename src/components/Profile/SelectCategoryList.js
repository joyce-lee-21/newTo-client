import {useDispatch, useSelector} from 'react-redux';
import {changeSelectedCategoryArray} from '../../usersSlice';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'

function SelectCategoryList({cat}) {
    const dispatch = useDispatch();
    const history = useHistory();
    // const selectCategoryArray = useSelector(state => state.selectCategoryArray);
    const selectedCategoryArray = useSelector(state => state.selectedCategoryArray);
    const [errors, setErrors] = useState([])

    return (
        <div>
            <button id={cat.id} onClick={()=>dispatch(changeSelectedCategoryArray([...selectedCategoryArray, cat]))}>{cat.name}</button>
        </div>
    );
}
    
export default SelectCategoryList;