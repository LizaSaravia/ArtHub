import axios from 'axios';
//obtener por nombre o palabra que exista en la ruta  
export default function getArtistsProducts(id) {
    return async dispatch => {
        const artistsProducts = await axios.get(`http://localhost:3001/products`)
        .then(result => result.data.filter(x => x.userId === id))
        .then(resolve => dispatch({type: 'GET_ARTISTS_PRODUCTS', payload: resolve}))   
    };
}