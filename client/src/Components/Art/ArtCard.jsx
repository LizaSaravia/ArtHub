import React, { useState, useEffect } from "react";
import style from "./artcard.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import editPiece from "../../Images/edit.svg";
import deletePiece from "../../Images/delete.svg";
import DeleteProduct from "../DeleteProduct/DeleteProduct.jsx";
import deleteproduct from "../../Actions/deleteproduct";
import getproductid from "../../Actions/getproductid";
import cart from "../../Images/shopping-cart.svg";
import { addItem, getOrCreateCart } from "../../Actions/shoppingCart"
import { useHistory } from 'react-router';
import { addFav, removeFav } from '../../Actions/wishlist';

function ArtCard({ name, pic, artist, id, idArtist, price, stock, setFlag, categories }) {

  const userType = useSelector((state) => state.userData.type);
  const userData = useSelector((state) => state.userData);

  const offers = useSelector((state) => state.offers);

  const [currentOffer, setCurrentOffer] = useState({});
  const [isInOffer, setIsInOffer] = useState(false);

  const date = new Date();

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

  }, [offers]);

  const history = useHistory();
  const dispatch = useDispatch();

  const isOpenDeleteProd = useSelector((state) => state.isOpenDeleteProd);

  const [productId, setProductId] = useState();

  // Create cart

  function handleClick(id) {
    // dispatch(getOrCreateCart())
    dispatch(addItem(id, newPrice));
    // history.push('/carrito')
  }


  // Eliminar producto
  function handleDeleteClick(id) {
    isOpenDeleteProd === false
      ? dispatch(deleteproduct(true))
      : dispatch(deleteproduct(false));
    setProductId(id);
    dispatch(getproductid(id));
  }

  // Wishlist
  function handleAddFav(idprod) {
    dispatch(addFav(idprod, userData.id))
  }

  function handleRemoveFav(idprod) {
    dispatch(removeFav(idprod, userData.id))
  }
  const newPrice = isInOffer ? price - price * currentOffer.discount / 100 : price;
  // if user is unlogged or buyer type
  if (!userType || userType === "user") {
    return (
      <div className={style.cardContainer}>
        <div className={style.imgContainer}>
          <Link className={style.linksA} to={`/coleccion/${id}`}>
            <img className={style.cardImg} alt="artpic" src={pic}></img>
          </Link>
        </div>
        <div className={style.linksArtCard}>
          <Link className={style.linkName} to={`/coleccion/${id}`}>
            <h5 className={style.name}>{name}</h5>
          </Link>
          <h5 className={style.artist}>por <Link className={style.linksA} to={`/artistas/${idArtist}`}>{artist}</Link></h5>

          {/* <h5 className={style.text}>Precio: {"$ " + price}</h5> */}
          <h5 className={style.text}>$ {newPrice}</h5>

          {stock <= 0 ? (
            <h5 className={style.noStock}>Sin stock</h5>
          ) : (
            null
          )}

          {stock > 0 && (
            <Link className={style.cartCont} to="/carrito">
              <img
                onClick={() => handleClick(id)}
                className={style.cart}
                src={cart}
              ></img>
            </Link>
          )}
          {
            userType === "user" && !userData.wishlist.find(p => p.productIdProduct === id) &&
            <button className={style.btnFav} onClick={() => handleAddFav(id)}>
              <i class="far fa-heart"></i>
            </button>
          }
          {
            userType === "user" && userData.wishlist.find(p => p.productIdProduct === id) &&
            <button className={`${style.btnFav} ${style.pink}`} onClick={() => handleRemoveFav(id)}>
              <i class="fas fa-heart"></i>
            </button>
          }


        </div>
        <h2 className={style.offer}>{isInOffer && `${currentOffer.discount}% off!`}</h2>
      </div>
    );
  }

  // If user admin type
  else if (userType === "admin") {
    return (
      <div className={style.cardContainer}>
        {isOpenDeleteProd === true && (
          <DeleteProduct
            productId={productId}
            setFlag={setFlag}
          ></DeleteProduct>
        )}
        <div className={style.imgContainer}>
          <Link className={style.linksA} to={`/coleccion/${id}`}>
            <img className={style.cardImg} alt="artpic" src={pic}></img>
          </Link>
        </div>
        <div className={style.linksArtCard}>
          <Link to={`/editarproducto/${id}`} className={style.btnEdit}>
            <img className={style.icon} src={editPiece} alt="edit item" />
          </Link>

          <div className={style.btnDelete}>
            <img
              className={style.icon}
              src={deletePiece}
              alt="delete item"
              onClick={() => handleDeleteClick(id)}
            />
          </div>
          {stock <= 0 ? (
            <h5 className={style.noStockAdmin}>Sin stock</h5>
          ) : (
            null
          )}
          <Link className={style.linkName} to={`/coleccion/${id}`}>
            <h5 className={style.name}>{name}</h5>
          </Link>
          <h5 className={style.artist}>por <Link className={style.linksA} to={`/artistas/${idArtist}`}>{artist}</Link></h5>

          {/* <h5 className={style.text}>Precio: {"$ " + price}</h5> */}
          <h5 className={style.text}>$ {newPrice}</h5>

          {
            userType === "user" && !userData.wishlist.find(p => p.productIdProduct === id) &&
            <button className={style.btnFav} onClick={() => handleAddFav(id)}>
              <i class="far fa-heart"></i>
            </button>
          }
          {
            userType === "user" && userData.wishlist.find(p => p.productIdProduct === id) &&
            <button className={`${style.btnFav} ${style.pink}`} onClick={() => handleRemoveFav(id)}>
              <i class="fas fa-heart"></i>
            </button>
          }


        </div>
        <h2 className={style.offer}>{isInOffer && `${currentOffer.discount}% off!`}</h2>
      </div>
    );

  }
  //User type artist 
  else if (userType === 'artist') {
    return (
      <div className={style.cardContainer}>
        {isOpenDeleteProd === true && (
          <DeleteProduct
            productId={productId}
            setFlag={setFlag}
          ></DeleteProduct>
        )}
        <div className={style.imgContainer}>
          <Link className={style.linksA} to={`/coleccion/${id}`}>
            <img className={style.cardImg} alt="artpic" src={pic}></img>
          </Link>
        </div>
        <div className={style.linksArtCard}>
          {userData.id === idArtist && (<Link to={`/editarproducto/${id}`} className={style.btnEdit}>
            <img className={style.icon} src={editPiece} alt="edit item" />
          </Link>)}
          {userData.id === idArtist && (
            <div className={style.btnDelete}>
              <img
                className={style.icon}
                src={deletePiece}
                alt="delete item"
                onClick={() => handleDeleteClick(id)}
              />
            </div>)}
          <Link className={style.linkName} to={`/coleccion/${id}`}>
            <h5 className={style.name}>{name}</h5>
          </Link>
          <h5 className={style.artist}>por <Link className={style.linksA} to={`/artistas/${idArtist}`}>{artist}</Link></h5>
          <h5 className={style.text}>$ {newPrice}</h5>
          {stock <= 0 ? (
            <h5 className={style.noStock}>Sin stock</h5>
          ) : (
            null
          )}

          {stock > 0 && idArtist !== userData.id && (
            <Link className={style.cartCont} to="/carrito">
              <img
                onClick={() => handleClick(id)}
                className={style.cart}
                src={cart}
              ></img>
            </Link>
          )}
        </div>
        <h2 className={style.offer}>{isInOffer && `${currentOffer.discount}% off!`}</h2>

      </div>
    )
  }
}


export default ArtCard;



