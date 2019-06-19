import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { clearHistory } from "../actions/otherUserActions";
import Modal from "react-bootstrap/Modal";

class History extends Component {
  state = {
    showConfirm: false
  };
  nameShortener = string => {
    if (string.length > 100) {
      return string.slice(0, 100) + "...";
    } else {
      return string;
    }
  };

  reduceDatesToMonths = totalHistory => {
    let allDates = totalHistory.map(each => each.date.replace(/^\d\d\//g, ""));
    let newAllDates = allDates.filter(
      (item, index) => allDates.indexOf(item) === index
    );
    return newAllDates;
  };

  updateHisotry = (value, allProducts, totalHistory) => {
    const returnSpecifiedHistory = totalHistory.map(eachDay => {
      if (value === eachDay.date.replace(/^\d\d\//g, "")) {
        return (
          <div className="each-date" key={eachDay.date}>
            <h2 className="date-heading">{eachDay.date}</h2>
            <div className="history-render-space">
              {eachDay.logs.map(productID => {
                let eachProduct = allProducts.find(
                  product => product.id === productID
                );
                return (
                  <Link to={"/product/" + eachProduct.id} key={eachProduct.id}>
                    <p className="history-product-name">{eachProduct.name}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      } else return null;
    });
    return returnSpecifiedHistory;
  };

  handleChangeInput = () => {
    this.forceUpdate();
  };

  handleClearHistory = () => {
    this.props.clearHistory();
    this.handleCloseConfirm();
  };

  handleOpenConfirm = () => {
    this.setState({
      ...this.state,
      showConfirm: true
    });
  };
  handleCloseConfirm = () => {
    this.setState({
      ...this.state,
      showConfirm: false
    });
  };

  render() {
    const { totalHistory, allProducts } = this.props;
    const dateSelect = document.querySelector(".month-and-year");
    return (
      <div className="top-padding container my-history">
        <div className="each-date-header">
          <h1>YOUR HISTORY</h1>
          <div className="date-header-right">
            <span className="clear-history" onClick={this.handleOpenConfirm}>
              Clear History
            </span>
            <select
              name="month-and-year"
              onChange={this.handleChangeInput}
              className="month-and-year"
            >
              {totalHistory &&
                this.reduceDatesToMonths(totalHistory).map(eachDate => (
                  <option key={eachDate} value={eachDate}>
                    {eachDate}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div id="history-body">
          {totalHistory &&
            this.updateHisotry(
              dateSelect
                ? dateSelect.value
                : totalHistory[0]
                ? totalHistory[0].date.replace(/^\d\d\//g, "")
                : "",
              allProducts,
              totalHistory
            )}
        </div>
        <Modal show={this.state.showConfirm} className="Modal Login-Modal">
          <div className="History-Modal">
            <span>
              Are you sure you want to clear all history?
              <br />
              This cannot be undone.
            </span>
            <div className="confirm-footer">
              <span onClick={this.handleClearHistory}>Clear</span>
              <span onClick={this.handleCloseConfirm}>Cancel</span>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (state.firebase.auth.isEmpty) {
    return {
      totalHistory: JSON.parse(localStorage.getItem("history")),
      allProducts: state.firestore.ordered.products
    };
  } else {
    return {
      totalHistory: state.firebase.profile.totalHistory,
      allProducts: state.firestore.ordered.products
    };
  }
};

const mapDispatchToProps = dispatch => {
  return {
    clearHistory: () => {
      dispatch(clearHistory());
    }
  };
};

export default compose(
  firestoreConnect([{ collection: "products" }]),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(History);
