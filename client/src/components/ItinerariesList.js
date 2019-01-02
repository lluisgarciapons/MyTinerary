import React from "react";
import Itinerary from "./Itinerary.js";

function findActivities(itinerary, activities) {
  return activities.filter(
    activity => activity.itineraryName === itinerary.title
  );
}

const ItinerariesList = props =>
  props.itineraries.map((itinerary, index) => (
    <Itinerary
      key={index}
      itinerary={itinerary}
      activities={findActivities(itinerary, props.activities)}
    />
  ));

export default ItinerariesList;
