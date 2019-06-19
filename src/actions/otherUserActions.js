export const toggleItemInFavourites = productID => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    const userProfile = getState().firebase.profile;
    const favouritesList = getState().firebase.profile.favourites;

    const addItemToCart = ($profile, $favs) => {
      let alreadyInFavourites = $favs.find(eachFav => eachFav === productID); //object
      if (!alreadyInFavourites) {
        return {
          ...$profile,
          favourites: [...$favs, productID].sort(
            (a, b) => a.replace(/\D/gi, "") - b.replace(/\D/gi, "")
          )
        };
      } else
        return {
          ...$profile,
          favourites: [...$favs.filter(eachFav => eachFav !== productID)]
        };
    };

    //updates favourites and dispatches the action.
    if (userId) {
      firestore
        .collection("users")
        .doc(userId)
        .update(addItemToCart(userProfile, favouritesList));
    } else {
      dispatch({ type: "SHOW_LOGIN" });
    }
  };
};

export const moveFromFavouritesToCart = productID => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const userId = getState().firebase.auth.uid;
    const firestore = getFirestore();
    const userProfile = getState().firebase.profile;
    const favouritesList = getState().firebase.profile.favourites;
    const currentCart = getState().firebase.profile.cart;

    // favourites: [...$favs.filter(eachFav => eachFav !== productID)],

    const removeAllProducts = ($profile, $favs, $cart) => {
      let duplicate = $cart.find(
        eachItemInCart => eachItemInCart.id === productID
      ); //object
      if (!duplicate) {
        return {
          ...$profile,
          favourites: [...$favs.filter(eachFav => eachFav !== productID)],
          cart: [
            ...$cart,
            {
              id: productID,
              quantity: 1
            }
          ].sort((a, b) => a.id.replace(/\D/gi, "") - b.id.replace(/\D/gi, ""))
        };
      } else {
        let plusOneQuantity = duplicate.quantity + 1; //number
        return {
          ...$profile,
          favourites: [...$favs.filter(eachFav => eachFav !== productID)],
          cart: [
            ...$cart.filter(item => item !== duplicate),
            {
              ...duplicate,
              quantity: plusOneQuantity
            }
          ].sort((a, b) => a.id.replace(/\D/gi, "") - b.id.replace(/\D/gi, ""))
        };
      }
    };
    if (userId) {
      firestore
        .collection("users")
        .doc(userId)
        .update(removeAllProducts(userProfile, favouritesList, currentCart));
    }
  };
};

export const addProductToHistory = productID => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    const userProfile = getState().firebase.profile;
    const userHistory = getState().firebase.profile.totalHistory;

    const formatDate = date => {
      let dd = String(date.getDate()).padStart(2, "0");
      let mm = String(date.getMonth() + 1).padStart(2, "0");
      let yyyy = date.getFullYear();
      return dd + "/" + mm + "/" + yyyy;
    };

    const addItemToCart = ($profile, $history) => {
      let today = new Date();

      if ($history) {
        let alreadyLoggedToday = $history.find(
          eachDay => eachDay.date === formatDate(today)
        );
        let historyWithoutToday = $history.filter(
          each => each.date !== formatDate(today)
        );
        if (!alreadyLoggedToday) {
          return {
            ...$profile,
            totalHistory: [
              {
                logs: [productID],
                date: formatDate(today)
              },
              ...historyWithoutToday
            ]
          };
        } else {
          let LogsWithoutCurrent = alreadyLoggedToday.logs.filter(
            log => log !== productID
          );

          return {
            ...$profile,
            totalHistory: [
              {
                logs: [productID, ...LogsWithoutCurrent],
                date: alreadyLoggedToday.date
              },
              ...historyWithoutToday
            ]
          };
        }
      } else return { ...$profile };
    };

    // updates history
    if (userId) {
      firestore
        .collection("users")
        .doc(userId)
        .update(addItemToCart(userProfile, userHistory));
    } else {
      dispatch({ type: "UPDATE_OFFLINE_HISTORY", productID: productID });
    }
  };
};

export const clearHistory = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    const userProfile = getState().firebase.profile;

    if (userId) {
      firestore
        .collection("users")
        .doc(userId)
        .update({
          ...userProfile,
          totalHistory: []
        });
    } else {
      dispatch({ type: "CLEAR_OFFLINE_HISTORY" });
    }
  };
};
