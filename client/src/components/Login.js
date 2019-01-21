import React, { Component } from "react";
import Footer from "./Footer.js";
// import Axios from "axios";
import { connect } from "react-redux";
import loginAction from "../store/actions/loginAction";
import arrow from "../circled-right-2.png";
import { NavLink } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isError: false,
      error: "",
      isLoggedIn: false,
      message: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      this.setState({
        isError: true,
        error: "All fields are required."
      });
    } else {
      this.setState({
        isError: false,
        error: ""
      });

      let body = {
        username: this.state.email,
        password: this.state.password
      };

      this.props.loginAction(body);

      // Axios.post("/login", {
      //   username: this.state.email,
      //   password: this.state.password
      // })
      //   .then(res => {
      //     console.log(res.data);
      //     this.setState({
      //       isLoggedIn: true
      //     });
      //   })
      //   .catch(err => {
      //     this.setState({
      //       isError: true,
      //       error: err.response.data
      //     });
      //     console.log(err.response);
      //   });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.message !== nextProps.message) {
      this.setState({
        message: nextProps.message
      });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  errorMessage() {
    if (!this.state.isError) {
      return <div className="alert">{this.state.message}</div>;
    } else {
      return <div className="alert">{this.state.error}</div>;
    }
  }

  loginMessage() {
    return <div className="success">{this.state.message}</div>;
  }

  isLoggedIn() {
    return (
      <div>
        <h2>Welcome back</h2>
        <h4>{this.props.userName}</h4>
        <br />
        <NavLink to="/cities">
          <img src={arrow} alt="arrow-right" className="arrow-right" />
        </NavLink>
      </div>
    );
  }

  render() {
    return (
      <div id="page-wrap">
        <h1>Login Page</h1>
        {this.props.isAuthenticated ? this.loginMessage() : null}
        {this.props.error || this.state.isError ? this.errorMessage() : null}
        {this.props.isAuthenticated ? (
          this.isLoggedIn()
        ) : (
          <form onSubmit={this.onSubmit} className="row">
            <div className="col s8 offset-s2">
              <div className="input-field col s12">
                <input
                  name="email"
                  id="email-input"
                  type="email"
                  className="validate"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <label htmlFor="email-input">Email</label>
              </div>

              <div className="input-field col s12">
                <input
                  name="password"
                  id="password-input"
                  type="password"
                  className="validate"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <label htmlFor="password-input">Password</label>
              </div>
            </div>
            <div className="form-group">
              <button className="btn">Log In</button>
            </div>
          </form>
        )}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
    error: state.error,
    message: state.message,
    userName: state.userName
  };
};

export default connect(
  mapStateToProps,
  { loginAction }
)(Login);
