import React, { Component } from "react";
import { connect } from "react-redux";
import { saveShippingAddress } from "../../actions/profileActions";

class ShippingAddress extends Component {
  state = {
    Country: false,
    "Full Name": false,
    "Line 1": false,
    "Line 2": false,
    "Post Code": false,
    "State/County": false,
    "Town/City": false,
    submitAddress: {
      Country: "",
      "Full Name": "",
      "Line 1": "",
      "Line 2": "",
      "Post Code": "",
      "State/County": "",
      "Town/City": ""
    },
    editToggle: false
  };

  getKeys(myobject) {
    let keys = [];
    for (let eachKey in myobject) {
      if (myobject.hasOwnProperty(eachKey)) {
        keys.push(eachKey);
      }
    }
    return keys;
  }

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

  handleChange = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      submitAddress: {
        ...this.state.submitAddress,
        [e.target.id]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.saveShippingAddress(this.state.submitAddress);
    this.toggleEdit();
  };

  toggleEdit = () => {
    if (this.state.editToggle) {
      this.setState({
        ...this.state,
        editToggle: false
      });
    } else {
      this.setState({
        ...this.state,
        editToggle: true
      });
    }
  };

  render() {
    const { loggedOut, shippingAddress } = this.props;
    let reorderedAddress = {};
    if (shippingAddress) {
      reorderedAddress = {
        "Full Name": shippingAddress["Full Name"],
        "Line 1": shippingAddress["Line 1"],
        "Line 2": shippingAddress["Line 2"],
        "Town/City": shippingAddress["Town/City"],
        "State/County": shippingAddress["State/County"],
        Country: shippingAddress.Country,
        "Post Code": shippingAddress["Post Code"]
      };
    }
    return (
      <div className="profile-right-container">
        <h1>SHIPPING ADDRESS</h1>
        {!loggedOut && this.state.editToggle ? (
          <form className="personal-details" onSubmit={this.handleSubmit}>
            {this.getKeys(reorderedAddress).map(eachLine => (
              <div className="profile-each-detail" key={eachLine}>
                <label className="label-name">{eachLine}</label>
                <span className="focus-underline">
                  {eachLine === "Line 2" || eachLine === "Post Code" ? (
                    <input
                      type="text"
                      id={eachLine}
                      placeholder="optional"
                      onChange={this.handleChange}
                    />
                  ) : (
                    <input
                      className="req-input"
                      type="text"
                      id={eachLine}
                      onChange={this.handleChange}
                      defaultValue={reorderedAddress[eachLine]}
                      required
                    />
                  )}
                  <div>{}</div>
                </span>
              </div>
            ))}
            <div className="buttons">
              <button type="submit">SAVE</button>
              <button onClick={this.toggleEdit}>CANCEL</button>
            </div>
          </form>
        ) : (
          <div className="personal-details" onSubmit={this.handleSubmit}>
            {this.getKeys(reorderedAddress).map(eachLine => (
              <div className="profile-each-detail" key={eachLine}>
                <label className="label-name">{eachLine}</label>
                <span>{reorderedAddress[eachLine]}</span>
              </div>
            ))}
            <div className="buttons">
              <button onClick={this.toggleEdit}>EDIT</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loggedOut: state.firebase.auth.isEmpty,
    shippingAddress: state.firebase.profile.shippingAddress
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveShippingAddress: shippingAddress => {
      dispatch(saveShippingAddress(shippingAddress));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShippingAddress);
