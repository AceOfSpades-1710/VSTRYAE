import React from 'react';
import styled from 'styled-components';

const TrackCard = () => {
  return (
    <StyledWrapper>
      <div className="stepper-box">
        <div className="stepper-step stepper-completed">
          <div className="stepper-circle">
            <svg viewBox="0 0 16 16" className="bi bi-check-lg" fill="currentColor" height={16} width={16} xmlns="http://www.w3.org/2000/svg">
              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
            </svg>
          </div>
          <div className="stepper-line" />
          <div className="stepper-content">
            <div className="stepper-title">Order Placed</div>
            <div className="stepper-status">Completed</div>
            <div className="stepper-time">May 28, 10:24 AM</div>
          </div>
        </div>

        <div className="stepper-step stepper-active">
          <div className="stepper-circle">2</div>
          <div className="stepper-line" />
          <div className="stepper-content">
            <div className="stepper-title">Processing</div>
            <div className="stepper-status">In Progress</div>
            <div className="stepper-time">May 29, 02:15 PM</div>
          </div>
        </div>

        <div className="stepper-step stepper-pending">
          <div className="stepper-circle">3</div>
          <div className="stepper-content">
            <div className="stepper-title">Shipping</div>
            <div className="stepper-status">Pending</div>
            <div className="stepper-time">Estimated: May 30</div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .stepper-box {
    background-color: black;
    border-radius: 12px;
    padding: 16px;
    width: 300px;
    height: 200px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    font-family: "Google Sans Code", monospace;
    }

    /* steps */
    .stepper-step {
    margin-top: 8px;
    display: flex;
    margin-bottom: 18px;
    position: relative;
    }

    .stepper-step:last-child {
    margin-bottom: 0;
    }

    /* vertical line */
    .stepper-line {
    position: absolute;
    left: 14px;
    top: 28px;
    bottom: -14px;
    width: 2px;
    background-color: #292929;
    z-index: 1;
    }

    .stepper-step:last-child .stepper-line {
    display: none;
    }

    /* step circle */
    .stepper-circle {
    width: 28px;
    height: 28px;
    font-size: 12px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    z-index: 2;
    }

    .stepper-completed .stepper-circle {
    background-color: #fcffc3;
    color: black;
    }

    .stepper-active .stepper-circle {
    border: 2px solid #fcffc3;
    color: #fcffc3;
    }

    .stepper-pending .stepper-circle {
    border: 2px solid #292929;
    color: #292929;
    }

    /* content */
    .stepper-content {
    flex: 1;
    }

    .stepper-title {
    font-weight: 600;
    color: #fcffc3;
    font-size: 12px;
    margin-bottom: 2px;
    }

    .stepper-status {
    font-size: 10px;
    display: inline-block;
    color: #f6ca7d; 
    padding: 1px 6px;
    border-radius: 10px;
    margin-top: 2px;
    }

    .stepper-time {
    font-size: 9px;
    color: #94a3b8;
    margin-top: 2px;
    padding-left: 6px;
    }

    /* buttons */
    .stepper-controls {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    }

    .stepper-button {
    padding: 4px 10px;
    font-size: 10px;
    border-radius: 5px;
    border: 1px solid #e2e8f0;
    background-color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    }

    .stepper-button svg {
    width: 12px;
    height: 12px;
    }

    .stepper-button-primary {
    background-color: #0f172a;
    color: white;
    border-color: #0f172a;
    }
`;

export default TrackCard;