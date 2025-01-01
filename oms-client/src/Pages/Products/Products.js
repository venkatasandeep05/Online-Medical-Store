import React, { useContext, useEffect, useState } from "react";
import "./products.css";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { BASE_URL } from "../../Config/BaseUrl";
import { SearchBox } from "../../App";
import {useNavigate} from "react-router-dom";

function Products() {
  const [products, setProducts] = useState(false);
  const [searchBox, setSearchBox] = useContext(SearchBox);
  const navigate = useNavigate();
  useEffect(() => {
    if(!searchBox){
      navigate("/");
      return;
    }

    const getProducts = async () => {
      const response = await fetch(
        `${BASE_URL}/products/getProductByName/${searchBox}`,
        {
          method: "GET",
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setProducts(data);
      }
    };
    getProducts();
  }, [searchBox]);
  if (products) {
    return (
      <div className="productsContainer">
        {products.map((medicine) => (
          <ProductCard
            key={medicine.id}
            image={medicine.image}
            name={medicine.productName}
            description={medicine.productDesc}
            rating={medicine.productRating}
            price={medicine.price}
            id={medicine.id}
          />
        ))}
      </div>
    );
  }
  return <h1 className="productsNotFound">Sorry No results Found....</h1>;
}

export default Products;
