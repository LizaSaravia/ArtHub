import React, { useState } from 'react';
import { connect } from 'react-redux';
import Styles from './userSearchBar.module.css';
import SearchIcon from '../../Images/search.svg';
import getUsers from '../../Actions/getUsers'
import searchUsers from '../../Actions/searchUsers'

function UserSearchBar({getUsers, users, searchUsers}) {

    const [input, setInput] = useState('');

    function handleInputChange(e) {
        setInput(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!input.length){
            getUsers()
        } else{
            searchUsers(input)
        }
            
    }
    
    return (
        <div className={Styles.mainContainer}>
            <form onSubmit={handleSubmit} className={Styles.formStyle}>
                <input type='text' onChange={handleInputChange} className={Styles.inpt} placeholder='buscar...'></input>
                <button className={Styles.btn}>
                    <img className={Styles.searchIcon} src={SearchIcon} alt='search icon' />
                </button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: (users) => dispatch(getUsers(users)),
        searchUsers:(users) => dispatch(searchUsers(users))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSearchBar);

