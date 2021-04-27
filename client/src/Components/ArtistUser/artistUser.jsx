import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import Styles from './artistUser.module.css';
import table from '../BuyUser/buyUser.module.css';
import style from '../AdminUser/adminuser.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import noProfPic from '../Assets/profPic.jpg';
import Edit from '../../Images/edit.svg';
import Add from '../../Images/add-file.svg';
import CarouselCategories from '../CarouselCategories/carouselCategories';
import getUserOrders from '../../Actions/getUserOrders';
import Sales from './sales.jsx';
import axios from 'axios'
import ArtistAuctions from './artistAuctions'

export default function ArtistUser() {

    const userData = useSelector(state => state.userData);
    const artistProducts = useSelector(state => state.artistProducts);
    const userOrders = useSelector(state => state.userOrders);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserOrders(userData.id));

    }, []);

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
        <div className={Styles.mainContainer}>
            <NavBar renderTop={false} />

            <div className={Styles.wrapper}>

                <div className={Styles.userDesc}>

                    <div className={Styles.userInfo}>
                        <h1 className={Styles.name} >{userData.name}</h1>
                        <p className={Styles.rol}>Rol:{userData.type} </p>
                        <button className={Styles.editProfile} onClick={() => history.push(`/editarperfil/`)}>
                            Editar perfil </button>
                        <br></br>
                        <button className={style.editProfile} onClick={() => history.push(`/solicitarSubasta/`)}>
                            Solicitar subasta </button>

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
                                            <div className={style.inputNumero} >ingresa cod país + código área + número </div>
                                            <div>Ej: 54 11 34563456 </div>
                                            <button className={style.inputNumero} onClick={onSend}>enviar</button>
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
                    <div className={Styles.containerPic}>
                        <img className={Styles.userPic} src={userData.profilepic ? userData.profilepic : noProfPic} alt='User Pic' />
                        <button onClick={() => history.push('/editarperfil')} className={Styles.editBtn}>
                            <img className={Styles.edit} src={Edit} alt="" />
                        </button>

                    </div>
                </div>
                {/* Productos */}
                <div className={Styles.products}>
                    <div className={Styles.alignTitle}>
                        <h2 className={Styles.title}>Productos</h2>
                        <Link className={Styles.linkAdd} to='/crearproducto'>
                            <img className={Styles.addProduct} src={Add} alt='Agrega un producto' />
                            <p className={Styles.addText}>Agregar producto</p>
                        </Link>
                    </div>
                    <CarouselCategories />
                    <Link className={Styles.link} to={`/misproductos`}>Administrar todos</Link>
                </div>
                {/* Ordenes (compras) */} 
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
                {/* Ventas */}
                <div className={Styles.sales}>
                    <Sales />
                </div>
                {/* Subastas */}
                <div className={Styles.sales}>
                    <ArtistAuctions />
                </div>


            </div>

        </div>


    )
}