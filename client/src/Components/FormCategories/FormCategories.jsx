import React, { useState } from 'react'
import style from './formCategories.module.css'
import firebase from 'firebase';
import axios from 'axios';


export const validate = (input) => {
    let errors = {};
    if (!input.name) {
        errors.name = 'nombre es obligatorio';
    }


    if (!input.description) {
        errors.description = 'la descripcion es obligatoria';
    }
    return errors;

};

function FormCategories() {

    const [input, setInput] = useState({ name: '', description: '' });
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});

    // Firebase

    const [upload, setUpload] = React.useState({
        process: 0,
        picture: ''
    });

    const [refresh, setRefresh] = React.useState([])

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
                        setInput({ ...input, image: url })
                    });
                })
        }
    }

    // Firebase end

    function handleSubmit(ev) {
        ev.preventDefault();
        try {
            
            axios.post('http://localhost:3001/products/category', {
                name : input.name,
                description: input.description
            })
                .then(response => alert('Categoria creada'))

        } catch (error) {
            console.log(error);
            alert('No se pudo crear la categoria')
        }
    }

    function handleChange(ev) {
        setInput({
            ...input,
            [ev.target.name]: ev.target.value
        });

        setErrors(validate({
            ...input, [ev.target.name]: ev.target.value
        }));
    }

    function onFocus(ev) {
        setTouched({
            ...touched,
            [ev.target.name]: true
        })
    }

    return (
        <div className={style.create}>
            <h1>crea una nueva categoría</h1>
            <form onSubmit={handleSubmit} >

                {/* <div> */}

                <input onFocus={onFocus} className={style.input} onChange={handleChange} type='text' required='required' placeholder='nombre*' name='name' value={input.name} />
                {errors.name && touched.name && (
                    <p>{errors.name}</p>
                )}

                {/* </div> */}
                <textarea onFocus={onFocus} className={style.input} onChange={handleChange} type='text' required='required' placeholder='descripción*' name='description' value={input.description} />
                {errors.description && touched.description && (
                    <p>{errors.description}</p>
                )}
                <div className={style.radio}>
                    <label for='files' >
                        <div className={style.containerCatPic}>
                            {upload.picture ? <img width='100' height='100' src={upload.picture} /> : <div className={style.containerProfilePic}>
                                Seleccionar imagen
                                        </div>}

                        </div>

                        <div className={style.progressBar}>
                            <progress value={upload.process} ></progress>
                        </div>
                    </label>

                    <input className={style.inputFile} type='file' id='files' onChange={handleUpload} />
                </div>
                <button className={style.btn} type='submit'>
                    crear
                </button>

            </form>

        </div>
    )
}

export default FormCategories
