import React from 'react'
import NavBar from '../../Components/NavBar/NavBar.jsx'
import Carrousel from '../../Components/Carrousel/carrousel';
import Styles from './home.module.css'

function Home() {
    return (
        <div className={Styles.mainContainer}>
            
            <NavBar renderTop={true} />
            <div className={Styles.titleContainer}>
                <h1 className={Styles.title}>arthub</h1>
                <p className={Styles.subtitle}>arte en su máxima expresión</p>
            </div>
            <Carrousel></Carrousel>
        </div>
    )
}


export default Home
