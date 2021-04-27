import axios from 'axios';
export default function getUserOrders(id){
    return async dispatch => {
        return await axios.get(`http://localhost:3001/users/${id}/orders`)
        .then(result => dispatch({type: 'GET_USER_ORDERS', payload: result.data}));
    }
}