import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Styles from './addReview.module.css';
import { addProductReview, getUserReviews } from "../../Actions/reviews";
import { useHistory } from 'react-router-dom'
//start
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import NavBar from '../../Components/NavBar/NavBar'

const useStyles = makeStyles((theme) => ({
    root: {
        
        alignItems: 'flex-start',
        display: 'flex',
        alignItems:'center',
        marginTop:'15px',
        flexDirection: 'column',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
    border: {

        color: '#ffb400'
    },
    stars:{
        fontSize: '1.5rem'
    }
}));
//---start

export const validate = (input) => {
    let errors = {};
    if (input.qualification < 0.5) {
        errors.qualification = 'la calificación es obligatoria';
    }


    if (!input.description) {

        errors.description = 'la descripcion es obligatoria';
    }
    return errors;

};


export default function AddReview({ idproduct, idorder }) {
    const userId = useSelector(state => state.userData.id)
    const dispatch = useDispatch()
    const [product, setProduct] = useState({})
    const classes = useStyles();
    const history = useHistory();
    const [errors, setErrors] = useState({});




    useEffect(() => {

        axios
            .get(`http://localhost:3001/products/${idproduct}`)
            .then((result) => setProduct(result.data));
    }, []);

    const [input, setInput] = useState({
        description: '',
        qualification: '',
    })


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input, [e.target.name]: e.target.value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (input.description && input.qualification) {
            dispatch(addProductReview(idproduct, input.description, input.qualification, userId))
            history.push(`/coleccion/${idproduct}`)
        } else {
            history.push(`/agregarReseña/${idproduct}`)
        }

    }

    if (product && product.title) {

        return (
            <div className={Styles.mainContainer}>
                <NavBar renderTop={false} />
                {product.title &&
                    <div className={Styles.secondContainer}>
                        <h1 className={Styles.title}>{`Agrega una reseña al producto`}</h1>
                        <div className={Styles.containerProduct}>
                            <div className={Styles.textContainer}>
                                <div className={Styles.imgContainer}>
                                <img className={Styles.img} src={product.images[0].url} alt="" />
                                </div>
                                <div className={Styles.productDesc}>
                                <h1>{product.title}</h1>
                                <p>{product.description}</p>
                                </div>
                            </div>
                            <div className={Styles.formContainer}>
                                <form onSubmit={(e) => handleSubmit(e)} className={Styles.form} action={`/detalledeorden/${idorder}`}>


                                    <div className={classes.root}>
                                        <label className={Styles.label}>Calificacion</label>
                                        <Rating className={classes.stars} name="qualification" onChange={(e) => handleChange(e)} required defaultValue={0} precision={0.5} emptyIcon={<StarBorderIcon fontSize="inherit" className={classes.border} required="required" />} />
                                        {errors.qualification && (
                                            <p>{errors.qualification}</p>
                                        )}
                                    </div>
                                    <div className={Styles.commentContainer}>
                                        {/* <label className={Styles.label} name='descripcion'>Comentario:  </label> */}
                                        <textarea placeholder="Agregar comentario" required="required" className={Styles.textArea} onChange={(e) => handleChange(e)} name='description' type="text" />
                                        {errors.description && (
                                            <p>{errors.description}</p>
                                        )}
                                        <button type="submit" className={Styles.btn} >Enviar</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                }

            </div>
        )
    } else {
        return (
            <div className={Styles.mainContainer}>
                <NavBar renderTop={false}></NavBar>
                <div className={Styles.secondContainer}>
                    <div>
                     
                    </div>
                </div>
            </div>

        )
    }
}
