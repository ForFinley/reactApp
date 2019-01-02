import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "../common/dropdown";
import "./Navbar.scss";

const Navbar = ({ isLoggedIn, logout, profile }) => {
  const dropdownItems = [
    { type: "router-link", to: "/profile", display: "Profile" },
    { type: "router-link", to: "/settings", display: "Settings" },
    { type: "click", display: "Logout", onClick: logout }
  ];

  return (
    <div className="Navbar">
      <ul className="Navbar__links">
        <li className="Navbar__links-link">
          <Link to="/">Public</Link>
        </li>
        {isLoggedIn && (
          <li className="Navbar__links-link">
            <Link to="/home">Home</Link>
          </li>
        )}
        {!isLoggedIn && (
          <li className="Navbar__links-link">
            <Link to="/login">Login</Link>
          </li>
        )}
        {!isLoggedIn && (
          <li className="Navbar__links-link">
            <Link to="/signup">Sign Up</Link>
          </li>
        )}
      </ul>

      {isLoggedIn &&
        profile.email && (
          <div className="Navbar__account-dropdown">
            <Dropdown
              items={dropdownItems}
              renderElement={() => <div>Account</div>}
            />
          </div>
        )}

      {isLoggedIn &&
        profile.email && (
          <div className="Navbar__greeting">Hello, {profile.email}!</div>
        )}
    </div>
  );
};

export default Navbar;
