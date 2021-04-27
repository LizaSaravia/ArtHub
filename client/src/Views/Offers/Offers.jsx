import React, { useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import { useSelector, useDispatch } from 'react-redux';
import style from './offers.module.css'
import { createOffer, deleteOffer } from '../../Actions/offers';

export default function Offers() {

    const categories = useSelector(state => state.categories);
    const offers = useSelector(state => state.offers);
    const dispatch = useDispatch();

    const [offer, setOffer] = useState({
        day: '1',
        idCategory: '1',
        discount: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (offer.discount) {
            dispatch(createOffer(offer));
            alert('Oferta creada')
        } else {
            alert('Debe ingresar un descuento')
        }
    }

    const handleChange = (e) => {

        setOffer({
            ...offer,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = (id) => {
        dispatch(deleteOffer(id));
    }

    const showDay = (id) => {
        switch (id) {
            case 1:
                return 'Lunes';

            case 2:
                return 'Martes';

            case 3:
                return 'Miércoles';
            case 4:
                return 'Jueves';
            case 5:
                return 'Viernes';
            case 6:
                return 'Sábado';
            case 0:
                return 'Domingo';
            default:
                break;
        }
    }

    const showCategory = (id) =>{
        return categories.find(c => c.id === id).name
    }

    return (
        <div className={style.mainContainer}>
            <NavBar />
            <div className={style.formContainer}>
                <h1>Crear oferta</h1>
                <form onSubmit={handleSubmit}>
                    <div>

                        <label htmlFor="day">Dia:</label>
                        <select className={style.select} name='day' id='day' onChange={handleChange}>
                            {/* <option>Seleccionar dia: </option> */}

                            <option value='1'>Lunes</option>
                            <option value="2">Martes</option>
                            <option value="3">Miércoles</option>
                            <option value="4">Jueves</option>
                            <option value="5">Viernes</option>
                            <option value="6">Sábado</option>
                            <option value="0">Domingo</option>
                        </select>
                    </div>
                    <div>

                        <label htmlFor="category">Categoria:</label>

                        <select className={style.select} name='idCategory' id='category' onChange={handleChange}>
                            {/* <option>Seleccionar categoria: </option> */}
                            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                    </div>
                    <div>

                        <label htmlFor="discount">Porcentaje:</label>
                        <input className={style.input} name='discount' id='discount' onChange={handleChange} type="number" max='100' min='0' />
                    </div>
                    <button className={style.btn} type='submit'>Guardar</button>
                </form>
                <div className={style.offersContainer}>
                    {
                        offers.map(o =>
                            <div className={style.offer}>
                                <h1>Oferta {o.id}</h1>
                                <div>
                                    <p>Dia: {showDay(o.day)}</p>
                                    <p>Categoria: {showCategory(o.categoryId)}</p>
                                    <p>Porcentaje: {o.discount}%</p>
                                    <button className={style.btn} onClick={() => handleClick(o.id)}>Eliminar</button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
