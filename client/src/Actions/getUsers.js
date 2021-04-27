import axios from 'axios'

export default function getUsers() {
  return function (dispatch) {
    return axios
      .get("http://localhost:3001/users")
      .then((result) => result.data)
      .then((response) => {
        dispatch({ type: "GET_ALL_USERS", payload: response })
      })
  };
}