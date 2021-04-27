import axios from 'axios'
import { Redirect } from "react-router-dom"
import React, { useState, useEffect } from 'react'
import NavBar from "../../Components/NavBar/NavBar"
import Styles from "./AllCategories.module.css"
import getCategories from '../../Actions/filter'
import {useSelector, useDispatch} from 'react-redux'
import DeleteCategories from '../../Components/DeleteCategories/DeleteCategories.jsx'
import opencategory from '../../Actions/opencategory'
import PopUp from '../../Components/EditCategories/EditCategories.jsx'
import deletecategory from '../../Actions/deletecategory'
import edit from "../../Images/edit.svg"
import deletecat from "../../Images/delete.svg"




function AllCategories() {
    const categories = useSelector(state => state.categories)

    const loggedUser = useSelector((state) => state.userData);

    const dispatch = useDispatch()

    const isOpenCategory = useSelector(state => state.isOpenCategory)

    const isOpenDeleteCat = useSelector(state => state.isOpenDeleteCat)

    const [categoryId, setCategoryId] = useState()

    const [flag, setFlag] = useState(false)

    useEffect(() => {

        dispatch(getCategories());
        setFlag(false)

    }, [flag]);

    function handleClick(id){
        isOpenCategory === false ? dispatch(opencategory(true)) : dispatch(opencategory(false));
        setCategoryId(id)
    }

    function handleDeleteClick(id){
        isOpenDeleteCat === false ? dispatch(deletecategory(true)) : dispatch(deletecategory(false));
        setCategoryId(id)
    }

    if(loggedUser.type !== 'admin' && loggedUser.type !== 'artist') return <Redirect to="/miperfil"></Redirect>
    
    return (
        <div className={Styles.mainContainer}>
            <NavBar renderTop={false} />
            <div className={Styles.container}>
                {isOpenCategory === true && <PopUp categoryId = {categoryId} flag={setFlag} />}
                {isOpenDeleteCat === true && <DeleteCategories category = {categoryId} flag={setFlag} />}
                <table className={Styles.table}>
                    <tr>
                        <th className={Styles.categories}>Categorías:</th>
                        <th>
                        </th>
                    </tr>
                    {
                        categories.map((p) => (
                        <tr className={Styles.tr}>
                            <td>{p.name}</td>
                            <td className = {Styles.description}>{p.description}</td>
                            <th className={Styles.th}>
                                <div className={Styles.btnContainer}>
                                    <div className={Styles.btnContainer} onClick ={() => handleClick(p.id)}>
                                        <img className={Styles.icon} src={edit} alt="edit item" />
                                    </div>

                                    <div className={Styles.btnContainer} onClick ={() => handleDeleteClick(p)}>
                                    <img className={Styles.icon} src={deletecat} alt="edit item" />
                                    </div>
                                </div>
                            </th>
                        </tr>
                        ))                        
                    }
                </table>
            </div>
        </div>
    )
}

export default AllCategories