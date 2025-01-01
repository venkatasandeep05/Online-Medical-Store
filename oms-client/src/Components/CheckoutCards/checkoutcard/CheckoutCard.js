import React, { useContext } from "react";
import "./checkoutcard.css";
import CheckoutcardBill from "../checkoutcardbill/CheckoutcardBill";
import CheckoutcardProduct from "../checkoutcardProduct/CheckoutcardProduct";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { Cart, UserDetails } from "../../../App";

function CheckoutCard() {
  const [cart, setCart] = useContext(Cart);
  const [userDetails, setUserDetails] = useContext(UserDetails);

  return (
    <div className="container_outer">
      <div className="container inner_container_in">
        <div className="row">
          <div className="col mx-5 container_product">
            <div className="continue_shopping">
              <Link
                to={"/"}
                style={{ textDecoration: "none", color: "#4D4D4D" }}
              >
                <p color="#4D4D4D" style={{ fontSize: "small" }}>
                  {" "}
                  <ArrowBackIcon color="#4D4D4D" /> Continue Shopping
                </p>
              </Link>
              <hr />
            </div>
            <div className="continue-shopping-info">
              <strong color="#4D4D4D"> Shopping Cart </strong>
              <p color="#4D4D4D"> You have {cart.length} items in your cart </p>
            </div>
            {cart.map((item) => (
              <CheckoutcardProduct 
			  name={item.productName}
			  image={item.image}
			  description={item.productDesc}
			  price={item.price}
			  quantity={item.quantity}
			  id={item.id}
			  />
            ))}
            {/* <CheckoutcardProduct /> */}
            {/* <CheckoutcardProduct /> */}
            {/* <CheckoutcardProduct /> */}
            {/* <CheckoutcardProduct /> */}
          </div>
          <CheckoutcardBill />
        </div>
      </div>
    </div>
  );
}

export default CheckoutCard;
