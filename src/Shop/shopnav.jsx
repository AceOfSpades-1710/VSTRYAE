import React, { useState } from "react";
import "./shopnav.css";
import CustomCheckbox from "./checkboxes";

const ShopNav = ({ filters, setFilters }) => {
  const [showFilters, setShowFilters] = useState(false);

  /* ---------------- FILTER COUNT ---------------- */
  const activeFilterCount =
    filters.size.length +
    filters.huntMode.length +
    filters.state.length +
    (filters.search ? 1 : 0) +
    (filters.price !== Infinity ? 1 : 0);

  const handleSearch = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const toggleValue = (category, value) => {
    setFilters((prev) => {
      const exists = prev[category].includes(value);

      return {
        ...prev,
        [category]: exists
          ? prev[category].filter((v) => v !== value)
          : [...prev[category], value],
      };
    });
  };

  /* ---------------- CLEAR FILTERS ---------------- */
  const clearFilters = () => {
    setFilters({
      search: "",
      size: [],
      price: Infinity,
      huntMode: [],
      state: [],
    });
  };

  return (
    <nav className="shopnav">
      <div className="shopnav-left">
        <h1>SHOP</h1>
      </div>

      {/* SEARCH */}
      <div className="shopnav-center">
        <div className="wave-group">
          <input
            required
            type="text"
            className="input"
            value={filters.search}
            onChange={handleSearch}
          />

          <span className="bar"></span>

          <label className="label">
            {"Search".split("").map((char, i) => (
              <span
                key={i}
                className="label-char"
                style={{ "--index": i }}
              >
                {char}
              </span>
            ))}
          </label>
        </div>
      </div>

      {/* FILTER BUTTON */}
      <div className="shopnav-right">
        <button
          className="btn2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span className="spn2">
            Filters{activeFilterCount > 0 && ` (${activeFilterCount})`}
          </span>
        </button>

        {showFilters && (
          <div className="filter-dropdown">

            {/* CLEAR BUTTON */}
            <div className="filter-section">
              <button className="btn2" onClick={clearFilters}>
                <span className="spn2">Clear All</span>
              </button>
            </div>

            {/* SIZE */}
            <div className="filter-section">
              <h4>Size</h4>
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <CustomCheckbox
                  key={size}
                  id={`size-${size}`}
                  label={size}
                  checked={filters.size.includes(size)}
                  onChange={() => toggleValue("size", size)}
                />
              ))}
            </div>

            {/* HUNT MODE */}
            <div className="filter-section">
              <h4>Hunt Mode</h4>
              {["Sell", "Rent", "Barter"].map((mode) => (
                <CustomCheckbox
                  key={mode}
                  id={`mode-${mode}`}
                  label={mode}
                  checked={filters.huntMode.includes(mode)}
                  onChange={() => toggleValue("huntMode", mode)}
                />
              ))}
            </div>

            {/* LOCATION */}
            <div className="filter-section">
              <h4>Location</h4>
              {[
                "Delhi",
                "Mumbai",
                "Bangalore",
                "Lucknow",
                "Kerala",
                "Kolkata",
              ].map((state) => (
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
              <h4>
                Price: ₹
                {filters.price === Infinity ? "Any" : filters.price}
              </h4>

              <input
                type="range"
                min="0"
                max="20000"
                value={filters.price === Infinity ? 20000 : filters.price}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    price: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default ShopNav;
