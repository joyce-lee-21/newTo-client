import {useDispatch, useSelector} from 'react-redux';
// import {changeUser} from '../../usersSlice';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'

import ViewCategoryCard from './ViewCategoryCard';


function ViewCategoryList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const categoryArray = useSelector(state => state.categoryArray);
    const [errors, setErrors] = useState([])

    const onCategoryChange = (e) => {
        console.log(e)
    }

    return (
        <div>
            {categoryArray.map(cat => (
                <ViewCategoryCard cat={cat}/>
            ))}
            <button onClick={onCategoryChange}>Change</button>
        </div>
    );
}
    
export default ViewCategoryList;