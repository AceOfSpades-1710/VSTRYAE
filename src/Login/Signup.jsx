import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/login-bg.jpg";
import FollowCursor from "../crsr";
import Loader from "../loader";
import Nav from "../nav";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError("");

      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");

      navigate("/account");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <FollowCursor />
      <Loader />
      <Nav />

      <div
        className="login-container"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className="login-card">
          <h2>साइन अप</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button className="login-btn" onClick={handleSignup}>
            SIGN UP
          </button>

          {error && <p style={{ color: "#ff9999", marginTop: "10px" }}>{error}</p>}

          <div className="links">
            <span>Already have an account?</span>
            <span onClick={() => navigate("/login")}>Login</span>
          </div>

          <p className="divider">--------OR--------</p>

          <div className="socials">
            <button className="or">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="google"
              />
            </button>
          </div>
        </div>

        <style>{`
        .login-container{
          height:100vh;
          width:100%;
          background-size:cover;
          background-position:center;
          display:flex;
          justify-content:center;
          align-items:center;
          font-family:Arial, Helvetica, sans-serif;
        }

        .login-card{
          width:340px;
          padding:50px;
          backdrop-filter: blur(10px);
          background: rgba(29, 29, 29, 0.272);
          border-radius: 2rem;
          border: none;
          -webkit-backdrop-filter: blur(10px);
          text-align:center;
          color:white;
        }

        .login-card h2{
          margin-bottom:15px;
          font-size:3rem;
          font-weight:500;
          color: #fcffc3;
          font-family: 'Satoshi', sans-serif;
        }

        .login-card input{
          width:100%;
          padding:12px;
          margin:10px 0;
          border:none;
          border-radius:25px;
          background: rgba(255,255,255,0.25);
          outline:none;
          font-family: "Google Sans Code", monospace;
          color:white;
        }

        .login-card input::placeholder{
          color:#eee;
        }

        .login-btn{
          width:107%;
          padding:12px;
          margin-top:15px;
          border:none;
          border-radius:25px;
          background: #000000;
          font-family: "Google Sans Code", monospace;
          color:#fcffc3;
          margin-bottom: 1rem;
          font-weight:600;
        }

        .login-btn:hover{
          background: #fcffc3;
          color:black;
        }

        .links{
          display:flex;
          justify-content:space-between;
          font-size:12px;
          margin-top:0px;
          opacity:0.9;
        }

        .divider{
          font-size:12px;
          margin:20px 0 10px;
          opacity:0.8;
          margin-bottom:0.5rem;
        }

        .socials{
          display:flex;
          justify-content:center;
          gap:20px;
        }

        .socials img{
          width:18px;
          height:18px;
          cursor:pointer;
        }

        .or{
          width:25%;
          padding:12px;
          margin-top:15px;
          border:none;
          border-radius:9999px;
          background: #000000;
          font-family: "Google Sans Code", monospace;
          color:#fcffc3;
          margin-bottom: 1rem;
          font-weight:600;
        }
      `}</style>
      </div>
    </>
  );
};

export default Signup;