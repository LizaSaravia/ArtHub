import React from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import AllAuctions from '../../Components/AllAuctions/AllAuctions'
import style from './allAuctionsAdmin.module.css'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function AllAuctionsAdmin() {
    const userType = useSelector(state => state.userData.type);

    if (userType !== 'admin') {
        return <Redirect to='/ingresar'></Redirect>
    }

    return (
        <div className={style.mainContainer}>
                <div className={style.mainContainer}>
                    <NavBar />
                    <AllAuctions />
                </div>
        </div>
    )
}

export default AllAuctionsAdmin
