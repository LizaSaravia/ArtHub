import axios from 'axios'

export default function getUsersArtists() {
  return function (dispatch) {
    return axios
      .get("http://localhost:3001/users?type=artists")
      .then((result) => result.data)
      .then((response) => {
        dispatch({ type: "GET_USERS_ARTISTS", payload: response })
      })
  };
}