import React, {useEffect, useState} from 'react'
import { Link, Redirect } from 'react-router-dom';
import style from './EmailForm.module.css'
import signInUsers from '../../Actions/signInUsers'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
//
export default function EmailForm(){

    const [input,setInput] = useState('')
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const [redirect,setRedirect] = useState(false)
    const userData = useSelector(state => state.userData)

    function onChange(event){
        setInput(event.target.value)
        setError('')
    }

    function onSubmit(event){
        event.preventDefault();
        if(!input){
            setError('El campo es requerido')
        }else{
            setLoading(true)
            try{
                axios
                .post(`http://localhost:3001/mailer/send/${input}`)
                .then(result=>{
                   
                    if(!result.data.email){
                        setError('No existe ningún usuario registrado con éste mail')
                        setLoading(false)
                    }else{
                        if(result.data.email=='google'){
                            setError('Este correo se encuentra asociado a un login con google')
                            setLoading(false)
                        }else if(result.data.email=='facebook'){
                            setError('Este correo se encuentra asociado a un login con facebook')
                            setLoading(false)
                        }else{
                            setLoading(false)
                            alert('Email enviado con éxito')
                            setRedirect(true)
                        }
                    }
                })
            }catch(err){
                setLoading(false)
                console.log(err)
                alert('no se pudo enviar el mail')
            }

        }

    }

    if(redirect || userData.id){
        return <Redirect to="/ingresar" ></Redirect>; 
    }

    return(
        <div className={style.mainContainer}>
             <div className={style.alignForm}>
        <form  className={style.form} onSubmit={onSubmit}>
            {!loading?
            <input
            className={style.input}
            type="text"
            name="email"
            value={input}
            placeholder="ingrese email..."
            onChange={onChange}
            ></input>
            :<img src={require('../../Images/simple.gif')}/>}
            {error ? (
            <span className={style.link}>{error}</span>
            ) : null}
            <button className={style.btn} type="submit">
            enviar
            </button>
        </form>
    </div>
    </div>
    )
}