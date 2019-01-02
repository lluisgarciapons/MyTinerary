import React, { Component } from "react";
import Home from "../components/Home.js";
import Cities from "../components/Cities.js";
import Login from "../components/Login.js";
import Signup from "../components/Signup.js";
import Itineraries from "../components/Itineraries";
import { Route, Switch } from "react-router-dom";

class Routing extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/cities" component={Cities} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/itinerary/:name" component={Itineraries} />
      </Switch>
    );
  }
}

export default Routing;
