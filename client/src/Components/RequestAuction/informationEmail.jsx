import React, { useEffect, useState } from 'react';
import style from './informationEmail.module.css'
import { useSelector, useDispatch } from "react-redux";
import close from '../../Images/cancel.svg'
import emailInformation from '../../Actions/emailInformation'
import mailingAuction from '../../Actions/mailingAuction'

export default function InformationEmail(props) {
    
    const [info, setInfo] = useState({
        body:""
    })
    
    const auctionEmailPU = useSelector(state => state.auctionEmailPU)

    const dispatch = useDispatch()

    

    function sendEmail(email,body){
        dispatch(mailingAuction(email, body))
      }

    useEffect(() => {
        return () => {dispatch(emailInformation(false))}
    }, [])

    const onClose = () =>{
        dispatch(emailInformation(false))
    }

    function handleChange(e){
        setInfo({
            ...info,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div>
            <div className={style.mainDivPopUp}>

<button onClick={()=>{onClose()}} className={style.btnCloseDiv}>
    <img className={style.close} src={close} alt="close edit" />
</button>

<div className={style.title}>
<h1 >contactar ganador</h1>
<h2>{props.name} {props.lastname}</h2>
</div>


<div>
    <div className={style.column1}>
       
        <div className={style.column2}>
           
           <textarea
           rows='10'
           placeholder="Escribir aquí el mensaje y enviar link de pago"
           onChange={handleChange}
           name="body"
           value={info.body}
           className={style.textArea}
           ></textarea>

            </div>
                <div className={style.btnSelect}>
                    <button className={style.btn} onClick={() => sendEmail(props.email, info.body)}>
                    enviar email
                    </button>

                </div>
    
        </div>

</div>

</div>
           
        </div>
    )
}


