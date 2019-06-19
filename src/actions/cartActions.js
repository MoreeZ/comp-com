export const addProductToCart = productID => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    const userProfile = getState().firebase.profile;
    const currentCart = getState().firebase.profile.cart;

    //returns an updated profile
    const addItemToCart = ($profile, $cart) => {
      let duplicate = $cart.find(
        eachItemInCart => eachItemInCart.id === productID
      ); //object
      if (!duplicate) {
        return {
          ...$profile,
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

    //updates the cart and dispatches the action.
    if (userId) {
      firestore
        .collection("users")
        .doc(userId)
        .update(addItemToCart(userProfile, currentCart));
    } else {
      dispatch({ type: "ADD_TO_OFFLINE_CART", productID: productID });
    }
  };
};

// else dispatch({ type: "ADD_TO_OFFLINE_CART", productID: productID });
//

export const removeAllProductsFromCart = productID => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const userId = getState().firebase.auth.uid;
    const firestore = getFirestore();
    const userProfile = getState().firebase.profile;
    const currentCart = getState().firebase.profile.cart;

    const removeAllProducts = ($profile, $cart) => {
      return {
        ...$profile,
        cart: [
          ...$cart.filter(eachItemInCart => eachItemInCart.id !== productID)
        ]
      };
    };
    if (userId) {
      firestore
        .collection("users")
        .doc(userId)
        .update(removeAllProducts(userProfile, currentCart));
    } else
      dispatch({ type: "REMOVE_ALL_FROM_OFFLINE_CART", productID: productID });
  };
};

export const removeSingleProductFromCart = productID => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const userId = getState().firebase.auth.uid;
    const firestore = getFirestore();
    const userProfile = getState().firebase.profile;
    const currentCart = getState().firebase.profile.cart;

    const removeSingleProduct = ($profile, $cart) => {
      const productToBeReduced = $cart.find(item => item.id === productID);
      if (productToBeReduced.quantity > 1) {
        let minusOneQuantity = productToBeReduced.quantity - 1;
        return {
          ...$profile,
          cart: [
            ...$cart.filter(item => item !== productToBeReduced),
            {
              ...productToBeReduced,
              quantity: minusOneQuantity
            }
          ].sort((a, b) => a.id.replace(/\D/gi, "") - b.id.replace(/\D/gi, ""))
        };
      } else return { ...$profile };
    };
    if (userId) {
      firestore
        .collection("users")
        .doc(userId)
        .update(removeSingleProduct(userProfile, currentCart));
    } else
      dispatch({ type: "REMOVE_ONE_FROM_OFFLINE_CART", productID: productID });
  };
};
