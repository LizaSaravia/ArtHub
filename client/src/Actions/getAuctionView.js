import axios from 'axios'

export default function getAuctionView(id) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/auctions/${id}`)
      .then((result) => result.data)
      .then((response) => {
        dispatch({ type: "GET_AUCTION_VIEW", payload: response })
      })
  };
}