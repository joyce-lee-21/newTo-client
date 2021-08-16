import {useDispatch, useSelector} from 'react-redux';

import VenueItem from './VenueItem';

function VenueList({venuesResultsArray}) {
    const dispatch = useDispatch();

    return (
        <div>
            <button>Search bar and filter dropdown goes here</button>
            {venuesResultsArray.map(v=>
                <VenueItem key={v.venue.id} venue={v.venue}/>
            )}
        </div>
    );
}
    
export default VenueList;