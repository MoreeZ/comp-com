import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import {
  toggleItemInFavourites,
  moveFromFavouritesToCart
} from "../../actions/otherUserActions";

class SavedSearches extends Component {
  state = {};

  handleMoveToBasket = e => {
    this.props.moveToCart(e.target.title);
  };

  handleRemove = e => {
    this.props.removeFromFavourites(e.target.title);
  };

  render() {
    const { products, favourites } = this.props;
    return (
      <div className="profile-right-container">
        <h1>SAVED SEARCHES</h1>

        <div className="cart-left-container">
          {favourites &&
            products &&
            favourites.map(eachitem =>
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
                      <h1 style={{ marginLeft: "20px" }}>{product.price}</h1>
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
)(SavedSearches);
