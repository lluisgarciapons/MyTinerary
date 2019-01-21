import axios from "axios";

export default function loginAction(body) {
  return dispatch => {
    axios
      .post("/login", {
        username: body.username,
        password: body.password
      })
      .then(res => {
        console.dir(res.data);
        localStorage.setItem("token", res.data.token);
        // localStorage.setItem("user", res.data.userEmail);
        // localStorage.setItem("user", res.data.userName);
        dispatch(loginSuccessful(res.data));
      })
      .catch(err => {
        console.dir(err.response);
        dispatch(loginFail(err.response));
      });
  };
}

export function loginSuccessful(payload) {
  return {
    type: "LOGIN_SUCCESS",
    isAuthenticated: true,
    error: false,
    userEmail: payload.userEmail,
    userName: payload.userName,
    message: payload.message
  };
}

export function loginFail(payload) {
  return {
    type: "LOGIN_FAIL",
    isAuthenticated: false,
    message: payload.data,
    error: true,
    userEmail: null,
    userName: null
  };
}

export function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");
  return {
    type: "LOG_OUT",
    isAuthenticated: false,
    message: "logOut",
    error: false,
    userEmail: null,
    userName: null
  };
}
