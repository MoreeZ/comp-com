import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateFirstNameAction,
  updateLastNameAction,
  updateEmailAction,
  updatePhoneNumberAction
} from "../../actions/profileActions";

//This component bit of a mess. Could certainly be tidied up.
class PersonalDetails extends Component {
  state = {
    firstName: false,
    lastName: false,
    phoneNumber: false,
    email: false
  };

  handleEditX = e => {
    if (this.state[e.target.title]) {
      this.setState({
        ...this.state,
        [e.target.title]: false
      });
    } else {
      this.setState({
        ...this.state,
        [e.target.title]: true
      });
    }
  };

  firstName = e => {
    e.preventDefault();
    this.props.updateFistName(e.target[0].value);
    const titleOfOpenedInput = e.target[0].parentElement.lastChild.title;
    this.setState({
      ...this.state,
      [titleOfOpenedInput]: false
    });
  };

  lastName = e => {
    e.preventDefault();
    this.props.updateLastName(e.target[0].value);
    const titleOfOpenedInput = e.target[0].parentElement.lastChild.title;
    this.setState({
      ...this.state,
      [titleOfOpenedInput]: false
    });
  };

  email = e => {
    e.preventDefault();
    const titleOfOpenedInput = e.target[0].parentElement.lastChild.title;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(e.target[0].value)) {
      this.props.updateEmail(e.target[0].value);
      this.setState({
        ...this.state,
        [titleOfOpenedInput]: false
      });
    } else window.alert("Please enter a valid email");
  };

  handleNumberOnly = evt => {
    if (evt.which > 31 && (evt.which < 48 || evt.which > 57)) {
      evt.preventDefault();
    }
  };
  phoneNumber = e => {
    e.preventDefault();
    if (e.target[0].value.length >= 10 && e.target[0].value.length <= 16) {
      this.props.updatePhoneNumber(e.target[0].value);
      const titleOfOpenedInput = e.target[0].parentElement.lastChild.title;
      this.setState({
        ...this.state,
        [titleOfOpenedInput]: false
      });
    }
  };

  handleFocusInput = e => {
    e.target.focus();
  };

  renderEachProfileDetail(profileDetail, labelText, title, isNumber) {
    return (
      <form onSubmit={this[title]} className="profile-each-detail" key={title}>
        <label className="label-name">{labelText}</label>
        <span>
          {this.state[title] ? (
            <input
              type="text"
              placeholder={profileDetail}
              onKeyPress={isNumber && this.handleNumberOnly}
              onPointerOver={this.handleFocusInput}
            />
          ) : profileDetail === "" ? (
            "Add a phone number"
          ) : (
            profileDetail
          )}
          <i className="fa fa-edit" title={title} onClick={this.handleEditX} />
        </span>
      </form>
    );
  }

  render() {
    const { profile } = this.props;
    if (profile.firstName) {
      return (
        <div className="profile-right-container">
          <h1>PERSONAL DETAILS</h1>
          <div className="personal-details">
            {this.renderEachProfileDetail(
              profile.firstName,
              "First Name: ",
              "firstName"
            )}
            {this.renderEachProfileDetail(
              profile.lastName,
              "Last Name: ",
              "lastName"
            )}
            {this.renderEachProfileDetail(
              profile.email,
              "Email Address: ",
              "email"
            )}
            {this.renderEachProfileDetail(
              profile.phoneNumber,
              "Phone Number: ",
              "phoneNumber",
              true
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="loading-screen">
          <div className="loading-area">
            <div className="loader">{}</div>
            <span>Loading...</span>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateFistName: newFirstName => {
      dispatch(updateFirstNameAction(newFirstName));
    },
    updateLastName: newLastName => {
      dispatch(updateLastNameAction(newLastName));
    },
    updateEmail: newEmail => {
      dispatch(updateEmailAction(newEmail));
    },
    updatePhoneNumber: newPhoneNumber => {
      dispatch(updatePhoneNumberAction(newPhoneNumber));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalDetails);
