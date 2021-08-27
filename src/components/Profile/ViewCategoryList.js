import {useDispatch, useSelector} from 'react-redux';
import {changeCategoryArray, changeSelectedCategoryArray, changeVenuesResultsArray} from '../../usersSlice';
import {useHistory} from 'react-router-dom';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: '#ffeca9',
        display: 'flex',
        padding: '10px',
        margin: '20px',
        width: '120px',
        height: '50px',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    savedCatArray: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    catButtons: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
  });

const CategoryViewResultsButton = withStyles({
    root: {
      boxShadow: 'none',
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: '#c8e4d6',
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

  const CatResetButton = withStyles({
    root: {
        boxShadow: 'none',
        fontSize: 14,
        fontWeight: 'bold',
        color: "white",
        backgroundColor: '#955698',
        padding: '6px 15px',
        margin: '10px',
        '&:hover': {
            backgroundColor: '#68166c',
            borderColor: '#9fcbb4',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#68166c',
            borderColor: '#9fcbb4',
        },
        '&:focused': {
            boxShadow: '0 0 0 0.2rem #68166c',
        },
        },
  })(Button);

function ViewCategoryList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const categoryArray = useSelector(state => state.categoryArray);
    const citySelection = useSelector(state => state.citySelection);

    const onReset = () => {
        dispatch(changeCategoryArray([]))
        dispatch(changeSelectedCategoryArray([]))
        dispatch(changeVenuesResultsArray([]))
        fetch(`http://localhost:3000/category_selections/profile=${citySelection.id}`, { 
            method: "DELETE" 
        })
    }
    
    return (
        <>
            <h4 style={{marginBottom: '5px'}}>Saved Categories</h4>
            <Grid container className={classes.savedCatArray} style={{height: '250px'}}>
                {categoryArray.map(cat => (
                    <Paper key={cat.id} className={classes.root} elevation={2}>
                        {cat.name}
                    </Paper>
                ))}
            </Grid>
            {/* <Grid container classname={classes.catButtons}> */}
                <CategoryViewResultsButton onClick={()=>history.push("/results")}>Go to Results</CategoryViewResultsButton>
                <CatResetButton onClick={onReset}>Reset Selections</CatResetButton>
            {/* </Grid> */}
        </>
    );
}
    
export default ViewCategoryList;