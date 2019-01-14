import axios from "axios";

export default function postComments(body) {
  return dispatch => {
    axios
      .post(`/comments`, {
        user: {
          name: body.user.name,
          photo: body.user.photo
        },
        itineraryId: body.itineraryId,
        message: body.message,
        date: body.date,
        city: body.city
      })
      .then(res => {
        dispatch(changeToast(true));
        dispatch(commentInfo(res.data));
        console.log(
          `New comment from ${res.data.user.name}: `,
          res.data.message
        );
      });
  };
}

function commentInfo(comment) {
  return {
    type: "POST_COMMENT",
    comments: comment
  };
}

export function changeToast(payload) {
  return {
    type: "CHANGE_TOAST",
    toast: payload
  };
}
