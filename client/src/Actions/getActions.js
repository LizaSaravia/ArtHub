import axios from 'axios';
//obtener por nombre o palabra que exista en la ruta  
export default function getProductsByName(search) {
    return async dispatch => {
        return await axios.get(`http://localhost:3001/search?query=${search}`)
        .then(result => dispatch({type: 'GET_PRODUCTS', payload: result.data}));
    }
}
