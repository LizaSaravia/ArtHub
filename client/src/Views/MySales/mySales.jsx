import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../../Components/NavBar/NavBar';
import Styles from './mySales.module.css';
import {Link} from 'react-router-dom';
import SalesArtist from '../../Components/SalesArtist/salesArtist';



export default function MySales() {

    const userType = useSelector(state => state.userData.type);

    if ( userType && userType === 'artist') {
        return (
            <div className={Styles.mainContainer}>
                <NavBar />
                <div className={Styles.wrapper}>
                    <SalesArtist/>
                </div>

            </div>
        )
    }
    else if (userType === 'user' || userType === 'admin'){
        return(
            <div className={Styles.mainContainer}>
                <NavBar />
                <div className={Styles.wrapper}>
                   <p> Debido a tu tipo de cuenta no tienes acceso para ver esta página </p>
                   <p>Para ser artista y vender tus productos solicitalo <Link to='/solicitar'>aquí</Link></p>
                </div>

            </div>
        )
    }
    else {
        return(
            <div className={Styles.mainContainer}>
                <NavBar />
                <div className={Styles.wrapper}>
                </div>

            </div>
        )

    }

}