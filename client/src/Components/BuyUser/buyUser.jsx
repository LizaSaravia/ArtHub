import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import { Link, useHistory } from 'react-router-dom';
import style from '../AdminUser/adminuser.module.css';
import { useSelector, useDispatch } from 'react-redux';
import NotFound from '../Assets/profPic.jpg';
import Edit from '../../Images/edit.svg';
import getUserOrders from '../../Actions/getUserOrders';
import table from './buyUser.module.css';
import axios from 'axios'

//get a users id y agarrar el user por el redux store
export default function BuyUser() {
    //get user id from authentication info in store

    //get the user info 
    const userData = useSelector(state => state.userData);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserOrders(userData.id));
    }, []);

    //get user orders
    const userOrders = useSelector(state => state.userOrders);

    //newsletter
    const suscribeNewsletter = () => {
        var answer = window.confirm("¿Estás seguro?");
        if (answer) {
            axios.post(`http://localhost:3001/newsletter/${userData.id}/subscribe`)
                .then((res) => {
                  
                    dispatch({ type: 'SIGN_IN_REFRESH', payload: { ...userData, newsletter: true } })
                   
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    const unsuscribeNewsletter = () => {
        var answer = window.confirm("Estás seguro?");
        if (answer) {
            axios.post(`http://localhost:3001/newsletter/${userData.id}/unsubscribe`)
                .then((res) => {
                  
                    dispatch({ type: 'SIGN_IN_REFRESH', payload: { ...userData, newsletter: false } })
                   
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    let history = useHistory()

    //Autenticacion de 2 factores
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

    //Autenticacion de 2 factores (fin)
    return (
        <div className={style.mainContainer}>
            <NavBar renderTop={false} />
            <div className={style.secondContainer}>
                <div className={style.userDesc}>

                    <div className={style.userInfo}>
                        <h1 className={style.name} >{userData.lastname ? (userData.name + ' ' + userData.lastname) : (userData.name)}</h1>
                        <div className={style.info}>
                            {userData.birth ? <p>Cumpleaños: {userData.birth && userData.birth.slice(5, 10)} </p> : null}
                            <p>Correo electrónico: {userData.email} </p>
                        </div>
                        {!userData.newsletter ?
                            <div>
                                <p>¿Te gustaría suscribirte a nuestro newsletter?</p>
                                <a className={table.links} onClick={suscribeNewsletter}>Click acá</a>
                            </div>
                            :
                            <div>
                                <p>¡Estás suscripto a nuestro newsletter! ¿Deseas desuscribirte?</p>
                                <a className={table.links} onClick={unsuscribeNewsletter}>Click acá</a>
                            </div>
                        }

                        <p>¿Queres ser artista y vender tus obras? Solicitalo <Link className={table.links} to='/solicitar'>acá.</Link></p>

                        <button className={table.btnEditProfile} onClick={() => history.push(`/editarperfil/`)}>
                            Editar mi perfil </button>

                        {/* Autenticacion de dos factores */}
                        {!(userData.twoFactor) && !inputPhone.deactivate ?
                            <div >
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
                                            <div className={style.inputNumero}>Ingresa código de país + código área + número </div>
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
                        <img className={style.userPic} src={!userData.profilepic ? NotFound : userData.profilepic} alt='User Pic' />
                        <button className={style.editBtn} onClick={() => history.push(`/editarperfil/`)}>
                            <img className={style.edit} src={Edit} alt="" />
                        </button>
                    </div>

                </div>

                <div className={style.containerProducts}>
                    <h2 className={style.title}>Mis órdenes</h2>

                    {!userOrders.message ?
                        <div className={style.divOrders}>
                            <div className={table.tableContainer}>
                                {userOrders.length > 0 && userOrders.map(o =>
                                    <div className={table.orderContainer} >
                                        <p className={table.infoProduct}>Orden: {o.id_order}</p>
                                        <p className={table.infoProduct}>State: {o.state}</p>
                                        <p className={table.infoProduct}>Precio total: $ {o.total_price}</p>
                                        <p className={table.infoProduct}>Creada: {o.createdAt.slice(0, 10)}</p>



                                        <Link to={`/detalledeorden/${o.id_order}`} >Ver detalle</Link>
                                    </div>

                                )}
                            </div>
                        </div>
                        :
                        <div className={table.notOrders} >
                            <p className={table.infoProduct}>Aún no hiciste una compra, ¿deseas hacerlo? Visita
                               nuestra <Link className={table.links} to='/coleccion'>colección.</Link>
                            </p>
                        </div>
                    }
                </div>
            </div>

        </div>

    )

}
