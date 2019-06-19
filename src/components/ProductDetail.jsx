import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { addProductToCart } from "../actions/cartActions";
import { addProductToHistory } from "../actions/otherUserActions";

class ProductDetail extends Component {
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
  amountOff = (price, sale) => {
    const numberfied = Number(price.replace(/^€\s/g, "").replace(/,/g, ""));
    return (numberfied * sale).toFixed(2);
  };
  preTaxCalculator = () => {
    const numberfied = Number(
      this.props.product.price.replace(/^€\s/g, "").replace(/,/g, "")
    );
    return numberfied - (numberfied * 20) / 100 - this.props.product.shipping;
  };
  taxCalculator = () => {
    const numberfied = Number(
      this.props.product.price.replace(/^€\s/g, "").replace(/,/g, "")
    );
    return (numberfied * 20) / 100;
  };
  randomDetails = keyIndex => {
    const { details } = this.props.product;
    let keys = [];
    for (let eachKey in details) {
      if (details.hasOwnProperty(eachKey)) {
        keys.push(eachKey);
      }
    }
    return details[keys[keyIndex]];
  };
  starRating = index => {
    if (this.props.product.rating >= index) {
      return "https://i.ibb.co/kDHM0rh/2.png";
    } else {
      return "https://i.ibb.co/Ych7J1T/Untitled-2.png";
    }
  };
  renderKeys = () => {
    const { details } = this.props.product;
    let keys = [];
    for (let eachKey in details) {
      if (details.hasOwnProperty(eachKey)) {
        keys.push(eachKey);
      }
    }
    return keys;
  };

  componentDidMount() {
    if (this.props.addToHistory) {
      this.props.addToHistory(this.props.match.params.product_id);
    }
  }

  render() {
    const handleAddToCart = () => {
      this.props.addToCart(this.props.match.params.product_id, this.props.uid);
    };
    const { product } = this.props;
    return (
      <div className="product-detail-page top-padding container col-lg-10">
        {product && (
          <div className="product-desc">
            <div className="product-desc-image col-lg-5">
              <img src={product.image} alt={product.name} className="col-12" />
            </div>

            <div className="product-desc-right col-lg-7">
              <h2 className="product-desc-title">{product.name}</h2>
              <div className="product-desc-bottom-section">
                <div className="product-desc-text">
                  <p>
                    In stock - Ships from Ireland. Sold and Shipped by{" "}
                    <span className="comp-logo">
                      <Link to="/">
                        comp<span className="red-dot">.</span>com
                      </Link>
                    </span>
                  </p>
                  <ul>
                    <li>{this.randomDetails(1)}</li>
                    <li>{this.randomDetails(2)}</li>
                    <li>{this.randomDetails(3)}</li>
                    <li>{this.randomDetails(4)}</li>
                    <li>{this.randomDetails(5)}</li>
                    <li>{this.randomDetails(6)}</li>
                  </ul>
                  <div className="star-rating">
                    <img src={this.starRating(1)} alt="*" />
                    <img src={this.starRating(2)} alt="*" />
                    <img src={this.starRating(3)} alt="*" />
                    <img src={this.starRating(4)} alt="*" />
                    <img src={this.starRating(5)} alt="x" />
                  </div>
                </div>
                <div className="product-desc-checkout">
                  <div className="product-desc-total">
                    <h4>€ {this.preTaxCalculator().toFixed(2)}</h4>
                    <p>VAT - € {this.taxCalculator().toFixed(2)}</p>
                    <p>Shipping - € {product.shipping}</p>
                    <p>
                      Discounts - €{" "}
                      {this.amountOff(
                        product.price,
                        product.onSale > 0 && product.onSale
                      )}
                    </p>
                    <h3>{this.applySale(product.price, product.onSale)}</h3>
                  </div>
                  <div
                    className="product-desc-action-buttons"
                    onClick={handleAddToCart}
                  >
                    ADD TO CART
                  </div>
                  <div className="product-desc-action-buttons">
                    SAVE FOR LATER
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {product && (
          <div className="product-details">
            <h2>Learn more about the {product.name}</h2>
            <table>
              <tbody>
                {this.renderKeys().map(key => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{product.details[key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.product_id;
  if (state.firestore.ordered.products) {
    return {
      product: state.firestore.ordered.products.find(p => p.id === id),
      uid: state.firebase.auth.uid,
      totalHistory: state.firebase.profile.totalHistory
    };
  } else {
    return {};
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: productId => {
      dispatch(addProductToCart(productId));
    },
    addToHistory: productID => {
      dispatch(addProductToHistory(productID));
    }
  };
};

export default compose(
  firestoreConnect([{ collection: "products" }]),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProductDetail);
