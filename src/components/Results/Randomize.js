import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react'
import {changeRandomizeResultsArray, changeRandomizeCatArray} from '../../usersSlice';
import TrendingResults from './TrendingResults';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() => ({
    root: {
        minWidth: 275,
        minHeight: 420,
    },
    randomizeButton: {
        boxShadow: 'none',
        fontSize: 14,
        backgroundColor: '#fcf3d3',
        padding: '6px 15px',
        margin: '10px',
        width: '200px',
            '&:hover': {
                backgroundColor: '#ffeca9',
                boxShadow: 'none',
            },
            '&:active': {
                boxShadow: 'none',
                backgroundColor: '#ffeca9',
            },
            '&:focused': {
                boxShadow: '0 0 0 0.2rem #ffeca9',
            },
    },
    resultButton: {
        boxShadow: 'none',
        fontSize: 14,
        backgroundColor: '#c8e4d6',
        padding: '6px 15px',
        margin: '10px',
        width: '200px',
            '&:hover': {
                backgroundColor: '#9fcbb4',
                boxShadow: 'none',
            },
            '&:active': {
                boxShadow: 'none',
                backgroundColor: '#9fcbb4',
            },
            '&:focused': {
                boxShadow: '0 0 0 0.2rem #9fcbb4',
            },
    },
    catSquare: {
        backgroundColor: '#fcf3d3',
        color: 'black',
        borderRadius: '5px',
        fontSize: 14,
        margin: '10px',
        padding: '3px',
    },
    catContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '20px',
        minHeight: '30vh',
        width: '100%'
    },
    catDiv: {
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: '#ffeca9',
        display: 'flex',
        padding: '10px',
        margin: '20px',
        width: '150px',
        height: '50px',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    catArray: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: '20px',
        width: '100%'
    },
    cardSocial: {
        bottom: 0,
        position: 'relative',
        justifyContent: 'center',
        marginTop: '20px',
    },
    cardRoot: {
        minWidth: 275,
        minHeight: 420,
    },
    cardContent: {
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardRatingSquare: {
        backgroundColor: '#68166c',
        borderRadius: '5px',
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        padding: '7px',
        margin: '5px',
    },
    cardCatSquare: {
        backgroundColor: '#fcf3d3',
        color: 'black',
        borderRadius: '5px',
        fontSize: 14,
        margin: '10px',
        padding: '3px',
    },
    cardCatDiv: {
        justifyContent: 'center',
        alignItems: "center",
        textAlign: 'center',
        marginTop: '25px',
    },
  }));

function Randomize() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const citySelection = useSelector(state => state.citySelection);
    const randomizeResultsArray = useSelector(state => state.randomizeResultsArray);
    const randomizeCatArray = useSelector(state => state.randomizeCatArray);
    const [venueArray, setVenueArray] = useState([]);
    const client_id = useSelector(state => state.clientId);
    const client_secret = useSelector(state => state.clientSecret);
    const version = useSelector(state => state.version);
    const near = citySelection.city;
    
    useEffect(() => {
        randomCatFetch()
    }, [])

    const randomCatFetch = () => {
        dispatch(changeRandomizeResultsArray([]))
        setVenueArray([])
        fetch('http://localhost:3000/secondary_categories/randomize')
        .then(res => res.json())
        .then(categories => {
            dispatch(changeRandomizeCatArray(categories)) 
            const venueExploreArray = [];
            categories.map(cat=> {
                fetch(`https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=${version}&near=${near}&limit=3&categoryId=${cat.fs_category_id}`)
                .then(res => res.json())
                .then(data => {
                    const vArr = data.response.groups[0].items
                    vArr.map(v => venueExploreArray.push(v.venue))
                    setVenueArray([...venueExploreArray])
                })
            })
        })
    }

    const resultsFetch = () => {
        const detailsArray = [];
        venueArray.map(venue => {
            fetch(`https://api.foursquare.com/v2/venues/${venue.id}?client_id=${client_id}&client_secret=${client_secret}&v=${version}`) 
            .then(res => res.json())
            .then(data => {
                const v = data.response.venue
                detailsArray.push(v)
                detailsArray.sort((a, b) => {return b.rating - a.rating})
                dispatch(changeRandomizeResultsArray([...detailsArray]))
            })
        })
    }

    return (
        <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10} style={{display: 'inline'}}>
                <Grid container>
                    <Paper elevation={3} className={classes.catContainer}>
                        <h3>Here are 3 randomly generated categories:</h3>
                        <Grid container className={classes.catArray}>
                            {randomizeCatArray.map(cat => (
                                <Paper elevation={2} className={classes.catDiv} key={cat.id}>
                                    {cat.name}
                                </Paper>
                            ))}
                        </Grid>
                        <div>
                            <Button onClick={randomCatFetch} className={classes.randomizeButton}>
                                Randomize Again
                            </Button>
                            <h3>Once you're satisfied with the categories, click to get results below</h3>
                            <Button onClick={resultsFetch} className={classes.resultButton}>
                                Generate Results
                            </Button>
                        </div>
                        <Grid container spacing={3} className={classes.catArray}>
                        {randomizeResultsArray.length > 0
                            ? randomizeResultsArray.map(venue => (
                                <TrendingResults key={venue.id} venue={venue}/>
                            ))
                            : null
                        }
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
}
    
export default Randomize;