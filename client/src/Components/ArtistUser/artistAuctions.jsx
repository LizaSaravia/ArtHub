import React, { useEffect } from 'react';
import Styles from '../ProductsAdmin/productsAdmin.module.css';
import { useSelector, useDispatch } from 'react-redux';
import getArtistAuctions from '../../Actions/getArtistAuctions';
import { Link } from 'react-router-dom';

export default function Sales() {
    const dispatch = useDispatch();
    const artistAuctions = useSelector(state => state.artistSAuctions);
    const artistId = useSelector(state => state.userData.id);

    useEffect(() => {
        dispatch(getArtistAuctions(artistId));
    }, []);


    // let total = artistAuctions && artistAuctions.length; 
    // let when = artistAuctions.length >  0 && artistAuctions[total - 1].createdAt.slice(0,10);

    return (
        <div className={Styles.mainContainer}>
            <h1 className={Styles.title}>Mis subastas</h1>
            <div className={Styles.card}>
                <div className={Styles.textContainer}>
                    {/* <p className={Styles.text}>{`Has solicitado ${total} subastas.`}</p>
                    {total !== 0 && <p className={Styles.text}>{`La última subasta fue solicitada el día ${when}`}</p>} */}
                    <p className={Styles.text}>¿Deseas vizualizar en detalle tus subastas? Hacé click <Link className={Styles.link} to='/missubastas'>acá.</Link></p>
                </div>
            </div>
        </div>
    )
}

