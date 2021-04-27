import React from 'react'
import NavBar from "../../Components/NavBar/NavBar"
import OrderTable from "../../Components/OrderTable/OrderTable"
import Styles from "./Orders.module.css"

function Orders() {
    return (
        <div className={Styles.mainContainer}>
            <NavBar renderTop={false} />
            <div className={Styles.container}>
                <OrderTable />                
            </div>
        </div>
    )
}

export default Orders
