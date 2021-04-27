import React, {useEffect, useState} from 'react'
import { Link, Redirect } from 'react-router-dom';
import style from './TwoFactorForm.module.css'
import signInUsers from '../../Actions/signInUsers'
import {useDispatch} from 'react-redux'
import axios from 'axios'

//
export default function TwoFactorForm(){

    const [input,setInput] = useState({code:''})
    const [error, setError] = useState('');
    const [redirect, setRedirect] = useState(false);
//
    const dispatch = useDispatch()

    function onChange(event){
        const value = event.target.value
        const name = event.target.name
        setError('')
        setInput({...input,[name]:value})
    }

    async function onSubmit(event){
        event.preventDefault();
        if(!input.code){
            setError('Debes introducir un código')
        }else{
            let twoToken=localStorage.getItem("twoToken");    
            await axios
            .post(`http://localhost:3001/twofactor/login/${twoToken}/${input.code}`)
            .then(result=>{
           
                if(result.data.auth){
                    localStorage.setItem("token", result.data.token);
                    localStorage.removeItem("twoToken");
                    setRedirect(true);
                    dispatch(signInUsers(result.data));
                }else{
                    setError(result.data.msg) 
                }
            })
        }
    }

if(redirect){
     return <Redirect to="coleccion"></Redirect>;
}

return(
    <div className={style.mainContainer}>
        <div className={style.alignForm}>
            <form  className={style.form} onSubmit={onSubmit}>

            <input
                className={style.input}
                type="text"
                name="code"
                value={input.code}
                placeholder="ingrese codigo de acceso..."
                onChange={onChange}
            ></input>
            <div>
                {error ? (
                <span className={style.link}>{error}</span>
                ) : null}
            </div>
            <button className={style.btn} type="submit">
                confirmar
            </button>

            </form>
        </div>
    </div>
)
}