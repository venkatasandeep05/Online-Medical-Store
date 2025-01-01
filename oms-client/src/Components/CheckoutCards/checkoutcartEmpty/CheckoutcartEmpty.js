import React from 'react'
import './checkoutcartempty.css';
import { Link } from 'react-router-dom';

function CheckoutCartEmpty() {
    return (
        <div className="checkout">
            <div className="jumbotron">
                <h1 className="display-4">Your Cart is Empty, 😢</h1>
                <p className="lead">You have no items in your cart. So Go back to store and Buy stuff. Click on Add to Basket button and Come Back.</p>
                <hr className="my-4" />
                    <p className="lead">
                        <Link className="btn no-hover btn-small" to={"/"}>Go Back</Link>
                    </p>
            </div>
        </div>
    )
}

export default CheckoutCartEmpty