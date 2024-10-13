import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../context/ShopContext';
import remove_icon from '../assets/cart_cross_icon.png';
import { PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';  

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
  const [showPayPal, setShowPayPal] = useState(false);
  const totalAmount = getTotalCartAmount();

  const handlePayment = () => {
    setShowPayPal(true);
  };
const saveOrder = async (productIds, totalPrice) => {
    try {
      const token = localStorage.getItem('auth-token');  // Assuming you store token in localStorage
      await axios.post(
        "http://localhost:4000/saveorder",  // Adjust if your backend is hosted elsewhere
        { productIds, totalPrice },
        {
          headers: { "auth-token": token },  // Attach the auth token
        }
      );
      alert("Order saved successfully!");
    } catch (error) {
      console.error("Error saving order:", error);
      alert("There was an issue saving your order.");
    }
  };


  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Proizvodi</p>
        <p>Naziv proizvoda</p>
        <p>Cena</p>
        <p>Količina</p>
        <p>Ukupno</p>
        <p>Ukloni</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format-main cartitems-format">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>{e.new_price}€</p>
                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                <p>{e.new_price * cartItems[e.id]}€</p>
                <img className="cart-items-remove-icon" src={remove_icon} onClick={() => removeFromCart(e.id)} alt="" />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Vrednost korpe</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Vrednost proizvoda</p>
              <p>{totalAmount}€</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Cena dostave</p>
              <p>Besplatno</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Ukupno:</h3>
              <h3>{totalAmount}€</h3>
            </div>
          </div>
          {/* PayPal Button */}
          {showPayPal ? (
              <PayPalButtons
                style={{ layout: 'vertical' }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalAmount,  // Total amount to pay
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    const productIds = all_product
                      .filter((e) => cartItems[e.id] > 0)
                      .map((e) => e.id);  // Get all product IDs in the cart

                    // Save the order to the backend
                    saveOrder(productIds, totalAmount);

                    alert('Transaction completed by ' + details.payer.name.given_name);
                  });
                }}
                onError={(err) => {
                  console.error(err);
                  alert('An error occurred during the payment process');
                }}
              />
            ) : (
              <button onClick={handlePayment}>NASTAVI SA PLAĆANJEM</button>
            )}
        </div>

        <div className="cartitems-promocode">
          <p>Ako imate promo kod, unesite ga ovde</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Promo kod" />
            <button>Unesi</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
