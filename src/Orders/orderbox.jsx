import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import TrackCard from "./trackCard";

const Card = ({ order, onAction }) => {

  const [showTrack, setShowTrack] = useState(false);
  const [clicked, setClicked] = useState(null);
  const [popup, setPopup] = useState(null); 

  const trackRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (trackRef.current && !trackRef.current.contains(event.target)) {
        setShowTrack(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ===============================
     CLICK HANDLER
  =============================== */
  const requestAction = (type) => {

    if (type === "cancel" && order.status === "Delivered") return;
    if (type === "return" && order.status !== "Delivered") return;

    setPopup(type);
  };

  /* ===============================
     CONFIRM ACTION
  =============================== */
  const confirmAction = () => {
    setClicked(popup);
    onAction(order.id, popup);

    setTimeout(() => setClicked(null), 200);
    setPopup(null);
  };

  const closePopup = () => setPopup(null);

  return (
    <StyledWrapper>
      <div className="card">

        {/* ===== CONFIRM POPUP ===== */}
        {popup && (
          <div className="confirm-overlay">
            <div className="confirm-box">
              <p>
                {popup === "cancel"
                  ? "Cancel this order?"
                  : "Schedule return for this order?"}
              </p>

              <div className="confirm-actions">
                <button onClick={closePopup}>No</button>
                <button onClick={confirmAction}>Yes</button>
              </div>
            </div>
          </div>
        )}

        <div className="corner">
          <i data-corner="tl" />
          <i data-corner="br" />

          {/* RETURN */}
          <div
            data-action="notif"
            className={`action ${clicked === "return" ? "clicked" : ""}`}
            onClick={() => requestAction("return")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth={2} strokeLinecap="round"
              strokeLinejoin="round" height="1em" width="1em">
              <path d="M3 7l9-4 9 4-9 4-9-4z" />
              <path d="M3 7v10l9 4 9-4V7" />
              <path d="M10 13H6" />
              <path d="M8 11l-2 2 2 2" />
            </svg>
          </div>

          {/* CANCEL */}
          <div
            data-action="more"
            className={`action ${clicked === "cancel" ? "clicked" : ""}`}
            onClick={() => requestAction("cancel")}
          >
            <svg stroke="currentColor" fill="none" strokeWidth={2}
              viewBox="0 0 24 24" strokeLinecap="round"
              strokeLinejoin="round" height="1em" width="1em">
              <circle cx="12" cy="12" r="9" />
              <path d="M9 9l6 6M15 9l-6 6" />
            </svg>
          </div>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="card-content">
          <div className="card-image">
            <img src={order.image} alt="product" />
          </div>

          <div className="card-text">
            <div className="order-card-title">{order.title}</div>

            <div className="order-card-content">
              <div className="order-left">
                <span>Order No:</span> {order.orderNo} <br />
                <span>Mode:</span> {order.mode} <br />
                <span>Size:</span> {order.size} <br />
                <span>Price:</span> {order.price} INR <br />
                <span>Ordered On:</span> {order.orderedOn} <br />
                <span>Status:</span> {order.status}
              </div>

              <div className="order-right">
                <span>Customer:</span> {order.customer} <br />
                <span>Address:</span> {order.address} <br />
                <span>Dealer:</span> {order.dealer} <br />
                <span>Contact:</span> {order.dealerContact} <br />
                <span>Delivered On:</span> {order.deliveredOn}
              </div>
            </div>
          </div>
        </div>

        {/* SUPPORT BUTTON */}
        <div className="box-foot-actions">
          <button
            type="button"
            className="box-foot-action"
            onClick={() => setShowTrack(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              fill="currentColor"
            >
              <path d="M3 5h11v8h2l3 3v3h-2a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H3V5zm2 2v10h1a2 2 0 0 1 4 0h3V7H5zm10 4v4h2.59L16 13.41V11h-1zm-8 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm8 0a1 1 0 1 0 .001-1.999A1 1 0 0 0 15 19z"/>
            </svg>
          </button>

          {showTrack && (
            <div className="popup-track" ref={trackRef}>
              <TrackCard />
            </div>
          )}
        </div>

      </div>
    </StyledWrapper>
  );
};

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
  }

  /* ===== EXISTING STYLES (UNCHANGED) ===== */

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

  .corner i[data-corner] {
    display: none;
  }

  .corner i[data-corner="tl"] { top: 0; right: 100%; }
  .corner i[data-corner="br"] { right: 0; top: 100%; }

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

  .box-foot-actions {
    position: absolute;
    bottom: var(--p-card);
    right: var(--p-card);
  }

  .box-foot-action {
    width: 58px;
    height: 58px;
    border-radius: 9999px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
    color: #fcffc3;
    transition: 0.3s;
  }

  .box-foot-action:hover {
    background: #fcffc3;
    color: black;
  }

  .box-foot-action svg {
    width: 65%;
    height: 65%;
  }

  /* ===== NEW STYLES (ADDED ONLY) ===== */

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

  .card-text span{
    color: #f5e19a;
  }

  .order-card-title {
    display: inline-block;
    color: #fcffc3;
    font-size: 32px;
    font-family:'Satoshi', sans-serif;
    font-weight: 900;
    transform: translate3d(0, 0, 0);
  }

  .order-card-content {
    line-height: 1.8;
    margin-top: 30px;
    font-size: 14px;
    font-family: "Google Sans Code", monospace;
    font-weight: normal;
    color: white;
    transform: translate3d(0, 0, 0);
    display: flex;
    width: 100%;
  }

  .order-left,
  .order-right {
    width: 50%;
  }

  .action.clicked {
    transform: scale(0.85);
    transition: transform 0.15s ease;
  }   

  .action.clicked {
    transform: scale(0.85);
    transition: transform 0.15s ease;
    }

    /* POPUP */
    
    .confirm-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: inherit;
    z-index: 5;
    }

    .confirm-box {
    background: #000000;
    color: #f5e19a;
    padding: 20px 30px;
    border-radius: 14px;
    text-align: center;
    font-family: "Google Sans Code", monospace;
    }

    .confirm-actions {
    margin-top: 15px;
    display: flex;
    gap: 12px;
    justify-content: center;
    }

    .confirm-actions button {
    background: black;
    color: #fcffc3;
    border: none;
    padding: 8px 14px;
    border-radius: 8px;
    cursor: pointer;
    }

    .confirm-actions button:hover {
    background: #f5e19a;
    color: black;
    }

    .popup-track{
      position:absolute;
      right: 550%;
      bottom: 40%;
      z-index:10;
    }

    /* =====================================================
    📱 TABLET (<= 1024px)
    ===================================================== */

    @media (max-width: 1024px) {

    .card {
        height: auto;
        padding: 18px;
    }

    .card-content {
        gap: 1.5rem;
        width: 100%;
    }

    .order-card-title {
        font-size: 24px;
    }

    .order-card-content {
        font-size: 13px;
        margin-top: 18px;
    }

    .corner .action {
        width: 48px;
        height: 48px;
    }

    .corner svg {
        width: 24px;
        height: 24px;
    }

    .box-foot-action {
        width: 48px;
        height: 48px;
    }
    }


    /* =====================================================
    📱 MOBILE (<= 768px)
    ===================================================== */

    @media (max-width: 768px) {

    .card {
        width: 320px;
        max-width: 100%;
        height: 560px;
        border-radius: var(--round-card);
        position: relative;
        background-color: #1d1d1d;
        padding: var(--p-card);
    }

    .card-content {
        flex-direction: column;
        gap: 16px;
        width: 100%;
    }

    /* IMAGE FULL WIDTH */
    .card-image {
        width: 100%;
        height: 200px;
        border-radius: 18px;
    }

    .card-text {
        width: 100%;
    }

    .order-card-title {
        font-size: 20px;
        padding-left: 1.5rem;
    }

    /* STACK ORDER DETAILS */
    .order-card-content {
        flex-direction: column;
        gap: 14px;
        margin-top: 14px;
        line-height: 1.6;
        font-size: 14px;
        padding-left: 1.5rem;
    }

    .order-left,
    .order-right {
        width: 100%;
    }

    /* MOVE SUPPORT BUTTON */
    .box-foot-actions {
        position: static;
        margin-top: 14px;
        display: flex;
        justify-content: flex-end;
        display: none;
    
    }

    /* SMALLER ACTION BUTTONS */
    .corner {
        gap: 10px;
        padding-bottom: 10px;
        padding-left: 10px;
    }

    .corner .action {
        width: 42px;
        height: 42px;
    }

    .corner svg {
        width: 20px;
        height: 20px;
    }

    .confirm-box {
        width: 70%;
        padding: 16px;
    }
    }

`;

export default Card;