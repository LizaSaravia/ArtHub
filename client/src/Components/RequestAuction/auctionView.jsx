import React, { useEffect, useState } from "react";
import style from "./auctionView.module.css";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBar.jsx";
import getAuctionView from "../../Actions/getAuctionView";
import Countdown from "./Countdown";
import getAuctionPriceTotal from "../../Actions/getAuctionPriceTotal";
import postAuction from "../../Actions/postAuction";

export default function AuctionView(props) {
    const auctionView = useSelector((state) => state.auctionView);
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();
    const userDataId = useSelector((state) => state.userData.id);
    const userDataName = useSelector((state) => state.userData.username);
    const totalPrice = useSelector((state) => state.auctionActual);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        dispatch(getAuctionView(props.match.params.id));
        console.log(auctionView);
        dispatch(getAuctionPriceTotal(auctionView.id_auction, userDataId));
    }, []);

    async function handleSubmit(element) {
        if (
            totalPrice &&
            totalPrice.length !== 0 &&
            totalPrice[totalPrice.length - 1].finalPrice
        ) {
            var finalPrice =
                totalPrice[totalPrice.length - 1].finalPrice >= 1000
                    ? totalPrice[totalPrice.length - 1].finalPrice + 100
                    : totalPrice[totalPrice.length - 1].finalPrice + 50;
        } else {
            var finalPrice = auctionView.price;
        }

        await dispatch( 
            postAuction(auctionView.id_auction, userDataId, finalPrice)
        );
        setValue(element);
        dispatch(getAuctionPriceTotal(auctionView.id_auction, userDataId));
    }

    function mounthData() {
        var month = new Array();
        month[0] = "Enero";
        month[1] = "Febrero";
        month[2] = "Marzo";
        month[3] = "Abril";
        month[4] = "Mayo";
        month[5] = "Junio";
        month[6] = "Julio";
        month[7] = "Agosto";
        month[8] = "Septiembre";
        month[9] = "Octubre";
        month[10] = "Noviembre";
        month[11] = "Deciembre";

        var data = new Date();
        var newMonth = month[data.getMonth()];
        return newMonth;
    }

    let anho = auctionView.date?.split("-")[0];
    let mes = auctionView.date?.split("-")[1];
    let dia = auctionView.date?.split("-")[2];
    let hora = auctionView.time?.split(":")[0];
    let minuto = auctionView.time?.split(":")[1];

    // inicio busqueda de precio total
    var email = [];
    var priceTotal = [];
    var participants = [];
    var name = [];
    var idCompetitor = 0
    var lastOffert = [];
    var lastname = [];
    for (var i = 0; i < totalPrice.length; i++) {
      
        if (totalPrice[i].auction_id == auctionView.id_auction) {

            idCompetitor = totalPrice[i].buyer_id
            if(userDataId == idCompetitor){
                lastOffert.push(totalPrice[i].finalPrice)
            }            
            priceTotal.push(totalPrice[i].finalPrice);
            participants.push(totalPrice[i].users[0].username);
            name.push(totalPrice[i].users[0].name);
            lastname.push(totalPrice[i].users[0].lastname);
            email.push(totalPrice[i].users[0].email);
            var winner = participants[participants.length - 1];
            var emailWinner = email[email.length - 1];

            var nameWinner = name[name.length - 1];
            var lastnameWinner = lastname[lastname.length - 1];
            var mylastoffert = lastOffert[lastOffert.length-1];
        }
    }

    if (auctionView != null) {
        return (
            <div className={style.mainContainer}>
                <NavBar renderTop={false} />
                <div className={style.contenedor}>
                    <div className={style.column1}>
                        <div className={style.title}>
                            <h1>{auctionView.title}</h1>
                        </div>
                        {auctionView.images &&
                            auctionView.images.map((elem) => (
                                <div className={style.imgContainer}>
                                    <img src={elem.url} />
                                </div>
                            ))}
                        <div className={style.info}>
                            {auctionView.users &&
                                auctionView.users.map((elem) => (
                                    <h3>{elem.username}</h3>
                                ))}
                            <h2>"{auctionView.description}"</h2>
                            <div className={style.category}>
                                {auctionView.categories &&
                                    auctionView.categories.map((elem) => (
                                        <p>{elem.name}</p>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className={style.column2}>
                        <div className={style.title}>
                            <h1>Subasta {mounthData()} </h1>
                        </div>
                        <div className={style.actual}>
                            <p>
                                oferta actual:{" "}
                                {priceTotal[priceTotal.length - 1]}{" "}
                            </p>
                        </div>
                        <div className={style.initial}>
                            <p>valor inicial: {auctionView.price}</p>
                        </div>
                        <div className={style.ofert}>
                            <p>
                                siguiente oferta:{" "}
                                {totalPrice &&
                                    totalPrice.length !== 0 &&
                                    totalPrice[totalPrice.length - 1].finalPrice
                                    ? totalPrice[totalPrice.length - 1]
                                        .finalPrice >= 1000
                                        ? totalPrice[totalPrice.length - 1]
                                            .finalPrice + 100
                                        : totalPrice[totalPrice.length - 1]
                                            .finalPrice + 50
                                    : auctionView.price >= 1000
                                        ? auctionView.price + 100
                                        : auctionView.price + 50}
                                {/* {                                
                            totalPrice[totalPrice.length-1].finalPrice > 1000 ?
                             totalPrice[totalPrice.length-1].finalPrice + 100 : 
                             totalPrice[totalPrice.length-1].finalPrice + 50} */}
                            </p>
                            <p>
                                mi oferta actual: {mylastoffert}
                            </p>
                            <div className={style.btnSelect}>
                                {finished === false ? (
                                    <button
                                        className={style.btn}
                                        onClick={() =>
                                            handleSubmit(
                                                value + auctionView.percentage
                                            )
                                        }
                                    >
                                        ofertar
                                    </button>
                                ) : (
                                        <></>
                                    )}
                            </div>
                        </div>
                        <div>
                            <Countdown
                            className={style.coundown}
                                winner={winner}
                                idAuct={auctionView.id_auction}
                                id={props.match.params.id}
                                setFinished={setFinished}
                                email={emailWinner}
                                name={nameWinner}
                                lastname={lastnameWinner}
                                anho= {anho}
                                mes= {mes}
                                dia= {dia}
                                hora= {hora}
                                minuto= {minuto}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className={style.mainContainer}>
                <NavBar renderTop={false} />
                <p>no hay subastas activas</p>
            </div>
        );
    }
}