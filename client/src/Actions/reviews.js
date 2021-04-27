import axios from 'axios';
export const getProductReviews = (idProduct) => {
    return function (dispatch){
        axios.get(`http://localhost:3001/products/${idProduct}/review`)
            .then(r => dispatch({
                type: 'GET_PRODUCT_REVIEWS', payload: r.data
            }))
    }
}


export const addProductReview = (idProduct, description, qualification, userIdClient) => {
    return async dispatch => {
        await axios.post(`http://localhost:3001/products/${idProduct}/review`, {
            description,
            qualification,
            userIdClient
        })
            .then((res) => dispatch({ type: "ADD_PRODUCT_REVIEW", payload: res.data }))
    }
}


export function deleteProductReview(idProduct, idReview) {
    return async function (dispatch) {
        return await axios
            .delete(`http://localhost:3001/products/${idProduct}/review/${idReview}`)
            .then((response) => {
                dispatch({ type: "DELETE_PRODUCT_REVIEW", payload: response.data })
            })

    };
}

export function putProductReview(idProduct, idReview, description, qualification, userIdClient) {
    return async function (dispatch) {
        return await axios
            .put(`http://localhost:3001/products/${idProduct}/review/${idReview}`, {
                description,
                qualification,
                userIdClient
            })
            .then((response) => {
                dispatch({ type: "UPDATE_PRODUCT_REVIEW", payload: response.data })
            })

    };
}

export const getUserReviews = (idUser) => {
    return async  function  (dispatch){
       return await axios.get(`http://localhost:3001/users/${idUser}/reviews`)
            .then(r => dispatch({
                type: 'GET_USER_REVIEWS', payload: r.data
            }))
    }
}