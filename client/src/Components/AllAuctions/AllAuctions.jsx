import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import getAuctions from '../../Actions/getAuctions'
import style from './allAuctions.module.css'
import edit from "../../Images/edit.svg"
import deleteauction from "../../Images/delete.svg"
import axios from 'axios'
import createAuctionPU from '../../Actions/createAuctionPU'
import CreateAuction from './CreateAuction'
import DeleteAuction from './DeleteAuction'
import deleteAuctionPU from '../../Actions/deleteAuctionPU'
import { Redirect, Link, useHistory } from 'react-router-dom';
import checkauction from '../../Images/comment.svg'


function AllAuction() {
    const auctions = useSelector(state => state.auctions)

    const dispatch = useDispatch()

    const createAuction = useSelector(state => state.createAuction)

    const deleteAuction = useSelector(state => state.deleteAuction)

    const [auctionId, setAuctionId] = useState()

    const [flag, setFlag] = useState(false)

    const userData = useSelector(state => state.userData)

    const [loading, setLoading] = useState(false)

    const history = useHistory();

    useEffect(() => {
        dispatch(getAuctions())
        setFlag(false)
    }, [flag])

    function handleClickEdit(id) {
        createAuction === false ? dispatch(createAuctionPU(true)) : dispatch(createAuctionPU(false));
        setAuctionId(id)
    }

    function handleDeleteClick(id) {
        deleteAuction === false ? dispatch(deleteAuctionPU(true)) : dispatch(deleteAuctionPU(false));
        setAuctionId(id)
    }

    if (userData.id < 1 || userData.type !== 'admin') {
        return <Redirect to="/ingresar"></Redirect>;
    }



    return (
        <div className={style.container} style={loading ? { 'cursor': 'progress' } : null}>
            {createAuction === true && <CreateAuction auctionId={auctionId} />}
            {deleteAuction === true && <DeleteAuction auctionId={auctionId} />}
            <div >
                <div className={style.column}> 
                    <h1>subastas:</h1>
                </div>

                <br></br>
                        <button className={style.btn} onClick={() => history.push(`/solicitarSubasta/`)}>
                            solicitar subasta </button>
                <table className={style.table}>
                <tr className = {style.column}>
                    <td className = {style.name}>imagen</td>
                    <td className = {style.lastname}>título</td>
                    <td>usuario</td>
                    <td className = {style.lastname}>estado</td>
                </tr>

                    {auctions && auctions.map((a) => (

                        <tr key={a.id} className={style.auctions}>
                            <td>
                                <img className={style.picture} src={a.images[0].url} />
                            </td>
                            <td>{a.title}</td>
                            <td>{a.users[0].username}</td>
                            <td>{a.state}</td>

                            <th className={style.th}>
                                <div className={style.btnContainer}>
                                    <div className={style.btnContainer} onClick={() => handleClickEdit(a.id_auction)}>
                                        <img className={style.icon} src={edit} alt="edit item" />
                                    </div>

                                    <div className={style.btnContainer} onClick={() => handleDeleteClick(a.id_auction)} >
                                        <img className={style.icon} src={deleteauction} alt="delete item" />
                                    </div>

                                    {a.state === 'subastando' ?
                                        <Link to={`/subastaActual/${a.id_auction}`}>
                                            <div className={style.btnContainer} >
                                                <img className={style.icon} src={checkauction} alt="check item" />
                                            </div>
                                        </Link>
                                        :
                                        <div className={style.btnContainer} onClick={() => alert('Debe editar la subasta primero')} >
                                                <img className={style.icon} src={checkauction} alt="check item" />
                                            </div>

                                
                                }


                                </div>
                            </th>
                        </tr>

                    ))}
                </table>
            </div>
        </div>
    )

}

export default AllAuction
