import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Styles from './salesArtist.module.css';
import getArtistSales from '../../Actions/userSales';


export default function SalesArtist() {
    const dispatch = useDispatch();
    const idUser = useSelector(state => state.userData.id);

    useEffect(() => {
        dispatch(getArtistSales(idUser))
    }, [])

    const artistSales = useSelector(state => state.artistSales);

    //hooks 
    const [detail, setDetail] = useState([]);

    const handleClick = (e, id) => {
        setDetail(details => {
          // find index for matching detail
          const detailIndex = details.findIndex(d => d.id === id)
      
          // no match return new state
          if (detailIndex === -1) {
            return [...details, { id, state: true }]
          }
      
          // with match create copy details
          const nextDetails = [...details]
          
          // create copy of detail with a flipped state value
          const state = !nextDetails[detailIndex].state
          nextDetails[detailIndex] = { ...nextDetails[detailIndex], state }
      
          return nextDetails
        })
      }
      
      const detailForArtist = ( id ) => {
        const details = detail.find(d => d.id === id)
       
        return details?.state

      }


    return (
        <div className={Styles.mainContainer}>
            <h1>Mis ventas</h1>
            <div className={Styles.wrapper}>
                {
                    artistSales && artistSales.map(s => {

                        return (
                            <div className={Styles.align}>
                                <div className={Styles.card}>
                                    <div className={Styles.order}>
                                        <h2>Numero de orden: {s.id_order}</h2>
                                        <p>Estado de pago: {s.state === 'fullfilled' && 'pago realizado'} </p>
                                        <p>Cliente: {s.userId.name} {s.userId.lastname} </p>
                                        <p>Email:
                                <a href={`mailto:${s.userId.email}`}>{s.userId.email}</a>
                                        </p>
                                    </div>
                                    <div className={Styles.detail}>
                                        <p>Total: ${s.total_price}</p>
                                        <p>Fecha: {s.createdAt.slice(0, 10)}</p>
                                        <button value={s.id_order} onClick={(e) => handleClick(e, s.id_order)} className={Styles.btn}>Ver detalles</button>
                                    </div>

                                </div>
                                <div className={Styles.lineOrdersWrapper}>
                                { detailForArtist(s.id_order) ? s.lineorders.map(l=>{
                                    return(
                                        
                                            <div className={Styles.lineOrder}>
                                             <p>Producto: {l.product.title || 'Hardcodeado'} </p>
                                             <p>Precio unitario: {l.unit_price}</p>
                                             <p>Cantidad: {l.quantity}</p>
                                            </div>
                                         
                                    )
                                }): <></>}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}