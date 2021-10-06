import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {changeVenuesDetailsArray, changeFilteredVenueResults} from '../../usersSlice';

import VenueItem from './VenueItem';
import VenuesMapContainer from '../Maps/VenuesMapContainer';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Fab from '@material-ui/core/Fab';
import RoomIcon from '@material-ui/icons/Room';

const useStyles = makeStyles({
    resultsMap: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
    }
});

function VenueList() {
    const dispatch = useDispatch();
    const [category, setCategory] = useState("All");
    const [map, setMap] = useState(false);
    const client_id = useSelector(state => state.clientId);
    const client_secret = useSelector(state => state.clientSecret);
    const version = useSelector(state => state.version);
    const venuesResultsArray = useSelector(state => state.venuesResultsArray);
    const venuesDetailsArray = useSelector(state => state.venuesDetailsArray);
    const filteredVenueResults = useSelector(state => state.filteredVenueResults);
    const categoryArray = useSelector(state => state.categoryArray);
    const classes = useStyles();

    useEffect(() => {
        detailsFetch();
    }, [venuesResultsArray])

    const detailsFetch = () => {
        dispatch(changeVenuesDetailsArray([]))
        dispatch(changeFilteredVenueResults([]))
        const detailsArray = [];
        venuesResultsArray.forEach(venue => {
            fetch(`https://api.foursquare.com/v2/venues/${venue.id}?client_id=${client_id}&client_secret=${client_secret}&v=${version}`) 
            .then(res => res.json())
            .then(data => {
                const v = data.response.venue
                detailsArray.push(v)
                detailsArray.sort((a, b) => {return b.rating - a.rating})
                dispatch(changeVenuesDetailsArray([...detailsArray]))
                dispatch(changeFilteredVenueResults([...detailsArray]))
            })
        })
    }

    const onCategoryFilter = (e) => {
        setCategory(e.target.value);
        if (e.target.value !== "All") {
            const filterVenue = venuesDetailsArray.filter(v => {
                let catMatch = v.categories.filter(cat => cat.name === e.target.value)
                if (catMatch.length > 0) {
                    return v
                } else {
                    return null
                }
            })
            filterVenue.sort((a, b) => {return b.rating - a.rating})
            dispatch(changeFilteredVenueResults(filterVenue))
        } else {
            dispatch(changeFilteredVenueResults(venuesDetailsArray))
        }
    }

    const onQuery = (e) => {
        const query = e.target.value
        const filtered = venuesDetailsArray.filter(v=> v.name.toLowerCase().includes(query.toLowerCase()))
        dispatch(changeFilteredVenueResults(filtered))
    }

    return (
        <>
        <Grid item xs={1}></Grid>
        <Grid item xs={10} style={{display: 'inline'}}>
            <div style={{height: '100px', width: '65%', margin: 'auto', textAlign: 'center'}}>
                <h3>
                    Based on your selected categories, these are the top rated places.
                    <br></br>
                    ❤️ to save venues to your profile!
                </h3>
            </div>
            <Grid container>
                <Grid item xs={5}>
                    <TextField id="outlined-basic" label="Filter Results by Name:" variant="outlined" style={{width: '300px', marginBottom: '20px'}} onChange={(e)=>onQuery(e)}/>
                </Grid>    
                <Grid item xs={5}>
                    <FormControl variant="outlined" style={{minWidth: 300}}>
                        <InputLabel id="demo-simple-select-outlined-label">Filter Results by Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={(e)=>onCategoryFilter(e)}
                            label="Filter Results by Category"
                            value={category}
                        >
                            <MenuItem value="All">All</MenuItem>
                            {categoryArray.map(cat=> 
                                (<MenuItem key={`${cat.id}`} value={`${cat.name}`}>{cat.name}</MenuItem>)
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <Fab onClick={()=>setMap(!map)}>
                        <RoomIcon style={{fontSize: '48px', backgroundColor: '#9fcbb4', borderRadius: '30px', padding: '5px'}}/>
                    </Fab>
                </Grid>
            </Grid>
            <Grid className={classes.resultsMap}>
                {map 
                    ? <VenuesMapContainer /> 
                    : null
                }
            </Grid>
            <Grid container spacing={3}>
                {filteredVenueResults.length >= 1 
                    ? filteredVenueResults.map(v => <VenueItem key={v.id} venue={v}/>)
                    : null
                }
            </Grid>
        </Grid>
        </>
        
    );
}
    
export default VenueList;