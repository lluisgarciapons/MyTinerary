import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./routing/Router.js";
import Header from "./components/Header";
import axios from "axios";
import { connect } from "react-redux";
import { loginSuccessful, logOut } from "./store/actions/loginAction";
import "./style/materialize.css";
import "./style/App.css";

class App extends Component {
  async componentWillMount() {
    await axios
      .get("/v1", {
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      })
      .then(res => {
        if (res.data.success) {
          this.props.loginSuccessful();
          console.log(
            `Logged in as ${localStorage.getItem("reduxPersist:userName")}`
          );
        } else {
          this.props.logOut();
          console.log("NOT logged In");
        }
      });
  }

  render() {
    return (
      <Router>
        <div id="outer-container" className="App">
          <Header />
          <Routing />
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginSuccessful: () =>
      dispatch(
        loginSuccessful({
          message: "Still logged in",
          userEmail: localStorage.getItem("reduxPersist:userEmail"),
          userName: localStorage.getItem("reduxPersist:userName")
        })
      ),
    logOut: () => dispatch(logOut())
  };
};

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.isAuthenticated,
//     error: state.error,
//     message: state.message
//   };
// };

export default connect(
  // mapStateToProps,
  null,
  mapDispatchToProps
)(App);
