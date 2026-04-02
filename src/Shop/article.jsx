import styled from "styled-components";
import React, { useEffect, useState } from "react";

/* ---------------- IMPORT BACKGROUNDS ---------------- */
import bg1 from "../assets/items/bg1.jpg";
import bg2 from "../assets/items/bg2.jpg";
import bg3 from "../assets/items/bg3.jpg";
import bg4 from "../assets/items/bg4.jpg";
import bg5 from "../assets/items/bg5.jpg";
import bg6 from "../assets/items/bg6.jpg";
import bg7 from "../assets/items/bg7.jpg";
import bg8 from "../assets/items/bg8.jpg";
import bg9 from "../assets/items/bg9.jpg";

/* ---------------- PRODUCT DATA ---------------- */
const products = [
  {
    id: 1,
    title: "Leather Jacket",
    cost: 15000,
    description: "Rent",
    Location: "Delhi",
    corbox: "SIZE",
    size: "M",
    bg: bg1,
  },
  {
    id: 2,
    title: "Desi Traditional",
    cost: 8000,
    description: "Sell",
    Location: "Delhi",
    corbox: "SIZE",
    size: "S",
    bg: bg2,
  },
  {
    id: 3,
    title: "Suit",
    cost: 17000,
    description: "Rent",
    Location: "Mumbai",
    corbox: "SIZE",
    size: "L",
    bg: bg3,
  },
  {
    id: 4,
    title: "Sweater",
    cost: 0,
    description: "Barter",
    Location: "Kerala",
    corbox: "SIZE",
    size: "XL",
    bg: bg4,
  },
  {
    id: 5,
    title: "Henley & Trouser",
    cost: 5000,
    description: "Sell",
    Location: "Bangalore",
    corbox: "SIZE",
    size: "S",
    bg: bg5,
  },
  {
    id: 6,
    title: "Vest",
    cost: 0,
    description: "Barter",
    Location: "Delhi",
    corbox: "SIZE",
    size: "S",
    bg: bg6,
  },
  {
    id: 7,
    title: "Formal",
    cost: 10000,
    description: "Sell",
    Location: "Lucknow",
    corbox: "SIZE",
    size: "M",
    bg: bg7,
  },
  {
    id: 8,
    title: "Leather Jacket",
    cost: 12000,
    description: "Rent",
    Location: "Bagalore",
    corbox: "SIZE",
    size: "L",
    bg: bg8,
  },
  {
    id: 9,
    title: "Sweater",
    cost: 7000,
    description: "Rent",
    Location: "Kolkata",
    corbox: "SIZE",
    size: "XXL",
    bg: bg9,
  },
];

