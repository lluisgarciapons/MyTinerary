import React, { Component } from "react";
import { connect } from "react-redux";
import addItineraries from "../store/actions/addItinerariesAction";
import addActivities from "../store/actions/addActivitiesAction";
import M from "materialize-css";
import ItinerariesList from "./ItinerariesList";
import Footer from "./Footer";

export class Itineraries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itineraries: [],
      activities: []
    };
  }
  componentDidMount() {
    this.props.addItineraries(this.props.match.params.name);
    this.props.addActivities(this.props.match.params.name);

    var elems = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elems, { inDuration: 300 });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activities !== this.props.activities) {
      this.setState({
        itineraries: nextProps.itineraries,
        activities: nextProps.activities
      });
    }
  }
  render() {
    console.log(this.props);
    console.log(this.state.itineraries);
    const itineraries = this.state.itineraries;
    const activities = this.state.activities;
    return (
      <div id="page-wrap">
        <div className="itinerary-city">
          <h1>{this.props.match.params.name}</h1>
        </div>

        {/* <div id="all-cities" className="all-cities">
          <ItinerariesList itineraries={itineraries} />
        </div> */}

        <ul className="collapsible">
          <ItinerariesList itineraries={itineraries} activities={activities} />
        </ul>
        <Footer goBack={"Cities"} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    itineraries: state.itineraries,
    activities: state.activities
  };
};

export default connect(
  mapStateToProps,
  { addItineraries, addActivities }
)(Itineraries);
