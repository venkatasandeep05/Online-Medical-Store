import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Checkout from "./Pages/Checkout/Checkout";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Products from "./Pages/Products/Products";
import Orders from "./Pages/Orders/Orders";
import { createContext, useState } from "react";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";

export const ShowLogin = createContext(false);
export const ShowSignup = createContext(false);
export const UserDetails = createContext(null);
export const ProductHome = createContext([]);
export const SearchBox = createContext(null);
export const Cart = createContext([]);
export const OrderHome = createContext([]);
export const DefaultOrder = createContext(false); 

function App() {
  const [loginShow, setLoginShow] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [userDetails, setUserDetails] = useState(false);
  const [productHome, setProductHome] = useState([]);
  const [searchBox, setSearchBox] = useState(null);
  const [cart, setCart] = useState([]);
  const [orderHome, setOrderHome] = useState([]);
  // const [defaultOrder, setDefaultOrder] = useState(false);
  return (
    <ShowLogin.Provider value={[loginShow, setLoginShow]}>
      <ShowSignup.Provider value={[showSignup, setShowSignup]}>
        <OrderHome.Provider value={[orderHome, setOrderHome]}>
          {/* <DefaultOrder.Provider value={[defaultOrder, setDefaultOrder]}> */}
        <ProductHome.Provider value={[productHome, setProductHome]}>
          <SearchBox.Provider value={[searchBox, setSearchBox]}>
            <Cart.Provider value={[cart, setCart]}>
              <UserDetails.Provider value={[userDetails, setUserDetails]}>
                <Router>
                  <Header></Header>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products/*" element={<Products />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/orders" element={<Orders />} />
                  </Routes>
                  <Footer></Footer>
                </Router>
                {loginShow && <Login></Login>}
                {showSignup && <Signup></Signup>}
              </UserDetails.Provider>
            </Cart.Provider>  
          </SearchBox.Provider>
        </ProductHome.Provider>
        {/* </DefaultOrder.Provider> */}
        </OrderHome.Provider>
      </ShowSignup.Provider>
    </ShowLogin.Provider>
  );
}

export default App;
