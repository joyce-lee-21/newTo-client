import {useDispatch, useSelector} from 'react-redux';
import {changeCategoryArray, changeSelectedCategoryArray} from '../../usersSlice';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'

import ViewCategoryCard from './ViewCategoryCard';


function ViewCategoryList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const categoryArray = useSelector(state => state.categoryArray);
    const citySelection = useSelector(state => state.citySelection);
    const [errors, setErrors] = useState([])

    const onReset = () => {
        dispatch(changeCategoryArray([]))
        dispatch(changeSelectedCategoryArray([]))
        // async function resetCatArray(){
        //     const res = await fetch(`http://localhost:3000/category_selections/${citySelection.id}`, { 
        //     method: "DELETE" 
        // })
        //     if (res.ok) {
        //         console.log("selections removed from account")
        //         // history.push("/")
        //     }
        // }
        // resetCatArray();
        // categoryArray.forEach(cat => resetCatArray(cat))

        // Deletes all selections by city_profile_id
        fetch(`http://localhost:3000/category_selections/profile=${citySelection.id}`, { 
            method: "DELETE" 
        })
        // .then((r) => console.log(r))
    }
    

    return (
        <div>
            {categoryArray.map(cat => (
                <ViewCategoryCard key={cat.id} cat={cat}/>
            ))}
            <button onClick={()=>history.push("/results")}>Go to Results</button>
            <button onClick={onReset}>Reset Selections</button>
        </div>
    );
}
    
export default ViewCategoryList;