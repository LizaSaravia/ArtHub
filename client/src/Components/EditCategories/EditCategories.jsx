import React, { useEffect, useState } from 'react';
import style from './editCategories.module.css'
import { useSelector, useDispatch } from 'react-redux'
import getCategories from '../../Actions/filter'
import opencategory from '../../Actions/opencategory'
import firebase from 'firebase';
import close from '../../Images/cancel.svg'
import axios from 'axios'

function EditCategories(props) {

    const [input, setInput] = useState({ name: '', descripction: '' });
    // const [errors, setErrors] = useState({}); ---> Hacer despues 

    // function validate(){} ---> Hacer despues

    const categories = useSelector(state => state.categories)

    const [theCategory, setTheCategory] = useState()


    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getCategories());
        return () => {dispatch(opencategory(false))}
        
    }, []);

    useEffect(() => {
        setTheCategory(categories.filter((element) => element.id == props.categoryId)[0])
        setUpload({ picture: theCategory?.image })
    }, [categories])

    // Firebase

    const [upload, setUpload] = React.useState({
        process: 0,
        picture: ''
    });

    function handleUpload(event) {

        const file = event.target.files[0];

        if (event.target.files.length) {
            const storageRef = firebase.storage().ref(`/images/${file.name}`)
            const task = storageRef.put(file)

            task.on('state_changed', snapshot => {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setUpload({
                    process: percentage
                })
            },
                error => {
                    console.log(error.message)
                }, () => {
                    storageRef.getDownloadURL().then(url => {
                   
                        setUpload({ picture: url })
                        setTheCategory({ ...theCategory, image: url })
                    });
                })
        }
    }

    // Firebase end

    function handleSubmit(ev) {

        ev.preventDefault();
        try {
            axios(`http://localhost:3001/products/category/${theCategory.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify({
                //     name: theCategory.name,
                //     description: theCategory.description,
                //     image: theCategory.image
                //})
            })
                .then((res) => res.json())
                .then(response => props.flag(true))

        } catch (error) {
            console.log(error);
            alert('No se pudo editar la categoria')
        }

        dispatch(opencategory(false))
    }

    function handleChange(ev) {
        setTheCategory({
            ...theCategory,
            [ev.target.name]: ev.target.value
        });

    
    }

    const onClose = () =>{
        dispatch(opencategory(false))
    }
  

    return (
        <div className={style.mainDivPopUp}>
            <button onClick={()=>{onClose()}} className={style.btnCloseDiv}>
                <img className={style.close} src={close} alt="close edit"/>
            </button>
            <h1 className={style.title}>edita una categoría</h1>
            <form className={style.formLabel} onSubmit={handleSubmit} >
                <p className={style.titles}>nombre:</p>
                <input className={style.input} onChange={handleChange} type='text' required='required' placeholder='nombre*' name='name' value={theCategory?.name} />
                <p className={style.titles}>descripción:</p>
                <textarea className={style.textArea} onChange={handleChange} type='text' required='required' placeholder='descripción*' name='description' value={theCategory?.description} />
                

                    <div className={style.radio}>
                        <label for='files' >
                            <div className={style.containerCatPic}>
                                {upload.picture ? <img className={style.picture} src={upload.picture} /> : <div className={style.containerCatPic}>
                                    seleccionar imagen
            </div>}

                            </div>

                        </label>

                        <input className={style.inputFile} type='file' id='files' onChange={handleUpload} />
                    </div>
               
                <div className={style.btnSelect}>
                    <button className={style.btn} type='submit'>
                        editar
                    </button>

                </div>


            </form>

        </div>
    )
}

export default EditCategories
