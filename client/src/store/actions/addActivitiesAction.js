import axios from "axios";

export default function addActivities(cityName) {
  return dispatch => {
    // console.log(name);
    axios.get(`/activity/${cityName}`).then(res => {
      dispatch(activityInfo(res.data));
      console.log("Activities: ", res.data);
    });
  };
}

function activityInfo(activity) {
  return {
    type: "ADD_ACTIVITY",
    activities: activity
  };
}
