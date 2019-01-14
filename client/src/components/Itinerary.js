import React, { Component } from "react";
// import GaudiLover from "../GaudiLover.png";
// import ImageSlider from "./ImageSlider";
import SlickSlider from "./SlickSlider";
import Comments from "./Comments";
// import HambreAlumna from "../HambreAlumna.png";

function HastagList(props) {
  return props.hastags.map(hastag => <Hastag key={hastag} hastag={hastag} />);
}

function Hastag(props) {
  return <p>#{props.hastag}</p>;
}

export class Itinerary extends Component {
  render() {
    // console.log("Itinerary Component RENDER");
    const itinerary = this.props.itinerary;
    const comments = this.props.comments;
    return (
      <li className="itinerary">
        <div className="collapsible-header row">
          <div className="col s3 profile">
            <div className="profile-image-container">
              <img
                src={itinerary.profilePicture}
                alt={itinerary.userName}
                className="profile-picture"
              />
            </div>
            <h4>{itinerary.userName}</h4>
          </div>
          <div className="col s8 offset-s1 info">
            <h3 className="col s12">{itinerary.title}</h3>
            <div className="col s4">
              <h4>Likes: {itinerary.likes}</h4>
            </div>
            <div className="col s4">
              <h4>Hours: {itinerary.time}</h4>
            </div>
            <div className="col s4">
              <h4>
                Price: <span className="price">{itinerary.price}</span>
              </h4>
            </div>
            <HastagList hastags={itinerary.hastags} />
          </div>
        </div>
        <div className="collapsible-body">
          <h3>Find the best activities!</h3>
          {/* <ImageSlider /> */}
          <SlickSlider activities={this.props.activities} />

          <Comments
            itinerary={itinerary}
            comments={comments}
            onClick={this.props.onClick}
            delete={this.props.delete}
          />
        </div>
      </li>

      // <option value={this.props.city.name}>{this.props.city.name}</option>
    );
  }
}

export default Itinerary;
