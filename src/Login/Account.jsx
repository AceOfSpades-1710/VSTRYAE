import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import pfp from '../assets/pfp.jpg';
import FollowCursor from "../crsr";
import Loader from "../loader";
import Nav from "../nav";
import Footer from "../footer";
import Detail from "./Detail";

import "./Account.css";

const Account = () => {

  const navigate = useNavigate();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const ropeRotate = useTransform(x, [-200, 200], [-6, 6]);
  const strapHeight = useTransform(y, [0, 250], [120, 200]);

  const [user, setUser] = useState({
    name: "Guest",
    email: "guest@demo.com",
    phone: "-",
    dob: "-",
    orders: 0,
    memberSince: "-"
  });

  const [addr, setAddr] = useState({
    receiver: "Not set",
    address: "Not set",
    city: "-",
    state: "-",
    pincode: "-",
    receiverphone: "-"
  });

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("authUser") || "null");
    if (authUser) {
      setUser((prev) => ({ ...prev, ...authUser, orders: prev.orders }));
    }

    const savedAddresses = JSON.parse(localStorage.getItem("userAddresses") || "[]");
    if (savedAddresses.length > 0) {
      setAddr(savedAddresses[0]);
    }

    const idle = animate(x, [-12, 12], {
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut"
    });

    return () => idle.stop();
  }, []);

  const springBack = () => {
    animate(x, 0, { type: "spring", stiffness: 160, damping: 12 });
    animate(y, 0, { type: "spring", stiffness: 160, damping: 12 });
  };

  return (
    <>
      <FollowCursor />
      <Loader />
      <Nav />

      <div className="account-container">

        {/* LEFT PANEL */}

        <div className="account-left">

          <h2 className="heading">Wassup, <br /> <span>{user.name}</span></h2>

          <Detail user={user} addr={addr} />

        </div>

        {/* RIGHT PANEL */}

        <div className="account-right">

          {/* LANYARD */}

          <motion.div
            className="lanyard"
            style={{
              height: strapHeight,
              rotate: ropeRotate
            }}
          />

          {/* METAL RING */}

          <motion.div
            className="ring"
            style={{ x }}
          />

          {/* CLIP + CARD */}

          <motion.div
            className="badge-group"
            drag
            dragElastic={0.4}
            style={{ x, y, rotate }}
            onDragEnd={springBack}
          >

            <div className="clip"></div>

            <div className="id-card">

              <div className="hole"></div>

              <img src={pfp} alt="profile" className="avatar"/>

              <h3>{user.name}</h3>

              <p className="role"> {user.email} <br />
                {user.phone} <br />
                

              </p>

              <div className="meta">
                <span>Orders: {user.orders}</span>
                <span>Member since {user.memberSince}</span>
              </div>

            </div>

          </motion.div>

        </div>

      </div>
      <Footer />
    </>
  );
};

export default Account;