import {useDispatch, useSelector} from 'react-redux';
import {changeCategoryArray, changeSelectedCategoryArray} from '../../usersSlice';
import {useHistory} from 'react-router-dom';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
    root: {
      width: 300,
      height: 160,
      textAlign: 'center',
      alignItems: 'center',
      backgroundColor: '#fcf3d3',
      display: 'inline-block',
      padding: '5px',
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
            <div>
                {categoryArray.map(cat => (
                    <Card key={cat.id} className={classes.root} variant="outlined">
                    {/* <span className="category-tile"> */}
                        <p>{cat.name}</p>
                    {/* </span> */}
                    </Card>
                ))}
            </div>
            <ProfileViewButton onClick={()=>history.push("/results")}>Go to Results</ProfileViewButton>
            <ProfileViewButton onClick={onReset}>Reset Selections</ProfileViewButton>
        </>
    );
}
    
export default ViewCategoryList;