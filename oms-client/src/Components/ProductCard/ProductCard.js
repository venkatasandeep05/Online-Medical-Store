import React from "react";
import "./productcard.css";
import { useContext, useState, useEffect } from "react";
import { Cart, UserDetails, ShowLogin } from "../../App";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Config/BaseUrl";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function ProductCard({ image, name, description, rating, price, id }) {
  const [cart, setCart] = useContext(Cart);
  const [loginShow, setLoginShow] = useContext(ShowLogin);
  const [userDetails, setUserDetails] = useContext(UserDetails);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.filter((medicine) => medicine.id === id).length > 0) {
      // console.log(cart.filter((medicine) => medicine.name === name));
      setShowAdd(false);
    } else setShowAdd(true);
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  }, [cart]);

  const addToCart = async () => {
    if (!userDetails) {
      setLoginShow(true);
      return;
    }
    const product = {
      userId: userDetails.id,
      productId: id,
      qty: 1,
    };
    // console.log(product);

    const response = await fetch(`${BASE_URL}/addtocart/addProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(product),
    });

    if (response.status === 200) {
      setCart([
        ...cart,
        {
          image,
          productName: name,
          productDesc: description,
          productRating: rating,
          price,
          id,
          quantity: 1,
        },
      ]);
      // setTimeout(()=>{navigate("/checkout")},1000)
      // navigate("/checkout");
    } else {
      alert("Something went wrong");
    }
    
  };

  return (
    <div
      className="card"
      style={{ width: "14rem", borderRadius: "5", height: "21rem" }}
    >
      {loading?<img src={image} className="card-img-top card-image" alt="..." />:<Skeleton height={"190px"} width={"90%"} style={{margin:"auto",display:"block",marginTop:"5px"}}/>}
      <div className="card-body">
        <h5 className="card-title">{loading? name: <Skeleton width={"60%"} />}</h5>
        <p className="card-text description">{loading? description: <Skeleton width={"100%"} height={"10px"} count={3}/>}</p>
        {loading && <p className="card-text rating">
          <small>{rating} ★ </small>
          <strong> ratings</strong>
        </p>}
        {loading && <p className="card-text price">
          <div>
            <strong>₹</strong>
            <small>{price}</small>
          </div>
          {showAdd ? (
            <div href="#" className="btn noHover btn-sm" onClick={addToCart}>
              ADD
            </div>
          ) : (
            <div
              href="#"
              className="noHover btn-sm"
              style={{ color: "green", cursor: "default", fontWeight: "600" }}
            >
              ADDED
            </div>
          )}
        </p>}
      </div>
    </div>
  );
}

export default ProductCard;
