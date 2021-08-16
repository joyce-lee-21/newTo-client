// import {changeUser} from '../../usersSlice';

function ViewCategoryCard({cat}) {
    // const usernameInput = useSelector(state => state.usernameInput);
    // console.log(cat)

    return (
        <div>
            <div className="tile">
                {cat.name}
            </div>
        </div>
    );
}
    
export default ViewCategoryCard;