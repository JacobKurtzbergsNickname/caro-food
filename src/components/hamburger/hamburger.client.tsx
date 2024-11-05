import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface HamburgerProps {
  items: { label: string; href: string }[];
}

const Hamburger: React.FC<HamburgerProps> = ({ items }) => {
  return (
    <>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {items.map((item, index) => (
            <li className="nav-item" key={index}>
              <a className="nav-link" href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Hamburger;
