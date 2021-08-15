import {useDispatch, useSelector} from 'react-redux';
import {changeCategoryArrFirst, changeCategoryArrLast, changeSelectCategoryArray, changeCategoryArray} from '../../usersSlice';
import {useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react'

import SelectCategoryList from './SelectCategoryList';

function ProfileSelection() {
    const dispatch = useDispatch();
    const history = useHistory();
    const selectCategoryArray = useSelector(state => state.selectCategoryArray);
    const selectedCategoryArray = useSelector(state => state.selectedCategoryArray);
    const categoryArrFirst = useSelector(state => state.categoryArrFirst);
    const categoryArrLast = useSelector(state => state.categoryArrLast);
    const [errors, setErrors] = useState([])

    const primary_categories = [];

    useEffect(() => {
        async function categories(){
            // const res = await fetch("http://localhost:3000/primary_categories", {
            //     method: "GET",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            // })
            const res = await fetch(`http://localhost:3000/categories/list/${categoryArrFirst}&${categoryArrLast}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if(res.ok){
                const arr = await res.json()
                // console.log(arr)
                // console.log(primary_categories)
                arr.forEach((cat) => {
                    primary_categories.push(cat)
                })
                dispatch(changeSelectCategoryArray(primary_categories)) 
                // history.push('/profile')
            } else {
                const err = await res.json()
                // console.log(err.errors)
                setErrors(err.errors)
            }
        };
        categories()
    }, [categoryArrFirst])

    // console.log(selectCategoryArray[arrayStart, arrayEnd])
    const onSubmitClick = () => {
        dispatch(changeCategoryArray(selectedCategoryArray))
        // build fetch to POST to "http://localhost:3000/category_selections"
    }

    return (
        <div>
            ProfileSelection
            {selectCategoryArray.map(cat => (
                <SelectCategoryList key={cat.id} cat={cat} catArray={primary_categories}/>
            ))}
            {categoryArrFirst > 0 
                ? (<button onClick={()=> {
                    dispatch(changeCategoryArrFirst(categoryArrFirst - 5))
                    dispatch(changeCategoryArrLast(categoryArrLast - 5))
                }}>Back</button>)
                : null
            }
            <button onClick={()=> {
                dispatch(changeCategoryArrFirst(categoryArrFirst + 5))
                dispatch(changeCategoryArrLast(categoryArrLast + 5))
            }}>Next</button>
            <button onClick={onSubmitClick}>
                Submit Selections
            </button>
        </div>
    );
}
    
export default ProfileSelection;