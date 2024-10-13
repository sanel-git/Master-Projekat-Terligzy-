import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo2.png";
import cart from "../assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("");
  const {getTotalCartItems} = useContext(ShopContext);

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to="/">
          <img onClick={() => {setMenu("")}} className="logo" src={logo} alt="logo" />
        </Link>
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("zene");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="zene">
            Žene
          </Link>
          {menu === "zene" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("muskarci");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="muskarci">
            Muškarci
          </Link>
          {menu === "muskarci" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Odjavi se</button>
        :<Link to="/login">
        <button>Prijavi se</button>
          </Link>}
        <Link to="cart">
          <img src={cart} alt="cart-icon" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
