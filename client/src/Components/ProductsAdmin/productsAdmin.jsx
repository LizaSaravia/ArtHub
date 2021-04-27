import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import getAllProducts from '../../Actions/getInitialProducts';
import Styles from './productsAdmin.module.css';
import cart from '../../Images/shopping-cart.svg';

export default function ProductsAdmin() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    //SELECTORS
    const allProducts = useSelector(state => state.products);

    let total = allProducts.length;
    let created = allProducts.length > 0 && allProducts[total - 1].createdAt.slice(0, 10);
    let user = allProducts.length > 0 && allProducts[total - 1].user.username

    return (
        <div className={Styles.mainContainer}>
            <h1 className={Styles.title}>Todos los productos</h1>
            <div className={Styles.card}>
                <div className={Styles.textContainer}>
                    <p className={Styles.text}>{`Actualmente existen ${total} productos`}</p>
                    <p className={Styles.text}>{`El último producto fue creado el ${created} por ${user}`}</p>
                    <p className={Styles.text}>¿Deseas administrar los productos? Hace click <Link className={Styles.link} to='/coleccion'>acá</Link> para visualizarlos.</p>
                </div>
                <div className={Styles.imgContainer}>
                    <img className={Styles.img} src={cart} alt='shopping cart' />
                </div>
            </div>
        </div>
    )
}