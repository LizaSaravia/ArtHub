import React, {useEffect, useState} from 'react'
import { Link, Redirect } from 'react-router-dom';
import style from './PasswordReset.module.css'
import signInUsers from '../../Actions/signInUsers'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
//
export default function PasswordReset(props) {

const [input, setInput] = useState({
    password1: '',
    password2: ''
  })

  const [redirect,setRedirect] = useState(false)

  const [expired,setExpired] = useState(false)

  const userData = useSelector(state => state.userData)

  useEffect(()=>{
    async function request() {
          axios
            .post("http://localhost:3001/mailer/validate/token", {
              headers: {
                Authorization: `${props.token}`,
              },
            })
            .then(async (result) => {
            
                if(!result.data.auth){
                   
          
                    setExpired(true)
                }
            }).catch(err=>{
                console.log(err)
            })
      }

    request()

  
  
       
  },[])

const [error,setError] = useState('')

function onChange (event) {
    const name = event.target.name
    const value = event.target.value
    setInput({...input,[name]:value})
    setError('')
}

function onSubmit (event){
    event.preventDefault();
    if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(input.password1))){
        setError("la contraseña debe contener por lo menos 8 caracteres, una mayúscula y un número")
    }else  if(input.password1 !== input.password2){
        setError('Los datos ingresados no coinciden')
    }else{
        try{
            axios
            .post(`http://localhost:3001/mailer/resetpassword/${input.password1}`, {
              headers: {
                Authorization: `${props.token}`,
              },
            }).then(result=>{
                if(result.data.success)
              
                alert('contraseña cambiada')
                setRedirect(true)
            })
        }catch(err){
            console.log(err)
            alert('no se pudo resetear la contraseña')
        }

    }
}

if(redirect || userData.id){
    return <Redirect to="/ingresar" ></Redirect>; 
}

return (
    
  <div className={style.mainContainer}>
    {!(expired)?
    <div className={style.alignForm}>
      <form  className={style.form} onSubmit={onSubmit}>
        <input
          className={style.input}
          type="password"
          name="password1"
          value={input.password1}
          placeholder="contraseña..."
          onChange={onChange}
        ></input>
        <input
          className={style.input}
          type="password"
          name="password2"
          value={input.password2}
          placeholder="reingrese contraseña..."
          onChange={onChange}
        ></input>
        {error ? (
          <span className={style.link}>{error}</span>
        ) : null}
        <button className={style.btn} type="submit">
          enviar
        </button>
      </form>
    </div>
    :<div>
     <div>Tu enlace de reseteo de contraseña ha expirado.</div>
     <div>Para solicitar uno nuevo <a className={style.link} href='http://localhost:3000/ingresar'>click aquí</a></div>
     </div>
    }
  </div>
);
}


