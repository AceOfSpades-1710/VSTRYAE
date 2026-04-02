import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

import vercel from "./assets/icons/Vercel.png";
import react from "./assets/icons/React.png";
import node from "./assets/icons/Nodejs.png";
import './footer.css'

const Footer = () => {
  return (
    <>
      <footer className="footer" id="links">
        {/* Column 1: Social Media */}
        <div className="footer-column">
          <p className="footer-item">
            <span>Socials</span>
          </p>

          {/* Column 1: Social Media */}
        <div className="footer-column">
          <div className="footer-socials">
            <a
              href="https://github.com/AceOfSpades-1710"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/in/jsid1704"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>

            <a
              href="mailto:portfolioSJ@gmail.com"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        </div>

        {/* Column 2: Stack Info */}
        <div className="footer-column">
          <p className="footer-item">
            <span>More Info</span>
          </p>

          <p className="footer-item">
            Privacy Policy
          </p>

          <p className="footer-item">
            T&C
          </p>

        </div>

        {/* Column 3: Spotify */}
        <div className="footer-column">
          <p className="footer-item">
            <span>Payement Modes</span>
          </p>

          <p className="footer-item">
            COD
          </p>

          <p className="footer-item">
            UPI
          </p>
          
        </div>

        <div className="footer-column">
          <p className="footer-item">
            <span>SiteMap</span>
          </p>

          <p className="footer-item">
            About
          </p>

          <p className="footer-item">
            Servicing States
          </p>
          
        </div>

        <div className="footer-column">
          <p className="footer-item">
            <span>Delivery Partners</span>
          </p>

          <p className="footer-item">
            Delhivery
          </p>

          <p className="footer-item">
            DTDC
          </p>
          
        </div>
      </footer>
    </>
  );
};

export default Footer;