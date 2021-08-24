import {useDispatch, useSelector} from 'react-redux';
import {changeCategoryArray, changeSelectedCategoryArray} from '../../usersSlice';
import {useHistory} from 'react-router-dom';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';

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
        '&:hover': {
          backgroundColor: '#ffeca9',
          borderColor: 'black',
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: '#ffeca9',
          borderColor: '#ffeca9',
        },
        '&:focused': {
          boxShadow: '0 0 0 0.2rem #ffeca9',
        },
    },
    savedCatArray: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
    },
  });

const ProfileViewButton = withStyles({
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

function ViewCategoryList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const categoryArray = useSelector(state => state.categoryArray);
    const citySelection = useSelector(state => state.citySelection);

    const onReset = () => {
        dispatch(changeCategoryArray([]))
        dispatch(changeSelectedCategoryArray([]))
        fetch(`http://localhost:3000/category_selections/profile=${citySelection.id}`, { 
            method: "DELETE" 
        })
    }
    
    return (
        <>
            {/* <Paper classname={classes.savedCatArray}> */}
            <h5>Saved Category Selections:</h5>
                {categoryArray.map(cat => (
                    <Paper  key={cat.id} className={classes.root} elevation={2}>
                        {cat.name}
                    </Paper>
                ))}
            {/* </Paper> */}
            <ProfileViewButton onClick={()=>history.push("/results")}>Go to Results</ProfileViewButton>
            <ProfileViewButton onClick={onReset}>Reset Selections</ProfileViewButton>
        </>
    );
}
    
export default ViewCategoryList;