import axios from "axios";

export default function addItineraries(cityName) {
  return dispatch => {
    // console.log(name);
    axios.get(`/itinerary/${cityName}`).then(res => {
      dispatch(itineraryInfo(res.data));
      console.log(`Chosen city: ${cityName}`);
      console.log("Itineraries: ", res.data);
    });
  };
}

function itineraryInfo(itinerary) {
  return {
    type: "ADD_ITINERARY",
    itineraries: itinerary
  };
}
