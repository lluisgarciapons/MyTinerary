import React, { Component } from "react";
import burger from "../burgerMenuUbiqumLogo.png";
import "../style/App.css";
import { bubble as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../store/actions/loginAction";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

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
        {!this.props.isAuthenticated ? (
          <NavLink
            className="link"
            to="/login"
            onClick={() => {
              this.setState({ menuOpen: false });
            }}
          >
            Log in
          </NavLink>
        ) : null}
        {!this.props.isAuthenticated ? (
          <NavLink
            className="link"
            to="/signup"
            onClick={() => {
              this.setState({ menuOpen: false });
            }}
          >
            Sign up
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            onClick={() => this.props.logOut()}
            className="link"
          >
            Log Out
          </NavLink>
        )}
      </Menu>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut())
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
