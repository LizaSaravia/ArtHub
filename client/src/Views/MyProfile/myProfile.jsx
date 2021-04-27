import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminUser from '../../Components/AdminUser/AdminUser';
import BuyerUser from '../../Components/BuyUser/buyUser';
import ArtistUser from '../../Components/ArtistUser/artistUser';


export default function MyProfile() {
    const userType = useSelector(state => state.userData.type);


    if (userType === '') {
        return <Redirect to='/ingresar' />
    }
    else if (userType === 'admin') {
        return (
            <AdminUser />
        )
    }
    else if (userType === 'artist') {
        return (
            <ArtistUser />
        )
    }
    else if (userType === 'user') {
        return (
            <BuyerUser />
        )
    }
}