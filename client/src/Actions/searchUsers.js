import axios from 'axios'

export default function searchUsers(e) {
  return async dispatch => {
      return await axios.get(`http://localhost:3001/searchuser?query=${e}`)
      .then(result => dispatch({type: 'GET_ALL_USERS', payload: result.data}));
  }
}
