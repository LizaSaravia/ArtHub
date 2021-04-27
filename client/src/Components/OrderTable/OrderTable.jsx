import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import Styles from "./OrderTable.module.css"

function OrderTable() {
    const [status, setStatus] = useState("")
    const [filterStatus, setfilterStatus] = useState([])

    const ChangeState = (e) => {
        setStatus(e.target.value)
    }

    //Le paso el estado del select, para que me traiga las ordenes que coincidan con esa opcion
    useEffect(() => {
        axios.get(`http://localhost:3001/orders/?status=${status}`)
        .then((res) => {
            setfilterStatus(res.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [status])

    return (
        <div className={Styles.mainContainer}>
            <div className={Styles.titleContainer}>
                <p className={Styles.p}>Ordenes</p>
            </div>
            <div className={Styles.filterContainer}>
                <form>
                <label>Filtrar por estado</label>
                <select onChange={ChangeState} name="filtroEstado">
                    <option value=""></option>
                    <option value="pending">Pendiente</option>
                    <option value="fullfilled">Aprobada</option>
                </select>
                <label>Filtrar por Fecha</label>
                <select name="filtroFecha">
                    <option value=""></option>
                    <option value="Hoy">Hoy</option>
                    <option value="Ayer">Ayer</option>
                </select>
                </form>
            </div>
            <table className={Styles.table}>
                <tr className={Styles.tr}>
                    <th className={Styles.th}>N° orden</th>
                    <th className={Styles.th}>Fecha y hora</th>
                    <th className={Styles.th}>Estado</th>
                    {/* <th className={Styles.th}>Cantidad de items</th> */}
                    <th className={Styles.th}>ID cliente</th>
                    <th className={Styles.th}>Precio total</th>
                    <th className={Styles.th}></th>                   
                </tr>
                {filterStatus.length < 1 ? 
                <th className={Styles.th}>No hay ordenes disponibles</th> :
                filterStatus.length && 
                    filterStatus.map((p) => (
                        <tr className={Styles.tr}>
                            <th className={Styles.th}>{p.id_order}</th>
                            <th className={Styles.th}>{p.createdAt}</th>
                            <th className={Styles.th}>{p.state}</th>
                            {/* <th className={Styles.th}>{p.lineorders.products}</th> */}
                            <th className={Styles.th}>{p.userId}</th>
                            <th className={Styles.th}>${p.total_price}</th>
                            <Link to={`/detalledeorden/${p.id_order}`}>
                                <button className={Styles.btn}>Ver más</button>
                            </Link>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default OrderTable
