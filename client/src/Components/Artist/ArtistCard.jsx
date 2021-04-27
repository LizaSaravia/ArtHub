import React from 'react'
import { Link } from 'react-router-dom'
import style from './artistCard.module.css'

function ArtistCard({ name, lastname, artistId, profilepic, username }) {
    return (
        <div className={style.cardContainer}>
            <div className={style.imgArtist}>
                <img src={profilepic} />
            </div>
            <div className={style.info}>
                <Link to={`/artistas/${artistId}`}>
                    <h2>{name} {lastname}</h2>
                </Link>
            </div>
        </div>
    )
}

export default ArtistCard