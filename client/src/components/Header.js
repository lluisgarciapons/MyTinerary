import React, { Component } from "react";
import burger from "../burgerMenuUbiqumLogo.png";
import "../style/App.css";
import { bubble as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";

class Header extends Component {
  state = {
    menuOpen: false
  };

  render() {
    return (
      <Menu
        isOpen={this.state.menuOpen}
        width={180}
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
        customBurgerIcon={
          <img className="burgerIcon" src={burger} alt="UbiqumBurger" />
        }
      >
        <NavLink className="link" to="/login">
          Log in
        </NavLink>
        <NavLink className="link" to="/signup">
          Sign up
        </NavLink>
      </Menu>
    );
  }
}

export default Header;
