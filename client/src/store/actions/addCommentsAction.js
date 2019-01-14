import axios from "axios";

export default function addComments(cityName) {
  return dispatch => {
    axios.get(`/comments/${cityName}`).then(res => {
      dispatch(commentInfo(res.data));
      console.log("Comments: ", res.data);
    });
  };
}

function commentInfo(comment) {
  return {
    type: "ADD_COMMENT",
    comments: comment
  };
}
