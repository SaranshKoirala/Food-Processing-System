// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './Context/CartContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider>
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        style={{ zIndex: 9999 }}
      />
      <App />
    </CartProvider>
  </BrowserRouter>
);
