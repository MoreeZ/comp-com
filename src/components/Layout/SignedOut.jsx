import React, { Component } from "react";
import { connect } from "react-redux";

class SignedOut extends Component {
  handleShowLogin = () => {
    this.props.showLogin();
  };
  handleShowRegister = () => {
    this.props.showRegister();
  };
  render() {
    return (
      <React.Fragment>
        <button className="sign-in" onClick={this.handleShowLogin}>
          Sign-in
        </button>
        <button className="create-an-account" onClick={this.handleShowRegister}>
          Create an account
        </button>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showLogin: () => {
      dispatch({ type: "SHOW_LOGIN" });
    },
    showRegister: () => {
      dispatch({ type: "SHOW_REGISTER" });
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignedOut);
