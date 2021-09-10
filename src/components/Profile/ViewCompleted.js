import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        width: '25%',
        height: '120px',
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
                                ? (<a href={v.url} target="_blank" rel="noreferrer noopener">{`Visit Website`}</a>)
                                : null
                            }
                        </Typography>
                    </Card>
                ))}
            </Grid>
        </>
    );
}
    
export default ViewCompleted;