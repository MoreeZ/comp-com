import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signIn } from "../../actions/authActions";

class LoginModal extends Component {
  state = {
    email: "",
    password: ""
  };
  handleHideLogin = () => {
    this.props.hideLogin();
  };
  handleSubmit = e => {
    e.preventDefault();

    this.props.signIn(this.state);
    setTimeout(() => {
      if (this.props.authError) {
        document.querySelector(".error-space p").textContent =
          "WRONG EMAIL OR PASSWORD";
      } else {
        this.handleHideLogin();
      }
    }, 1000);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    if (this.props.loggedOut) {
      return (
        <Modal
          show={this.props.showLogin}
          onHide={this.handleHideLogin}
          className="Modal Login-Modal"
        >
          <div className="my-modal-header">
            <div className="xbutton-shadow">
              <img
                src="https://i.ibb.co/Xj6RZ90/xbutton.png"
                alt="X"
                className="x-button"
                onClick={this.handleHideLogin}
              />
            </div>
            <img
              src="https://i.ibb.co/D1xrXst/user-blank-profile.png"
              alt="LOG IN"
              className="profile-icon"
            />
            <h4>SIGN-IN</h4>
            <p>
              Not a Member?{" "}
              <Link to="/register">
                <u onClick={this.handleHideLogin}>Create an Account</u>
              </Link>
            </p>
            <div className="error-space">
              <p>{this.props.authError && "WRONG EMAIL OR PASSWORD"}</p>
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="modal-login-body">
              <div className="modal-login-input">
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
              <div className="modal-login-input">
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
            <div className="my-modal-footer">
              <button type="submit" className="complete-login-button">
                LOGIN
              </button>
              <a href="CHANGE" className="forgot-password">
                <u>Forgot your password?</u>
              </a>
            </div>
          </form>
        </Modal>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    showLogin: state.live.modals.showLogin,
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
)(LoginModal);
