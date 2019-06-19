import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../actions/authActions";

class RegisterPage extends Component {
  state = {
    forAuth: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: ""
    }
  };
  handleChange = e => {
    this.setState({
      ...this.state,
      forAuth: {
        ...this.state.forAuth,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50})/;
    const errorText = (route, text) => {
      return (document.querySelector(`.${route} p`).textContent = text);
    };
    const { forAuth } = this.state;

    //checks if the email is "valid" through regex stated above
    if (!emailRegex.test(forAuth.email)) {
      errorText("email-error", "PLEASE A ENTER VALID EMAIL");
    } else {
      errorText("email-error", "");
    }

    //check if the passwords have 8 CHARACTERS, 1 UPPERCASE, 1 LOWERCASE, 1 NUMBER
    if (!passwordRegex.test(forAuth.password)) {
      errorText(
        "password-error",
        "MUST CONTAIN MINIMUM: 8 CHARACTERS, 1 UPPERCASE, 1 LOWERCASE, 1 NUMBER"
      );
    } else {
      errorText("password-error", "");
    }

    //check if the passwords match before submitting
    if (forAuth.password !== forAuth.confirmPassword) {
      errorText("confirm-password-error", "PASSWORDS MUST MATCH");
    } else {
      errorText("confirm-password-error", "");
    }

    //check terms of service before submitting
    const termsOfService = document.querySelector(
      ".terms-of-service .checkbox"
    );
    if (!termsOfService.checked) {
      termsOfService.style.border = "red 2px solid";
    } else {
      termsOfService.style.border = "white 2px solid";
    }

    //If no error create new user
    if (
      emailRegex.test(forAuth.email) &&
      passwordRegex.test(forAuth.password) &&
      forAuth.password === forAuth.confirmPassword &&
      termsOfService.checked
    ) {
      this.props.signUp(forAuth);
    }
  };

  componentDidUpdate = () => {
    if (this.props.authError && document.querySelector(".email-error p")) {
      if (this.props.authError === "auth/email-already-in-use") {
        document.querySelector(".email-error p").textContent =
          "THIS EMAIL IS ALREADY IN USE";
      }
    }
  };

  renderInput(name, innerText, type, error) {
    return (
      <div className="modal-login-input login-page-input ">
        <input
          type={type}
          name={name}
          autoComplete="off"
          onChange={this.handleChange}
          required
        />
        <label htmlFor={name} className="label-name">
          <span className="content-name">{innerText}</span>
        </label>
        <div className={"reg-error " + error}>
          <p>{}</p>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.loggedOut) {
      return (
        <div className="register-page">
          <form className="register-container" onSubmit={this.handleSubmit}>
            <div className="my-login-page-header register-modal-header">
              <img
                src="https://i.ibb.co/D1xrXst/user-blank-profile.png"
                alt="LOG IN"
                className="profile-icon"
              />
              <div className="login-header-side">
                <h1>CREATE AN ACCOUNT</h1>
                <p>
                  Already a Member?{" "}
                  <Link to="/login">
                    <u>Sign-in</u>
                  </Link>
                </p>
              </div>
            </div>

            <div className="modal-register-body">
              {this.renderInput("firstName", "FIRST NAME", "text")}
              {this.renderInput("lastName", "LAST NAME", "text")}
              {this.renderInput("email", "EMAIL", "email", "email-error")}
              {this.renderInput(
                "password",
                "PASSWORD",
                "password",
                "password-error"
              )}
              {this.renderInput(
                "confirmPassword",
                "CONFIRM PASSWORD",
                "password",
                "confirm-password-error"
              )}
            </div>
            <div className="my-modal-footer register-page-footer">
              <div className="terms-of-service">
                <input type="checkbox" className="checkbox">
                  {}
                </input>

                <label className="page-forgot-password">
                  I have read and accept the{" "}
                  <a href="CHANGE" className="page-forgot-password">
                    <u>Terms of Service</u>
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="complete-register-button login-complete-login-button"
              >
                REGISTER
              </button>
            </div>
          </form>
        </div>
      );
    } else {
      return <Redirect to="/" />;
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
    signUp: newUser => {
      dispatch(signUp(newUser));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
