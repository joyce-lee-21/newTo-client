import {useDispatch, useSelector} from 'react-redux';
import {changeSelectedCategoryArray} from '../../usersSlice';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ProfileSelectButton = withStyles({
    root: {
      boxShadow: 'none',
      fontSize: 14,
      border: '1px solid',
      lineHeight: 1.5,
      backgroundColor: '#ffeca9',
      borderColor: '#ffeca9',
      padding: '6px 15px',
      margin: '20px',
      width: '150px',
      height: '80px',
      '&:hover': {
        backgroundColor: '#ffeca9',
        borderColor: '#ffeca9',
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
  })(Button);

function SelectCategoryList({cat}) {
    const dispatch = useDispatch();
    const selectedCategoryArray = useSelector(state => state.selectedCategoryArray);

    return (
        <ProfileSelectButton 
            id={cat.id} 
            onClick={()=>dispatch(changeSelectedCategoryArray([...selectedCategoryArray, cat]))}
        >
            {cat.name}
        </ProfileSelectButton>
    );
}
    
export default SelectCategoryList;