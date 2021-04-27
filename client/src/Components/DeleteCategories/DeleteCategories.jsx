import React, { useEffect, useState } from 'react';
import style from './deleteCategories.module.css';
import {useSelector, useDispatch} from 'react-redux'
import getCategories from '../../Actions/filter'
import deletecategory from '../../Actions/deletecategory'
import close from '../../Images/cancel.svg'
import axios from 'axios';


function DeleteCategories(props) {

    const [input, setInput] = useState({name:'' , descripction:''});
    // const [errors, setErrors] = useState({}); ---> Hacer despues 

    // function validate(){} ---> Hacer despues

    const [theCategory, setTheCategory] = useState()

    const categories = useSelector(state => state.categories)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategories());
        
    }, []);
    
    useEffect(() => {
        setTheCategory(categories.filter((element) => element.id == props.category.id)[0])
    }, [categories])


    function handleSubmit() {
        try {
            axios.delete(`http://localhost:3001/products/category/${props.category.id}`)
            .then(response => props.flag(true))


        } catch (error) {
            console.log(error);
            alert('No se pudo eliminar la categoria')
        }

        dispatch(deletecategory(false));
        
    }

    const onClose = () =>{
        dispatch(deletecategory(false))
    }
 

    return (
        <div className={style.mainDivPopUp}>
            <button onClick={()=>{onClose()}} className={style.btnCloseDiv}>
                <img className={style.close} src={close} alt="close edit"/>
            </button>
            <div className={style.formLabel}>
                estás seguro de querer eliminar la categoría {props.category.name} ?
            </div>        
            <div className = {style.btnSelect}>
                <button className={style.btn} onClick = {() => handleSubmit()}>
                    eliminar
                </button>
            </div>
        </div>
    )
}


export default DeleteCategories
