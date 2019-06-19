import { combineReducers } from "redux";

import liveReducer from "./liveReducer";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import otherReducer from "./otherReducer";

import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  live: liveReducer,
  firebase: firebaseReducer,
  auth: authReducer,
  cartReducer: cartReducer,
  otherReducer: otherReducer
});

export default rootReducer;
