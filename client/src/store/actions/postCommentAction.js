import axios from "axios";

export default function postComments(body) {
  return dispatch => {
    axios
      .post(
        `/comments`,
        {
          user: {
            name: body.user.name,
            photo: body.user.photo
          },
          itineraryId: body.itineraryId,
          message: body.message,
          date: body.date,
          city: body.city
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        }
      )
      .then(res => {
        console.log(res);
        if (res.status === 201) {
          dispatch(changeToast(true));
          dispatch(commentInfo(res.data));
          console.log(
            `New comment from ${res.data.user.name}: `,
            res.data.message
          );
        } else {
          throw Error;
        }
      })
      .catch(err => {
        alert("you must be log in");
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
