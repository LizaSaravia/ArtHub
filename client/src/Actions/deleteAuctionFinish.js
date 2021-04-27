import axios from 'axios';

export default function deleteAuctionFinish(idAuction) {
    return async function (dispatch) {
        return await axios
            .delete(`http://localhost:3001/auctions/subastado/${idAuction}`)
            .then((response) => {
                dispatch({ type: "DELETE_AUCTION_FINISH", payload: response.data })
            })

    };
}