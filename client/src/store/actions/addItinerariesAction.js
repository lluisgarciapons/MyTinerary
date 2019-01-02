import axios from "axios";

export default function addItineraries(name) {
  return dispatch => {
    console.log(name);
    axios.get(`/itinerary/${name}`).then(res => {
      dispatch(itineraryInfo(res.data));
    });
  };
}

function itineraryInfo(itinerary) {
  return {
    type: "ADD_ITINERARY",
    itineraries: itinerary
  };
}
