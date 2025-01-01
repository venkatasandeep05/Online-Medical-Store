import React, { useContext} from "react";
import CheckoutCard from "../../Components/CheckoutCards/checkoutcard/CheckoutCard";
import CheckoutcartEmpty from "../../Components/CheckoutCards/checkoutcartEmpty/CheckoutcartEmpty";
import { Cart } from "../../App";

function Checkout() {
  const [cart] = useContext(Cart);

  return (
    <div>{cart.length === 0 ? <CheckoutcartEmpty /> : <CheckoutCard />}</div>
  );
}

export default Checkout;
