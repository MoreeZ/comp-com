import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";

class CartCheckout extends Component {
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
  calculateSubtotal(ProductsInCart, cart) {
    const subtotal =
      this.calculateTotal(ProductsInCart, cart) -
      (Number(this.calculateVAT(ProductsInCart, cart)) +
        this.calculateShipping(ProductsInCart, cart));
    return subtotal.toFixed(2);
  }
  calculateVAT(productsInCart, cart) {
    let priceTotal = this.calculateTotal(productsInCart, cart);
    let vatTotal = (priceTotal * 20) / 100;
    return vatTotal.toFixed(2);
  }
  calculateShipping(productsInCart) {
    return productsInCart
      .map(product => product.shipping)
      .reduce((a, b) => a + b);
  }
  calculateTotal(productsInCart, cart) {
    let ArrayOfPrices = cart.map(each =>
      productsInCart
        .filter(product => product.id === each.id)
        .map(product => this.applySale(product.price, product.onSale))
        .map(
          price =>
            Number(price.replace("€ ", "").replace(",", "")) * each.quantity
        )
        .reduce((a, b) => a + b)
    );
    return ArrayOfPrices.reduce((a, b) => a + b).toFixed(2);
  }

  handleShowLogin = () => {
    this.props.showLogin();
  };

  render() {
    const { cart, productsInCart, loggedOut } = this.props;

    if (productsInCart.length > 0 && cart) {
      return (
        <div className="cart-right-container">
          <table className="cart-checkout-box">
            <tbody>
              <tr className="cart-checkout-spans">
                <td>Subtotal: </td>
                <td>€ {this.calculateSubtotal(productsInCart, cart)}</td>
              </tr>
              <tr className="cart-checkout-spans">
                <td>VAT: </td>
                <td>€ {this.calculateVAT(productsInCart, cart)}</td>
              </tr>
              <tr className="cart-checkout-spans">
                <td>Shipping: </td>
                <td>€ {this.calculateShipping(productsInCart)}</td>
              </tr>
              <tr className="cart-checkout-spans">
                <td>Total: </td>
                <td>€ {this.calculateTotal(productsInCart, cart)}</td>
              </tr>
            </tbody>
          </table>
          <div className="cart-checkout-button">CHECKOUT</div>
        </div>
      );
    } else
      return (
        <div className="cart-right-container">
          <table className="cart-checkout-box">
            <tbody>
              <tr className="cart-checkout-spans">
                <td>Subtotal: </td>
                <td>€ {}</td>
              </tr>
              <tr className="cart-checkout-spans">
                <td>VAT: </td>
                <td>€ {}</td>
              </tr>
              <tr className="cart-checkout-spans">
                <td>Shipping: </td>
                <td>€ {}</td>
              </tr>
              <tr className="cart-checkout-spans">
                <td>Total: </td>
                <td>€ {}</td>
              </tr>
            </tbody>
          </table>
          <div className="cart-checkout-button">
            {loggedOut ? (
              <span onClick={this.handleShowLogin}>CHECKOUT</span>
            ) : (
              <span>CHECKOUT</span>
            )}
          </div>
        </div>
      );
  }
}
const mapStateToProps = state => {
  return {
    loggedOut: state.firebase.auth.isEmpty
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showLogin: () => {
      dispatch({ type: "SHOW_LOGIN" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartCheckout);
