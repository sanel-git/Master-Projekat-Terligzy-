import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the correct import for React 18
import './index.css';
import App from './App';
import ShopContextProvider from './context/ShopContext';

const root = ReactDOM.createRoot(document.getElementById("root")); // React 18 root API
root.render(
    <ShopContextProvider>
        <App />
    </ShopContextProvider>
);
