import React, { useEffect } from 'react'
import ArtistCard from '../../Components/Artist/ArtistCard'
import NavBar from '../../Components/NavBar/NavBar.jsx'
import style from './artists.module.css'
import { useDispatch, useSelector } from 'react-redux'
import getUsersArtists from '../../Actions/getUsersArtists'



function Artists() {

    const usersArtists = useSelector(state => state.usersArtists)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersArtists());
    }, [])

    return (
        <div className={style.mainContainerArtist}>
            <NavBar renderTop={false} />
            <div className={style.secondContainer}>
                <div className={style.titleContainer}>
                    <p className={style.title}>Artistas arthub</p>
                </div>
                <div className={style.artists}>
                    {usersArtists && usersArtists.map((artist) => (
                        <ArtistCard
                            name={artist.name}
                            lastname={artist.lastname}
                            username={artist.username}
                            artistId={artist.id}
                            profilepic={artist.profilepic}
                            key={artist.id}
                        ></ArtistCard>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Artists
