const initState = {
  // if you add anything here make sure to add ...state in most of the actions below
  cart: JSON.parse(localStorage.getItem("cart"))
};

const cartReducer = (state = initState, action) => {
  let parsedLocalCart = JSON.parse(localStorage.getItem("cart"));
  switch (action.type) {
    case "ADD_TO_OFFLINE_CART":
      if (parsedLocalCart) {
        let duplicate = parsedLocalCart.find(
          eachItem => eachItem.id === action.productID
        );
        if (!duplicate) {
          localStorage.setItem(
            "cart",
            JSON.stringify([
              ...parsedLocalCart,
              { id: action.productID, quantity: 1 }
            ])
          );
          return {
            cart: JSON.parse(localStorage.getItem("cart"))
          };
        } else {
          let plusOneQuantity = duplicate.quantity + 1;
          let newCart = [
            ...parsedLocalCart.filter(item => item !== duplicate),
            {
              ...duplicate,
              quantity: plusOneQuantity
            }
          ].sort((a, b) => a.id.replace(/\D/gi, "") - b.id.replace(/\D/gi, ""));
          //set localStorage first
          localStorage.setItem("cart", JSON.stringify(newCart));
          //then setState
          return {
            cart: newCart
          };
        }
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify([{ id: action.productID, quantity: 1 }])
        );
        return {
          cart: JSON.parse(localStorage.getItem("cart"))
        };
      }

    case "REMOVE_ALL_FROM_OFFLINE_CART":
      let newCart = [
        ...parsedLocalCart.filter(
          eachItemInCart => eachItemInCart.id !== action.productID
        )
      ];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return {
        cart: newCart
      };

    case "REMOVE_ONE_FROM_OFFLINE_CART":
      if (parsedLocalCart) {
        const productToBeReduced = parsedLocalCart.find(
          item => item.id === action.productID
        );
        let minusOneQuantity = productToBeReduced.quantity - 1;
        let newCart = [
          ...parsedLocalCart.filter(item => item !== productToBeReduced),
          {
            ...productToBeReduced,
            quantity: minusOneQuantity
          }
        ].sort((a, b) => a.id.replace(/\D/gi, "") - b.id.replace(/\D/gi, ""));

        if (productToBeReduced.quantity > 1) {
          localStorage.setItem("cart", JSON.stringify(newCart));
          return {
            cart: newCart
          };
        } else return state;
      }
      break;
    default:
      return state;
  }
};

export default cartReducer;
