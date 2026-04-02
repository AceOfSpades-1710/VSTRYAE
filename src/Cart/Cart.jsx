import React, { useState, useMemo, useCallback, useEffect } from "react";
import FollowCursor from "../crsr";
import Loader from "../loader";
import Nav from "../nav";
import Footer from "../footer";
import CartNav from "./cartnav";
import CartPage from "./cartpage";

function Cart() {

  const [cartItems, setCartItems] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("cartItems"));
    return saved || [];
  });

  /* LISTEN FOR CART UPDATES */

  useEffect(() => {

    const loadCart = () => {
      const saved = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(saved);
    };

    window.addEventListener("cartUpdated", loadCart);
    window.addEventListener("focus", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
      window.removeEventListener("focus", loadCart);
    };

  }, []);

  /* SAVE CART */

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  /* UPDATE QUANTITY */

  const updateQuantity = useCallback((id, delta) => {
    setCartItems(prev => {

      const updated = prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      );

      localStorage.setItem("cartItems", JSON.stringify(updated));

      return updated;
    });
  }, []);

  /* UPDATE WEEKS */

  const updateWeeks = useCallback((id, delta) => {
    setCartItems(prev => {

      const updated = prev.map(item =>
        item.id === id
          ? { ...item, weeks: Math.max(1, (item.weeks || 1) + delta) }
          : item
      );

      localStorage.setItem("cartItems", JSON.stringify(updated));

      return updated;
    });
  }, []);

  /* REMOVE ITEM */

  const removeItem = useCallback((id) => {

    setCartItems(prev => {

      const updated = prev.filter(item => item.id !== id);

      localStorage.setItem("cartItems", JSON.stringify(updated));

      return updated;
    });

  }, []);

  /* TOTAL DAMAGE */

  const totalAmount = useMemo(() => {

    return cartItems.reduce((sum, item) => {

      const isRent = item.mode?.toLowerCase() === "rent";

      if (isRent) {
        return sum + item.price * (item.weeks || 1);
      }

      return sum + item.price * item.quantity;

    }, 0);

  }, [cartItems]);

  return (
    <>
      <FollowCursor />
      <Loader />
      <Nav />

      <CartNav totalAmount={totalAmount} />

      <CartPage
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        updateWeeks={updateWeeks}
        removeItem={removeItem}
      />

      <Footer />
    </>
  );
}

export default Cart;