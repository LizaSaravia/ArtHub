import axios from "axios"

export function addFav(idprod, iduser){
    return function (dispatch){
        axios.post('http://localhost:3001/wishlist/add', { idprod, iduser } )
        .then(()=> dispatch({type: 'ADD_FAV', payload: idprod}))
    }
  }

  export function removeFav(idprod, iduser){
    return function (dispatch){
        axios.delete(`http://localhost:3001/wishlist/${iduser}/${idprod}`)
        .then(()=> dispatch({type: 'REMOVE_FAV', payload: idprod}))
    }
  }