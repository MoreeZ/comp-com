import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import {
  toggleItemInFavourites,
  moveFromFavouritesToCart
} from "../actions/otherUserActions";

class FavouriteProducts extends Component {
  state = {};

  randomDetails(keyIndex, product) {
    const { details } = product;
    let keys = [];
    for (let eachKey in details) {
      if (details.hasOwnProperty(eachKey)) {
        keys.push(eachKey);
      }
    }
    return details[keys[keyIndex]];
  }

  handleMoveToBasket = e => {
    this.props.moveToCart(e.target.title);
  };

  handleRemove = e => {
    this.props.removeFromFavourites(e.target.title);
  };

  render() {
    const { favourites, products } = this.props;
    if (this.props.favourites && this.props.products) {
      return (
        <div className="top-padding shopping-cart container">
          <div className="cart-left-container">
            <h1 style={{ paddingLeft: "0", marginBottom: "16px" }}>
              YOU HAVE {favourites.length} FAVOURITE PRODUCTS
            </h1>
            {favourites.map(eachitem =>
              products
                .filter(product => product.id === eachitem)
                .map(product => (
                  <div
                    className="each-item-in-cart favourites-min-width"
                    key={product.id}
                  >
                    <div className="cart-item-image">
                      <img src={product.image} alt="" />
                    </div>
                    <div className="cart-item-desc">
                      <h5>{product.name}</h5>
                      <ul className="favourites-quick-detail">
                        <li>{this.randomDetails(6, product)}</li>
                        <li>{this.randomDetails(3, product)}</li>
                      </ul>
                      <h1>{product.price}</h1>
                    </div>
                    <div className="absolute-quantity-buttons">
                      <button
                        className="cart-item-delete-button"
                        title={product.id}
                        onClick={this.handleRemove}
                      >
                        REMOVE
                      </button>
                      <button
                        className="move-to-basket-button"
                        title={product.id}
                        onClick={this.handleMoveToBasket}
                      >
                        MOVE TO BASKET
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

const mapStateToProps = state => {
  return {
    products: state.firestore.ordered.products,
    favourites: state.firebase.profile.favourites
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromFavourites: productID => {
      dispatch(toggleItemInFavourites(productID));
    },
    moveToCart: productID => {
      dispatch(moveFromFavouritesToCart(productID));
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "products" }])
)(FavouriteProducts);
