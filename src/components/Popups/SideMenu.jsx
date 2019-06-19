import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "../../actions/authActions";

class SideMenu extends Component {
  hide = () => {
    const sidemenu = document.querySelector(".side-menu");
    const beforesidemenu = document.querySelector(
      ".side-menu-darken .dark-background"
    );
    sidemenu.style.transform = "translateX(-100%)";
    beforesidemenu.style.opacity = "0";
    beforesidemenu.style.pointerEvents = "none";
    this.props.hideSideMenu();
  };
  handleSignOut = () => {
    this.props.signOut();
    this.hide();
  };
  render() {
    const { loggedOut } = this.props;
    return (
      <div className="side-menu-darken">
        <div className="dark-background" onClick={this.hide} />
        <div className="side-menu">
          <ul>
            <li>
              <Link to="/" onClick={this.hide}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart/" onClick={this.hide}>
                Cart
              </Link>
            </li>
            <li>
              <Link to="/favourites" onClick={this.hide}>
                Favourites
              </Link>
            </li>
            <li>
              <Link to="/history" onClick={this.hide}>
                Search History
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <h5>ACCOUNT</h5>
            </li>
            {loggedOut ? (
              <React.Fragment>
                <li>
                  <Link to="/login" onClick={this.hide}>
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/register" onClick={this.hide}>
                    Create Account
                  </Link>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li>
                  <Link to="/profile/details" onClick={this.hide}>
                    Personal Details
                  </Link>
                </li>
                <li>
                  <Link to="/profile/shipping" onClick={this.hide}>
                    Shipping Address
                  </Link>
                </li>
                <li>
                  <Link to="/profile/payment" onClick={this.hide}>
                    Payment Methods
                  </Link>
                </li>
                <li>
                  <Link to="/profile/saved" onClick={this.hide}>
                    Saved Searches
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={this.handleSignOut}
                    style={{ fontWeight: "bold" }}
                  >
                    Sign Out
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
          <ul>
            <li>
              <h5>CONNECT</h5>
            </li>
            <li>
              <a href="CHANGE">What's New</a>
            </li>
            <li>
              <a href="CHANGE">Join Our Team</a>
            </li>
            <li>
              <a href="CHANGE">Twitter</a>
            </li>
            <li>
              <a href="CHANGE">Facebook</a>
            </li>
          </ul>
          <ul>
            <li>
              <h5>RESOURCES</h5>
            </li>
            <li>
              <a href="CHANGE">Advertising</a>
            </li>
            <li>
              <a href="CHANGE">Terms of Service</a>
            </li>
            <li>
              <a href="CHANGE">Privacy</a>
            </li>
            <li>
              <a href="CHANGE">Cookies Policy</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loggedOut: state.firebase.auth.isEmpty,
    uid: state.firebase.auth.uid
  };
};
const mapDispatchToProps = dispatch => {
  return {
    hideSideMenu: () => {
      dispatch({ type: "HIDE_SIDE_MENU" });
    },
    signOut: () => dispatch(signOut())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);
