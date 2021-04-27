import axios from 'axios';
//obtener por nombre o palabra que exista en la ruta  
export default function getUserOrder(idUser) {
    return async dispatch => {
        return await axios.get(`http://localhost:3001/users/${idUser}/cart`)
        .then(result => dispatch({type: 'GET_USER_ORDER', payload: result.data}));
    }
}