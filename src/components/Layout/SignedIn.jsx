import React, { Component } from "react";
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";
import { Link } from "react-router-dom";

class SignedIn extends Component {
  handleHideLogout = () => {
    this.props.hideLogout();
  };
  render() {
    const { profile } = this.props;
    return (
      <React.Fragment>
        <Link
          to="/profile/details"
          className="sign-in"
          style={{ textDecoration: "none", color: "white" }}
        >
          <span>{profile.firstName && profile.firstName}</span>
        </Link>
        <img
          src="https://i.ibb.co/D1xrXst/user-blank-profile.png"
          alt="profile"
          className="signed-in-profile-pic"
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    showLogoutValue: state.live.showLogout,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut()),
    hideLogout: () => {
      dispatch({ type: "HIDE_LOGOUT" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignedIn);
