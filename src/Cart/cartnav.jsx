import React from "react";
import { useNavigate } from "react-router-dom";
import "./cartnav.css";

const CartNav = ({ totalAmount }) => {
  const navigate = useNavigate();
  return (
    <nav className="cartnav">

      <div className="cartnav-left">
        <h1>CART</h1>
      </div>

      <div className="cartnav-center">

        {/* CHECKOUT CARD BUTTON */}
        <div className="checkout-all-container" onClick={() => navigate("/checkout")}>

          <div className="container">

            <div className="left-side">
              <div className="card">
                <div className="card-line"></div>
                <div className="buttons"></div>
              </div>

              <div className="post">
                <div className="post-line"></div>

                <div className="screen">
                  <div className="inr">₹</div>
                </div>

                <div className="numbers"></div>
                <div className="numbers-line2"></div>

              </div>
            </div>

            <div className="right-side">
              <div className="new">Checkout</div>
            </div>

          </div>

        </div>

      </div>

      <div className="cartnav-right">
        <span>Damage:</span> ₹{totalAmount}
      </div>

    </nav>
  );
};

export default CartNav;