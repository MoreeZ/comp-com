import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import CartCheckout from "./CartCheckout";
import {
  removeAllProductsFromCart,
  addProductToCart,
  removeSingleProductFromCart
} from "../../actions/cartActions";

class Cart extends Component {
  applySale = (price, sale) => {
    if (sale > 0) {
      const numberfied = Number(price.replace(/^€\s/g, "").replace(/,/g, ""));
      const finalAmount = numberfied - numberfied * sale;
      const stringified = finalAmount
        .toFixed(2)
        .toString()
        .split("");
      if (stringified.length > 6) {
        stringified.splice(-6, 0, ",");
      }
      return "€ " + stringified.join("");
    } else {
      return price;
    }
  };

  formatItemQuantity(cart) {
    let arrayOfQuantities = cart.map(product => product.quantity);
    if (arrayOfQuantities.length > 0) {
      let sumOfItems = arrayOfQuantities.reduce((a, b) => a + b);
      if (sumOfItems === 1) {
        return "1 ITEM";
      } else {
        return `${sumOfItems} ITEMS`;
      }
    } else {
      return "NO ITEMS";
    }
  }

  handleRemoveAll = e => {
    this.props.removeFromCart(e.target.id);
  };
  handleRemoveOne = e => {
    this.props.removeOneFromCart(e.target.id);
  };
  handleAddOne = e => {
    this.props.addToCart(e.target.id);
  };

  //Cart loads differently depending on the data it is given.
  renderCart = (availableCart, products) => {
    //DISCLAIMER: cart contains only ID and Quantity of the product, whereas productInCart containes all information.
    let productsInCart = availableCart.map(each =>
      products.find(product => product.id === each.id)
    );

    return (
      <div className="top-padding shopping-cart container">
        <div className="cart-left-container">
          <h1>{this.formatItemQuantity(availableCart)} CURRENTLY IN CART</h1>
          {availableCart.map(eachitem =>
            products
              .filter(product => product.id === eachitem.id)
              .map(product => (
                <div className="each-item-in-cart" key={product.id}>
                  <div className="cart-item-image">
                    <img src={product.image} alt="" />
                  </div>
                  <div className="cart-item-desc">
                    <h5>{product.name}</h5>
                    <h1>{this.applySale(product.price, product.onSale)}</h1>
                  </div>
                  <div className="absolute-quantity-buttons">
                    <button
                      className="quantity-plus-button"
                      id={product.id}
                      onClick={this.handleAddOne}
                    >
                      +
                    </button>
                    <button
                      className="quantity-minus-button"
                      id={product.id}
                      onClick={this.handleRemoveOne}
                    >
                      −
                    </button>
                    <div className="quantity-display">{eachitem.quantity}</div>
                    <button
                      className="cart-item-delete-button"
                      id={product.id}
                      onClick={this.handleRemoveAll}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
        <CartCheckout
          cart={availableCart}
          productsInCart={productsInCart}
          applySale={this.applySale}
        />
      </div>
    );
  };

  render() {
    const { onlineCart, products, offlineCart } = this.props;

    if (products) {
      if (onlineCart && onlineCart.length > 0) {
        return this.renderCart(onlineCart, products);
        // =================================================================
      } else if (onlineCart && onlineCart.length <= 0) {
        return this.renderCart(onlineCart, products);
      } else if (offlineCart) {
        return this.renderCart(offlineCart, products);
      } else {
        return this.renderCart([], products);
      }
    } else {
      return (
        <div className="container top-padding loading-screen">
          <div className="loading-area">
            <div className="loader">{}</div>
            <span>Loading...</span>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    onlineCart: state.firebase.profile.cart,
    products: state.firestore.ordered.products,
    offlineCart: state.cartReducer.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: productId => {
      dispatch(removeAllProductsFromCart(productId));
    },
    addToCart: productId => {
      dispatch(addProductToCart(productId));
    },
    removeOneFromCart: productId => {
      dispatch(removeSingleProductFromCart(productId));
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "products" }])
)(Cart);
