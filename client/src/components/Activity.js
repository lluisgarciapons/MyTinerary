import React, { Component } from "react";

export class Activity extends Component {
  render() {
    const activity = this.props.activity;
    return (
      <div>
        <img
          className="materialboxed"
          alt={activity.alt}
          src={activity.image}
        />
      </div>
    );
  }
}

export default Activity;
