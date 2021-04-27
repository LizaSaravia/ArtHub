import React, { useEffect, useState } from 'react';
import style from './deleteUsers.module.css';
import {useSelector, useDispatch} from 'react-redux'
import getUsers from '../../Actions/getUsers'
import deleteUsers from '../../Actions/deleteUsers'
import close from '../../Images/cancel.svg'
import axios from 'axios';

function DeleteUsers(props) {
    const [theUser, setTheUser] = useState()

    const users = useSelector(state => state.users)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers());
        
    }, []);
    
    useEffect(() => {
        setTheUser(users.find((element) => element.id === props.userId ))
    }, [users])


    function handleSubmit() {
        
        try {
            axios
              .put(`http://localhost:3001/users/softdelete/${theUser.id}`, {
                id: theUser.id
              })
                

        } catch (error) {
            console.log(error);
            alert('No se pudo eliminar')
        }

        dispatch(deleteUsers(false));
        dispatch(getUsers())
        
    }

    const onClose = () =>{
        dispatch(deleteUsers(false))
    }
 

    return (
        <div className={style.mainDivPopUp}>
            <button onClick={()=>{onClose()}} className={style.btnCloseDiv}>
                <img className={style.close} src={close} alt="close edit"/>
            </button>
            <div className={style.formLabel}>
                estás seguro de querer eliminar al usuario?
            </div>        
            <div className = {style.btnSelect}>
                <button className={style.btn} onClick = {() => handleSubmit()}>
                    eliminar
                </button>
            </div>
        </div>
    )
}

export default DeleteUsers
