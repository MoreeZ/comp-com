import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { toggleItemInFavourites } from "../../actions/otherUserActions";

class CategorizedProducts extends Component {
  handleAddToFavourites = e => {
    this.props.addToFavourites(e.target.title);
  };

  formatOnSalePrice = (price, sale) => {
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

  render() {
    const { products, userProfile, loggedOut } = this.props;
    if (products) {
      return (
        <div className="each-category">
          {products && products.length > 0 && (
            <div className="top-text">
              <h3>{this.props.category.replace("-", " ").toUpperCase()}</h3>
              <a href="CHANGE">MORE PRODUCTS</a>
            </div>
          )}
          {products && products.length > 0 && (
            <div className="item-render-space">
              {products
                .filter(
                  eachProduct =>
                    eachProduct.landingCategory.indexOf(this.props.category) >
                    -1
                )
                .map(eachProduct => (
                  <div className="each-product max-five" key={eachProduct.id}>
                    <Link to={"/product/" + eachProduct.id}>
                      <img src={eachProduct.image} alt="#" />
                      <p className="product-price">
                        {this.formatOnSalePrice(
                          eachProduct.price,
                          eachProduct.onSale
                        )}
                      </p>
                      <p className="product-name">
                        {nameShortener(eachProduct.name)}
                      </p>
                      {eachProduct.onSale && eachProduct.onSale > 0 ? (
                        <div className="on-sale-tag">
                          SALE{" "}
                          <span className="on-sale-tag-amount">
                            {eachProduct.onSale * 100}%
                          </span>
                        </div>
                      ) : null}
                    </Link>
                    <div className="save-for-later">
                      {!loggedOut &&
                      userProfile.favourites &&
                      userProfile.favourites.find(
                        ids => ids === eachProduct.id
                      ) ? (
                        <span
                          className="full-heart heart-icon"
                          title={eachProduct.id}
                          onClick={this.handleAddToFavourites}
                        >
                          &#9829;
                        </span>
                      ) : (
                        <span
                          className="hallow-heart heart-icon"
                          title={eachProduct.id}
                          onClick={this.handleAddToFavourites}
                        >
                          &#9825;
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="each-category loading-screen">
          <div className="loading-area">
            <div className="loader">{}</div>
            <span>Loading...</span>
          </div>
        </div>
      );
    }
  }
}

const nameShortener = string => {
  if (string.length > 100) {
    return string.slice(0, 100) + "...";
  } else {
    return string;
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.firestore.ordered.products,
    userProfile: state.firebase.profile,
    loggedOut: state.firebase.auth.isEmpty
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToFavourites: productID => {
      dispatch(toggleItemInFavourites(productID));
    }
  };
};

export default compose(
  firestoreConnect([{ collection: "products" }]),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CategorizedProducts);
