// import firebase from "../config/fbConfig";

export const signIn = credentials => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    const loadLocalCart = localStorage.cart
      ? JSON.parse(localStorage.cart)
      : [];
    const loadLocalHistory = localStorage.history
      ? JSON.parse(localStorage.history)
      : [];

    const capitalizeName = string => {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            firstName: capitalizeName(newUser.firstName),
            lastName: capitalizeName(newUser.lastName),
            email: newUser.email,
            phoneNumber: "",
            cart: [...loadLocalCart],
            favourites: [],
            totalHistory: [...loadLocalHistory],
            shippingAddress: {
              "Full Name": "",
              "Line 1": "",
              "Line 2": "",
              "Town/City": "",
              "State/County": "",
              Country: "",
              "Post Code": ""
            }
          });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};
