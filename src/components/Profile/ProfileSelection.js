import {useDispatch, useSelector} from 'react-redux';
import {
    changeCategoryArrFirst, 
    changeSelectCategoryArray, 
    changeResCategoryArray,
    changeCategoryArray, 
    fetchPrimaryCats, 
    changeFilterByPrimaryCategory
} from '../../usersSlice';
import {useState, useEffect} from 'react'

import SelectCategoryList from './SelectCategoryList';
import SelectedCategoryList from './SelectedCategoryList';

import Grid from '@material-ui/core/Grid';

import { withStyles, useTheme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
    CategoryProvider,
    CategoryTitle,
    CategoryItem,
  } from '@mui-treasury/components/menu/category';
import { useNikiCategoryMenuStyles } from '@mui-treasury/styles/categoryMenu/niki';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
    catActive: {
        display: 'flex',
        justifyContent: 'flex-start',
        '&:active': {
            textDecoration: 'underline #9fcbb4',
            // backgroundColor: '#9fcbb4',
        },
        '&:focused': {
            textDecoration: 'underline #9fcbb4',
            // backgroundColor: '#9fcbb4',
        },
        '&:hover': {
            textDecoration: 'underline #9fcbb4',
        },
    },
    catMenu: {
        backgroundColor: '#e5e8e8',
        padding: '20px',
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        minHeight: '500px',
    },
    catArray: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '20px',
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        minHeight: '500px',
        justifyContent: 'center',
    },
    selections: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '20px',
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        minHeight: '200px',
    },
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: "white",
        border: '2px solid #000',
        boxShadow: [5],
        padding: '10px',
    },
});

const LoadButtons = withStyles({
    root: {
      fontSize: 14,
      backgroundColor: '#9fcbb4',
      padding: '6px 15px',
      margin: '10px',
      '&:hover': {
        backgroundColor: '#9fcbb4',
        borderColor: '#9fcbb4',
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
    const resCategoryArray = useSelector(state => state.resCategoryArray);
    const categoryArrFirst = useSelector(state => state.categoryArrFirst);
    const categoryArrLength = useSelector(state => state.categoryArrLength);
    const citySelection = useSelector(state => state.citySelection);
    const [errors, setErrors] = useState([]);
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const classes = useStyles();
    const theme = useTheme();

    const secondary_categories = [];

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
                arr.forEach((cat) => {
                    secondary_categories.push(cat)
                })
                // console.log(secondary_categories)
                dispatch(changeSelectCategoryArray(secondary_categories)) 
                dispatch(changeResCategoryArray(secondary_categories))
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
        selectedCategoryArray.forEach(cat => catArray(cat))
    }

    // const handleCategoryFilter = (e, cat) => {
    //     dispatch(changeFilterByPrimaryCategory(cat.id))
    //     dispatch(changeCategoryArrFirst(0))
    // }
    

    const handleClick = (e, cat) => {
        e.preventDefault();
        setIndex(cat.id);
        dispatch(changeFilterByPrimaryCategory(cat.id))
        dispatch(changeCategoryArrFirst(0))
      };

      console.log(selectedCategoryArray)
    
    return (
        <>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
            <Grid container>
                <Grid item xs={3}>
                    {/* <h5>Filter by category type:</h5> */}
                    {/* <CatButtons onClick={(e, cat={id: 0})=>handleCategoryFilter(e, cat)}>All</CatButtons>
                    {primaryCategories.map(cat=> (
                        <CatButtons key={cat.id} onClick={(e)=>handleCategoryFilter(e, cat)}>{cat.name}</CatButtons>
                    ))} */}
                    <CategoryProvider useStyles={useNikiCategoryMenuStyles}>
                        <Paper elevation={3} className={classes.catMenu}>
                            <h4>Filter by Category Type:</h4>
                        {/* <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="select-multiple-native">
                            Filter by Category Type:
                            </InputLabel>
                            <Select
                                multiple
                                native
                                value={cat}
                                onChange={setCat(e.target.value)}
                                inputProps={{
                                    id: 'select-multiple-native',
                                }}
                            >
                            <option value={"All"} onClick={(e, cat={id: 0})=>handleCategoryFilter(e, cat)}>
                                All Categories
                            </option>
                            {primaryCategories.map((cat) => (
                                <option key={cat.id} value={cat.name} onClick={(e, cat={id: 0})=>handleCategoryFilter(e, cat)}>
                                {cat.name}
                                </option>
                            ))}
                            </Select> 
                        </FormControl>*/}
                        <CategoryItem className={classes.catActive} active={index === 0} 
                            onClick={(e, cat={id: 0})=>handleClick(e, cat)}
                        >
                            All Categories
                        </CategoryItem>
                        {primaryCategories.map(cat=> 
                            (<CategoryItem key={cat.id} className={classes.catActive} active={index === cat.id} onClick={(e)=>handleClick(e, cat)}>{cat.name}</CategoryItem>)
                        )}
                        </Paper>
                    </CategoryProvider>
                </Grid>
                <Grid item xs={9}>
                    <Paper elevation={3} className={classes.catArray}>
                        <h4>Select up to 5 Categories</h4>
                        <Grid container>
                        {selectCategoryArray.map(cat => (
                            <SelectCategoryList key={cat.id} cat={cat}/>
                        ))}
                        </Grid>
                        <div style={{marginTop: '30px'}}>
                            {categoryArrFirst > 0 
                                ? (<LoadButtons onClick={()=> {
                                    dispatch(changeCategoryArrFirst(categoryArrFirst - 12))
                                }}>
                                <KeyboardArrowLeft />
                                Back
                                </LoadButtons>)
                                : null
                            }
                            {resCategoryArray.length === 12 
                                ? (<LoadButtons onClick={()=> {
                                    dispatch(changeCategoryArrFirst(categoryArrFirst + 12))
                                }}>
                                    More
                                    <KeyboardArrowRight />
                                </LoadButtons>)
                                : null
                            }
                        </div>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Paper elevation={3} className={classes.selections}>
                        <h4>Category Selections</h4>
                        <Grid container>
                            <SelectedCategoryList />
                        </Grid>
                        <LoadButtons onClick={()=>onSubmitClick()}>Save</LoadButtons>
                    </Paper>
                    {/* {selectedCategoryArray.map(selection => {
                        <SelectedCategoryList key={selection.id} selection={selection}/>
                    })} */}
                    
                </Grid>
            </Grid>
        </Grid>
        </>
    );
}
    
export default ProfileSelection;