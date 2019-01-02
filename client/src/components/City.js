import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class City extends Component {
  render() {
    // console.log(this.props);
    const route = `/itinerary/${this.props.city.name}`;
    return (
      <NavLink to={route}>
        <div className="city">
          <span>{this.props.city.name}, </span>
          <small>{this.props.city.country}</small>
        </div>
      </NavLink>

      // <option value={this.props.city.name}>{this.props.city.name}</option>
    );
  }
}

export default City;
