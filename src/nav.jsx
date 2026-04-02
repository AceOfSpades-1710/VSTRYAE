import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./nav.css";

import home from "./assets/navicons/home.svg";
import orders from "./assets/navicons/orders.svg";
import cart from "./assets/navicons/cart.svg";
import cloth from "./assets/navicons/cloth.svg"
import login from "./assets/navicons/login.svg";

function Nav() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [dockMode, setDockMode] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight * 0.2) {
        setDockMode(true);
      } else {
        setDockMode(false);
        setVisible(false); 
      }
    };

    const handleMouseMove = (e) => {
      if (!dockMode) return;

      const triggerZone = window.innerHeight - 60;

      if (e.clientY >= triggerZone) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [dockMode]);

  return (
    <nav
      className={`nav 
        ${dockMode ? "dock-mode" : ""} 
        ${visible ? "show" : ""}`}
    >
      <ul className="nav-list">
        <li
          onClick={() => navigate("/")}
          className="nav-link"
        >
          <img src={home} alt="Home" />
          <span>Home</span>
        </li>

        <li
          onClick={() => navigate("/orders")}
          className="nav-link"
        >
          <img src={orders} alt="Orders" />
          <span>Orders</span>
        </li>

        <li
          onClick={() => navigate("/shop")}
          className="nav-link"
        >
          <img src={cloth} alt="Shop" />
          <span>Shop</span>
        </li>

        <li 
          onClick={() => navigate("/cart")}
          className="nav-link"
        >
          <img src={cart} alt="Cart" />
          <span>Cart</span>
        </li>

        <li 
          onClick={() => navigate("/login")}
          className="nav-link"
        >
          <img src={login} alt="Login" />
          <span>Login</span>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;