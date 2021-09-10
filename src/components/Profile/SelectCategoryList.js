import {useDispatch, useSelector} from 'react-redux';
import {changeSelectedCategoryArray, changeSelectCategoryArray} from '../../usersSlice';
import { makeStyles } from '@material-ui/core/styles';
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
  });

function SelectCategoryList({cat}) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const selectedCategoryArray = useSelector(state => state.selectedCategoryArray);
    const selectCategoryArray = useSelector(state => state.selectCategoryArray)

    return (
        <Paper elevation={2} className={classes.root}
            id={cat.id} 
            onClick={()=>{
                dispatch(changeSelectedCategoryArray([...selectedCategoryArray, cat]))
                dispatch(changeSelectCategoryArray(selectCategoryArray.filter(c => c.id !== cat.id)))
            }}
        >
            {cat.name}
        </Paper>
    );
}
    
export default SelectCategoryList;