import {useDispatch, useSelector} from 'react-redux';
import {changeCategoryArray, changeSelectedCategoryArray} from '../../usersSlice';
import {useHistory} from 'react-router-dom';


import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
    const classes = useSelector(state => state.classes);
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
            {categoryArray.map(cat => (
                <>
                {/* <Grid item xs={3} key={cat.id} className={classes.categoryView}> */}
                <span className="tile">
                    <p>{cat.name}</p>
                </span>
                {/* </Grid> */}
                </>
            ))}
            <ProfileViewButton onClick={()=>history.push("/results")}>Go to Results</ProfileViewButton>
            <ProfileViewButton onClick={onReset}>Reset Selections</ProfileViewButton>
        </>
    );
}
    
export default ViewCategoryList;