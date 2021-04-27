import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import NavBar from '../../Components/NavBar/NavBar';
import Styles from '../OrderDetailArtist/OrderDetailArtist.module.css';

function OrderDetailArtist() {
    const [detalles, setdetalles] = useState({})

    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:3001/orders/${id}`)
        .then((res) => {
      
            setdetalles(res.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    const EditStateChange = (e) => {
        axios.put(`http://localhost:3001/orders/${id}`, {state: e.target.value, total_price: detalles.total_price} )
        .then((res) => {
            setdetalles({...detalles, state: res.data.state})
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            {
                <div className={Styles.firstContainer}>
                    <NavBar renderTop={false} />
                    <div className={Styles.mainContainer}>
                        <p>Orden N° {detalles.id_order}</p>
                        <p>Estado: {detalles.state}</p>
                        <select 
                            className={Styles.select}
                            value={detalles.state} 
                            onChange={EditStateChange}> 
                            Editar estado
                            {/* <option value="rejected">Rechazada</option> */}
                            <option value="pending">Pendiente</option>
                            <option value="fullfilled">Aprobada</option>
                        </select>                       
                        <p>Productos:</p>
                        {
                        detalles.lineorders?.map((el) => (
                            <div className={Styles.container}>
                                <img className={Styles.img} src={el.product.images[0].url}></img>
                                <p>Título: {el.product.title}</p>
                                <p>Cantidad: {el.quantity}</p>
                                <p>Precio ${el.product.price}</p>
                            </div> 
                        ))}
                    </div>
               </div>
            }
        </div>
    )
}

export default OrderDetailArtist