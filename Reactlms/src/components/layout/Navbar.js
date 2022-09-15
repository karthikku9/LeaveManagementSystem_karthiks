import React from "react";
import { Link, NavLink } from "react-router-dom";
//import XIcon from '@primer/octicons-react';
import {HubotIcon} from "@primer/octicons-react";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" href="/users/UserLev">
            <HubotIcon size={24} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/users/UserLev">
                Leaves
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">
                Admin Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/about">
                About
              </NavLink>
            </li>
          </ul>
        </div>
        <Link className="btn btn-outline-light" exact to="/Login">
                Login
              </Link>
        <Link className="btn btn-outline-light" to="/users/add">SignUp</Link>
      </div>
    </nav>
  );
};

export default Navbar;
