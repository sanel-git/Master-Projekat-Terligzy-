import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from '../assets/cross_icon.png'
//import { backend_url, currency } from "../../App";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts'/*`${backend_url}/allproducts`*/)
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
  }

  useEffect(() => {
    fetchInfo();
  }, [])

  const removeProduct = async (id) => {
    await fetch('http://localhost:4000/removeproduct'/*`${backend_url}/removeproduct`*/, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    })

    await fetchInfo();
  }
  
  return (
    <div className="listproduct">
      <h1>Lista svih proizvoda</h1>
      <div className="listproduct-format-main">
        <p>Proizvodi</p> <p>Naziv</p> <p>Cena</p> <p>Kategorija</p> <p>Ukloni</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => (
          <div key={index}>
            <div className="listproduct-format-main listproduct-format">
              <img className="listproduct-product-icon" src={product.image/*backend_url + e.image*/} alt="" />
              <p className="cartitems-product-title">{product.name}</p>
              <p>{product.new_price}€</p>
              <p>{product.category}</p>
              <img className="listproduct-remove-icon" onClick={() => { removeProduct(product.id) }} src={cross_icon} alt="" />
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;

