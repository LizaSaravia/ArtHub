import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import style from "./favorites.module.css";
import { useSelector } from 'react-redux';
import axios from 'axios';
import ArtCard from '../../Components/Art/ArtCard';
import { Link } from 'react-router-dom';


export default function Favorites() {

    const user = useSelector(state => state.userData);
    const [prodFav, setProdFav] = useState([]);

    useEffect(() => {

        axios.post(`http://localhost:3001/products/array`, { prodIds: user.wishlist })
            .then((r) => {

                setProdFav(r.data);
            })
    }, [user])

    return (

        <div className={style.mainContainer}>
            <NavBar renderTop={false} />
            <div className={style.secondContainer}>
                <h1 className={style.title}>Favoritos</h1>
                <div className={style.cardContainer}>

                    {
                        prodFav.length > 0
                            ?
                            prodFav.map(p => (
                                    <ArtCard
                                        name={p.title}
                                        pic={p.images[0].url}
                                        artist={p.user.name + " " + p.user.lastname}
                                        idArtist={p.user.id}
                                        id={p.id_product}
                                        key={p.id_product}
                                        price={p.price}
                                        stock={p.stock}
                                        categories={p.categories}
                                    />
                            ))
                            :
                            <div className={style.noProductsMessage}>
                                <p>No hay productos en tu lista de favoritos, elegí algunos de <Link to="/coleccion"> nuestra colección.</Link>
                                </p>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
