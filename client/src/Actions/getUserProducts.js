import axios from 'axios'

export default function getUsersArtists(id) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/products/user/${id}`)
      .then((response) => {
          dispatch({ type:"GET_USER_PRODUCTS", payload: [response.data]})
      })
      
  };
}