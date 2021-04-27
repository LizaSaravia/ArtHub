import React from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import AllUsers from '../../Components/AllUsers/AllUsers'
import style from './showAllUsers.module.css'
import { useSelector } from 'react-redux';
import SearchBar from "../../Components/SearchBar/SearchBar.jsx";
import { Redirect } from 'react-router-dom';


function ShowAllUsers() {
    const userType = useSelector(state => state.userData.type);

    if (userType !== 'admin') {
        return <Redirect to='/ingresar'></Redirect>
    }

    return (
        <div className={style.mainContainer}>
                <div className={style.mainContainer}>
                    <NavBar />
                    <AllUsers />
                </div>
        </div>
    )
}

export default ShowAllUsers
