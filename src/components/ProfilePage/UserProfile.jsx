import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import PersonalDetails from "./PersonalDetails";
import ShippingAddress from "./ShippingAddress";
import PaymentMethod from "./PaymentMethod";
import SavedSearches from "./SavedSearches";
import { signOut } from "../../actions/authActions";

class UserProfile extends Component {
  state = {
    showPersonalDetails: false,
    showShippingAddress: true,
    showPaymentMethod: false,
    showSavedSearches: false
  };

  toggleComponents = e => {
    for (let key in this.state) {
      if (this.state[key]) {
        this.setState({
          [key]: false,
          [e.target.className]: true
        });
      }
    }
  };

  renderToggleList(icon, param, text) {
    return (
      <Link to={"/profile/" + param}>
        <li className={param}>
          <i className={icon} />
          <span>{text}</span>
        </li>
      </Link>
    );
  }

  handleForceUpdate = () => {
    this.forceUpdate();
  };

  handleSignOut = () => {
    this.props.signOut();
  };

  render() {
    const { profile, loggedOut } = this.props;
    const { tab } = this.props.match.params;
    if (!loggedOut) {
      return (
        <div className="top-padding container user-profile">
          <div className="">
            <div className="profile-left-bar">
              <div className="profile-name-and-pic">
                <img
                  src="https://i.ibb.co/D1xrXst/user-blank-profile.png"
                  alt="Profile Icon"
                />
                <h1>{profile.firstName}</h1>
              </div>

              <ul>
                {this.renderToggleList(
                  "fa fa-address-book",
                  "details",
                  "Personal Details"
                )}
                {this.renderToggleList(
                  "fa fa-address-card",
                  "shipping",
                  "Shipping Address"
                )}
                {this.renderToggleList(
                  "fa fa-credit-card",
                  "payment",
                  "Payment Method"
                )}
                {this.renderToggleList(
                  "fa fa-heart",
                  "saved",
                  "Saved Searches"
                )}
                <li className="sign-out" onClick={this.handleSignOut}>
                  <i className="fa fa-sign-out" />
                  <span>Sign Out</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="profile-right-bar col-9">
            {tab === "details" ? (
              <PersonalDetails handleForceUpdate={this.handleForceUpdate} />
            ) : tab === "shipping" ? (
              <ShippingAddress />
            ) : tab === "payment" ? (
              <PaymentMethod />
            ) : tab === "saved" ? (
              <SavedSearches />
            ) : null}
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
    loggedOut: state.firebase.auth.isEmpty,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
