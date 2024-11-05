import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "src/styles/header.css"; // Import the custom CSS
import Hamburger from "../hamburger/hamburger.client.tsx";

const Header: React.FC = () => {
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky-top bg-dark text-white header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Hamburger items={menuItems} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
