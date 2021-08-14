import {useDispatch, useSelector} from 'react-redux';
import {changeCategoryArray} from '../../usersSlice';
import {useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react'

import SelectCategoryList from './SelectCategoryList';

function ProfileSelection() {
    const dispatch = useDispatch();
    const history = useHistory();
    const categoryArray = useSelector(state => state.categoryArray);
    const [errors, setErrors] = useState([])

    const categories = [];

    const onCategorySelect = (e) => {
        console.log(e.target)
    }

    useEffect(() => {
        async function categories(){
            const res = await fetch("http://localhost:3000/primary_categories", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if(res.ok){
                const arr = await res.json()
                console.log(arr)
                // categories.push(arr)
                // history.push('/profile')
            } else {
                const err = await res.json()
                // console.log(err.errors)
                setErrors(err.errors)
            }
        };
        categories()
    }, [])

    return (
        <div>
            ProfileSelection
            {categories.map(cat => (
                <button onClick={onCategorySelect}>{cat}</button>
            ))}
        </div>
    );
}
    
export default ProfileSelection;