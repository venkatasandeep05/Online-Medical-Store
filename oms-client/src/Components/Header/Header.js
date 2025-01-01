import React, { useContext, useEffect, useState } from "react";
import Search from "@mui/icons-material/Search";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import image from "../../Assests/brand-logo.png";
import Person from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import "./header.css";
import { BASE_URL } from "../../Config/BaseUrl";
import {
  ShowLogin,
  ShowSignup,
  UserDetails,
  ProductHome,
  SearchBox,
  Cart,
  OrderHome,
  // DefaultOrder
} from "../../App";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

function Header() {
  const [loginShow, setLoginShow] = useContext(ShowLogin);
  const [showSignup, setShowSignup] = useContext(ShowSignup);
  const [userDetails, setUserDetails] = useContext(UserDetails);
  const [productHome, setProductHome] = useContext(ProductHome);
  const [orderHome, setOrderHome] = useContext(OrderHome);
  // const [defaultOrder, setDefaultOrder] = useContext(DefaultOrder);
  const [searchBox, setSearchBox] = useContext(SearchBox);
  const [cart, setCart] = useContext(Cart);
  const [temp, setTemp] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userDetails")) {
      setUserDetails(JSON.parse(localStorage.getItem("userDetails")));
    }
    const getProducts = async () => {
      const response = await fetch(`${BASE_URL}/products/getAllProducts`, {
        method: "GET",
      });
      const data = await response.json();
      setProductHome(data.filter((medicine) => medicine.id <= 12));
    };

    getProducts();
    // getCart();
    return;
  }, []);
  const getCart = async () => {
    if(!userDetails){
      return
    }
    const response = await fetch(
      `${BASE_URL}/addtocart/getCartsByUserId/${
        JSON.parse(localStorage.getItem("userDetails")).id
      }`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    // console.log(data);
    var temp = [];
    if (response.status===200) {
      const data = await response.json();
      // console.log(data)
      data.map((item) => {
        let product = productHome.filter(
          (medicine) => medicine.id === item.productId
        )[0];
        product = { ...product, quantity: item.quantity };
        temp = [...temp, product];
      });
      console.log(temp);
      localStorage.setItem("cart", JSON.stringify(temp));
    }
    setCart(temp);
    console.log(cart);
  };


  const getOrder = async () => {
    if(!userDetails){
      return
    }
    const response = await fetch(
      `${BASE_URL}/order/getOrdersByUserId/${
        JSON.parse(localStorage.getItem("userDetails")).id
      }`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      var orderItems = {
        id: 0,
        emailId: "",
        products: [],
        userId: 0,
        price: 0,
        paymentType: "",
        createdAt: "",
        deliveryAddress: "",
      };
      var temp = [];
      data.map((item) => {
        orderItems.id = item.id;
        orderItems.emailId = item.emailId;
        orderItems.userId = item.userId;
        orderItems.price = item.price;
        orderItems.paymentType = item.paymentType;
        orderItems.createdAt = item.createdAt;
        orderItems.deliveryAddress = item.deliveryAddress;
        item.productIds.map((product, index) => {
          var product = {
            ...productHome.filter((medicine) => medicine.id === product)[0],
            quantity: item.quantity[index],
          };
          orderItems.products.push(product);
        });
        temp.push(orderItems);
        orderItems = {
          id: 0,
          emailId: "",
          products: [],
          userId: 0,
          price: 0,
          paymentType: "",
          createdAt: "",
          deliveryAddress: "",
        };
        return;
      });
      temp.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      setOrderHome(temp);
    }
  }

  useEffect(() => {
    getCart();
    getOrder();
  }, [productHome,UserDetails]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    setUserDetails(null);
    setShowLogout(false);
    setCart([]);
    navigate("/");
  };

  return (
    <div className="navbarContainer">
      <Link
        to={"/"}
        style={{ textDecoration: "none", color: "black" }}
        onClick={() => {
          setShowSignup(false);
          setLoginShow(false);
        }}
      >
        <div className="navbarBrand">
          <img src={image} alt="" className="navbarBrandImage" />
          <div className="navbarBrandText">CogMed</div>
        </div>
      </Link>

      <div className="navbarMenu">
        {!userDetails && (
          <li
            className="navbarMenuItem"
            onClick={() => {
              setShowSignup(false);
              setLoginShow(true);
            }}
          >
            Login
          </li>
        )}
        {!userDetails && (
          <li
            className="navbarMenuItem"
            onClick={() => {
              setShowSignup(true);
              setLoginShow(false);
            }}
          >
            Signup
          </li>
        )}
        <li className="navbarMenuItem">About Us</li>
        {userDetails && (
          <li className="navbarMenuItem">
            <Link
              to={"orders"}
              style={{ textDecoration: "none", color: "black" }}
            >
              Orders
            </Link>
          </li>
        )}
        {userDetails && (
          <div>
            <li
              className="navbarMenuItem"
              onClick={() => {
                setShowLogout(!showLogout);
              }}
            >
              <Person></Person>
              {userDetails.email}
            </li>
            {showLogout && (
              <li className="navbarMenuItem dropdown" onClick={handleLogout}>
                <Logout /> Logout
              </li>
            )}
          </div>
        )}
      </div>
      <Link to={"/checkout"} style={{ textDecoration: "none", color: "black" }}>
        <div className="navbarCart">
          <div className="navbarCartCount">{cart.length}</div>
          <ShoppingCart className="navbarCartIcon"></ShoppingCart>
        </div>
      </Link>

      <div className="navbarSearchBox">
        <input
          type="text"
          className="navbarSearchBoxInput"
          placeholder="Search"
          name="searchBox"
          onChange={(e) => {
            setTemp(e.target.value);
          }}
        />
        <div
          className="navbarSearchBoxIcon"
          onClick={() => {
            if (temp) {
              setSearchBox(temp);
              navigate(`/products/${temp}`);
            }
          }}
        >
          <Search />
        </div>
      </div>
    </div>
  );
}

export default Header;
