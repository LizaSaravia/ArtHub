import React, { useEffect, useState } from 'react';
import style from './deleteAuction.module.css';
import {useSelector, useDispatch} from 'react-redux'
import getAuctions from '../../Actions/getAuctions'
import deleteAuctionPU from '../../Actions/deleteAuctionPU'
import close from '../../Images/cancel.svg'
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import deleteAuctionFinish from '../../Actions/deleteAuctionFinish'
import axios from "axios";

function DeleteAuction(props) {
    const [theAuction, setTheAuction] = useState()

    const auctions = useSelector(state=> state.auctions)

    const dispatch = useDispatch()

    const history = useHistory();


    useEffect(() => {
        dispatch(getAuctions())
    }, []);

    useEffect(() => {
        setTheAuction(auctions.find((element) => element.id_auction === props.auctionId ))
    }, [auctions])

   async function handleSubmit() {
        
        try {

         await   axios
            .delete(`http://localhost:3001/auctions/${theAuction.id_auction}`)


        } catch (error) {
            console.log(error);
            alert('No se pudo eliminar')
        }

        dispatch(deleteAuctionFinish(theAuction.id_auction))
        dispatch(deleteAuctionPU(false));
        dispatch(getAuctions())
        history.push('/subastas');

    }

    const onClose = () =>{
        dispatch(deleteAuctionPU(false))
    }

    return (
        <div className={style.mainDivPopUp}>
            <button onClick={()=>{onClose()}} className={style.btnCloseDiv}>
                <img className={style.close} src={close} alt="close edit"/>
            </button>
            <div className={style.formLabel}>
                estás seguro de querer eliminar la subasta?
            </div>        
            <div className = {style.btnSelect}>
                
                <button className={style.btn} onClick = {() => handleSubmit()}>
                    eliminar
                </button>
                
            </div>
        </div>
    )
}

export default DeleteAuction
