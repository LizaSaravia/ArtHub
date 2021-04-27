import React from 'react'
import FormCategories from '../../Components/FormCategories/FormCategories'
import NavBar from '../../Components/NavBar/NavBar.jsx'
import Styles from './createCategory.module.css'
import {Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'

function CreateCategory() {
    const loggedUser = useSelector(state => state.userData)
    if(loggedUser.type !== 'admin' && loggedUser.type !== 'artist') return <Redirect to='/miperfil'></Redirect>
    return (
        <div className={Styles.mainContainer}>
            <NavBar renderTop={false} />
            
            <FormCategories />
        </div>
    )
}

export default CreateCategory
