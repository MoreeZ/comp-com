export const updateFirstNameAction = newFirstName => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const userId = getState().firebase.auth.uid;
    const firestore = getFirestore();
    const userProfile = getState().firebase.profile;
    const capitalizeName = string => {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    if (userId) {
      firestore
        .collection("users")
        .doc(userId)
        .update({
          ...userProfile,
          firstName: capitalizeName(newFirstName)
        });
    } else {
      return null;
    }
  };
};

export const updateLastNameAction = newLastName => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const userId = getState().firebase.auth.uid;
    const firestore = getFirestore();
    const userProfile = getState().firebase.profile;
    const capitalizeName = string => {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    if (userId) {
      firestore
        .collection("users")
        .doc(userId)
        .update({
          ...userProfile,
          lastName: capitalizeName(newLastName)
        });
    } else {
      return null;
    }
  };
};

export const updateEmailAction = newEmail => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const userId = getState().firebase.auth.uid;
    const firestore = getFirestore();
    const firebase = getFirebase();
    const userProfile = getState().firebase.profile;
    const user = firebase.auth().currentUser;
    if (userId) {
      user
        .updateEmail(newEmail)
        .then(() => {
          firestore
            .collection("users")
            .doc(userId)
            .update({
              ...userProfile,
              email: newEmail
            })
            .then(() => {
              window.alert("Your email has been changed");
            });
        })
        .catch(err => {
          window.alert(err.message);
        });
    }
  };
};

export const updatePhoneNumberAction = newPhoneNumber => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const userId = getState().firebase.auth.uid;
    const firestore = getFirestore();
    const userProfile = getState().firebase.profile;

    if (userId) {
      firestore
        .collection("users")
        .doc(userId)
        .update({
          ...userProfile,
          phoneNumber: newPhoneNumber
        });
    } else {
      return null;
    }
  };
};

export const saveShippingAddress = newShippingAddress => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const userId = getState().firebase.auth.uid;
    const firestore = getFirestore();
    const userProfile = getState().firebase.profile;
    const initShippingAddress = userProfile.shippingAddress;

    if (userId) {
      firestore
        .collection("users")
        .doc(userId)
        .update({
          ...userProfile,
          shippingAddress: {
            ...initShippingAddress,
            ...newShippingAddress
          }
        });
    } else {
      return null;
    }
  };
};
