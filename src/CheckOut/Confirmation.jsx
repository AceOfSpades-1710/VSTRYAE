import React, { useEffect, useState } from "react";
import FollowCursor from "../crsr";
import Loader from "../loader";
import Nav from "../nav";
import Footer from "../footer";
import "./Confirmation.css";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setProducts(cart);

    const payment = localStorage.getItem("selectedPaymentMethod");
    setPaymentMethod(payment);
  }, []);

  const hasBarter = products.some(
    (item) => item.mode?.toLowerCase() === "barter"
  );

  return (
    <>
      <FollowCursor />
      <Loader />
      <Nav />

      <div className="confirmation-container">

        {/* LEFT SIDE */}
        <div
          className="confirmation-left"
          onClick={() => navigate("/shop")}
        >
          <h1>Order Confirmed !</h1>

          <p className="confirmation-text">
            Thank you for your purchase!<br /> Your order has been successfully placed.
          </p>

          <div className="confirmation-order-info">
            <p><strong>Order ID:</strong> #123456</p>
            <p><strong>Estimated Delivery:</strong> 3-5 days</p>
            <p>
              <strong>Payment Status:</strong>{" "}
              {paymentMethod === "cod"
                ? "Cash on Delivery"
                : paymentMethod === "upi"
                ? "UPI"
                : paymentMethod === "card"
                ? "Credit / Debit Card"
                : "Paid"}
            </p>
          </div>

          {/* PRODUCTS */}

          {products.length > 0 && (
            <div
              className="confirmation-order-info"
              style={{ marginTop: "20px" }}
            >
              <p><strong>Products:</strong></p>

              {products.map((product) => {
                const mode = product.mode?.toLowerCase();

                return (
                  <p key={product.id}>
                    {product.title}
                    {mode === "rent" && ` (${product.weeks || 1}w rental)`}
                    {mode !== "rent" && ` x${product.quantity || 1}`}
                  </p>
                );
              })}

              {hasBarter && (
                <p className="Barter-confirmation">
                  <br />
                  Barter deal's owner will contact you if your offer is accepted!
                </p>
              )}
            </div>
          )}

          <button className="confirmation-continue-btn">
            Continue Shopping
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="confirmation-right">

          <div className="confirmation-card">
            <div className="confirmation-card-inner">

              <div className="confirmation-card-content">
                <p className="confirmation-card-title">
                  Welcome Fam ♡
                </p>
              </div>

              <button className="confirmation-seal">
                @
              </button>

              <div className="confirmation-tp"></div>
              <div className="confirmation-lft"></div>
              <div className="confirmation-rgt"></div>
              <div className="confirmation-btm"></div>

            </div>
          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Confirmation;