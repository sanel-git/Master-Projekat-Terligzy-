import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import Footer from './components/Footer';
import ShopCategory from './pages/ShopCategory';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function App() {
  return (
    <div>
      <PayPalScriptProvider options={{ "client-id": "AQXJLij5A6P7nQvDcoj-pY9lFwSBBosH2iqmyPDLQZJzd6v-IJygG_K_qT-KMohoJ5pRWJ31YFp9dDZY" }}>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/zene' element={<ShopCategory category="zene"/>}/>
          <Route path='/muskarci' element={<ShopCategory category="muskarci"/>}/>
          <Route path='/product/:productId' element={<Product/>}/>
          <Route path='/cart' element={<Cart/>}/>   
          <Route path='/login' element={<LoginSignup/>}/>  
        </Routes>
      </BrowserRouter>
      <Footer/>
      </PayPalScriptProvider>
     
    </div>
  );
}

export default App;
