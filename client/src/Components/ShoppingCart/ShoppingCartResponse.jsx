import React, { useState, useEffect } from 'react'

import style from "./shoppingcartresponse.module.css";
import { Link } from 'react-router-dom';

function ShoppingCartResponse({idorder, status}) {

    if (status === 'fullfilled') {
        return (
            <div className={style.container}>
                <h1>Paso 3: Estado de tu orden</h1>
                <div>
                    <p>Tu compra fue realizada con exito. ¡Muchas gracias!</p>
                    <p>Tu numero de orden es: {idorder}</p>
                    <p>Si queres ver mas detalles hacé <Link to={`/detalledeorden/${idorder}`}>click aqui</Link></p>
                    <Link to={`/coleccion`}>
                        <button className={style.btn}>Seguir comprando</button>
                    </Link>
                </div>
            </div>
        )
    }else if(status === 'pending'){
        return (
            <div className={style.container}>
                <h1>Paso 3: Estado de tu orden</h1>
                <div>
                    <p>Tu compra no ha podido ser completada con éxito</p>
                    <p>Tu numero de orden es: {idorder}</p>
                    <p>Podes intentar hacer el pago nuevamente <Link to={`/detalledeorden/${idorder}`}>aqui</Link></p>
                    {/* <Link to={`/coleccion`}>
                        <button>Seguir comprando</button>
                    </Link> */}    
                </div>
            </div>
        )
    }    
}
export default ShoppingCartResponse

