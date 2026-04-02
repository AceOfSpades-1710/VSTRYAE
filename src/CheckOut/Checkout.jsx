import React, { useEffect } from "react";
import FollowCursor from "../crsr";
import Loader from "../loader";
import Nav from "../nav";
import Footer from "../footer";
import CheckoutPage from "./checkoutpage";

const Checkout = () => {

  return (
    <>
      <FollowCursor />
      <Loader />
      <Nav />
      <CheckoutPage />
      <Footer />
    </>
  );
};

export default Checkout;