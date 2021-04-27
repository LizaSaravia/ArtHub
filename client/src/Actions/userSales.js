import axios from 'axios';

// return all the user sales 
export default function getArtistSales (idArtist){
    return dispatch =>{
        axios.get(`http://localhost:3001/users/compras/${idArtist}`)
        .then(r => dispatch({
            type: 'GET_ARTIST_SALES', payload: r.data
        }))
    }
}