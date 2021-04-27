import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import LineOrder from '../LineOrder/LineOrder';
import { emptyCart } from '../../Actions/shoppingCart';
import style from "./shoppingcartpayment.module.css";
import { useHistory } from 'react-router';
import NavBar from '../NavBar/NavBar';
import { Redirect } from 'react-router-dom';
import linkSet from '../../Actions/linkset';


function ShoppingCartPayment() {

    const { id, email } = useSelector((state) => state.userData);

    const history = useHistory();

    // const cart = useSelector((state) => state.cart);
    const [method, setMethod] = useState("");
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [link, setLink] = useState('');
    const [address, setAddress] = useState({
        localidad: '',
        provincia: '',
        calle: '',
        numero: ''
    });
    const [error, setError] = useState({
        localidad: '',
        provincia: '',
        calle: '',
        numero: ''
    })

    const cart = useSelector((state) => state.cart);

    const handleChange = (e) => {
        setMethod(e.target.value);
    }

    function onChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setError({
            localidad: '',
            provincia: '',
            calle: '',
            numero: ''
        })

        setAddress({ ...address, [name]: value })
    }

    useEffect(() => {
        setTotal(cart.reduce((acc, current) => acc += current.subTotal, 0))

    }, [cart])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!address.provincia) {
            setError({ ...error, provincia: 'El campo provincia es requerido' })
        } else if (!address.localidad) {
            setError({ ...error, localidad: 'El campo localidad es requerido' })
            alert('El campo localidad es requerido')
        } else if (!address.calle) {
            setError({ ...error, calle: 'El campo calle es requerido' })
        } else if (!address.numero) {
            setError({ ...error, numero: 'El campo número es requerido' })
        } else {

            if (method === 'mp') {
                setLoading(!loading)
                axios.post(`http://localhost:3001/users/${id}/newcart`, { cart })
                    .then((newCart) => {

                        axios.post(`http://localhost:3001/orders/mercadopago`, { cart, idOrder: newCart.data.id_order, email, address })
                            .then(async response => {
                                dispatch(linkSet(response.data.mpLink));
                                setRedirect(true);
                                setLoading(!loading)
                                localStorage.setItem('cart', JSON.stringify([]));
                                dispatch(emptyCart());
                            });
                    })
            }
        }
    }
    if (redirect) {
        return <Redirect to='/linkmp'></Redirect>
    }
    return (
        <div className={style.mainContainer}>
            <NavBar renderTop={false} />
            <div className={style.secondContainer}>
                <h1 className={style.title}>Paso 2: Finalizar compra</h1>
                {cart.length > 0
                    ?
                    <div className={style.container}>
                        <div className={style.cards}>
                            {
                                cart.map(p => <LineOrder lineOrderElement={p} ></LineOrder>)
                            }
                        </div>
                        <div className={style.info}>


                            <p className={style.label}>Método de pago: </p>
                            <select className={style.select} onChange={e => handleChange(e)} required >
                                <option className={style.option}>Seleccionar</option>
                                <option className={style.option} value="mp">MercadoPago</option>

                            </select>

                            <p className={style.label}>Dirección de envío: </p>
                            <div className={style.inputContainer}>
                                <p className={style.label}>Provincia: </p>
                                <input type='text' value={address.provincia} name='provincia' onChange={onChange} className={style.longInput}></input>
                                {error.provincia ? (
                                    <div className={style.link}>{error.provincia}</div>
                                ) : null}
                            </div>
                            <div className={style.inputContainer}>
                                <p className={style.label}>Localidad: </p>
                                <input type='text' value={address.localidad} name='localidad' onChange={onChange} className={style.longInput}></input>
                                {error.localidad ? (
                                    <div className={style.link}>{error.localidad}</div>
                                ) : null}
                            </div>
                            <div className={style.inputContainer}>
                                <p className={style.label}>Calle: </p>
                                <input type='text' value={address.calle} name='calle' onChange={onChange} className={style.longInput}></input>
                                {error.calle ? (
                                    <div className={style.link}>{error.calle}</div>
                                ) : null}
                            </div>
                            <div className={style.inputContainer}>
                                <p className={style.label}>Número: </p>
                                <input type='number' value={address.numero} name='numero' min='0' max='10000' onChange={onChange} className={style.shortInput}></input>
                                {error.numero ? (
                                    <div className={style.link}>{error.numero}</div>
                                ) : null}
                            </div>

                            <p className={style.total}>Total: ${total}</p>
                            <button className={`${style.btn} ${style.p}`} onClick={() => history.push('/carrito')}>Volver</button>

                            <button className={`${style.btn}`} disabled={loading ? true : null} onClick={handleSubmit}>{loading ? <i class="fas fa-spinner fa-spin"></i> : 'Pagar'}</button>
                            {
                                method === 'mp' &&
                                <p>Al hacer click en "Pagar" serás redirigido a otro sitio. Luego de finalizar el pago, volveras a arthub</p>
                            }

                        </div>

                    </div>
                    :

                    history.push('/carrito')
                }
            </div>
        </div>
    )
}

export default ShoppingCartPayment