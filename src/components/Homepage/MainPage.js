import {useHistory} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

const HeaderButton = withStyles({
    root: {
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 14,
      padding: '6px 12px',
      backgroundColor: '#c8e4d6',
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

const useStyles = makeStyles({
    mainPageButtons: {
        margin: '20px',
    },
    mainpage: {
        textAlign: 'center',
        marginBottom: '30px',
    },
    mainpageDesc: {
        backgroundColor: '#ffeca9',
        padding: '30px',
        marginTop: '30px',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        flexDirection: 'column',
    },
    mainpageSteps: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column'
    },
});

function MainPage() {
    const history = useHistory();
    const classes = useStyles();

    return (
        <div>
            <Grid container className={classes.mainpage}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <div className={classes.mainpageDesc}>
                            <div style={{padding: '0px 150px'}}>
                                <h2>Welcome to your new city! We're so glad you're here. Our goal is to recommend places for you to go so you can quickly explore your new city and start to feel at home.</h2>
                            </div>
                            <div style={{backgroundColor: 'white', padding: '30px'}}>
                            <h3>How to use this site</h3>
                            <Grid container style={{display: 'flex', justifyContent: 'center'}}>
                                <Grid item xs={3} className={classes.mainpageSteps}>
                                    <p>If you're a new user, sign up for an account. You'll be asked to provide the city you're in and then be prompted to make your category selections to get started.</p>
                                    <HeaderButton className={classes.mainPageButtons} onClick={()=>history.push("/signup")}>SIGN UP</HeaderButton>
                                </Grid>
                                <Grid item xs={1} className={classes.mainpageSteps}>
                                    <ArrowRightAltIcon style={{fontSize: 40}}/>
                                </Grid>
                                <Grid item xs={3} className={classes.mainpageSteps}>
                                    <p>You can filter by category type, then select up to 5 categories based on your interests. Once your categories are selected, it'll be saved to your Profile page. You can either reset your selections or view your results.</p>
                                </Grid>
                                <Grid item xs={1} className={classes.mainpageSteps}>
                                    <ArrowRightAltIcon style={{fontSize: 40}}/>
                                </Grid>
                                <Grid item xs={3}>
                                    <p>On the Results page, you'll see a list of venues recommended based on your category selections and sorted by rating (if available). You can view more information about each venue by visiting their website, or social channels. If you're interested in saving the venue to your profile, ?????? the venue!</p>
                                </Grid>
                            </Grid>
                            </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
    
export default MainPage;