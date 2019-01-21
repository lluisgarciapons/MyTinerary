import axios from "axios";

export default function addComments(cityName) {
  return dispatch => {
    axios
      .get(`/comments/${cityName}`, {
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      })
      .then(res => {
        if (!res.data.message) {
          dispatch(commentInfo(res.data));
          console.log("CommentsOk: ", res.data);
        } else {
          dispatch(commentInfo([]));
          console.log("CommentsNo: ", res.data);
        }
      });
  };
}

function commentInfo(comment) {
  return {
    type: "ADD_COMMENT",
    comments: comment
  };
}
