import React, { useEffect, useState } from "react";
import style from "./shoppingcart.module.css";
import { useSelector, useDispatch } from "react-redux";
import LineOrder from "../LineOrder/LineOrder";
import { emptyCart, setCart } from './../../Actions/shoppingCart';
import { useHistory, Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

function ShoppingCart() {

	let cart = useSelector((state) => state.cart);
	const products = useSelector(state => state.products);
	let { id } = useSelector((state) => state.userData);
	let offers = useSelector((state) => state.offers);
	let categories = useSelector((state) => state.categories);

	const cartL = JSON.parse(localStorage.getItem("cart"));
	const dispatch = useDispatch();
	const history = useHistory();

	const [total, setTotal] = useState(0);
	const [subTotal, setSubTotal] = useState(0);



	const handlePayment = () => {
		//toda la logica futura para un pago
		if (!localStorage.getItem('token')) {
			alert('Debe iniciar sesion')
			history.push('/ingresar');
		} else {
			if (cartL.length > 0) {
				history.push('/pago');
			}
		}
	}

	useEffect(() => {
		let cartDefault = [];
		cart.forEach(p => {
			let found = products.find(prod => prod.id_product === p.product.id_product);
			if (found) {
				cartDefault.push({ product: found, quantity: p.quantity });
			}
		})
		!cartDefault.includes(undefined) && setSubTotal(cartDefault.reduce((acc, current) => acc += current.product.price * current.quantity, 0));
	}, [products, cart])

	useEffect(() => {
		cartL && setTotal(cartL.reduce((acc, current) => acc += current.subTotal, 0));
	}, [cartL])

	return (
		<div className={style.mainContainer}>
			<NavBar renderTop={false} />

			<div className={style.secondContainer}>

				<h1 className={style.title}>Paso 1: Carrito</h1>
				{
					cart.length > 0
						?
						<div className={style.container}>
							<div className={style.cards}>

								{
									cart.map(p => 
										<div className={style.card}><LineOrder lineOrderElement={p} ></LineOrder></div>
									)
								}
							</div>
							<div className={style.info}>

								<div>
									<h1 className={style.detailTitle}>Detalle de la compra</h1>
									<div className={style.priceContainer}>
										<p className={style.subTotal}>Subtotal:</p>
										<p className={style.subTotal}>${subTotal}</p>
									</div>
									<div className={style.priceContainer}>
										<p className={style.discount}>Descuento:</p>
										<p className={style.discount}>${subTotal - total}</p>
									</div>
									<hr className={style.line} />
									<div className={style.priceContainer}>
										<p className={style.total}>Total:</p>
										<p className={style.total}>${total}</p>

									</div>
								</div>




								<button className={`${style.btn} ${style.p}`} onClick={() => history.push('/coleccion')}>Volver</button>

								<button className={`${style.btn} ${style.p}`} onClick={() => dispatch(emptyCart())}>Vaciar carrito</button>

								<button className={`${style.btn} ${style.p}`} onClick={() => handlePayment()}>Continuar</button>
							</div>


						</div >
						:
						<div className={style.noProductsMessage}>
							<p>No hay productos en tu carrito, elegí algunos de <Link to="/coleccion"> nuestra colección.</Link>
							</p>
						</div>
				}
			</div>
		</div>
	);
}

export default ShoppingCart;
