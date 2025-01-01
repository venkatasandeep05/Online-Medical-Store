import React from 'react'
import './ordersempty.css';
import { Link } from 'react-router-dom';

function OrdersEmpty() {
    return (
        <div className="checkout">
            <div className="jumbotron">
                <h1 className="display-4">No Orders, 😢</h1>
                <p className="lead">There is nothing to show at the moment, please go back and order our products.</p>
                <hr className="my-4" />
                    <p className="lead">
                        <Link className="btn no-hover btn-small" to={"/"}>Buy Products</Link>
                    </p>
            </div>
        </div>
    )
}

export default OrdersEmpty