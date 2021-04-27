import React, { useState, useEffect } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import Styles from "./EditUser.module.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import firebase from 'firebase';
import signInUsers from './../../Actions/signInUsers';
import {Redirect} from 'react-router-dom'

export const validate = (input) => {

    let errors = {};
    if (!input.username) {
        errors.username = 'el nombre de usuario es obligatorio';
    }

    if (!input.name) {
        errors.name = 'el nombre es obligatorio';
    }

    if (!input.lastname) {
        errors.lastname = 'el apellido es obligatorio';
    }

    if (!input.lastname) {
        errors.lastname = 'el apellido es obligatorio';
    }

    if (!input.email) {
        errors.email = 'el email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
        errors.email = 'el mail es invalido';
    }

    if (!input.birth) {
        errors.birth = 'la fecha de nacimiento es obligatoria';
    }

    return errors;
};

function EditUser() {
    const [redirect, setRedirect] = useState(false)
    const [loading, setLoading] = useState(false)
    const id = useSelector(state => state.userData.id);
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        username: "",
        name: "",
        lastname: "",
        profilepic: "",
        email: "",
        birth: "",
        type: "",
        state: ""
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [error, setError] = useState({
        username: '',
        email: ''
    })

    function onFocus(ev) {
        setTouched({
            ...touched,
            [ev.target.name]: true
        })
    }

    useEffect(() => {
        async function user() {
            let setUser = (await axios.get(`http://localhost:3001/users/${id}`)).data;
            setUpload({ picture: setUser[0]?.profilepic })
            setInput({
                ...setUser[0],
                profilepic: setUser[0]?.profilepic
            })

        }
        user();
    }, [id])

    // Firebase

    const [upload, setUpload] = React.useState({
        process: 0,
        picture: ''
    });

    function handleUpload(event) {
        setLoading(true)

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
                        setUpload({ picture: url })
                        setInput({ ...input, profilepic: url })
                        setLoading(false)
                    });
                })
        }
    }

    // Firebase end

    function handleChange(e) {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        });
        setErrors(validate({
            ...input,
            [name]: value
        }));
        setError({
            username: '',
            email: ''
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (Object.entries(errors).length > 0) {
            alert('Debe completar los campos correctamente');
        } else {
            axios.put(`http://localhost:3001/users/${id}`, input)
                .then((res) => {
                    if(res.data.msgUsername){
                        setError({
                            ...error,
                            username: res.data.msgUsername
                        })
                    }
                   else if(res.data.msgEmail){
                        setError({
                            ...error,
                            email:res.data.msgEmail
                        })
                    }
                    else {dispatch(signInUsers(input))
                    alert('Usuario modificado con exito')
                setRedirect(true)}
                })
        }
    }

    
    if(id === 0) return <Redirect to="/ingresar"></Redirect>
if(redirect) return <Redirect to='/miperfil'></Redirect>
    return (
      <div className={Styles.navBaralign}>
        <NavBar renderTop={false} />
        <div className={Styles.mainContainer}>
          <div className={Styles.secondContainer}>
            <div className={Styles.divTitle}>
              <p>Editar perfil</p>
            </div>
            <form className={Styles.containerForm2} onSubmit={handleSubmit}>
              <input
                className={Styles.input}
                value={input.username}
                name="username"
                onChange={handleChange}
                placeholder="Usuario"
                onFocus={onFocus}
                required
              />
              {error.username ? (
                <span className={Styles.valError}>{error.username}</span>
              ) : null}
              {errors.username && touched.username && (
                <p className={Styles.valError}>{errors.username}</p>
              )}
              {errors.password && touched.password && (
                <p className={Styles.valError}>{errors.password}</p>
              )}
              <input
                className={Styles.input}
                value={input.name}
                name="name"
                onChange={handleChange}
                placeholder="Nombre"
                onFocus={onFocus}
                required
              />
              {errors.name && touched.name && (
                <p className={Styles.valError}>{errors.name}</p>
              )}
              <input
                className={Styles.input}
                value={input.lastname}
                name="lastname"
                onChange={handleChange}
                placeholder="Apellido"
                onFocus={onFocus}
                required
              />
              {errors.lastname && touched.lastname && (
                <p className={Styles.valError}>{errors.lastname}</p>
              )}
              <input
                className={Styles.input}
                value={input.email}
                name="email"
                onChange={handleChange}
                placeholder="E-mail"
                onFocus={onFocus}
                required
              />
              {error.email ? (
                <span className={Styles.valError}>{error.email}</span>
              ) : null}
              {errors.email && touched.email && (
                <p className={Styles.valError}>{errors.email}</p>
              )}
              <input
                className={Styles.date}
                value={input.birth}
                name="birth"
                onChange={handleChange}
                placeholder="Fecha de nacimiento"
                type="date"
                onFocus={onFocus}
                required
              />
              <div className={Styles.contRadio}>
                <div className={Styles.radio}>
                  <label for="files">
                    <div className={Styles.containerProfilePic}>
                      {upload.picture ? (
                        <img width="100" height="100" src={upload.picture} />
                      ) : (
                        <div className={Styles.containerProfilePic}>
                          {loading ? (
                            <div className={Styles.loadingPic}></div>
                          ) : (
                            "Seleccionar"
                          )}
                        </div>
                      )}
                    </div>
                  </label>

                  <input
                    className={Styles.inputFile}
                    type="file"
                    id="files"
                    onChange={handleUpload}
                  />
                </div>
              </div>
              {errors.birth && touched.birth && (
                <p className={Styles.valError}>{errors.birth}</p>
              )}

              <input className={Styles.btn} type="submit" value="Confirmar" />
            </form>
          </div>
        </div>
      </div>
    );
}

export default EditUser
