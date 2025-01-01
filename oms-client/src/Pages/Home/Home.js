import React from "react";
import "./home.css";
import medicines from './data';
import GridWrapper from "./GridWrapper/GridWrapper";
import Banner from "./Crousel/Banner";
import { useContext,useEffect } from "react";
import{ProductHome} from '../../App';
import { BASE_URL } from "../../Config/BaseUrl";
import {Cart} from '../../App';

function Home() {

  const [productHome, setProductHome] = useContext(ProductHome);
  const [cart, setCart] = useContext(Cart);
  
  return (
    <div className="home">
      <Banner />
      <div className="container justify-content-md-center">
        <div className="row">
          {productHome.map(medicine => 
              <GridWrapper
                image={medicine.image}
                name={medicine.productName}
                description={medicine.productDesc}
                rating={medicine.productRating}
                price={medicine.price}
                id={medicine.id}
                key={medicine.id}
              />
          )}
        </div>
      </div>

    </div>
  );
}

export default Home;
