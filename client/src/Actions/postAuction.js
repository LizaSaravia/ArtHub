import axios from 'axios';

export default function postAuction(id_auction, idUser, finalPrice) {
    return async dispatch => {
        await axios.post(`http://localhost:3001/auctions/${id_auction}/${idUser}`, {
            finalPrice
        })
            .then((res) => dispatch({ type: "POST_AUCTION", payload: res.data }))
            .catch((error) => {
                alert("No se pudo solicitar la subasta");
                console.log(error);
            });
        }
}