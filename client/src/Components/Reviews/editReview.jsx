import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Styles from './addReview.module.css';
import { Link, useHistory } from 'react-router-dom'
import { putProductReview, deleteProductReview, getProductReviews, getUserReviews } from "../../Actions/reviews";
import NavBar from '../../Components/NavBar/NavBar'
import logoDelete from '../../Images/delete.svg'

//start
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';


const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        padding: '15px',
        flexDirection: 'column',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
    border: {

        color: '#ffb400'
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

export default function EditReview({ idproduct, idorder }) {
    const dispatch = useDispatch();
    const userReviews = useSelector(state => state.userReviews);
    const userId = useSelector(state => state.userData.id);
    const [product, setProduct] = useState({})
    const classes = useStyles();
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        description: '',
        qualification: '',
    })

    // inicio busqueda de idReview 
    var idReview = 0;
    for (var i = 0; i < userReviews.length; i++) {
      
        if (userReviews[i].productIdProduct == idproduct && userReviews[i].userId === userId) {
            
            idReview += userReviews[i].id_review

        }
    }
   
    // fin de busqueda de idReview

    useEffect(() => {

        axios
            .get(`http://localhost:3001/products/${idproduct}`)
            .then((result) => setProduct(result.data));
    }, []);

    useEffect(() => {
        if (userId !== 0) {
            dispatch(getUserReviews(userId));
        }

    }, [userId]);


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
            dispatch(putProductReview(idproduct, idReview, input.description, input.qualification, userId))
            history.push(`/coleccion/${idproduct}`)
        } else {
            history.push(`/editarReseña/${idproduct}`)
        }
    }

    function handleDelete(e) {
        dispatch(deleteProductReview(idproduct, idReview))
    }



    if (product && product.title) {

        return (
            <div className={Styles.mainContainer}>
                <NavBar renderTop={false} />
                {product.title &&
                    <div className={Styles.secondContainer}>
                        <div className={Styles.titleContainer}>                                
                                <h1 className={Styles.title}>{`Editar la reseña del producto`}</h1>
                
                            <div className={Styles.btnDeleteConten}>
                                <Link to={`/coleccion/${idproduct}`} onClick={(e) => handleDelete(e)} className={Styles.link}>
                                    <img className={Styles.btnDelete} src={logoDelete}/>
                                    {/* <button className={Styles.btn} onClick={(e) => handleDelete(e)}>Eliminar Reseña</button> */}
                                </Link>
                                    <p className={Styles.deleteReview}>Eliminar reseña</p>
                            </div>
                        </div>
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
                                <form onSubmit={(e) => handleSubmit(e)} className={Styles.form}>

                                    <div className={classes.root}>
                                        <label className={Styles.label}>Calificacion:  </label>
                                        <Rating name="qualification" onChange={(e) => handleChange(e)} defaultValue={0} precision={0.5} emptyIcon={<StarBorderIcon fontSize="inherit" className={classes.border} />} />
                                        {errors.qualification && (
                                            <p>{errors.qualification}</p>
                                        )}
                                    </div>
                                    <div className={Styles.commentContainer}>
                                        <textarea placeholder="Agregar comentario" className={Styles.textArea} onChange={(e) => handleChange(e)} name='description' type="text" />
                                        {errors.description && (
                                            <p>{errors.description}</p>
                                        )}
                                        <button type="submit" className={Styles.btn}>Enviar</button>

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

