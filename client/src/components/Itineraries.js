import React, { Component } from "react";
// import { Redirect } from "react-router";
import { connect } from "react-redux";
import addItineraries from "../store/actions/addItinerariesAction";
import addActivities from "../store/actions/addActivitiesAction";
import addComments from "../store/actions/addCommentsAction";
import postComment, { changeToast } from "../store/actions/postCommentAction";
import deleteComment from "../store/actions/deleteCommentAction";
import M from "materialize-css";
import ItinerariesList from "./ItinerariesList";
import Footer from "./Footer";

export class Itineraries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exist: false,
      loaded: false,
      itineraries: [],
      activities: [],
      comments: []
    };
  }
  async componentWillMount() {
    await this.props.addItineraries(this.props.match.params.name);
    await this.props.addActivities(this.props.match.params.name);
    await this.props.addComments(this.props.match.params.name); //this is the latest check
  }

  componentDidUpdate() {
    var elems = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elems, { inDuration: 300 });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.comments !== this.props.comments) {
      //always check the latest check you do
      let comments = Array.from(nextProps.comments);
      function compare(a, b) {
        if (a.date < b.date) return 1;
        if (a.date > b.date) return -1;
        return 0;
      }
      comments.sort(compare);
      // comments.forEach(comment => console.log(comment));

      const cityNames = nextProps.cities.map(city => city.name);
      let exist = false;
      if (cityNames.includes(this.props.match.params.name)) {
        exist = true;
      } else {
        exist = false;
      }
      this.setState({
        itineraries: nextProps.itineraries,
        activities: nextProps.activities,
        comments: comments,
        exist: exist,
        loaded: true
      });
    } else if (nextProps.toast !== this.props.toast && nextProps.toast) {
      var toastHTML = `<span>Message sent</span>`;
      M.toast({ html: toastHTML, classes: "rounded" });
      this.props.changeToast(false);
    }
  }

  eventHandler = commentBody => {
    this.props.postComment(commentBody);
  };

  deleteComment = id => {
    this.props.deleteComment(id);
  };

  content() {
    if (this.state.exist && this.props.itineraries.length !== 0) {
      // console.log("itineraries Component RENDER");
      const itineraries = this.state.itineraries;
      const activities = this.state.activities;
      const comments = this.state.comments;
      return (
        <div id="page-wrap">
          <div className="itinerary-city">
            <h1>{this.props.match.params.name}</h1>
          </div>

          {/* <div id="all-cities" className="all-cities">
          <ItinerariesList itineraries={itineraries} />
        </div> */}

          <ul className="collapsible">
            <ItinerariesList
              itineraries={itineraries}
              activities={activities}
              comments={comments}
              onClick={this.eventHandler}
              delete={this.deleteComment}
            />
          </ul>
          <Footer goBack={"Cities"} />
        </div>
      );
    } else if (this.state.exist && this.props.itineraries.length === 0) {
      return (
        <div id="page-wrap">
          <div className="itinerary-city">
            <h1>{this.props.match.params.name}</h1>
          </div>
          <div className="no-itinerary">
            <h1>NO ITINERARIES</h1>
            <h2>for this city.</h2>
            <i className="material-icons yellow-text text-darken-2">warning</i>
          </div>
          <Footer goBack={"Cities"} />
        </div>
      );
    } else {
      return (
        <div id="page-wrap">
          <h1>THIS CITY DOES NOT EXIST</h1>
          <Footer goBack={"Cities"} />
        </div>
      );
    }
  }

  loader() {
    return (
      <div id="page-wrap">
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return <div>{this.state.loaded ? this.content() : this.loader()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities,
    itineraries: state.itineraries,
    activities: state.activities,
    comments: state.comments,
    toast: state.toast
  };
};

export default connect(
  mapStateToProps,
  {
    addItineraries,
    addActivities,
    addComments,
    postComment,
    deleteComment,
    changeToast
  }
)(Itineraries);
