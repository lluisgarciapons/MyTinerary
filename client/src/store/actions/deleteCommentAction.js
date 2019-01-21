import axios from "axios";

export default function deleteComments(id) {
  return dispatch => {
    axios
      .delete(`/comments/find/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      })
      .then(res => {
        console.log(res);
        if (res.status === 204) {
          dispatch(commentInfo(id));
          console.log("Comment deleted");
        } else {
          alert("not loooooooooged in");
        }
      })
      .catch(err => {
        console.log(err.response);
        alert(err.response.data);
      });
  };
}

function commentInfo(id) {
  return {
    type: "DEL_COMMENT",
    id: id
  };
}
