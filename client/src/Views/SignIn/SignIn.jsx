import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Styles from "./Signin.module.css";
import { useState } from "react";
import axios from "axios";
import signInUsers from "../../Actions/signInUsers";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import firebase from "firebase";

export const validate = (input) => {
  let errors = {};
  if (!input.username) {
    errors.username = "el nombre de usuario es obligatorio";
  } else {
    errors.username = "";
  }

  if (!input.password) {
    errors.password = "la contraseña es obligatoria";
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(input.password)) {
    errors.password =
      "la contraseña debe contener por lo menos 8 caracteres, una mayuscula y un numero";
  } else {
    errors.password = "";
  }

  if (!input.password2) {
    errors.password2 = "repetir la contraseña es obligatorio";
  } else if (input.password2 !== input.password) {
    errors.password = "las contraseñas no coinciden";
  } else {
    errors.password2 = "";
  }
  if (!input.name) {
    errors.name = "el nombre es obligatorio";
  } else {
    errors.name = "";
  }
  if (!input.lastname) {
    errors.lastname = "el apellido es obligatorio";
  } else {
    errors.lastname = "";
  }

  if (!input.email) {
    errors.email = "el email es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = "el mail es invalido";
  } else {
    errors.email = "";
  }
  if (!input.birth) {
    errors.birth = "la fecha de nacimiento es obligatoria";
  } else {
    errors.birth = "";
  }
  // if (!input.type) {
  //   errors.type = "el tipo es obligatorio";
  // } else {
  //   errors.type = "";
  // }
  return errors;
};

function SignIn() {
  const [errormsg, setErrormsg] = useState({
    errorUsername: "",
    errorEmail: "",
  });

  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const [input, setInput] = useState({
    username: "",
    password: "",
    password2: "",
    name: "",
    lastname: "",
    profilepic: "",
    email: "",
    birth: "",
    type: "user",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Carrito
  const userData = useSelector((state) => state.userData);

  function onFocus(ev) {
    setTouched({
      ...touched,
      [ev.target.name]: true,
    });
  }

  // Firebase

  const [upload, setUpload] = React.useState({
    process: 0,
    picture: "",
  });

  const [refresh, setRefresh] = React.useState([]);

  function handleUpload(event) {
    setLoading(true);

    const file = event.target.files[0];

    if (event.target.files.length) {
      const storageRef = firebase.storage().ref(`/images/${file.name}`);
      const task = storageRef.put(file);

      task.on(
        "state_changed",
        (snapshot) => {
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        
          setUpload({
            process: percentage,
          });
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          storageRef.getDownloadURL().then((url) => {
            setUpload({ picture: url });
            setInput({ ...input, profilepic: url });
          });
        }
      );
    }
  }

  // Firebase end

  function handleChange(e) {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    setErrors(
      validate({
        ...input,
        [name]: value,
      })
    );
    setErrormsg({
      errorUsername: "",
      errorEmail: "",
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !errors.password2 &&
      !errors.email &&
      !errors.password &&
      !errors.name &&
      !errors.birth &&
      !errors.lastname
      // !errors.type
    ) {
      axios
        .post(`http://localhost:3001/users`, input)
        .then(async (res) => {

          if (res.data.auth === true) {
            await dispatch(signInUsers(res.data.user));
            alert("Cuenta registrada");
            localStorage.setItem("token", res.data.token);

            // Carrito
            // const cart = JSON.parse(localStorage.getItem("cart"));
            // if (cart.length > 0) {
            //   axios.post(`http://localhost:3001/users/${res.data.user.id}/newcart`, { cart: cart }).catch(err => console.log(err))
            // }
            // Fin carrito

            setRedirect(true);
          } else {
            if (res.data.msgUsername) {
              // console.log(res);
              setErrormsg({ ...errormsg, errorUsername: res.data.msgUsername });
            } else if (res.data.msgEmail) {
              setErrormsg({
                ...errormsg,
                errorEmail: res.data.msgEmail,
              });
            }
          }
        })
        .catch((error) => {
          alert("No se pudo crear la cuenta");
          console.log(error);
        });
    } else {
      alert("No se registró la cuenta");
    }
  }
  if (redirect) return <Redirect to="/coleccion"></Redirect>;

  return (
    <div className={Styles.navBaralign}>
      <NavBar renderTop={false} />
      <div className={Styles.mainContainer}>
        <div className={Styles.secondContainer}>
          <div className={Styles.divTitle}>
            <p>Registrarse</p>
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
            {errors.username && touched.username && (
              <p className={Styles.errorText}>{errors.username}</p>
            )}
            {
              <div>
                {errormsg && errormsg.errorUsername ? (
                  <span className={Styles.errorText}>
                    {errormsg.errorUsername}
                  </span>
                ) : null}
              </div>
            }
            <input
              type="password"
              className={Styles.input}
              value={input.password}
              name="password"
              onChange={handleChange}
              placeholder="Contraseña (debe contener por lo menos una mayuscula y un numero)"
              onFocus={onFocus}
              required
            />

            {errors.password && touched.password && (
              <p className={Styles.errorText}>{errors.password}</p>
            )}
            <input
              type="password"
              className={Styles.input}
              value={input.password2}
              name="password2"
              onChange={handleChange}
              placeholder="Repetir la contraseña"
              onFocus={onFocus}
              required
            />
            {errors.password2 && touched.password2 && (
              <p className={Styles.errorText}>{errors.password2}</p>
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
              <p className={Styles.errorText}>{errors.name}</p>
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
              <p className={Styles.errorText}>{errors.lastname}</p>
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
            {
              <div>
                {errormsg && errormsg.errorEmail ? (
                  <span className={Styles.errorText}>
                    {errormsg.errorEmail}
                  </span>
                ) : null}
              </div>
            }
            {errors.email && touched.email && (
              <p className={Styles.errorText}>{errors.email}</p>
            )}
            <input
              className={Styles.date}
              value={input.birth}
              name="birth"
              onChange={handleChange}
              placeholder="Fecha de nacimiento"
              type="date"
              // min="1940-31-01"
              // max="2004-01-01"
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
                          "Seleccionar foto de perfil"
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
            {errors.birth && touched.birth && <p>{errors.birth}</p>}

            <input className={Styles.btn} type="submit" value="Crear cuenta" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
