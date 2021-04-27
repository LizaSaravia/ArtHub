import React, { useEffect, useState } from 'react';
import style from './promoteUsers.module.css'
import { useSelector, useDispatch } from 'react-redux'
import getUsers from '../../Actions/getUsers'
import close from '../../Images/cancel.svg'
import changeusertype from '../../Actions/changeusertype'
import axios from 'axios';

function PromoteUsers(props) {
    const users = useSelector(state => state.users)

    const [theUser, setTheUser] = useState()

    const [theType, setTheType] = useState({type: 'admin'})



    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers());
        return () => {dispatch(changeusertype(false))}
    }, [])

    useEffect(() => {
        setTheUser(users.find((element) => element.id == props.userId))
    }, [users])

    function handleSubmit(ev) {

        ev.preventDefault();
        try {
            axios.put(`http://localhost:3001/users/${theUser.id}`, {
                username: theUser.username,
                    name: theUser.name,
                    lastname: theUser.lastname,
                    profilepic: theUser.profilepic,
                    email: theUser.email,
                    password: theUser.password,
                    birth: theUser.birth,
                    type: theType.type,
                    state: theUser.state,
                })
        } catch (error) {
            console.log(error);
            alert('No se pudo cambiar el tipo')
        }

        dispatch(changeusertype(false))
        dispatch(getUsers())
        
    }

    function handleChange(ev) {
      
        setTheType({
            type: ev.target.value
        });

    }


    const onClose = () =>{
        dispatch(changeusertype(false))
    }

    return (
        <div className={style.mainDivPopUp}>

            <button onClick={()=>{onClose()}} className={style.btnCloseDiv}>
                <img className={style.close} src={close} alt="close edit"/>
            </button>

            <h1 className={style.title}>edita el tipo de usuario</h1>
            
            <form className={style.formLabel} onSubmit={handleSubmit} >
                
                <p className={style.titles}>nombre:</p>
                <input className={style.input} name='name' value={theUser?.name} disabled/>
                <p className={style.titles}>apellido:</p>
                <input className={style.input} name='lastname' value={theUser?.lastname} disabled/>
                <p className={style.titles}>rol:</p>
                <input className={style.input} name='lastname' value={theUser?.type} disabled/>

                <div className={style.containerInput}>
                    {theUser === 'admin' ? null : 
                <div>
                <input type = 'radio' id='admin' onChange={handleChange} name='type' value="admin" />
                <label htmlFor="admin" className = {style.label}> admin</label>
                </div>
                    }
                    {theUser === 'artist' ? null : 
                <div>
                <input type = 'radio' id='artist' onChange={handleChange} name='type' value="artist"/>
                <label htmlFor="artist" className = {style.label}> artist</label>
                </div>
                }
                {theUser === 'user' ? null :
                <div>
                <input type = 'radio' id='user' onChange={handleChange} name='type' value="user"/>
                <label htmlFor="user" className = {style.label}> usuario</label>
                </div>}
                </div>
                <div className={style.btnSelect}>
                    <button className={style.btn} type='submit'>
                        editar
                    </button>

                </div>


            </form>

        </div>
    )
}

export default PromoteUsers