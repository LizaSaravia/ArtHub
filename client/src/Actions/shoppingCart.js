import axios from 'axios';

export const addItem = (id, newPrice) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        localStorage.setItem("cart", JSON.stringify([]));
    }
    const found = cart.find((f) => f.product.id_product === id)
    let index = cart.indexOf(found)
    let item = {
        product: {},
        quantity: 1,
        subTotal: 0
    };
    if (!found) {
        return function (dispatch) {
            axios.get(`http://localhost:3001/products/${id}`)
                .then(r => {
                    r.data.price = newPrice;
                    item.product = r.data;
                    item.subTotal = item.product.price * item.quantity;
                    return item
                })
                .then(item => {
                    cart = [...cart, item]
                    localStorage.setItem('cart', JSON.stringify(cart));
                    dispatch({
                        type: "ADD_ITEM",
                        payload: item
                    })
                })
        }
    } else {
        let stock = cart[index].product.stock;
        if (cart[index].quantity < stock) {
            cart[index].quantity += 1;
        }
        cart[index].subTotal = cart[index].product.price * cart[index].quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        item = cart[index];

        return {
            type: "ADD_ITEM",
            payload: item
        }
    }
}

export const deleteItem = (id) => {
    return {
        type: 'DELETE_ITEM',
        payload: id
    }
}

export const emptyCart = () => {
    return {
        type: "EMPTY_CART"
    }
}

//for - button 
export const reduceQuantity = (id) => {

    return {
        type: 'REDUCE_QUANTITY',
        payload: id
    }
}

export const setCart = (cart) => {
    return {
        type: 'SET_CART',
        payload: cart
    }
}

// Agrega a la base de datos
// export const addToCart = ( userId,productId, quantity) => {
//     return async function(dispatch) {
//         await axios.post(`http://localhost:3001/users/${userId}/cart`, {quantity, productId})


//     }
// }
