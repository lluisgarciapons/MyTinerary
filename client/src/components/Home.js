import React, { Component } from "react";
import myLogo from "../MYtineraryLogo.png";
import arrow from "../circled-right-2.png";
import { NavLink } from "react-router-dom";
import "../style/App.css";

class Home extends Component {
  render() {
    console.log("Welcome to MyTinerary!");
    return (
      <div id="page-wrap">
        <img src={myLogo} alt="MyTineraryLogo" className="logo" />
        <h3>
          Find your perfect trip, designed by insiders who know and love their
          cities.
        </h3>
        <h2>Start Browsing</h2>
        <NavLink to="/cities">
          <img src={arrow} alt="arrow-right" className="arrow-right" />
        </NavLink>
      </div>
    );
  }
}

export default Home;
