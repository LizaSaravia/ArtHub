import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Styles from "./navBar.module.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import signOutUsers from '../../Actions/signOutUsers'
import profPic from '../Assets/profPic.jpg'

import getAuctions from '../../Actions/getAuctions'

function NavBar({ renderTop }) {
  const loggedUser = useSelector(state => state.userData);
  const Auctions = useSelector(state => state.auctions)
  const history = useHistory();
  const [redirect, setRedirect] = useState(false);
  function handleGoBack() {
    history.push('/');
  }
  const dispatch = useDispatch();

  function clickHandler() {
    dispatch(signOutUsers())
    localStorage.removeItem('token')
    setRedirect(true)
  }

  useEffect(() => {
      dispatch(getAuctions())
  },[])

// inicio busqueda del id Auction 
var idAuction = 0;
for (var i = 0; i < Auctions.length; i++) {
    if (Auctions[i].state == 'subastando') {
        idAuction += Auctions[i].id_auction

    }
}




  if (redirect) return <Redirect to="/ingresar"></Redirect>
  return (
    <nav className={renderTop === true ? Styles.navMain : Styles.navMain2}>
      {renderTop === true ? (
        <div className={Styles.navContainer}>
          <div className={Styles.navContainerSecciones}>
            <Link className={Styles.link} to="/coleccion">
              <p className={Styles.secciones}>colección</p>
            </Link>
            <Link className={Styles.link} to="/artistas">
              <p className={Styles.secciones}>artistas</p>
            </Link>
            <Link className={Styles.link3} to="/nosotros">
              <p className={Styles.secciones}>nosotros</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className={Styles.navContainer2}>
          <p onClick={handleGoBack} className={Styles.tituloNavbar2}>
            arthub
            </p>

          <div className={Styles.navContainerSecciones2}>
            <Link className={Styles.link2} to="/coleccion">
              <p className={Styles.secciones2}>colección</p>
            </Link>
            <Link className={Styles.link2} to="/artistas">
              <p className={Styles.secciones2}>artistas</p>
            </Link>
            <Link className={Styles.link2} to="/nosotros">
              <p className={Styles.secciones2}>nosotros</p>
            </Link>
            <Link className={Styles.link2} to="/faq">
              <p className={Styles.secciones2}>faq</p>
            </Link>
            {idAuction > 0 && loggedUser.username ?
             <Link className={Styles.link2} to={`/subastaActual/${idAuction}`}>
             <p className={Styles.secciones2}>subasta</p>
           </Link>
           :
           <></>
             }
          

          </div>

          {/* ------------------------------------------------ */}
          <div className={Styles.navContainerSeccionesProf}>
            {loggedUser.id > 0 ? (
              <div className={Styles.containerUser}>

                {loggedUser.id > 0 && loggedUser.profilepic ? (
                  <Link className={Styles.link2} to='/miperfil'>
                    <img
                      className={Styles.profPic}
                      src={loggedUser.profilepic}
                    ></img>
                  </Link>
                ) : (
                  <Link className={Styles.link2} to='/miperfil'>
                    <img className={Styles.profPic} src={profPic}></img>
                  </Link>

                )}
                {loggedUser.id > 0 ? (
                  <Link className={Styles.link2} to='/miperfil'>
                    <h1 className={Styles.profInfo}>{loggedUser.name.toLowerCase()}</h1>
                  </Link>
                ) : null}

              </div>
            )
              : <div className={Styles.navContainerSecciones2}>
                {loggedUser.id > 0 ? (
                  <Link className={Styles.link2} to="/miperfil">
                    <p className={Styles.secciones2}>mi cuenta</p>
                  </Link>
                ) : (
                  <Link className={Styles.link2} to="/ingresar">
                    <p className={Styles.secciones2}>mi cuenta</p>
                  </Link>
                )}
              </div>}

            <div className={Styles.close}>

              {loggedUser.id > 0 ? (
                <p onClick={clickHandler} className={Styles.secciones2}>
                  cerrar sesión
                </p>
              ) : null}
            </div>


          </div>
        </div>
      )
      }
    </nav>
  )
}

export default NavBar