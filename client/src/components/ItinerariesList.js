import React from "react";
import Itinerary from "./Itinerary.js";

function findActivities(itinerary, activities) {
  return activities.filter(
    activity => activity.itineraryName === itinerary.title
  );
}

function findComments(itinerary, comments) {
  return comments.filter(comment => comment.itineraryId === itinerary._id);
}

const ItinerariesList = props => {
  return props.itineraries.map((itinerary, index) => (
    <Itinerary
      key={index}
      itinerary={itinerary}
      activities={findActivities(itinerary, props.activities)}
      comments={findComments(itinerary, props.comments)}
      onClick={props.onClick}
      delete={props.delete}
    />
  ));
};

export default ItinerariesList;
