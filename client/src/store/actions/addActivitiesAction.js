import axios from "axios";

export default function addActivities(name) {
  return dispatch => {
    console.log(name);
    axios.get(`/activity/${name}`).then(res => {
      dispatch(activityInfo(res.data));
    });
  };
}

function activityInfo(activity) {
  return {
    type: "ADD_ACTIVITY",
    activities: activity
  };
}
