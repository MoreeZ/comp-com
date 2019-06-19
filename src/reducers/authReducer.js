const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("login Error @firebase");
      return {
        ...state,
        authError: "Login Failed"
      };
    case "LOGIN_SUCCESS":
      console.log("login Successs @firebase");
      return {
        ...state,
        authError: null
      };
    case "SIGNOUT_SUCCESS":
      console.log("Signed out successfully @firebase");
      return state;
    case "SIGNUP_SUCCESS":
      console.log("sugnup success @firebase");
      return {
        ...state,
        authError: null
      };
    case "SIGNUP_ERROR":
      console.log("signup failed @firebase", action.err);
      return {
        ...state,
        authError: action.err.code
      };
    default:
      return state;
  }
};

export default authReducer;
