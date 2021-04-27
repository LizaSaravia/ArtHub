import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import NavBar from "../../Components/NavBar/NavBar";
import Styles from "./Newsletter.module.css"

function Newsletter() {
    const [allUsers, setAllUsers] = useState([])
    const [filter, setFilter] = useState("")
    const [email, setEmail] = useState({
        to: [],
        date: "",
        asunto: "",
        mensaje: ""
    })

    useEffect(() => {
        axios.get(`http://localhost:3001/users`)
        .then((res) => {
            setAllUsers(res.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    const HandleChange = (e) => {
        const { name, value } = e.target;
        setEmail({ ...email, [name]: value});
    }

    const sendEmail = (e) => { 
        e.preventDefault()
        let filtrados = allUsers.filter((el) => el.type === filter)
       
    }

    return (
        <div>
            <h1>Newsletter</h1>
            <div className={Styles.mainContainer}>
                <form onSubmit={sendEmail} className={Styles.form}>
                    <div className={Styles.toContainer}>
                        <div className={Styles.to}>
                            <p>A quién va dirigido:</p>                           
                        </div>
                        <div className={Styles.to2}>
                            <div>
                                <input 
                                    checked={filter === "artist"} 
                                    onChange={()=> setFilter("artist")} 
                                    type="checkbox"/>
                                <label>Artistas</label>
                            </div>
                            <div>
                                <input 
                                    checked={filter === "user"} 
                                    onChange={()=> setFilter("user")}
                                    type="checkbox"></input>
                                <label>Usuarios comunes</label>                           
                            </div>
                        </div>
                    </div>
                    <div className={Styles.dateContainer}>
                        <p>Seleccionar fecha en la que se enviará:</p>
                        <input 
                        value="date" 
                        onChange={HandleChange}
                        type="date">
                        </input>
                    </div>
                    <div className={Styles.body}>
                        <input 
                            value="asunto" 
                            onChange={HandleChange}
                            className={Styles.asunto} 
                            placeholder="Asunto"></input>
                        <textarea 
                            value="mensaje" 
                            onChange={HandleChange}
                            className={Styles.mensaje} 
                            placeholder="Mensaje">
                        </textarea>                        
                    </div>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>
    )
}

export default Newsletter




