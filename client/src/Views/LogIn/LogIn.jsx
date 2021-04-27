import React from 'react'
import LogInForm from '../../Components/LogIn/LogInForm.jsx'
import style from './login.module.css'
import NavBar from '../../Components/NavBar/NavBar.jsx'
import {Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
function LogIn() {
  const loggedUser = useSelector(state => state.userData);
  if(loggedUser.id > 0) return <Redirect to="/miperfil" />
    return (
      
        <div className={style.container}>
          <NavBar renderTop={false} ></NavBar>
          <LogInForm></LogInForm>
        </div>
     
    );
}

export default LogIn
