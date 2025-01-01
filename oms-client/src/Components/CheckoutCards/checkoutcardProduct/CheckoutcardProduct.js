import React, { useContext } from "react";
import "./checkoutcardproduct.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { Input } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Cart, UserDetails, ProductHome } from "../../../App";
import { BASE_URL } from "../../../Config/BaseUrl";

function CheckoutcardProduct({
  name,
  image,
  description,
  price,
  quantity,
  id,
}) {
  const [productHome, setProductHome] = useContext(ProductHome);
  const [cart, setCart] = useContext(Cart);
  const [userDetails, setUserDetails] = useContext(UserDetails);

  const handleDelete = async () => {
    const newCart = cart.filter((item) => item.id === id)[0];
    const product = {
      userId: userDetails.id,
      productId: id,
      qty: newCart.quantity - 1,
    };
    if(newCart.quantity==1){
      return;
    }
    const response = await fetch(`${BASE_URL}/addtocart/addProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(product),
    });
    newCart.quantity -= 1;
    const temp = await response.json();
    if (response.status === 200) {
      const carts = temp.map((item) => {
        return {
          ...productHome.filter((product) => product.id === item.productId)[0],
          quantity: item.quantity,
        };
      });
      setCart(carts);
    } else {
      alert("Something went wrong");
    }
  };
  const handleAdd = async () => {
    const newCart = cart.filter((item) => item.id === id)[0];
    const product = {
      userId: userDetails.id,
      productId: id,
      qty: newCart.quantity + 1,
    };
    const response = await fetch(`${BASE_URL}/addtocart/addProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(product),
    });
    newCart.quantity += 1;
    const temp = await response.json();
    if (response.status === 200) {
      const carts = temp.map((item) => {
        return {
          ...productHome.filter((product) => product.id === item.productId)[0],
          quantity: item.quantity,
        };
      });
      setCart(carts);
    } else {
      alert("Something went wrong");
    }
  };

  const handleRemove = async () => {
    const response = await fetch(
      `${BASE_URL}/addtocart/removeProductFromCart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({ userId: userDetails.id, productId: id }),
      }
    );
    setCart(cart.filter((item) => item.id !== id));
    console.log(cart);
  };

  return (
    <>
      <div className="continue-shopping-info-inner">
        <p className="product-name">
          <strong>{name}</strong>
          <small className="product-price">₹ {price*quantity}</small>
        </p>
        <p className="product-description">
          {description}
          <div className="quantity">
            <span className="subtractButton" onClick={handleDelete}>
              <RemoveIcon></RemoveIcon>
            </span>
            <input maxLength={2} value={quantity} />
            <span className="addButton" onClick={handleAdd}>
              <AddIcon></AddIcon>
            </span>
          </div>
        </p>
        <p
          className="buttons"
          onClick={handleRemove}
          style={{ cursor: "pointer" }}
        >
          <small className="remove">
            {" "}
            <DeleteIcon color="#d4d4d4" fontSize="34" /> Remove
          </small>
        </p>
      </div>
    </>
  );
}

export default CheckoutcardProduct;
