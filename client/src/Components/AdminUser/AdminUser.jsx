import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from "../NavBar/NavBar.jsx";
import style from "./adminuser.module.css";
import { Link, useHistory } from "react-router-dom";
import userPic from '../../Images/elcapitan.jpg';
import CarouselCategories from '../CarouselCategories/carouselCategories';
import Edit from '../../Images/edit.svg';
import Add from '../../Images/add-file.svg';
import noProfPic from '../Assets/profPic.jpg';
import ProductsAdmin from '../ProductsAdmin/productsAdmin';
import axios from 'axios'
function AdminUser() {

  const userData = useSelector(state => state.userData);
  let history = useHistory()

  const [inputPhone, setInputPhone] = useState({
    show: false,
    number: '',
    send: false,
    code: '',
    deactivate: false
  })
  const [errors, setErrors] = useState({
    number: '',
    code: ''
  })

  async function onSend() {
    if (!inputPhone.number) {
      setErrors({ ...errors, number: 'Ingresa un número' })
    } else if (inputPhone.number.toString().length != 12) {
      setErrors({ ...errors, number: 'El número es incorrecto' })
    } else {
      await axios
        .post(`http://localhost:3001/twofactor/send/${inputPhone.number}/${userData.id}`)
        .then(result => {

          if (result.data.authTwo) {
            localStorage.setItem("twoToken", result.data.twoToken);
            alert(`Se ha enviado un mensaje con un código de verificaion al numero ${inputPhone.number}`)
            setInputPhone({ ...inputPhone, show: !inputPhone.show, send: true })
          } else {
            alert(`No se pudo enviar el mensaje`)
          }

        })
    }
  }

  function onActivate(event) {
    if (event.target.checked) {
      setInputPhone({ ...inputPhone, show: true, send: false })
    } else {
      setInputPhone({ ...inputPhone, show: false, send: false })
    }
  }

  async function onDeactivate(event) {
    if (event.target.checked) {
      setInputPhone({ ...inputPhone, deactivate: false })

      await axios
        .post(`http://localhost:3001/twofactor/deactivate/${userData.id}`)
        .then(result => {
          if (result.data.done) {
            alert('Autenticacion de dos factores desactivada')
          }
        })

    } else {
      setInputPhone({ ...inputPhone, deactivate: true })
    }

  }

  function onChange(event) {
    const name = event.target.name
    const value = event.target.value

    setInputPhone({ ...inputPhone, [name]: value })
    setErrors({
      number: '',
      code: ''
    })
  }

  async function onVerify() {
    if (!inputPhone.code) {
      setErrors({ ...errors, code: 'Introduce el código de verificación' })
    } else {
      let twoToken = localStorage.getItem("twoToken")
      await axios
        .post(`http://localhost:3001/twofactor/verify`, {
          number: inputPhone.number,
          code: inputPhone.code,
          twoToken
        })
        .then(result => {
          if (result.data.authTwo) {
            alert('proceso exitoso')
            setInputPhone({ ...inputPhone, deactivate: true })
          } else {
            setErrors({ ...errors, code: result.data.msg })
          }

        })
    }
  }

  return (
    <div className={style.mainContainer}>
      <NavBar renderTop={false} />
      <div className={style.secondContainer}>
        <div className={style.userDesc}>

          <div className={style.userInfo}>
            <h1 className={style.name} >{userData.name}</h1>
            <p className={style.rol}>Rol: {userData.type} </p>
            <button className={style.editProfile} onClick={() => history.push(`/editarperfil/`)}>
              Editar perfil </button>
            <p className={style.rol}>Administrar </p>
            <div className={style.btnContainer}>
              <br></br>
              <button className={style.editProfile} onClick={() => history.push(`/ordenes/`)}>
                Ordenes </button>
              <br></br>
              <button className={style.editProfile} onClick={() => history.push(`/usuarios/`)}>
                Usuarios </button>
              <br></br>
              <button className={style.editProfile} onClick={() => history.push(`/subastas/`)}>
                Subastas </button>
              <br></br>
              <button className={style.editProfile} onClick={() => history.push(`/solicitudes/`)}>
                Solicitudes </button>
              <br></br>
              <button className={style.editProfile} onClick={() => history.push(`/ofertas/`)}>
                Ofertas </button>
            </div>
            {/* Autenticacion de dos factores */}
            {!(userData.twoFactor) && !inputPhone.deactivate ?
              <div>
                <div className={style.checkTwoFactor}>
                  <input type='checkbox' onChange={onActivate} className='activate' />
                  <label>Activar autenticación de 2 factores</label>
                </div>
                <div>
                  {inputPhone.show && !inputPhone.send ?
                    <div>
                      <input type='number' name='number' value={inputPhone.number} onChange={onChange} laceholder='ingresar numero telefonico' className={style.inputNumero} />
                      <div>
                        {errors.number ? (
                          <span className={style.link}>{errors.number}</span>
                        ) : null}
                      </div>
                      <div className={style.inputNumero} >Ingresa cod país + código área + número </div>
                      <div>Ejemplo: 54 11 34563456 </div>
                      <button className={style.inputNumero} onClick={onSend}>Enviar</button>
                    </div>
                    : null}
                  {inputPhone.send ?
                    <div>
                      <input type='number' name='code' value={inputPhone.code} onChange={onChange} placeholder='ingresar código de verificación' className={style.inputNumero} />
                      <button className={style.inputNumero} onClick={onVerify}>verificar</button>
                    </div>
                    : null}
                  <div>
                    {errors.code ? (
                      <span className={style.link}>{errors.code}</span>
                    ) : null}
                  </div>
                </div>
              </div>
              :
              <div>
                <div className={style.checkTwoFactor}>
                  <input type='checkbox' onChange={onDeactivate} />
                  <label>Desactivar autenticación de 2 factores</label>
                </div>
              </div>
            }
            {/* Autenticacion de dos factores (fin) */}

          </div>
          <div className={style.containerPic}>
            <img className={style.userPic} src={userData.profilepic ? userData.profilepic : noProfPic} alt='User Pic' />
            <button onClick={() => history.push('/editarperfil')} className={style.editBtn}>
              <img className={style.edit} src={Edit} alt="" />
            </button>
          </div>
        </div>
        <div className={style.categories}>
          <div className={style.alignTitle}>
            <h2 className={style.title}>Categorias</h2>
            <Link className={style.linkAdd} to='/crearcategorias'>
              <img className={style.addCategory} src={Add} alt='Agrega nueva categoría' />
              <p className={style.addText}>Agregar categoría</p>
            </Link>
          </div>
          <CarouselCategories />
          <Link className={style.link} to='/categorias'>Administrar todas</Link>
          <ProductsAdmin />
        </div>
      </div>

    </div>
  );
}

export default AdminUser;
