import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArtCard from "../../Components/Art/ArtCard.jsx";
import style from "./ArtistAdminDashboard.module.css";
import NavBar from "../../Components/NavBar/NavBar.jsx";

function ArtistAdminDashboard() {
    const [AdminProducts, setAdminProducts] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3001/products/user/1`)
            .then((res) => {
                setAdminProducts(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className={style.mainContainer}>
            <NavBar renderTop={false} />
            <div className={style.secondContainer}>
                <p className={style.adminTitle}>Admin-artist dashboard</p>
                <Link to="/crearproducto">
                    <button className={style.btn}>Crear producto</button>
                </Link>  
                <p className={style.adminTitle2}>Mis productos:</p>              
                <div className={style.cards}>
                   
                    {AdminProducts.map((p) => (
                        <ArtCard pic={p.images[0]?.url} name={p.title} id={p.id_product} admin={true} categories={p.categories}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ArtistAdminDashboard;
