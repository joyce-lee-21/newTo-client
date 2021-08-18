import {useSelector} from 'react-redux';
// import {changeHpView, changePasswordInput, changeUsernameInput} from '../../usersSlice';
import {useHistory} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const HeaderButton = withStyles({
    root: {
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 14,
      padding: '6px 12px',
      border: '1px solid',
      lineHeight: 1.5,
      backgroundColor: 'none',
      borderColor: 'gray',
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

function MainPage() {
    // const dispatch = useDispatch();
    const history = useHistory();
    const classes = useSelector(state => state.classes);

    return (
        <div>
            <Grid container className={classes.mainpage}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <h1>Welcome!</h1>
                    <div className="mainpage-desc">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia porttitor laoreet. Fusce dui tellus, ornare id vehicula nec, elementum et ligula. Pellentesque felis arcu, aliquam at dolor vel, malesuada aliquet dui. Suspendisse varius vel nulla ac convallis. Donec auctor ligula in odio condimentum, non accumsan ligula mollis. Ut sed elit ut arcu tincidunt mattis. Nunc non bibendum mi. Phasellus diam nunc, dignissim quis laoreet eu, molestie et massa. Vestibulum id maximus dui. Ut et metus varius, malesuada neque id, condimentum nulla. Sed dapibus interdum suscipit. Duis mi odio, tristique in augue non, porttitor luctus ex. Nam dapibus convallis ipsum, vitae ullamcorper tellus pharetra et.</p>
                    </div>
                    <HeaderButton variant="outlined" className={classes.mainPageButtons} onClick={()=>history.push("/login")}>LOGIN</HeaderButton>
                    <HeaderButton variant="outlined" className={classes.mainPageButtons} onClick={()=>history.push("/signup")}>SIGN UP</HeaderButton>
                </Grid>
            </Grid>
        </div>
    );
}
    
export default MainPage;