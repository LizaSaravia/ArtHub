 import axios from 'axios';
//obtener por nombre o palabra que exista en la ruta  
export default function getAuctionPriceTotal(idAuction, idUser) {
    return async dispatch => {
        return await axios.get(`http://localhost:3001/auctions/${idAuction}/${idUser}`)
        .then(result => dispatch({type: "GET_AUCTION_ACTUAL", payload: result.data}));
    }
}