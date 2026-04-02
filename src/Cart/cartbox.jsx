import React, { useState } from "react";
import styled from "styled-components";

const CartBox = ({ item, updateQuantity, updateWeeks, onRemove }) => {

  const [clicked, setClicked] = useState(null);

  const isRentMode =
    item.mode?.toLowerCase() === "rent";

  const isSingleItemMode =
    item.mode?.toLowerCase() === "barter";

  const increase = () => {
    if (isRentMode || isSingleItemMode) return;
    updateQuantity(item.id, 1);
  };

  const decrease = () => {
    if (isRentMode || isSingleItemMode) return;
    updateQuantity(item.id, -1);
  };

  const increaseWeeks = () => {
    updateWeeks(item.id, 1);
  };

  const decreaseWeeks = () => {
    updateWeeks(item.id, -1);
  };

  const remove = () => {
    setClicked("remove");
    setTimeout(() => setClicked(null), 200);
    onRemove(item.id);
  };

  return (
    <StyledWrapper>
      <div className="card">

        {/* REMOVE BUTTON */}
        <div className="corner">
          <div
            className={`action ${clicked === "remove" ? "clicked" : ""}`}
            onClick={remove}
          >
            <svg stroke="currentColor" fill="none" strokeWidth={2}
              viewBox="0 0 24 24" strokeLinecap="round"
              strokeLinejoin="round" height="1em" width="1em">
              <circle cx="12" cy="12" r="9"/>
              <path d="M9 9l6 6M15 9l-6 6"/>
            </svg>
          </div>
        </div>

        {/* CARD CONTENT */}
        <div className="card-content">

          <div className="card-image">
            <img src={item.image} alt="product" />
          </div>

          <div className="card-text">

            <div className="order-card-title">
              {item.title}
            </div>

            <div className="order-card-content">

              <div className="order-left">
                <span>Mode:</span> {item.mode} <br/>
                <span>Size:</span> {item.size} <br/>

                <span>Cost:</span>{" "}
                {item.mode?.toLowerCase() === "rent"
                  ? item.price * (item.weeks || 1)
                  : item.price * item.quantity
                } INR <br />

              </div>

              <div className="order-right">

                <span>Dealer:</span> {item.dealer} <br />
                <span>Contact:</span> {item.dealerContact} <br/>

                {!isRentMode && (
                  <>
                    <span>Quantity:</span>

                    <div className="quantity">
                      <button
                        onClick={decrease}
                        disabled={isSingleItemMode}
                      >
                        −
                      </button>

                      <p>{item.quantity}</p>

                      <button
                        onClick={increase}
                        disabled={isSingleItemMode}
                      >
                        +
                      </button>
                    </div>
                  </>
                )}

                {isRentMode && (
                  <>
                    <span>Weeks:</span>

                    <div className="quantity">
                      <button onClick={decreaseWeeks}>−</button>
                      <p>{item.weeks || 1}</p>
                      <button onClick={increaseWeeks}>+</button>
                    </div>
                  </>
                )}

              </div>

            </div>

          </div>

        </div>

        {/* CHECKOUT BUTTON */}
        <div className="box-foot-actions">
          <button className="box-foot-action">
            <p>Buy Now!</p>
          </button>
        </div>

      </div>
    </StyledWrapper>
  );
};

/* ---- STYLES UNCHANGED ---- */

const StyledWrapper = styled.div`

.card {
  --p-card: 0.9rem;
  --gap-action: 15px;
  --sz-action: 58px;
  --round-card: calc(var(--sz-action)/2 + var(--gap-action)/2);

  width: 1030px;
  max-width: 100%;
  height: 280px;
  border-radius: var(--round-card);
  position: relative;
  background-color: #1d1d1d;
  padding: var(--p-card);
  margin-left: 11rem;
}

.corner {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  gap: var(--gap-action);
  background: black;
  border-bottom-left-radius: var(--round-card);
  padding-bottom: var(--gap-action);
  padding-left: var(--gap-action);
}

.corner .action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--sz-action);
  height: var(--sz-action);
  border-radius: 9999px;
  background: #292929;
  color: #fcffc3;
  transition: 0.3s;
}

.corner .action:hover {
  background: #fcffc3;
  color: #292929;
}

.corner svg {
  width: 32px;
  height: 32px;
}

.card-content {
  display: flex;
  height: 100%;
  width: 90%;
  gap: 3rem;
}

.card-image {
  width: 35%;
  height: 100%;
  overflow: hidden;
  border-radius: 30px;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-text {
  width: 70%;
  color: #999;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-text span {
  color: #f5e19a;
}

.order-card-title {
  color: #fcffc3;
  font-size: 32px;
  font-family: "Satoshi", sans-serif;
  font-weight: 900;
}

.order-card-content {
  line-height: 1.8;
  margin-top: 30px;
  font-size: 14px;
  font-family: "Google Sans Code", monospace;
  color: white;
  display: flex;
  width: 100%;
}

.order-left,
.order-right {
  width: 50%;
}

.quantity {
  display: flex;
  gap: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
}

.quantity button {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 6px;
  background: black;
  color: #fcffc3;
  cursor: pointer;
}

.quantity button:hover {
  background: #fcffc3;
  color: black;
}

.quantity button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  background: #333;
  color: #777;
}

.quantity p {
  margin: 0;
  padding: 4px 8px;
}

.box-foot-actions {
  width: 15%;
  position: absolute;
  bottom: var(--p-card);
  left: 58.5rem;
}

.box-foot-action {
  padding: 2px 20px;
  border-radius: 999px;
  border: none;
  background: black;
  font-size: 0.9rem;
  font-weight:300;
  color: #fcffc3;
  font-family: "Google Sans Code", monospace;
}

.box-foot-action:hover {
  background: #fcffc3;
  font-weight:600;
  color: black;
}

.action.clicked {
  transform: scale(0.85);
  transition: transform 0.15s ease;
}

`;

export default React.memo(CartBox);