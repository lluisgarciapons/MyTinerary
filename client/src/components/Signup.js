import React, { Component } from "react";
import Footer from "./Footer.js";
import "../style/App.css";
import Axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirm: "",
      isError: false,
      error: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.state.username || !this.state.email || !this.state.password) {
      console.log("not filled");
      this.setState({
        isError: true,
        error: "All fields are required."
      });
      return;
    } else if (this.state.password !== this.state.confirm) {
      console.log("not match");
      this.setState({
        isError: true,
        error: "Passwords must be the same."
      });
      return;
    } else {
      this.setState({
        isError: false,
        error: "no errors."
      });

      Axios.post("/users", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          this.setState({
            isError: true,
            error: err.response.data
          });
          console.log(err.response);
        });
    }
  }

  errorMessage() {
    // if (!this.state.username || !this.state.email || !this.state.password) {
    //   return <div className="alert">All fields are required.</div>;
    // } else if (this.state.password !== this.state.confirm) {
    //   return <div className="alert">Passwords must be the same.</div>;
    // } else if (this.state.password !== this.state.confirm) {
    return <div className="alert">{this.state.error}</div>;
    // } else {
    //   return null;
    // }
  }

  render() {
    return (
      <div id="page-wrap">
        <h1>Signup Page</h1>
        {this.state.isError ? this.errorMessage() : null}
        <form onSubmit={this.onSubmit} className="row">
          <div className="col s8 offset-s2">
            <div className="input-field col s12">
              <input
                name="username"
                id="username-input"
                type="text"
                className="validate"
                value={this.state.username}
                onChange={this.onChange}
              />
              <label htmlFor="username-input">Username</label>
            </div>

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

            <div className="input-field col s12">
              <input
                name="confirm"
                id="confirm-input"
                type="password"
                className="validate"
                value={this.state.confirm}
                onChange={this.onChange}
              />
              <label htmlFor="confirm-input">Confirm Password</label>
            </div>
          </div>
          <div className="form-group">
            <button className="btn">Sign Up</button>
          </div>
        </form>
        <Footer />
      </div>
    );
  }
}

export default Signup;