/* ---------------- PRODUCT CARD ---------------- */
const ProductCard = ({ product }) => {

  const [carted, setCarted] = useState(false);

  useEffect(() => {

    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const exists = cart.some(item => item.id === product.id);

    setCarted(exists);

  }, [product.id]);

  const addToCart = () => {

    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const exists = cart.find(item => item.id === product.id);

    if (exists) {
      setCarted(true);
      return;
    }

    const newItem = {
      id: product.id,
      title: product.title,
      image: product.bg,
      mode: product.description,
      size: product.size,
      price: product.cost,
      dealer: product.dealerName || "Marketplace",
      dealerContact: product.dealerContact || "-",
      quantity: 1,
      weeks: 1
    };

    const updatedCart = [...cart, newItem];

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("cartUpdated"));

    setCarted(true);

  };

  return (
    <div className="article-parent">
      <div
        className="article-card"
        style={{
          backgroundImage: `url(${product.bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="article-content-box">
          <span className="article-card-title">{product.title}</span>

          <p className="article-card-content">
            Down for: {product.description} <br />
            Price: {product.cost} INR
            {product.description?.toLowerCase() === "rent" && "/week"} <br />
            Location: {product.Location}
          </p>

          <button
            onClick={addToCart}
            className="see-more"
            disabled={carted}
          >
            {carted ? "CARTED ✓" : "ACQUIRE!"}
          </button>

        </div>

        <div className="date-box">
          <span className="corbox">{product.corbox}</span>
          <span className="size">{product.size}</span>
        </div>
      </div>
    </div>
  );
};

/* ---------------- MAIN PAGE ---------------- */
const Products = ({ filters }) => {

  const [visibleProducts, setVisibleProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      const serverProducts = Array.isArray(data.products) ? data.products : [];
      const storedDeals = JSON.parse(localStorage.getItem("userDeals")) || [];
      setAllProducts([...storedDeals, ...serverProducts]);
    } catch (error) {
      console.error("Failed to load products from API", error);
      const storedDeals = JSON.parse(localStorage.getItem("userDeals")) || [];
      setAllProducts([...storedDeals, ...products]);
    }
  };

  useEffect(() => {
    loadProducts();
    window.addEventListener("dealsUpdated", loadProducts);
    return () => {
      window.removeEventListener("dealsUpdated", loadProducts);
    };
  }, []);

  const normalize = (str) =>
    str.toLowerCase().replace(/\s+/g, "");

  const filteredProducts = allProducts.filter((product) => {

    const matchesSearch =
      normalize(product.title).includes(
        normalize(filters.search)
      );

    const matchesSize =
      filters.size.length === 0 ||
      filters.size.includes(product.size);

    const matchesMode =
      filters.huntMode.length === 0 ||
      filters.huntMode.includes(product.description);

    const matchesLocation =
      filters.state.length === 0 ||
      filters.state.includes(product.Location);

    const matchesPrice =
      filters.price === Infinity ||
      product.cost <= filters.price;

    return (
      matchesSearch &&
      matchesSize &&
      matchesMode &&
      matchesLocation &&
      matchesPrice
    );
  });

  useEffect(() => {

    setVisibleProducts([]);

    const timeout = setTimeout(
      () => setVisibleProducts(filteredProducts),
      120
    );

    return () => clearTimeout(timeout);

  }, [filters, allProducts]);

  return (
    <StyledWrapper>

      {filteredProducts.length === 0 ? (
        <div className="products-empty">
          <h2>No drip found</h2>
          <p>Your vision isn't served yet.</p>
        </div>
      ) : (
        <div className="products-grid">
          {visibleProducts.map((product, index) => (
            <div
              key={product.id}
              style={{
                animation: `fadeSlide 0.35s ease forwards`,
                animationDelay: `${index * 60}ms`,
                opacity: 0,
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

    </StyledWrapper>
  );
};

/* ---------------- STYLES ---------------- */
const StyledWrapper = styled.div`
  padding: 40px;

  /* GRID LAYOUT */
  .products-grid {
    padding-left:6rem;
    padding-top:1rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }

  .products-empty {
    height: 60vh;
    display: flex;
    color: #777;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-align: center;
    font-family: "Google Sans Code", monospace;
  }

  .products-empty h2 {
    font-size: 28px;
    margin-bottom: 0px;
  }

  .products-empty p {
    opacity: 0.7;
  }

  .article-parent {
    width: 75%;
    height: 20rem;
    padding-bottom: 3rem;
    perspective: 1000px;
  }

  .article-card {
    position: relative;
    padding-top: 100px;
    border: 3px solid rgb(255, 255, 255);
    transform-style: preserve-3d;
    background-size: 60px 60px;
    background-color: #252525;
    width: 100%;
    border-radius: 20px;
    transition: all 0.5s ease-in-out;
  }
    
  @media (hover: hover) and (pointer: fine) {
    .article-card:hover {
        background-position: -100px 100px, -100px 100px;
        transform: rotate3d(0.5, 1, 0, 30deg);
    }
  }

  .article-content-box {
    padding: 60px 25px 25px 25px;
    transform-style: preserve-3d;
  }

  .article-card-title {
    display: inline-block;
    color: white;
    font-size: 22px;
    font-family:'Satoshi', sans-serif;
    font-weight: 900;
    transform: translate3d(0, 0, 50px);
  }

  .article-card-content {
    margin-top: 10px;
    font-size: 13px;
    font-family: "Google Sans Code", monospace;
    font-weight: normal;
    color: white;
    transform: translate3d(0, 0, 30px);
  }

  .see-more {
    background: #fcffc3;
    margin-top: 1rem;
    display: inline-block;
    font-weight: 600;
    font-family: "Google Sans Code", monospace;
    font-size: 15px;
    border-radius: 10px;
    border: 3px solid rgb(0, 0, 0);
    text-transform: uppercase;
    color: rgb(0, 0, 0);
    padding: 0.5rem 0.7rem;
    transform: translate3d(0, 0, 20px);
    transition: transform 0.12s ease, box-shadow 0.12s ease;
  }

  .see-more:active {
    transform: scale(0.92);
    box-shadow: 0 2px 0 rgba(0,0,0,0.4) inset;
  }

  .date-box {
    position: absolute;
    top: 30px;
    right: 30px;
    height: 30px;
    width: 30px;
    background: #fcffc3;
    border: 3px solid rgb(0, 0, 0);
    border-radius: 10px;
    padding: 10px;
    transform: translate3d(0, 0, 80px);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 17px 10px -10px;
  }

  .date-box span {
    display: block;
    text-align: center;
  }

  .corbox {
    color: rgb(0, 0, 0);
    font-size: 9px;
    font-family: "Google Sans Code", monospace;
    font-weight: normal;
  }

  .size {
    font-size: 20px;
    font-weight: 900;
    font-family: "Google Sans Code", monospace;
    color: rgb(0, 0, 0);
  }

  @keyframes fadeSlide {
    from {
        opacity: 0;
        transform: translateY(18px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
  }

  /* ================= TABLET ================= */

  @media (max-width: 1024px) {
    padding: 30px 20px;

    .products-grid {
      padding-left: 0;
      grid-template-columns: repeat(2, 1fr);
      gap: 25px;
    }

    .article-parent {
      max-width: 300px;
      height: 19rem;
    }
  }

  /* ================= MOBILE ================= */

  @media (max-width: 768px) {
    padding: 20px 15px;

    .products-grid {
      grid-template-columns: 1fr;
      gap: 22px;
    }

    .article-parent {
      margin-left: 2.5rem;
      max-width: 100%;
      height: 18rem;
    }

    .article-content-box {
      padding: 50px 20px 20px;
    }

    .article-card-title {
      font-size: 20px;
    }

    .article-card-content {
      font-size: 12px;
    }

    .see-more {
      font-size: 13px;
      padding: 0.45rem 0.6rem;
    }
  }

  /* ================= SMALL PHONES ================= */

  @media (max-width: 480px) {

    .article-parent {
      height: 17rem;
    }

    .date-box {
      top: 15px;
      right: 15px;
      transform: none;
    }

    .size {
      font-size: 16px;
    }
  }
`;

export default Products;