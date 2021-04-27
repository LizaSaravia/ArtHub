import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/NavBar/NavBar.jsx';
import style from './artistProfile.module.css'
import ArtCard from './../../Components/Art/ArtCard';
import { Link } from 'react-router-dom';
import getArtistsProducts from '../../Actions/getArtistsProducts'
import {useSelector, useDispatch} from 'react-redux'

function ArtistProfile({ artistId }) {

    const [artistDetails, setArtistDetails] = useState({
        username: '',
        name: '',
        lastname: '',
        profilepic: '',
        email: '',
    }); 

    const [flag, setFlag] = useState(false);

    

    const artistsProducts = useSelector(state => state.artistsProducts)

    const [artistProducts, setArtistProducts] = useState({})
    
    const userId = useSelector(state => state.userData.id);

    const dispatch = useDispatch()

    useEffect(() => {
        console.log("sajhdjksa")
        dispatch(getArtistsProducts(userId))
        
            setFlag(false);
          
    }, [flag]);

    useEffect(() => {
        axios
            .get(`http://localhost:3001/users/${artistId}`)
            .then((result) => setArtistDetails(result.data[0]));
    }, [])

    useEffect(() => {
        axios
            .get(`http://localhost:3001/products/user/${artistId}`)
            .then((result) => setArtistProducts(result.data));
    }, [])

    return (
        <div className={style.mainContainer}>
            <NavBar renderTop={false} />
            <div className={style.secondContainer}>

                <div className={style.title}>{artistDetails.name} {artistDetails.lastname}</div>
                <div className={style.prods}>- Productos publicados -</div>
                <div className={style.allCardsContainer}>
                    {
                        (artistProducts.length >= 1) ? artistProducts.map(piece => (
                            <ArtCard
                                name={piece.title}
                                artist={artistDetails.name + ' ' + artistDetails.lastname}
                                pic={piece.images[0].url}
                                idArtist={piece.userId}
                                id={piece.id_product}
                                key={piece.id_product}
                                price={piece.price}
                                stock={piece.stock}
                                setFlag={setFlag}
                                categories={piece.categories}
                            />
                        ))
                            :
                            <div className={style.noProductsMessage}>
                                <p>No hay productos, intenta con otro artista. <Link to="/artistas">Volver</Link>
                                </p>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ArtistProfile
