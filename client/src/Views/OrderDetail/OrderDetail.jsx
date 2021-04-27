import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import axios from 'axios'
import NavBar from '../../Components/NavBar/NavBar';
import style from '../OrderDetail/OrderDetail.module.css';
import iconReview from '../../Images/review.svg';
import { getUserReviews } from '../../Actions/reviews';
import checkIcon from '../../Images/comprobado.svg'


function OrderDetail() {
    const [orderDetail, setOrderDetail] = useState({})
    const userType = useSelector(state => state.userData.type);
    const dispatch = useDispatch();

    const { id } = useParams()
    const idUser = useSelector(state => state.userData.id)

    const userReview = useSelector(state => state.userReviews)

    useEffect(() => {
        async function order() {
            await axios.get(`http://localhost:3001/orders/${id}`)
                .then((res) => {
                    (!res.message) ? setOrderDetail(res.data) : setOrderDetail()
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        order();
    }, [id])
    useEffect(() => {

        dispatch(getUserReviews(idUser));
    }, [idUser])

    const EditStateChange = (e) => {
        axios.put(`http://localhost:3001/orders/${id}`, { state: e.target.value, total_price: orderDetail.total_price })
            .then((res) => {
                setOrderDetail({ ...orderDetail, state: res.data.state })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const completePayment = () => {
        axios.get(`http://localhost:3001/orders/${id}`)
            .then((res) => {
                window.location = res.data.payment_link
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className={style.mainContainer}>
            <div className={style.navBaralign}>
                <NavBar renderTop={false} />

                {
                    (Object.entries(orderDetail).length > 1) ?

                        <div className={style.secondContainer}>
                            <h2 className={style.title}>Detalle de orden</h2>
                            <h3 className={style.title}>  Estado: {orderDetail.state} </h3>
                            {/* {
                                orderDetail.state !== "fullfilled" ?
                                    <button className={style.btn} onClick={() => toLocalStorage()}> Quiero editar la orden </button>
                                    : <div></div>
                            } */}
                            {
                                orderDetail.state !== "fullfilled" ?
                                    <button className={style.btnPago} onClick={() => completePayment()}> Quiero completar el pago de mi orden </button>
                                    : <div></div>
                            }
                            {
                                userType === 'admin' ?
                                    <select  className={style.title} value={orderDetail.state} onChange={EditStateChange}>
                                        Editar estado
                                    <option value="pending">Pendiente</option>
                                        <option value="fullfilled">Aprobada</option>
                                    </select> : null
                            }
                            <h3 className={style.title}> Fecha: {orderDetail.createdAt.slice(0, 10)} </h3>
                            <h3 className={style.title}> Precio total: $ {orderDetail.total_price} </h3>

                            {orderDetail && orderDetail.lineorders.map(l =>

                                <div className={style.orderContainer} >
                                    <div className={style.productInfo}>
                                        <p className={style.infoProduct}>Producto: {l.product.title} </p>
                                        <p className={style.infoProduct}>Cantidad: {l.quantity}</p>
                                        <p className={style.infoProduct}>Precio: $ {l.unit_price}</p>
                                        <div className={style.address}>
                                            <p className={style.infoProduct}>Dirección de envío: {orderDetail.address}</p>
                                        </div>
                                    </div>

                                    <div className={style.containerImg}>
                                        <img className={style.img} src={l.product.images[0].url} alt="product image" />
                                    </div>

                                    {
                                        orderDetail.state === 'fullfilled'
                                        ?
                                            userReview && userReview.length > 0 && userReview.find(r => r.productIdProduct === l.product.id_product) ?
                                            <Link className={style.iconRContainer} to={`/editarReseña/${l.product.id_product}`}>
                                                <img className={style.iconReview} src={iconReview} alt='agrega una reseña' />
                                                <img className={style.checkIcon} src={checkIcon} alt='agrega una reseña' />

                                            </Link>
                                            :
                                            <Link className={style.iconRContainer} to={`/agregarReseña/${l.product.id_product}`}>
                                                <img className={style.iconReview} src={iconReview} alt='agrega una reseña' />
                                            </Link>
                                        :
                                        <></>
                                    }
                                </div>
                            )}

                        </div>
                        :
                        <div className={style.secondContainer}>
                            <p>No hay informacion disponible</p>
                        </div>
                }



            </div>
        </div>
    )
}

export default OrderDetail