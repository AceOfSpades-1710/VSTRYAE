import React, { useState, useEffect } from "react";
import "./checkoutpage.css";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {

  const navigate = useNavigate();

  const [exchangeImage, setExchangeImage] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [products, setProducts] = useState([]);

  /* LOAD CART */

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setProducts(cart);
  }, []);

  /* LOAD ADDRESSES */

  useEffect(() => {

    const saved = JSON.parse(localStorage.getItem("userAddresses")) || [];
    setAddresses(saved);

    if (saved.length > 0) {
      setSelectedAddress(saved[0]);
    }

  }, []);

  const deliveryCharge = 0;

  const total =
    products.reduce((sum, product) => {

      const mode = product.mode?.toLowerCase();

      if (mode === "rent") {
        return sum + product.price * (product.weeks || 1);
      }

      return sum + product.price * (product.quantity || 1);

    }, 0) + deliveryCharge;

  /* IMAGE UPLOAD */

  const handleImageUpload = (e) => {

    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setExchangeImage(preview);

  };

  const hasBarter = products.some(
    (item) => item.mode?.toLowerCase() === "barter"
  );

  const canPlaceOrder =
    selectedPayment &&
    (!hasBarter || exchangeImage);

  /* RAZORPAY PAYMENT */

  const handleRazorpayPayment = async () => {

    try {

      const orderResponse = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: total })
      });

      const order = await orderResponse.json();

      const options = {

        key: "RAZORPAY_KEY_ID",

        amount: order.amount,
        currency: "INR",
        name: "VSTRYAE",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response) {

          try {

            const verifyResponse = await fetch("http://localhost:5000/verify-payment", {

              method: "POST",

              headers: {
                "Content-Type": "application/json"
              },

              body: JSON.stringify(response)

            });

            const data = await verifyResponse.json();

            if (data.success) {

              localStorage.removeItem("cartItems");

              navigate("/confirmation", {
                state: {
                  products,
                  total,
                  paymentMethod: selectedPayment,
                  paymentId: response.razorpay_payment_id
                }
              });

            } else {

              alert("Payment verification failed");

            }

          } catch (error) {

            console.error(error);
            alert("Verification error");

          }

        },

        prefill: {

          name: selectedAddress?.receiver || "",
          contact: selectedAddress?.receiverphone || ""

        },

        theme: {
          color: "#000"
        }

      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {

      console.error(error);
      alert("Payment initialization failed");

    }

  };

  /* PLACE ORDER */

  const handlePlaceOrder = async () => {
    if (!selectedPayment) {
      alert("Please select payment method");
      return;
    }

    const user = JSON.parse(localStorage.getItem("authUser") || "null");

    if (!user) {
      alert("Please log in before placing an order");
      return;
    }

    try {
      const orderPayload = {
        userEmail: user.email,
        products,
        total,
        paymentMethod: selectedPayment,
        shippingAddress: selectedAddress || {}
      };

      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload)
      });

      localStorage.removeItem("cartItems");

      navigate("/confirmation", {
        state: {
          products,
          total,
          paymentMethod: selectedPayment,
          paymentId: `offline-${Date.now()}`
        }
      });
    } catch (error) {
      console.error(error);
      alert("Order creation failed");
    }
  };

  return (

    <div className="checkout-container">

      {/* LEFT SIDE */}

      <div className="checkout-left">

        {/* ADDRESS */}

        <div className="checkout-card">

          <h2>Choose Address</h2>

          {addresses.length === 0 && (
            <p>No saved address. Add one in your account.</p>
          )}

          <div style={{
            display:"flex",
            flexDirection:"column",
            gap:"12px",
            marginTop:"10px"
          }}>

            {addresses.map((a, i) => {

              const isSelected = selectedAddress === a;

              return (

                <div
                  key={i}
                  onClick={() => setSelectedAddress(a)}
                  style={{
                    border: isSelected ? "2px solid black" : "1px solid #000",
                    borderRadius: "8px",
                    padding: "12px",
                    cursor: "pointer",
                    background: isSelected ? "#292929" : "#1c1c1c"
                  }}
                >

                  <strong>{a.receiver}</strong> <br/>

                  {a.address}, {a.city} <br/>

                  {a.state} - {a.pincode} <br/>

                  Phone: {a.receiverphone}

                </div>

              );

            })}

          </div>

          <button
            className="btn"
            onClick={() => window.location.href="/account"}
          >
            Manage Addresses
          </button>

        </div>

        {/* PRODUCTS */}

        <div className="checkout-card">

          <h2>Product Details</h2>

          {products.map((product) => {

            const mode = product.mode?.toLowerCase();

            return (

              <div key={product.id} className="product-row">

                <div>

                  <strong>{product.title}</strong> <br/>

                  Mode: {product.mode} <br/>

                  {mode === "rent" && (
                    <>Rental Period: {product.weeks || 1} week(s)<br/></>
                  )}

                  {mode !== "rent" && (
                    <>Quantity: {product.quantity || 1}<br/></>
                  )}

                </div>

                <div>

                  ₹

                  {mode === "rent"
                    ? product.price * (product.weeks || 1)
                    : product.price * (product.quantity || 1)
                  }

                </div>

              </div>

            );

          })}

        </div>

        {/* BARTER */}

        {hasBarter && (

          <div className="checkout-card">

            <h2>Barter Return</h2>

            <p>Upload item you want to exchange</p>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />

            {exchangeImage && (
              <div className="preview-container">
                <p>Preview:</p>
                <img src={exchangeImage} alt="preview"/>
              </div>
            )}

            <p>

              <strong>Your Location:</strong>{" "}

              {selectedAddress
                ? `${selectedAddress.address}, ${selectedAddress.city}`
                : "No address selected"}

            </p>

          </div>

        )}

        {/* PAYMENT */}

        <div className="checkout-card">

          <h2>Payment Mode</h2>

          <label>

            <input
              type="radio"
              name="payment"
              value="cod"
              onChange={(e) => setSelectedPayment(e.target.value)}
            />

            Cash on Delivery

          </label>

          <label>

            <input
              type="radio"
              name="payment"
              value="upi"
              onChange={(e) => setSelectedPayment(e.target.value)}
            />

            UPI

          </label>

          <label>

            <input
              type="radio"
              name="payment"
              value="card"
              onChange={(e) => setSelectedPayment(e.target.value)}
            />

            Credit / Debit Card

          </label>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="checkout-right">

        <h2>Bill Summary</h2>

        {products.map((product) => {

          const mode = product.mode?.toLowerCase();

          const price =
            mode === "rent"
              ? product.price * (product.weeks || 1)
              : product.price * (product.quantity || 1);

          return (

            <div key={product.id} className="bill-row">

              <span>

                {product.title}

                {mode === "rent" && (
                  <> ({product.weeks || 1}w)</>
                )}

                {mode !== "rent" && (
                  <> x{product.quantity || 1}</>
                )}

              </span>

              <span>₹{price}</span>

            </div>

          );

        })}

        <div className="bill-row">

          <span>Delivery Charges</span>
          <span>₹{deliveryCharge}</span>

        </div>

        <hr/>

        <div className="total-row">

          <strong>Total</strong>
          <strong>₹{total}</strong>

        </div>

        <button
          className="checkout-btn"
          disabled={!canPlaceOrder}
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>

      </div>

    </div>

  );

};

export default CheckoutPage;