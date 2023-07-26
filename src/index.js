import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Carrito from './components/CartContent/CartContent';
import CartProvider from './components/Context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/carrito' element={<Carrito />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
