import axios from 'axios';
import React, { useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import Styles from './Request.module.css';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';



function Request() {

    const loggedUser = useSelector((state) => state.userData);
    const userId = useSelector(state => state.userData.id)

    const [loading, setLoading] = useState(false)

    const [input, setInput] = useState({
        cv: '',
        links: '',
        fundament: ''
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post(`http://localhost:3001/request/${userId}`, { cv: input.cv, links: input.links, fundament: input.fundament })
            .then((res) => {
                alert("Solicitud enviada");
            })
            .catch((error) => {
                alert("No se pudo enviar tu solicitud");
            });
    }

    // Firebase

    const [upload, setUpload] = React.useState({
        process: 0,
        file: ''
    });

    function handleUpload(event) {

        const file = event.target.files[0];

        if (event.target.files.length) {
            const storageRef = firebase.storage().ref(`/images/${file.name}`)
            const task = storageRef.put(file)

            task.on('state_changed', snapshot => {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setUpload({
                    process: percentage
                })
            },
                error => {
                    console.log(error.message)
                }, () => {
                    storageRef.getDownloadURL().then(url => {
                        setUpload({ file: url })
                        setInput({ ...input, cv: url })
                    });
                })
        }
    }

    // Firebase end

    if (loggedUser.type !== "user") return <Redirect to='/miperfil'></Redirect>
    if (loggedUser.type === "user") {
        return (
            <div className={Styles.navBar}>
                <NavBar renderTop={false}></NavBar>
                <div className={Styles.mainContainer}>
                    <div className={Styles.secondContainer}>
                        <div className={Styles.divTitle}>
                            <p>Quiero vender mis productos en arthub</p>
                            <p className={Styles.paragraph}>Gracias por tu interés en ser parte de arthub!
                                Completa este formulario para que podamos evaluar tu solicitud</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className={Styles.alignForm}>
                                <label for="files">
                                    <div>
                                        {loading ? (
                                            <div></div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </label>
                                <label>
                                    <div>Curriculum vitae</div>
                                    <input
                                        className={Styles.input}
                                        type="file"
                                        id="files"
                                        onChange={handleUpload}
                                        required
                                    />
                                </label>
                                <label>
                                    <p>Links relevantes</p>
                                    <input
                                        className={Styles.input}
                                        name="links"
                                        onChange={handleChange}
                                        placeholder="Ej: link de RRSS"
                                        required
                                    ></input>
                                </label>
                                <label>
                                    <p>¿Por qué queres vender tus productos en arthub?</p>
                                    <input
                                        className={Styles.input}
                                        name="fundament"
                                        type="textarea"
                                        onChange={handleChange}
                                        placeholder="Escribi acá"
                                        required
                                    ></input>
                                </label>
                            </div>
                            <button type='submit' className={Styles.btn}>Enviar solicitud</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Request
