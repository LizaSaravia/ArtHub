import axios from "axios";
//obtener por nombre o palabra que exista en la ruta
export default function getSuggestions(search) {
    return async function (dispatch) {
      return axios
        .get(`http://localhost:3001/search?query=${search}`)
        .then((result) =>{
          if(typeof result.data == 'object'){
          dispatch({ type: "GET_SUGGESTIONS", payload: result.data })}}
        )
        .catch(err => {
            dispatch({ type: "ERROR", payload: err })
        });
    };
}
