import {useDispatch, useSelector} from 'react-redux';
import {changeCategoryArrFirst, changecategoryArrLength, changeSelectCategoryArray, changeCategoryArray} from '../../usersSlice';
import {useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react'

import SelectCategoryList from './SelectCategoryList';

function ProfileSelection() {
    const dispatch = useDispatch();
    const history = useHistory();
    const selectCategoryArray = useSelector(state => state.selectCategoryArray);
    const selectedCategoryArray = useSelector(state => state.selectedCategoryArray);
    const categoryArrFirst = useSelector(state => state.categoryArrFirst);
    const categoryArrLength = useSelector(state => state.categoryArrLength);
    const citySelection = useSelector(state => state.citySelection);
    const [errors, setErrors] = useState([])

  

    useEffect(() => {
        async function categories(){
            console.log(categoryArrFirst, categoryArrLength)
            // const res = await fetch("http://localhost:3000/primary_categories", {
            //     method: "GET",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            // })
            const res = await fetch(`http://localhost:3000/categories/list/${categoryArrFirst}&${categoryArrLength}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if(res.ok){
                const arr = await res.json()
                console.log(arr)
                const primary_categories = [];
                arr.forEach((cat) => {
                    primary_categories.push(cat)
                })
                console.log(primary_categories)
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
        async function catArray(cat){
            const res = await fetch(`http://localhost:3000/category_selections/`, {
                method: "POST",
                // credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    name: cat.name, 
                    city_profile_id: citySelection.id,
                    fs_category_id: cat.fs_category_id,
                    primary_category_id: cat.id
                    }),
            })
            if(res.ok){
                const selected = await res.json()
                // dispatch(changeCategoryArray([...categoryArray, selected]))
                console.log("category_selection added")
                // console.log(categoryArray)
                // set city selection if user only has 1 city profile
            } else {
                const err = await res.json()
                console.log(err.errors)
                setErrors(err.errors)
            }
        };
        // function catArray(cat){
        //     console.log(cat)
        // }
        selectedCategoryArray.forEach(cat => catArray(cat))
    }

    return (
        <div>
            {selectCategoryArray.map(cat => (
                <SelectCategoryList key={cat.id} cat={cat}/>
            ))}
            {categoryArrFirst > 0 
                ? (<button onClick={()=> {
                    dispatch(changeCategoryArrFirst(categoryArrFirst - 10))
                }}>Back</button>)
                : null
            }
            <button onClick={()=> {
                dispatch(changeCategoryArrFirst(categoryArrFirst + 10))
            }}>Next</button>
            <button onClick={onSubmitClick}>
                Submit Selections
            </button>
        </div>
    );
}
    
export default ProfileSelection;