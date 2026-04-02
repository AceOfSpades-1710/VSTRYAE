import React, { useState, useEffect } from "react";
import "./ordnav.css";
import CustomCheckbox from "./checkboxes";

const OrdNav = ({ filters, setFilters }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState(filters.search);

  /* =============================
     DEBOUNCED SEARCH
  ============================== */
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => ({
        ...prev,
        search: searchInput,
      }));
    }, 400); // debounce delay

    return () => clearTimeout(timer);
  }, [searchInput, setFilters]);

  /* =============================
     FILTER COUNT
  ============================== */
  const activeFilterCount =
    filters.size.length +
    filters.orderType.length +
    filters.state.length +
    (filters.price !== 20000 ? 1 : 0) +
    (filters.search ? 1 : 0);

  const toggleValue = (category, value) => {
    setFilters(prev => {
      const exists = prev[category].includes(value);

      return {
        ...prev,
        [category]: exists
          ? prev[category].filter(v => v !== value)
          : [...prev[category], value],
      };
    });
  };

  const clearLocal = () => {
    setFilters({
      size: [],
      orderType: [],
      state: [],
      price: 20000,
      search: "",
    });
    setSearchInput("");
  };

  return (
    <nav className="ordnav">
      <div className="ordnav-left">
        <h1>ORDERS</h1>
      </div>

      {/* SEARCH */}
      <div className="ordnav-center">
        <div className="wave-group">
          <input
            required
            type="text"
            className="input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <span className="bar"></span>

          <label className="label">
            {"Search".split("").map((char, i) => (
              <span key={i} className="label-char" style={{ "--index": i }}>
                {char}
              </span>
            ))}
          </label>
        </div>
      </div>

      {/* FILTER BUTTON */}
      <div className="ordnav-right">
        <button
          className="btn2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span className="spn2">
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </span>
        </button>

        {showFilters && (
          <div className="filter-dropdown">

            <div className="filter-section">
              <button className="btn2" onClick={clearLocal}>
                <span className="spn2">Clear All</span>
              </button>
            </div>

            {/* SIZE */}
            <div className="filter-section">
              <h4>Size</h4>
              {["S","M","L","XL","XXL"].map(size => (
                <CustomCheckbox
                  key={size}
                  id={`size-${size}`}
                  label={size}
                  checked={filters.size.includes(size)}
                  onChange={() => toggleValue("size", size)}
                />
              ))}
            </div>

            {/* ORDER TYPE */}
            <div className="filter-section">
              <h4>Order Type</h4>
              {["Placed","Shipped","Delivered"].map(type => (
                <CustomCheckbox
                  key={type}
                  id={`type-${type}`}
                  label={type}
                  checked={filters.orderType.includes(type)}
                  onChange={() => toggleValue("orderType", type)}
                />
              ))}
            </div>

            {/* LOCATION */}
            <div className="filter-section">
              <h4>Location</h4>
              {["Delhi","Mumbai","Bangalore","Lucknow","Kerala","Kolkata"]
                .map(state => (
                <CustomCheckbox
                  key={state}
                  id={`state-${state}`}
                  label={state}
                  checked={filters.state.includes(state)}
                  onChange={() => toggleValue("state", state)}
                />
              ))}
            </div>

            {/* PRICE */}
            <div className="filter-section">
              <h4>Price: ₹{filters.price}</h4>

              <input
                type="range"
                min="0"
                max="20000"
                value={filters.price}
                onChange={(e) =>
                  setFilters(prev => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
              />
            </div>

          </div>
        )}
      </div>
    </nav>
  );
};

export default OrdNav;