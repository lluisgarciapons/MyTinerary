import axios from "axios";

export default function addCities() {
  return dispatch => {
    axios.get("/cities/all").then(res => {
      dispatch(cityInfo(res.data));
      console.log("All Cities: ", res.data);
    });
  };
}

function cityInfo(city) {
  return {
    type: "ADD_CITY",
    cities: city
  };
}
