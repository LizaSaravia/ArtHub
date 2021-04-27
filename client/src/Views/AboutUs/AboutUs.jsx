import React from 'react'
import NavBar from '../../Components/NavBar/NavBar.jsx'
import style from './aboutUs.module.css'
import Team from '../../Components/AboutSection/aboutSection';

export default function AboutUs() {
    return (
       <div className={style.mainContainer}>
           <NavBar></NavBar>
           <div className={style.aboutContainer}>
           <Team></Team>
           </div>
       </div>
    )
}


