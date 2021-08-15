import {useDispatch, useSelector} from 'react-redux';
import {changeCategoryArray, changeSelectedCategoryArray} from '../../usersSlice';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'

import ViewCategoryCard from './ViewCategoryCard';


function ViewCategoryList() {
    const dispatch = useDispatch();
    const categoryArray = useSelector(state => state.categoryArray);
    const [errors, setErrors] = useState([])

    return (
        <div>
            {categoryArray.map(cat => (
                <ViewCategoryCard key={cat.id} cat={cat}/>
            ))}
            <button onClick={()=>{
                dispatch(changeCategoryArray([[]]))
                dispatch(changeSelectedCategoryArray([]))
            }}>Reset Selections</button>
        </div>
    );
}
    
export default ViewCategoryList;