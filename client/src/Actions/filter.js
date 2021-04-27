import axios from 'axios';
//Get all the categorys for dropdown list 
export default function getCategories() {
    return async dispatch => {
        return await axios.get('http://localhost:3001/products/category')
        .then(result => dispatch({type: 'GET_CATEGORIES', payload: result.data}));
    }
}
