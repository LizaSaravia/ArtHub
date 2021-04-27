import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavBar from './../../Components/NavBar/NavBar';
import style from './AdminRequests.module.css'
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';

function AdminRequests() {

    const [requests, setRequests] = useState();
    const userData = useSelector((state) => state.userData);
    const history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:3001/request/').then(d => setRequests(d.data))
    }, [])

    function handleApproved(id) {
        axios.put(`http://localhost:3001/request/${id}`, { state: 'approved' })
            .then(alert('Solicitud aprobada con éxito'),
                window.location = 'http://localhost:3000/solicitudes/')
            .catch(err => alert(err))
    }

    function handleDeclined(id) {
        axios.put(`http://localhost:3001/request/${id}`, { state: 'declined' })
            .then(alert('Solicitud rechazada con éxito'))
            .catch(err => alert(err))
    }

    if (userData.type !== "admin") return <Redirect to='/miperfil'></Redirect>
    if (userData.type === "admin") {
        return (
            <div className={style.mainContainer}>
                <NavBar renderTop={false} />
                <div className={style.secondContainer}>
                    <h2 className={style.title}>Solicitudes</h2>
                    <div className={style.requestsContainer}>
                        {
                            !requests?.message ? requests?.map(r => (
                                <div className={style.requestContainer}>
                                    <h3>Solicitud #{r.id}</h3>
                                    <p>Nombre de usuario: {r.user.username}</p>
                                    <p>Nombre y apellido: {r.user.name + " " + r.user.lastname}</p>
                                    {/* <Link to={r.cv}>Ver CV</Link> */}
                                    <div className={style.cvContainer}>
                                        <p>Currículum Vitae:</p>
                                        <button onClick={() => window.location.href = r.cv} className={style.button}>Ver CV</button>
                                    </div>
                                    <p>Links relevantes: {r.links}</p>
                                    <p>Fundamento: {r.fundament}</p>
                                    {r.state === "pending" ?
                                        <div className={style.buttonsContainer}>
                                            <button className={style.button} value='approved' onClick={() => handleApproved(r.id)}>
                                                Aceptar
                    </button>
                                            <button className={style.button} value='declined' onClick={() => handleDeclined(r.id)}>
                                                Rechazar
                    </button>
                                        </div>
                                        : <p> Esta orden ya ha sido evaluada, su estado es "{r.state}".</p>}

                                </div>
                            )) : <div className={style.message}>No hay solicitudes </div>
                        }
                    </div>
                </div>
            </div>

        )
    }
}

export default AdminRequests
