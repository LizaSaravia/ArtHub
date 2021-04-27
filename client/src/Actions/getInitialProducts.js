import axios from 'axios'

export default function getInitialProducts() {
  return function (dispatch) {
    return axios
      .get("http://localhost:3001/products")
      .then((result) => result.data)
      .then((response) => {
          dispatch({ type:"GET_INITIAL_PRODUCTS", payload: response})
      })
      
  };
}
