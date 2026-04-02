import React from "react";
import "./cartpage.css";
import CartBox from "./cartbox";

const CartPage = ({ cartItems, updateQuantity, updateWeeks, removeItem }) => {

  return (
    <div className="cartpage">

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <h2> EMPTY :( </h2>
          <p>
            You have ghosted your cart! <br />
            Add items to keep the spark alive.
          </p>
        </div>
      ) : (
        cartItems.map(item => (
          <CartBox
            key={item.id}
            item={item}
            updateQuantity={updateQuantity}
            updateWeeks={updateWeeks}
            onRemove={removeItem}
          />
        ))
      )}

    </div>
  );
};

export default CartPage;