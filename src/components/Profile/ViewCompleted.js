import {useDispatch, useSelector} from 'react-redux';
import {changeCategoryArray, changeSelectedCategoryArray} from '../../usersSlice';
import {useHistory} from 'react-router-dom';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        width: 200,
        height: 120,
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: '#d9d1b2',
        display: 'inline-block',
        padding: '5px',
        margin: '10px',
    },
    content: {
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
  });

// const CompletedViewButton = withStyles({
//     root: {
//       boxShadow: 'none',
//       fontSize: 14,
//       border: '1px solid',
//       lineHeight: 1.5,
//       backgroundColor: '#9fcbb4',
//       borderColor: '#9fcbb4',
//       padding: '6px 15px',
//       margin: '10px',
//       '&:hover': {
//         backgroundColor: '#9fcbb4',
//         borderColor: '#9fcbb4',
//         boxShadow: 'none',
//       },
//       '&:active': {
//         boxShadow: 'none',
//         backgroundColor: '#9fcbb4',
//         borderColor: '#9fcbb4',
//       },
//       '&:focused': {
//         boxShadow: '0 0 0 0.2rem #9fcbb4',
//       },
//     },
//   })(Button);

function ViewCompleted() {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const completedVenuesArray = useSelector(state => state.completedVenuesArray);
    
    return (
        <>
            <h4>Venues Visited</h4>
            <Grid container style={{justifyContent: 'center'}}>
                {completedVenuesArray.map(v => (
                    <Card key={v.id} className={classes.root}>
                        <Typography className={classes.content}>
                            <p style={{fontWeight: "bold"}}>{v.name}</p>
                            <p>{v.address}</p>
                            {v.url 
                                ? (<a href={v.url}>{`Visit Website`}</a>)
                                : null
                            }
                        </Typography>
                    </Card>
                ))}
            </Grid>
            {/* <CompletedViewButton onClick={()=>history.push("/results")}>Go to Results</CompletedViewButton> */}
        </>
    );
}
    
export default ViewCompleted;