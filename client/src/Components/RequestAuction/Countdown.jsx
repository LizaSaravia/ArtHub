import React, { useEffect, useState } from "react";
import style from "./countdown.module.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import emailInformation from "../../Actions/emailInformation";
import InformationEmail from "./informationEmail";
// import getAuctionView from "../../Actions/getAuctionView"

function Countdown(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const auctionEmailPU = useSelector((state) => state.auctionEmailPU);
  const totalPrice = useSelector((state) => state.auctionActual);
  const auctionView = useSelector((state) => state.auctionView);


   const userData = useSelector((state) => state.userData);
  
 
  const calculateTimeLeft = () => {
    let difference =
      +new Date(`${props.mes}/${props.dia}/${props.anho} ${props.hora}:${props.minuto}`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Horas: ("0" + Math.floor((difference / (1000 * 60 * 60)) % 24)).slice(
          -2
        ),
        Minutos: ("0" + Math.floor((difference / 1000 / 60) % 60)).slice(-2),
        Segundos: ("0" + Math.floor((difference / 1000) % 60)).slice(-2),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    if (!timeLeft.Segundos) {
      props.setFinished(true);
    } else {
      props.setFinished(false);
    }

    return () => clearTimeout(timer);
  }, [timeLeft]);

  function handleClick() {
    auctionEmailPU === false
      ? dispatch(emailInformation(true))
      : dispatch(emailInformation(false));
  }


  return (
    <div className={style.mainContainer}>
      {auctionEmailPU === true && (
        <InformationEmail email={props.email} name={props.winner} />
      )}

      {timeLeft.Segundos ? (
        <div className={style.containerG}>
          <div className={style.container}>
            <p>{timeLeft.Dias ? timeLeft.Dias : 0}</p>
            <p className={style.text}>d</p>
          </div>
          <div className={style.container}>
            <p>{timeLeft.Horas ? timeLeft.Horas : 0}</p>
            <p className={style.text}>h</p>
          </div>
          <div className={style.container}>
            <p>{timeLeft.Minutos ? timeLeft.Minutos : 0}</p>
            <p className={style.text}>m</p>
          </div>
          <div className={style.container}>
            <p>{timeLeft.Segundos ? timeLeft.Segundos : 0}</p>
            <p className={style.text}>s</p>
          </div>
        
          
        </div>
      ) : (
        <div className={style.countdown}>
          <div className={style.ganador}>
            <h2>la mejor oferta pertenece a : </h2>
            <h1>{props.winner}</h1>
          </div>
          {userData.type === "admin" ? (
            <div>
              <button className={style.btn} onClick={() => handleClick()}>contactar al ganador</button>
            </div>
          ) : (
            <></>
          )}

          <div>
          
          
          </div>
        </div>
      )}
    </div>
  );
}

export default Countdown;