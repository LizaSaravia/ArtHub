import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import ArtCard from "../../Components/Art/ArtCard.jsx";
import SearchBar from "../../Components/SearchBar/SearchBar.jsx";
import style from "./collection.module.css";
import NavBar from "../../Components/NavBar/NavBar.jsx";
import { useDispatch, useSelector } from "react-redux";
import getInitialProducts from "../../Actions/getInitialProducts";
import PopUp from "../../Components/PopUpFilters/PopUp";
import showFilters from "../../Actions/showFilters";
import shoppingCartImg from "../../Images/shopping-cart.svg";
import heart from "../../Images/heart.svg";
import getUserOrder from "../../Actions/getUserOrder.js";
import createProduct from "../../Images/add-product.svg";
import setFilters from "../../Actions/setFilters";
import ReactPaginate from "react-paginate";
import { addItemPopUp } from "../../Actions/dispatchCategories";
import activeFilters from "../../Actions/activeFilters.js";

function Collection() {
  const search = useSelector((state) => state.search);
  const isOpenFilters = useSelector((state) => state.isOpenFilters);
  const filteredProducts = useSelector((state) => state.filteredProducts);
  const products = useSelector((state) => state.products);
  const userType = useSelector((state) => state.userData.type);
  const cart = useSelector((state) => state.cart);

  const isActiveFilters = useSelector((state) => state.isActiveFilters);
  const [flag, setFlag] = useState(false);
  const selectedCategories = useSelector((state) => state.selectedCategories);
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector((state) => state.userData);
  useEffect(() => {
    dispatch(getInitialProducts());

    if (flag === true) {
      setFlag(false);
    }
  }, [flag]);

  function handleClick() {
    isOpenFilters === false
      ? dispatch(showFilters(true))
      : dispatch(showFilters(false));
  }

  function handleRefresh() {
    history.push(0);
  }
  // function handleCartClick() {
  // }

  function onRefresh() {
    dispatch(setFilters(products));
    dispatch(activeFilters(false));
    dispatch(addItemPopUp());
  }
  // Paginado
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 9;
  const pagesVisited = pageNumber * productsPerPage;
  const pageCount = Math.ceil(products.length / productsPerPage);
  function changePage({ selected }) {
    setPageNumber(selected);
  }

  function displayProducts(array) {
    let products = array.slice(pagesVisited, pagesVisited + productsPerPage);

    if (isActiveFilters && !filteredProducts[0] && !array.length) {
      return (
        <div>
          <p>No encontramos ningún producto relacionado a tu búsqueda </p>
        </div>
      );
    }
    if (array === "No products found") {
      return (
        <div>
          <p>No encontramos ningún producto relacionado a tu búsqueda </p>
          <p className={style.linkRefresh} onClick={handleRefresh}>
            Volver
          </p>
        </div>
      );
    }
    if (array === "No categories found") {
      return (
        <div>
          <p>No existen productos para esta categoría</p>
          <p className={style.linkRefresh} onClick={handleRefresh}>
            Volver
          </p>
        </div>
      );
    }

    return products.map((piece) => {
      return (
        <ArtCard
          name={piece.title}
          pic={
            piece.images[0]
              ? piece.images[0].url
              : "https://tse4.mm.bing.net/th/id/OIP.6Hec0K-YQL1hL-sfqyPHBwAAAA?pid=ImgDet&rs=1"
          }
          artist={piece.user.name + " " + piece.user.lastname}
          idArtist={piece.user.id}
          id={piece.id_product}
          key={piece.id_product}
          price={piece.price}
          stock={piece.stock}
          setFlag={setFlag}
          categories={piece.categories}
        />
      );
    });
  }

  return (
    <div className={style.mainContainer}>
      <NavBar renderTop={false} />
      <div className={style.secondContainer}>
        {isOpenFilters === true ? <PopUp></PopUp> : <></>}


        <div className={style.sbContainer}>
          <div className={style.btnContainer}>

            <button
              type="button"
              onClick={() => onRefresh()}
              className={style.btnFilters}
            >
              actualizar
            </button>
            <button className={style.btnFilters} onClick={handleClick}>
              filtrar
            </button>
          </div>
          <SearchBar></SearchBar>
          <div className={style.iconsCont}>

            {userType && userType === "artist" ? (

              <Link className={style.linkCreate} to="/crearproducto">
                <img
                  className={style.createProduct}
                  src={createProduct}
                  alt="create product"
                />
                <p className={style.addText}>Agregar producto</p>
              </Link>
            ) : (
              <></>
            )}

            {userType !== "admin" ? (
              <Link className={style.shContainer} to="/carrito">
                <div className={style.imgContainer}>
                  <img
                    className={style.shoppingCartImg}
                    // onClick={() => handleCartClick()}
                    src={shoppingCartImg}
                    alt="my shopping cart"
                  />
                  {cart.length > 0 && <span>{cart.length < 10 ? cart.length : '9+'}</span>}
                </div>
              </Link>
            ) : (
              <></>
            )}

            {userType !== "admin" && userType  ? (
              <Link to="/favoritos" className={style.favContainer}>
                <div className={style.imgFavContainer}>
                  <img className={style.heart} src={heart} alt="favoritos" />
                  {userData.wishlist?.length > 0 && <span>{userData.wishlist?.length < 10 ? userData.wishlist.length : '9+'}</span>}
                  {/* <p>Favoritos</p> */}
                </div>
              </Link>
            ) : (
              <></>
            )}
          </div>

        </div>

        <div className={style.container}>
          {!filteredProducts[0] &&
            !search[0] &&
            isActiveFilters &&
            selectedCategories[0] ? (
            displayProducts([])
          ) : (
            <></>
          )}
          {!filteredProducts[0] && !search[0] && !isActiveFilters ? (
            displayProducts(products)
          ) : (
            <></>
          )}
          {filteredProducts[0] && search[0] ? displayProducts(search) : <></>}
          {filteredProducts[0] && !search[0] ? (
            displayProducts(filteredProducts)
          ) : (
            <></>
          )}
          {!filteredProducts[0] && search[0] ? displayProducts(search) : <></>}
        </div>

        <div className={style.paginateContainer}>
          <ReactPaginate
            previousLabel={"Anterior"}
            nextLabel={"Siguiente"}
            pageCount={pageCount}
            onPageChange={changePage}
            activeClassName={style.paginationActive}
          />
        </div>
      </div>
    </div>
  );
}
export default Collection;
