import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-list">
          <div className="footer-address">
            <img src="/logo.svg" alt="true" />
            <p>400 University Drive Suite 200 Coral Gables,</p>
            <span>FL 33134 USA</span>
          </div>
          <div className="footer-item">
            <h2>Links</h2>
            <ul className="footer-menu-list">
              <li className="footer-menu-item">
                <Link to="" className="footer-menu-link">
                  Home
                </Link>
              </li>
              <li className="footer-menu-item">
                <Link to="" className="footer-menu-link">
                  Shop
                </Link>
              </li>
              <li className="footer-menu-item">
                <Link to="" className="footer-menu-link">
                  Blog
                </Link>
              </li>
              <li className="footer-menu-item">
                <Link to="" className="footer-menu-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-item">
            <h2>Help</h2>
            <ul className="footer-menu-list">
              <li className="footer-menu-item">
                <Link to="" className="footer-menu-link">
                  Payment Options
                </Link>
              </li>
              <li className="footer-menu-item">
                <Link to="" className="footer-menu-link">
                  Returns
                </Link>
              </li>
              <li className="footer-menu-item">
                <Link to="" className="footer-menu-link">
                  Privacy Policies
                </Link>
              </li>
              <li className="footer-menu-item">
                <Link to="" className="footer-menu-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-item">
            <h2>Newsletter</h2>
            <form className="newsletter">
              <input
                type="text"
                className="newsletter__input"
                placeholder="Enter Your Email Address"
              />
              <button className="newsletter__btn">SUBSCRIBE</button>
            </form>
          </div>
        </div>
        <p className="copyright">2023 furino. All rights reverved</p>
      </div>
    </footer>
  );
};

export default Footer;
