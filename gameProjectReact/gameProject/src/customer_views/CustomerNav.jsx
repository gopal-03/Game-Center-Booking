import React from 'react';
import { useLocation } from 'react-router-dom';

const CustomerNav = () => {
  const location = useLocation();
  const customerFound = sessionStorage.getItem("customerFound");

  const isCustomerPage = location.pathname.startsWith('/customer/homepage');
  if (!isCustomerPage) return null;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
        <div className="container">
          <a className="navbar-brand" href="/">
            <h1 className="brand-title">Book My Game</h1>
          </a>
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
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#game-centers">
                  Game Centers
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#e-sports">
                  E-Sports
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about-us">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#careers">
                  Careers
                </a>
              </li>
              {customerFound ? (
                <li className="nav-item">
                  <a className="nav-link" href="">
                    {sessionStorage.getItem("customerUsername")}
                  </a>
                </li>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" href="/customer/register/">
                    Sign in
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CustomerNav;