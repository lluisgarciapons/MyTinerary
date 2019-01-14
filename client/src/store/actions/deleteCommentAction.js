import axios from "axios";

export default function deleteComments(id) {
  return dispatch => {
    axios.delete(`/comments/find/${id}`).then(res => {
      dispatch(commentInfo(id));
      console.log("Comment deleted");
    });
  };
}

function commentInfo(id) {
  return {
    type: "DEL_COMMENT",
    id: id
  };
}
