import React from "react";
import "./checkboxes.css"; 
const Checkboxes = ({ id, label, onChange, checked }) => {
  return (
    <div className="checkbox-wrapper">
      {/* REAL CHECKBOX (hidden but functional) */}
      <input
        type="checkbox"
        id={id}
        className="check"
        onChange={onChange}
        checked={checked}
        readOnly={checked !== undefined}
      />

      {/* LABEL + SVG (animation target) */}
      <label htmlFor={id} className="label">
        <svg width="45" height="45" viewBox="0 0 95 95">
          {/* box */}
          <rect
            x="30"
            y="28"
            width="40"
            height="40"
            stroke="black"
            fill="#3f3f3f"
          />

          {/* scribble path */}
          <g transform="translate(0,-952.36222)">
            <path
              className="path1"
              d="m 56,963 c -102,122 6,9 7,9
                 17,-5 -66,69 -38,52
                 122,-77 -7,14 18,4
                 29,-11 45,-43 23,-4"
              stroke="white"
              strokeWidth="3"
              fill="none"
            />
          </g>
        </svg>

        <span>{label}</span>
      </label>
    </div>
  );
};

export default Checkboxes;