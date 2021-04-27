import React, { useEffect } from 'react';
import Styles from '../ProductsAdmin/productsAdmin.module.css';
import { useSelector, useDispatch } from 'react-redux';
import getArtistSales from '../../Actions/userSales.js';
import { Link } from 'react-router-dom';

export default function Sales() {
    const dispatch = useDispatch();
    const sales = useSelector(state => state.artistSales);
    const artistId = useSelector(state => state.userData.id);

    useEffect(() => {
        dispatch(getArtistSales(artistId));
    }, []);


    let total = sales && sales.length;
    let when = sales.length > 0 && sales[total - 1].createdAt.slice(0, 10);

    return (
        <div className={Styles.mainContainer}>
            <h1 className={Styles.title}>Mis ventas</h1>
            <div className={Styles.card}>
                <div className={Styles.textContainer}>
                    <p className={Styles.text}>{`Has realizado ${total} ventas.`}</p>
                    {total !== 0 && <p className={Styles.text}>{`La última venta fue realizada el día ${when}`}</p>}
                    <p className={Styles.text}>Deseas vizualizar en detalle tus ventas ? Hace click <Link className={Styles.link} to='/misventas'>acá.</Link></p>
                </div>
            </div>
        </div>
    )
}