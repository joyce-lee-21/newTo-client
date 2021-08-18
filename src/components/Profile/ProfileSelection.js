import {useDispatch, useSelector} from 'react-redux';
import {changeCategoryArrFirst, changeSelectCategoryArray, changeCategoryArray} from '../../usersSlice';
import {useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react'

import SelectCategoryList from './SelectCategoryList';

import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const LoadButtons = withStyles({
    root: {
      boxShadow: 'none',
      fontSize: 14,
      border: '1px solid',
      lineHeight: 1.5,
      backgroundColor: '#9fcbb4',
      borderColor: '#9fcbb4',
      padding: '6px 15px',
      margin: '10px',
      '&:hover': {
        backgroundColor: '#9fcbb4',
        borderColor: '#9fcbb4',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#9fcbb4',
        borderColor: '#9fcbb4',
      },
      '&:focused': {
        boxShadow: '0 0 0 0.2rem #9fcbb4',
      },
    },
  })(Button);

function ProfileSelection() {
    const dispatch = useDispatch();
    const selectCategoryArray = useSelector(state => state.selectCategoryArray);
    const selectedCategoryArray = useSelector(state => state.selectedCategoryArray);
    const categoryArrFirst = useSelector(state => state.categoryArrFirst);
    const categoryArrLength = useSelector(state => state.categoryArrLength);
    const citySelection = useSelector(state => state.citySelection);
    const [errors, setErrors] = useState([])

  

    useEffect(() => {
        async function categories(){
            console.log(categoryArrFirst, categoryArrLength)
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
        <>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
            <div>
            {selectCategoryArray.map(cat => (
                <SelectCategoryList key={cat.id} cat={cat}/>
            ))}
            </div>
            <div>
            {categoryArrFirst > 0 
                ? (<LoadButtons onClick={()=> {
                    dispatch(changeCategoryArrFirst(categoryArrFirst - 10))
                }}>Back</LoadButtons>)
                : null
            }
            <LoadButtons onClick={()=> {
                dispatch(changeCategoryArrFirst(categoryArrFirst + 10))
            }}>Load More</LoadButtons>
            <LoadButtons onClick={onSubmitClick}>
                Submit Selections
            </LoadButtons>
            </div>
        </Grid>
        </>
    );
}
    
export default ProfileSelection;