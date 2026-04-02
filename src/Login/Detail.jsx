import React, { useState, useEffect } from "react";
import "./Detail.css";

const Detail = ({ user, addr }) => {

  const [addresses, setAddresses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [newAddr, setNewAddr] = useState({
    receiver: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    receiverphone: ""
  });

  const [deals, setDeals] = useState([]);
  const [showDealPopup, setShowDealPopup] = useState(false);

  const [preview, setPreview] = useState(null);

  const [newDeal, setNewDeal] = useState({
    itemName: "",
    mode: "rent",
    price: "",
    location: "",
    size: "M",
    photo: null
  });

  /* ---------------- LOAD DEALS ---------------- */

  useEffect(() => {
    const storedDeals = localStorage.getItem("userDeals");
    if (storedDeals) {
      setDeals(JSON.parse(storedDeals));
    }
  }, []);

  /* ---------------- ADDRESS STORAGE ---------------- */

  useEffect(() => {
    const saved = localStorage.getItem("userAddresses");

    if (saved) {
      setAddresses(JSON.parse(saved));
    } else {
      setAddresses([addr]);
    }
  }, [addr]);

  useEffect(() => {
    if (addresses.length > 0) {
      localStorage.setItem("userAddresses", JSON.stringify(addresses));
    }
  }, [addresses]);

  const handleChange = (e) => {
    setNewAddr({
      ...newAddr,
      [e.target.name]: e.target.value
    });
  };

  const addOrUpdateAddress = () => {

    if (editIndex !== null) {

      const updated = [...addresses];
      updated[editIndex] = newAddr;
      setAddresses(updated);

    } else {

      setAddresses([...addresses, newAddr]);

    }

    setNewAddr({
      receiver: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      receiverphone: ""
    });

    setEditIndex(null);
    setShowPopup(false);
  };

  const editAddress = (index) => {
    setNewAddr(addresses[index]);
    setEditIndex(index);
    setShowPopup(true);
  };

  const deleteAddress = (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
  };

  /* ---------------- DEAL HANDLERS ---------------- */

  const handleDealChange = (e) => {
    setNewDeal({
      ...newDeal,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoChange = (e) => {

    const file = e.target.files[0];

    if (file) {
      const previewURL = URL.createObjectURL(file);

      setPreview(previewURL);

      setNewDeal({
        ...newDeal,
        photo: previewURL
      });
    }

  };

  const addDeal = () => {

    const dealItem = {
      id: Date.now(),
      title: newDeal.itemName,
      cost: Number(newDeal.price),
      description: newDeal.mode,
      Location: newDeal.location,
      bg: newDeal.photo,
      corbox: "SIZE",
      size: newDeal.size,
      dealerName: user.name,
      dealerContact: user.phone
    };

    const updatedDeals = [dealItem, ...deals];

    setDeals(updatedDeals);

    localStorage.setItem("userDeals", JSON.stringify(updatedDeals));

    window.dispatchEvent(new Event("dealsUpdated"));

    setNewDeal({
      itemName: "",
      mode: "rent",
      price: "",
      location: "",
      size: "M",
      photo: null
    });

    setPreview(null);
    setShowDealPopup(false);
  };

  const deleteDeal = (index) => {

    const updated = deals.filter((_, i) => i !== index);

    setDeals(updated);

    localStorage.setItem("userDeals", JSON.stringify(updated));

    window.dispatchEvent(new Event("dealsUpdated"));
  };

  return (
    <div className="details-wrapper">

      {/* ---------------- CREDENTIALS ---------------- */}

      <details name="feature">
        <summary>Credentials</summary>
        <div className="content">
          <p>
            <span>Name:</span> {user.name} <br />
            <span>Email:</span> {user.email} <br />
            <span>Contact:</span> {user.phone} <br />
            <span>DOB:</span> {user.dob}
          </p>
        </div>
      </details>

      {/* ---------------- ADDRESSES ---------------- */}

      <details name="feature">
        <summary>Addresses</summary>

        <div className="content">

          {addresses.map((a, i) => (
            <div key={i} style={{marginBottom:"15px"}}>

              <p>
                <span>Address {String(i + 1).padStart(2,"0")}:</span> <br />
                {a.receiver}, <br />
                {a.address}, <br />
                {a.city}, {a.state} - {a.pincode} <br />
                Contact: {a.receiverphone}
              </p>

              <div style={{display:"flex", gap:"10px"}}>

                <button className="btn" onClick={()=>editAddress(i)}>
                  Edit
                </button>

                <button className="btn" onClick={()=>deleteAddress(i)}>
                  Delete
                </button>

              </div>

            </div>
          ))}

          <div style={{display:"flex", justifyContent:"flex-end"}}>
            <button className="btn" onClick={()=>setShowPopup(true)}>
              Add Address
            </button>
          </div>

        </div>
      </details>

      {/* ---------------- DEALER STATS ---------------- */}

      <details name="feature">
        <summary>Dealer Stats</summary>

        <div className="content">

          <p>
            <span>Total Deals Made:</span> {deals.length}
          </p>

          {deals.map((d, i) => (
            <div key={i} style={{marginBottom:"20px"}}>

              <p>
                <span>{d.title}</span> <br />
                Mode: {d.description} <br />
                Price: ₹{d.cost} <br />
                Location: {d.Location}
              </p>

              {d.bg && (
                <img
                  src={d.bg}
                  alt="deal"
                  style={{
                    width:"120px",
                    borderRadius:"8px",
                    marginBottom:"10px"
                  }}
                />
              )}

              <button className="btn" onClick={()=>deleteDeal(i)}>
                Delete Deal
              </button>

            </div>
          ))}

          <div style={{display:"flex", justifyContent:"flex-end"}}>
            <button className="btn" onClick={()=>setShowDealPopup(true)}>
              Make a Deal
            </button>
          </div>

        </div>
      </details>

      {/* ---------------- STATS ---------------- */}

      <details name="feature">
        <summary>Stats</summary>
        <div className="content">
          <p>
            <span>Orders Placed:</span> {user.orders} <br />
            <span>Member Since:</span> {user.memberSince} <br />
          </p>
        </div>
      </details>

      {/* ---------------- RETURN POLICY ---------------- */}

      <details name="feature">
        <summary>Return Policy</summary>
        <div className="content">
          <p>
            We want you to love what you wear. If you're not completely satisfied, you can request a return within 14 days of delivery.<br /><br />
            Items must be unused, unwashed, and in their original condition with tags attached.<br /><br />
            Once we receive and inspect the item, refunds will be processed to your original payment method.
          </p>
        </div>
      </details>

      {/* ---------------- FAQ ---------------- */}

      <details name="feature">
        <summary>FAQs</summary>
        <div className="content">
          <p>
            <span>1. What size should I choose?</span> <br />
            Please refer to our Size Chart available on each product page.
            <br /><br />

            <span>2. How long does delivery take?</span> <br />
            Orders are usually delivered within 3–7 business days.
            <br /><br />

            <span>3. Can I return or exchange an item?</span> <br />
            Yes, within 7 days of delivery.
            <br /><br />

            <span>4. How can I track my order?</span> <br />
            A tracking link will be sent via email or SMS.
            <br /><br />

            <span>5. What payment methods do you accept?</span> <br />
            UPI, Cards, Net Banking, and COD.
          </p>
        </div>
      </details>

      {/* ---------------- CONTACT ---------------- */}

      <details name="feature">
        <summary>Contact Us</summary>
        <div className="content">
          <p>Thoda busy chlla h sab!</p>
        </div>
      </details>

      {/* ---------------- ADDRESS POPUP ---------------- */}

      {showPopup && (

        <div className="address-popup">

          <div className="popup-card">

            <h3>{editIndex !== null ? "Edit Address" : "Add New Address"}</h3>

            <input name="receiver" placeholder="Receiver Name" value={newAddr.receiver} onChange={handleChange}/>
            <input name="receiverphone" placeholder="Phone Number" value={newAddr.receiverphone} onChange={handleChange}/>
            <input name="address" placeholder="Street Address" value={newAddr.address} onChange={handleChange}/>
            <input name="city" placeholder="City" value={newAddr.city} onChange={handleChange}/>
            <input name="state" placeholder="State" value={newAddr.state} onChange={handleChange}/>
            <input name="pincode" placeholder="Pincode" value={newAddr.pincode} onChange={handleChange}/>

            <div style={{display:"flex", gap:"10px", marginTop:"10px"}}>

              <button className="btn" onClick={addOrUpdateAddress}>
                Save
              </button>

              <button className="btn" onClick={()=>setShowPopup(false)}>
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ---------------- DEAL POPUP ---------------- */}

      {showDealPopup && (

        <div className="address-popup">

          <div className="popup-card">

            <h3>Make a Deal</h3>

            <input name="itemName" placeholder="Item Name" value={newDeal.itemName} onChange={handleDealChange}/>

            <select name="mode" value={newDeal.mode} onChange={handleDealChange}>
              <option value="Rent">Rent</option>
              <option value="Sell">Sell</option>
              <option value="Barter">Barter</option>
            </select>

            {newDeal.mode !== "Barter" && (
              <input
                name="price"
                placeholder={newDeal.mode === "Rent" ? "Price/week" : "Price"}
                value={newDeal.price}
                onChange={handleDealChange}
              />
            )}

            <select name="size" value={newDeal.size} onChange={handleDealChange}>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>

            <select name="location" value={newDeal.location} onChange={handleDealChange}>
              <option value="">Select Location</option>
              <option>Delhi</option>
              <option>Mumbai</option>
              <option>Bangalore</option>
              <option>Lucknow</option>
              <option>Kerala</option>
              <option>Kolkata</option>
            </select>

            <input type="file" accept="image/*" onChange={handlePhotoChange}/>

            {preview && (
              <img src={preview} alt="preview" style={{width:"150px",marginTop:"10px",borderRadius:"8px"}}/>
            )}

            <div style={{display:"flex", gap:"10px", marginTop:"10px"}}>

              <button className="btn" onClick={addDeal}>
                Post Deal
              </button>

              <button className="btn" onClick={()=>setShowDealPopup(false)}>
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Detail;