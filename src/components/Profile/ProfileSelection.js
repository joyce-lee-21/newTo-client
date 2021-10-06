import {useDispatch, useSelector} from 'react-redux';
import {
    changeCategoryArrFirst, 
    changeSelectCategoryArray, 
    changeSelectedCategoryArray,
    changeResCategoryArray,
    changeCategoryArray, 
    fetchPrimaryCats, 
    changeFilterByPrimaryCategory
} from '../../usersSlice';
import {useState, useEffect} from 'react'
import SelectCategoryList from './SelectCategoryList';
import SelectedCategoryList from './SelectedCategoryList';

import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
    CategoryProvider,
    CategoryItem,
  } from '@mui-treasury/components/menu/category';
import { useNikiCategoryMenuStyles } from '@mui-treasury/styles/categoryMenu/niki';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
    catActive: {
        display: 'flex',
        justifyContent: 'flex-start',
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
        borderBottomLeftRadius: 0,
        minHeight: '500px',
    },
    catArray: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '20px',
        borderBottomRightRadius: 0,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        minHeight: '500px',
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
        marginBottom: '30px',
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

function ProfileSelection() {
    const dispatch = useDispatch();
    const selectCategoryArray = useSelector(state => state.selectCategoryArray);
    const selectedCategoryArray = useSelector(state => state.selectedCategoryArray);
    const primaryCategories = useSelector(state => state.primaryCategories);
    const filterByPrimaryCategory = useSelector(state => state.filterByPrimaryCategory);
    const resCategoryArray = useSelector(state => state.resCategoryArray);
    const categoryArrFirst = useSelector(state => state.categoryArrFirst);
    const categoryArrLength = useSelector(state => state.categoryArrLength);
    const citySelection = useSelector(state => state.citySelection);
    const [index, setIndex] = useState(0);
    const [errors, setErrors] = useState([]);
    const classes = useStyles();

    const secondary_categories = [];
    const fetchDependencies = categoryArrFirst || filterByPrimaryCategory

    useEffect(() => {
        dispatch(fetchPrimaryCats());
        fetch(`https://newto-backend.herokuapp.com/categories/list/${filterByPrimaryCategory}/${categoryArrFirst}&${categoryArrLength}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(arr => {
            arr.forEach((cat) => secondary_categories.push(cat))
            dispatch(changeSelectCategoryArray(secondary_categories)) 
            dispatch(changeResCategoryArray(secondary_categories))
        })
    }, [fetchDependencies])


    const onSubmitClick = () => {
        if (selectedCategoryArray.length <= 5) {
            dispatch(changeCategoryArray(selectedCategoryArray))
            selectedCategoryArray.forEach(cat => {
                const selection = {
                    name: cat.name, 
                    city_profile_id: citySelection.id,
                    fs_category_id: cat.fs_category_id,
                    primary_category_id: cat.primary_category_id
                }
                fetch(`https://newto-backend.herokuapp.com/category_selections/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({category_selection: selection}),
                })
                .then(res => res.json())
                .then(data => {
                    console.log(`category_selection added: ${data}`)
                    dispatch(changeSelectedCategoryArray([]))
                })
                .catch(error => console.log(error))
            })
        } else {
            setErrors("Please limit your category selections to 5 total.")
        }
    }
    
    const handleClick = (e, cat) => {
        e.preventDefault();
        setIndex(cat.id);
        dispatch(changeFilterByPrimaryCategory(cat.id))
        dispatch(changeCategoryArrFirst(0))
    };
    
    return (
        <>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
            <Grid container>
                <Grid item xs={3}>
                    <CategoryProvider useStyles={useNikiCategoryMenuStyles}>
                        <Paper elevation={3} className={classes.catMenu}>
                            <h4>Filter by Category Type:</h4>
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
                        <Grid container style={{justifyContent: 'center'}}>
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
                        {errors ? (<p style={{color: 'red'}}>{`${errors}`}</p>) : null}
                        <Grid container style={{justifyContent: 'center'}}>
                            <SelectedCategoryList />
                        </Grid>
                        <LoadButtons onClick={()=>onSubmitClick()}>Save</LoadButtons>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
        </>
    );
}
    
export default ProfileSelection;