import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SignedOut from "./SignedOut";
import SignedIn from "./SignedIn";

class NavBar extends Component {
  state = {
    searchValue: ""
  };
  calculateQuantity(cart) {
    if (cart) {
      let arrayOfQuantities = cart.map(product => product.quantity);
      if (arrayOfQuantities.length > 0) {
        let sumOfItems = arrayOfQuantities.reduce((a, b) => a + b);
        return sumOfItems;
      } else return 0;
    } else return 0;
  }

  openSideMenu = () => {
    if (this.props.showMenu === false) {
      const sidemenu = document.querySelector(".side-menu");
      const beforesidemenu = document.querySelector(
        ".side-menu-darken .dark-background"
      );
      sidemenu.style.transform = "translateX(0%)";
      beforesidemenu.style.opacity = "1";
      beforesidemenu.style.pointerEvents = "all";
      this.props.showSideMenu();
    } else {
      const sidemenu = document.querySelector(".side-menu");
      const beforesidemenu = document.querySelector(
        ".side-menu-darken .dark-background"
      );
      sidemenu.style.transform = "translateX(-100%)";
      beforesidemenu.style.opacity = "0";
      beforesidemenu.style.pointerEvents = "none";
      this.props.hideSideMenu();
    }
  };

  logSearchValue = e => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value
    });
  };

  handleSubmitSearch = e => {
    e.preventDefault();
    if (this.state.searchValue !== "") {
      document.querySelector(".searchbar-button").click();
    }
  };

  handleClearInput = () => {
    document.getElementById("searchValue").value = "";
  };

  render() {
    const { loggedOut, onlineCart, offlineCart } = this.props;
    return (
      <div className="fixed-content">
        <div className="Navigation-bar container-fluid ">
          <div className="left-container ">
            <img
              src="https://i.ibb.co/0QwXCP0/more.png"
              alt="dropdown"
              className="dropdown-icon"
              onClick={this.openSideMenu}
            />
            <Link to="/" onClick={this.handleClearInput}>
              comp<span className="red-dot">.</span>com
            </Link>
          </div>

          <div className="search-bar-container ">
            <form
              className="search-bar"
              onSubmit={this.handleSubmitSearch}
              title={this.state.searchValue.replace(/ /gi, "-")}
            >
              <input
                onChange={this.logSearchValue}
                id="searchValue"
                type="text"
                autoComplete="off"
                required
              />
              <label htmlFor="name" className="label-name">
                <span className="content-name">Search</span>
              </label>
              <Link
                to={"/search/" + this.state.searchValue.replace(/ /gi, "-")}
                className="searchbar-button"
              >
                <img src="https://i.ibb.co/GnJJsHm/search2.png" alt="Search" />
              </Link>
            </form>
          </div>

          <div className="right-container ">
            {!loggedOut && <SignedIn />}
            {loggedOut && <SignedOut />}
            <div className="cart-icon-container">
              <Link to="/cart">
                <img
                  src="https://i.ibb.co/G5nxHYB/cart-white.png"
                  alt="Cart-icon"
                  className="cart-icon"
                />
                {onlineCart ? (
                  <div className="navbar-quantity">
                    {this.calculateQuantity(onlineCart)}
                  </div>
                ) : (
                  <div className="navbar-quantity">
                    {this.calculateQuantity(offlineCart)}
                  </div>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showMenu: state.live.showSideMenu,
    loggedOut: state.firebase.auth.isEmpty,
    onlineCart: state.firebase.profile.cart,
    offlineCart: state.cartReducer.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showLogin: () => {
      dispatch({ type: "SHOW_LOGIN" });
    },
    showRegister: () => {
      dispatch({ type: "SHOW_REGISTER" });
    },
    showSideMenu: () => {
      dispatch({ type: "SHOW_SIDE_MENU" });
    },
    hideSideMenu: () => {
      dispatch({ type: "HIDE_SIDE_MENU" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
