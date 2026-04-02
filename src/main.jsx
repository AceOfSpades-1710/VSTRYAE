import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App/App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Shop from './Shop/Shop.jsx'
import Orders from './Orders/Orders.jsx'
import Cart from './Cart/Cart.jsx'
import Login from './Login/Login.jsx'
import Signup from './Login/Signup.jsx'
import Account from './Login/Account.jsx'
import Checkout from './CheckOut/Checkout.jsx'
import Confirmation from './CheckOut/Confirmation.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
