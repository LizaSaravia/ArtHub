import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './AuctionsArtists.module.css';
import getArtistAuctions from '../../Actions/getArtistAuctions';

function AuctionsArtists() {
    const dispatch = useDispatch();
    const idUser = useSelector(state => state.userData.id);
    
    
    useEffect(() => {
        dispatch(getArtistAuctions(idUser))
    }, [])
    
    const artistAuctions = useSelector(state => state.artistAuctions)

    return (
        <div className={style.mainContainer}>
            <h1>Mis subastas</h1>
            <table className={style.table}>
                    <tr className={style.head}>
                        <th>título</th>
                        <th>precio</th>
                        <th>estado</th>
                    </tr>

                    {artistAuctions.length ? artistAuctions[0]?.auctions.map((a) => (


                        <tr key={a.id_auction} className={style.auctions}>
                            <td>{a.title}</td>
                            <td>{a.price}</td>
                            <td>{a.state}</td>

                        </tr>

                    ))
                    :
                    <></>
                }
                </table>
        </div>
    )
}

export default AuctionsArtists
