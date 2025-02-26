import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../assets/upload_area.svg";
//import { backend_url } from "../../App";

const AddProduct = () => {

  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    image: "",
    category: "zene",
    new_price: "",
  });

  const AddProduct = async () => {

    let dataObj;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch('http://localhost:4000/upload'/*`${backend_url}/upload`*/, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    }).then((resp) => resp.json())
      .then((data) => { dataObj = data });

    if (dataObj.success) {
      product.image = dataObj.image_url;
      await fetch('http://localhost:4000/addproduct'/*`${backend_url}/addproduct`*/, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => { data.success ? alert("Product Added") : alert("Failed") });

    }
  }
  const imageHanler = (e) =>{
    setImage(e.target.files[0]);
  }

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  }

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Naziv Proizvoda</p>
        <input type="text" name="name" value={productDetails.name} onChange={/*(e) => {*/ changeHandler/*(e) }*/} placeholder="Type here" />
      </div>
      <div className="addproduct-itemfield">
        <p>Opis proizvoda</p>
        <input type="text" name="description" value={productDetails.description} onChange={/*(e) => { */changeHandler/*(e) }*/} placeholder="Type here" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Cena proizvoda</p>
          <input type="number" name="new_price" value={productDetails.new_price} onChange={/*(e) => {*/ changeHandler/*(e) }*/} placeholder="Type here" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Kategorija proizvoda</p>
        <select value={productDetails.category} name="category" className="add-product-selector" onChange={changeHandler}>
          <option value="zene">Žene</option>
          <option value="muskarci">Muškarci</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Slika proizvoda</p>
        <label htmlFor="file-input">
          <img className="addproduct-thumbnail-img" src={!image ? upload_area : URL.createObjectURL(image)} alt="" />
        </label>
        <input onChange={imageHanler}/*onChange={(e) => setImage(e.target.files[0])}*/ type="file" name="image" id="file-input" /*accept="image/*"*/ hidden />
      </div>
      <button className="addproduct-btn" onClick={() => { AddProduct() }}>ADD</button>
    </div>
  );
};

export default AddProduct;
