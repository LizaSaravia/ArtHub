import React, { useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Route } from "react-router-dom";
import Home from "./Views/Home/Home.jsx";
import AboutUs from "./Views/AboutUs/AboutUs.jsx";
import Collection from "./Views/Collection/Collection.jsx";
import LogIn from "./Views/LogIn/LogIn.jsx";
import SignIn from "./Views/SignIn/SignIn.jsx";
import Artists from "./Views/Artists/Artists.jsx";
import ArtPiece from "./Views/ArtPiece/ArtPiece.jsx";
import ArtistAdminDashboard from "./Views/ArtistAdmin/ArtistAdminDashboard.jsx";
import CreateProduct from "./Components/CreateProducts/CreateProduct.jsx";
import ArtistProfile from "./Views/ArtistProfile/ArtistProfile.jsx";
import MyProfile from "./Views/MyProfile/myProfile";
import CreateCategory from "./Views/CreateCategory/CreateCategory.jsx";
import EditProduct from "./Components/EditProduct/EditProduct.jsx";
import signInUsers from "./Actions/signInUsers";
import { useDispatch, useSelector } from "react-redux";
import AllCategories from "./Views/AllCategories/AllCategories";
import EditUser from "./Views/EditUser/EditUser";
import EditCategories from "./Components/EditCategories/EditCategories";
import OrderDetail from "./Views/OrderDetail/OrderDetail";
import FAQ from "./Views/FAQ/FAQ";
import Orders from "./Views/Orders/Orders";
import OrderDetailArtist from "./Views/OrderDetailArtist/OrderDetailArtist";
import getUserOrder from "./Actions/getUserOrder.js";
import ShoppingCart from './Components/ShoppingCart/ShoppingCart';
import AddReview from "./Components/Reviews/addReview"
import EditReview from "./Components/Reviews/editReview";
import PasswordReset from './Components/PasswordReset/PasswordReset'
import EmailForm from './Components/EmailForm/EmailForm'
import ShowAllUsers from './Views/ShowAllUsers/ShowAllUsers'
import { getUserReviews } from "./Actions/reviews";
import ShoppingCartPayment from './Components/ShoppingCart/ShoppingCartPayment';
import ShoppingCartResponse from './Components/ShoppingCart/ShoppingCartResponse';
import Request from './Views/Request/Request';
import Favorites from './Views/Favorites/Favorites';
import MySales from './Views/MySales/mySales';
import AllAuctionsAdmin from './Views/AllAuctionsAdmin/AllAuctionsAdmin'
import AuctionView from './Components/RequestAuction/auctionView'
import AdminRequests from './Views/AdminRequests/AdminRequests';
import RequestAuction from './Components/RequestAuction/requestAuction'
import TwoFactorForm from './Components/TwoFactorForm/TwoFactorForm'
import Offers from './Views/Offers/Offers';
import getCategories from './Actions/filter';
import { getOffer } from './Actions/offers';
import MyAuctions from "./Views/MyAuctions/myAuctions";
import MyProducts from "./Views/myProducts/myProducts"

function App() {
  const dispatch = useDispatch();
  const linkmp = useSelector(state => state.linkmp);

  useEffect(() => {
    var token = localStorage.getItem("token");
    async function request() {
      if (!localStorage.getItem("token")) {
        return;
      } else {
        axios
          .post("http://localhost:3001/users/userdata/token", {
            headers: {
              Authorization: `${token}`,
            },
          })
          .then(async (result) => {
            await dispatch(signInUsers(result.data));
            if (result.data.username) {
              dispatch(getUserOrder(result.data.id));
              dispatch(getUserReviews(result.data.id));
            } else {
              dispatch({ type: "GET_USER_ORDER_GUEST" });
            }
          });
      }
    }
    request();
    dispatch(getCategories());
    dispatch(getOffer());

  }, []);

  return (
    <div className='main'>
      <Route exact path="/" component={Home}></Route>
      <Route path="/nosotros" component={AboutUs}></Route>
      <Route path="/coleccion" exact component={Collection}></Route>
      <Route path="/ingresar" component={LogIn}></Route>
      <Route path="/registrarse" component={SignIn}></Route>
      <Route
        exact
        path="/tableroadmin"
        component={ArtistAdminDashboard}
      ></Route>
      <Route exact path="/crearproducto" component={CreateProduct}></Route>
      <Route path="/artistas" exact component={Artists}></Route>
      <Route
        path="/editarproducto/:id"
        render={({ match }) => <EditProduct id={match.params.id} />}
      ></Route>
      <Route
        path="/artistas/:artistId"
        render={({ match }) => (
          <ArtistProfile artistId={match.params.artistId}></ArtistProfile>
        )}
      ></Route>
      <Route
        exact
        path="/coleccion/:idArte"
        render={({ match }) => (
          <ArtPiece artId={match.params.idArte}></ArtPiece>
        )}
      ></Route>
      <Route path="/miperfil" component={MyProfile}></Route>
      <Route path="/crearcategorias" component={CreateCategory}></Route>
      <Route path="/categorias" component={AllCategories}></Route>
      <Route exact path="/carrito" render={() => <ShoppingCart />} />
      <Route path="/editarperfil/" component={EditUser} />
      <Route path="/detalledeorden/:id" component={OrderDetail} />
      <Route path="/faq" component={FAQ} />
      <Route exact path="/ordenes" component={Orders} />
      <Route exact path="/orden/:id" component={OrderDetailArtist} />
      <Route path="/usuarios" component={ShowAllUsers} />
      <Route exact path="/editarReseña/:idProduct" render={({ match }) => (<EditReview idproduct={match.params.idProduct} />)} />
      <Route exact path="/nuevacontrasena/:token" render={({ match }) => <PasswordReset token={match.params.token} />}></Route>
      <Route path="/emailform" component={EmailForm} />
      <Route exact path="/agregarReseña/:idProduct" render={({ match }) => (<AddReview idproduct={match.params.idProduct} />)} />
      <Route path="/pago" component={ShoppingCartPayment} />
      <Route path="/carritocomprado/:id/:status" render={({ match }) => (<ShoppingCartResponse idorder={match.params.id} status={match.params.status} />)} />
      <Route path='/linkmp' component={() => {
        window.location = linkmp;
        return null;
      }} />
      <Route path="/solicitar" component={Request} />
      <Route path="/favoritos" component={Favorites} />
      <Route path="/misventas" component={MySales} />
      <Route path="/subastas" component={AllAuctionsAdmin} />
      <Route path="/subastaActual/:id" component={AuctionView}/>
      <Route path="/solicitarSubasta" component={RequestAuction} />
      <Route path="/solicitudes" component={AdminRequests} />
      <Route path="/factordoble" component={TwoFactorForm}/>
      <Route path="/ofertas" component={Offers}/>
      <Route path="/missubastas" component={MyAuctions} />
      <Route path="/misproductos" component={MyProducts}/>


    </div>
  );
}

export default App;
