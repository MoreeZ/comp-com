import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { signIn } from "../actions/authActions";

class LoginPage extends Component {
  state = {
    email: "",
    password: ""
  };
  handleHideLogin = () => {
    this.props.hideLogin();
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };
  render() {
    if (!this.props.loggedOut) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="login-page">
          <form onSubmit={this.handleSubmit} className="login-container">
            <div className="my-login-page-header">
              <img
                src="https://i.ibb.co/D1xrXst/user-blank-profile.png"
                alt="LOG IN"
                className="profile-icon"
              />
              <div className="login-header-side">
                <h1>SIGN-IN</h1>
                <p>
                  Not a Member?{" "}
                  <Link to="/register">
                    <u>Create an Account</u>
                  </Link>
                </p>
              </div>
            </div>

            <div className="modal-login-body">
              <div className="modal-login-input login-page-input">
                <input
                  type="email/text"
                  name="email"
                  autoComplete="off"
                  onChange={this.handleChange}
                  required
                />
                <label htmlFor="email" className="label-name">
                  <span className="content-name">EMAIL</span>
                </label>
              </div>
              <div className="modal-login-input login-page-input">
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  onChange={this.handleChange}
                  required
                />
                <label htmlFor="password" className="label-name">
                  <span className="content-name">PASSWORD</span>
                </label>
              </div>
            </div>
            <div className="my-modal-footer login-page-footer">
              <div className="error-space-on-page">
                <p>{this.props.authError && "WRONG EMAIL OR PASSWORD"}</p>
              </div>
              <button
                type="submit"
                className="complete-login-button"
                id="page-complete-login-button"
              >
                LOGIN
              </button>
              <Link to="/" className="page-forgot-password">
                <u>Forgot your password?</u>
              </Link>
            </div>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    loggedOut: state.firebase.auth.isEmpty
  };
};
const mapDispatchToProps = dispatch => {
  return {
    hideLogin: () => {
      dispatch({ type: "HIDE_LOGIN" });
    },
    signIn: creds => dispatch(signIn(creds))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
