import React, { useState, useContext } from "react";
import Image from "../../Assests/login-Image.webp";
import Close from "@mui/icons-material/Close";
import { ShowLogin, ShowSignup, UserDetails, Cart, ProductHome } from "../../App";
import "./login.css";
// import {  } from "../../App";
import { BASE_URL } from "../../Config/BaseUrl";
function Login() {
  const [formInfo, setFormInfo] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [userDetails, setUserDetails] = useContext(UserDetails);
  const [cart, setCart] = useContext(Cart);
  const [productHome, setProductHome] = useContext(ProductHome);
  const [loginShow, setLoginShow] = useContext(ShowLogin);
  const [showSignup, setShowSignup] = useContext(ShowSignup);

  const handleChange = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };

  const getCart = async () => {
    const response = await fetch(
      `${BASE_URL}/addtocart/getCartsByUserId/${
        JSON.parse(localStorage.getItem("userDetails")).id
      }`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token")
          )}`,
        },
      }
    );
    const data = await response.json();
    // console.log(data);
    var temp = [];
    if (data.length > 0) {
      data.map((item) => {
        let product = productHome.filter(
          (medicine) => medicine.id === item.productId
        )[0];
        product = { ...product, quantity: item.quantity };
        temp = [...temp, product];
      });
    }
    setCart(temp);
    // console.log(productHome);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formInfo.email || !formInfo.password) {
      alert("Please fill all the fields");
      return;
    }
    const temp = await fetch(`${BASE_URL}/login/user`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formInfo),
    });
    if (temp.status === 200) {
      const response = await temp.json();
      console.log(response);
      alert("Login successful");
      localStorage.setItem("token", JSON.stringify(response.token));
      localStorage.setItem(
        "userDetails",
        JSON.stringify(response.user_profile_details)
      );
      setUserDetails(response.user_profile_details);
      getCart();
      setLoginShow(false);
    }else{
      alert("Login failed");
    }
  };

  return (
    <div className="loginBackground">
      <div className="loginContainer">
        <img src={Image} alt="" className="loginImage" />
        <div className="loginForm">
          <Close
            className="loginCloseButton"
            onClick={() => {
              setLoginShow(false);
            }}
          ></Close>
          <div className="loginFormTitle">Login</div>
          <p
            style={{
              color: "grey",
              fontSize: "0.8rem",
              marginBottom: "30px",
              marginTop: "10px",
              fontWeight: "500",
            }}
          >
            Get access to your orders, prescriptions and other benefits
          </p>
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="loginFormInput"
            onChange={handleChange}
          />
          <input
            type={formInfo.showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            className="loginFormInput"
            onChange={handleChange}
          />
          <div>
            <input
              type="checkbox"
              name="showPassword"
              id="showPassword"
              onChange={() =>
                setFormInfo({
                  ...formInfo,
                  showPassword: !formInfo.showPassword,
                })
              }
            />
            <label htmlFor="showPassword" className="loginFormShowPassword">
              Show Password
            </label>
          </div>
          <button className="loginFormButton" onClick={handleSubmit}>
            Sign in
          </button>
          <div className="loginFormText">
            Don't have and account? &nbsp;
            <span
              style={{
                color: "#017aff",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => {
                setShowSignup(true);
                setLoginShow(false);
              }}
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
