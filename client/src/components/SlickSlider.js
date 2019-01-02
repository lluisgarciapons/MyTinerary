import React, { Component } from "react";
import Slick from "react-slick";
// import ActivitiesList from "./ActivitiesList.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import M from "materialize-css";

export class SlickSlider extends Component {
  componentDidMount() {
    var elems = document.querySelectorAll(".materialboxed");
    M.Materialbox.init(elems);
  }

  onSwipeFunction() {
    var elem = document.querySelector(".materialboxed.active");
    if (elem) {
      var instance = M.Materialbox.getInstance(elem);
      instance.close();
    }
  }

  render() {
    var settings = {
      dots: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: false,
      adaptiveHeight: false
    };

    return (
      <div>
        <Slick ref="slick" afterChange={this.onSwipeFunction} {...settings}>
          {this.props.activities.map((activity, index) => (
            <div key={index}>
              {" "}
              <img
                src={activity.image}
                alt={activity.alt}
                className="materialboxed"
              />
            </div>
          ))}

          {/* <ActivitiesList activities={this.props.activities} /> */}

          {/* <div>
            <img
              className="materialboxed"
              alt="kitty"
              src="http://placekitten.com/g/400/200"
            />
          </div>
          <div>
            <img
              className="materialboxed"
              alt="kitty"
              src="http://placekitten.com/g/400/200"
            />
          </div>
          <div>
            <img
              className="materialboxed"
              alt="kitty"
              src="http://placekitten.com/g/400/200"
            />
          </div>
          <div>
            <img
              className="materialboxed"
              alt="kitty"
              src="http://placekitten.com/g/400/200"
            />
          </div>
          <div>
            <img
              className="materialboxed"
              alt="kitty"
              src="http://placekitten.com/g/400/200"
            />
          </div>
          <div>
            <img
              className="materialboxed"
              alt="kitty"
              src="http://placekitten.com/g/400/200"
            />
          </div>
          <div>
            <img
              className="materialboxed"
              alt="kitty"
              src="http://placekitten.com/g/400/200"
            />
          </div>
          <div>
            <img
              className="materialboxed"
              alt="kitty"
              src="http://placekitten.com/g/400/200"
            />
          </div> */}
        </Slick>
      </div>
    );
  }
}

export default SlickSlider;
