import axios from 'axios'

export default function getAuctions() {
  return function (dispatch) {
    return axios
      .get("http://localhost:3001/auctions")
      .then((result) => result.data)
      .then((response) => {
        dispatch({ type: "GET_AUCTIONS", payload: response })
      })
  };
}