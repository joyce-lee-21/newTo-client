import {useDispatch, useSelector} from 'react-redux';
import {changeCategoryArrFirst, changeSelectCategoryArray, changeCategoryArray, fetchPrimaryCats, changeFilterByPrimaryCategory} from '../../usersSlice';
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

  const CatButtons = withStyles({
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
    const primaryCategories = useSelector(state => state.primaryCategories);
    const filterByPrimaryCategory = useSelector(state => state.filterByPrimaryCategory);
    const categoryArray = useSelector(state => state.selectedCategoryArray);
    const categoryArrFirst = useSelector(state => state.categoryArrFirst);
    const categoryArrLength = useSelector(state => state.categoryArrLength);
    const citySelection = useSelector(state => state.citySelection);
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(fetchPrimaryCats());
        async function categories(){
            // console.log(filterByPrimaryCategory)
            const res = await fetch(`http://localhost:3000/categories/list/${filterByPrimaryCategory}/${categoryArrFirst}&${categoryArrLength}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if(res.ok){
                const arr = await res.json()
                // console.log(arr)
                const primary_categories = [];
                arr.forEach((cat) => {
                    primary_categories.push(cat)
                })
                // console.log(primary_categories)
                dispatch(changeSelectCategoryArray(primary_categories)) 
            } else {
                const err = await res.json()
                // console.log(err.errors)
                setErrors(err.errors)
            }
        };
        categories()
    }, [categoryArrFirst || filterByPrimaryCategory])

    const onSubmitClick = () => {
        dispatch(changeCategoryArray(selectedCategoryArray))
        async function catArray(cat){
            const selection = {
                name: cat.name, 
                city_profile_id: citySelection.id,
                fs_category_id: cat.fs_category_id,
                primary_category_id: cat.primary_category_id
            }
            const res = await fetch(`http://localhost:3000/category_selections/`, {
                method: "POST",
                // credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({category_selection: selection}),
            })
            if(res.ok){
                const selected = await res.json()
                // console.log(selected)
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

    const handleCategoryFilter = (e, cat) => {
        dispatch(changeFilterByPrimaryCategory(cat.id))
        dispatch(changeCategoryArrFirst(0))
    }

    return (
        <>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
            <div>
                <h5>Filter by category type:</h5>
                <CatButtons onClick={(e, cat={id: 0})=>handleCategoryFilter(e, cat)}>All</CatButtons>
                {primaryCategories.map(cat=> (
                    <CatButtons key={cat.id} onClick={(e)=>handleCategoryFilter(e, cat)}>{cat.name}</CatButtons>
                ))}
            </div>
            <div>
                {selectCategoryArray.map(cat => (
                    <SelectCategoryList key={cat.id} cat={cat}/>
                ))}
            </div>
            <div>
                {categoryArrFirst > 0 
                    ? (<LoadButtons onClick={()=> {
                        dispatch(changeCategoryArrFirst(categoryArrFirst - 12))
                    }}>Back</LoadButtons>)
                    : null
                }
                {selectCategoryArray.length === 12 
                    ? (<LoadButtons onClick={()=> {
                        dispatch(changeCategoryArrFirst(categoryArrFirst + 12))
                    }}>Load More</LoadButtons>)
                    : null
                }
                <LoadButtons onClick={onSubmitClick}>
                    Submit Selections
                </LoadButtons>
            </div>
        </Grid>
        </>
    );
}
    
export default ProfileSelection;