import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import NavBar from "../../Components/NavBar/NavBar.jsx";
import style from "./artpiece.module.css";
import Reviews from "../../Components/Reviews/reviews";
import { useDispatch, useSelector } from "react-redux";
import getInitialProducts from "../../Actions/getInitialProducts";
//start
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { addItem } from '../../Actions/shoppingCart';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),


    },
    ['@media (max-width:480px)']: {
      marginBottom: '5px'
    }

  },
  border: {
    color: '#ffb400',

  },

  stars: {
    fontSize: '2rem',
    ['@media (max-width:480px)']: {
      fontSize: '1.2rem'
    }

  }

}));

function ArtPiece({ artId }) {
  const [detailed, setDetailed] = useState({
    name: "",
    description: "",
    stock: 0,
    images: [
      {
        url: "",
      },
    ],
  });
  const userData = useSelector((state) => state.userData);
  const [currentOffer, setCurrentOffer] = useState({});
  const offers = useSelector((state) => state.offers);
  const categories = useSelector((state) => state.categories);

  const [isInOffer, setIsInOffer] = useState(false);

  const date = new Date();

  let history = useHistory()

  const classes = useStyles();


  useEffect(() => {
    dispatch(getInitialProducts());
    axios
      .get(`http://localhost:3001/products/${artId}`)
      .then((result) => setDetailed(result.data));
  }, []);

  useEffect(() => {
    const matchCat = () => {
      categories.forEach(cat => {
        offers.forEach(offer => {
          if (+offer.categoryId === +cat.id && +offer.day === +date.getDay()) {
            setCurrentOffer(offer);
            setIsInOffer(true);
          }
        });
      });
    }
    matchCat();

  }, [offers, categories]);

  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviewsProduct.reviews);

  let average = 0;
  let finalAverage;
  if (reviews && reviews[0]) {
    reviews.forEach(r => average += r.qualification)
    if (average > 0) {
      finalAverage = average / reviews.length
    }
  }

  const newPrice = isInOffer ? detailed.price - detailed.price * currentOffer.discount / 100 : detailed.price;

  if (detailed && detailed.description) {
    return (
      <div className={style.navContainer}>
        <NavBar renderTop={false}></NavBar>
        <div className={style.container}>
          <div className={style.borderContainer}>
            <div className={style.imgContainer}>
              <img
                className={style.img}
                alt="artpic"
                src={
                  detailed.images[0]
                    ? detailed.images[0].url
                    : "https://tse4.mm.bing.net/th/id/OIP.6Hec0K-YQL1hL-sfqyPHBwAAAA?pid=ImgDet&rs=1"
                }
              ></img>
            </div>
            <div className={style.infoContainer}>
              <div className={style.align}>
                <h1 className={style.title}>{detailed.title}</h1>
                <div className={classes.root}>
                  <Rating
                    className={classes.stars}
                    value={parseFloat(finalAverage)}
                    precision={0.5}
                    readOnly
                    emptyIcon={
                      <StarBorderIcon
                        fontSize="inherit"
                        className={classes.border}
                      />
                    }
                  />
                </div>
              </div>

              <div className={style.infoSecondContainer}>
                {detailed.stock > 0 ? (
                  <h3>Stock: {detailed.stock}</h3>
                ) : (
                  <h3>Producto no disponible</h3>
                )}
                <h3>Categoria/s:</h3>
                <div className={style.categoriesContainer}>
                  {detailed.categories &&
                    detailed.categories.map((x) => (
                      <div className={style.catContainer}>
                        <p>{x.name}</p>
                      </div>
                    ))}
                </div>

                <h3>{`Precio: $` + `${newPrice}`}</h3>
                <p className={style.description}>{detailed.description}</p>
              </div>

              <div className={style.containerButtons}>
                <button
                  className={style.button}
                  onClick={() => history.push(`/coleccion/`)}
                >
                  Volver a coleccion{" "}
                </button>
              </div>
            </div>
          </div>

          <Reviews artId={artId} />
        </div>
      </div>
    );

  }
  else {
    return (
      <div className={style.navContainer}>
        <NavBar renderTop={false}></NavBar>
        <div className={style.container}>
          <></>
        </div>
      </div>

    )
  }
}
export default ArtPiece;