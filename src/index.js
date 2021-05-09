import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider, WishlistProvider } from "./Contexts/index";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CartProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
      </CartProvider>
    </Router>    
  </React.StrictMode>,
  document.getElementById('root')
);