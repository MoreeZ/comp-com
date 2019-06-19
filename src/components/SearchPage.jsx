import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";

class SearchPage extends Component {
  state = {
    price: { from: 0, to: 0 },
    brands: []
  };
  initialState = this.state;

  applySale = (price, sale) => {
    if (sale > 0) {
      const numberfied = Number(price.replace(/^€\s/g, "").replace(/,/g, ""));
      const finalAmount = numberfied - numberfied * sale;
      const stringified = finalAmount
        .toFixed(2)
        .toString()
        .split("");
      if (stringified.length > 6) {
        stringified.splice(-6, 0, ",");
      }
      return "€ " + stringified.join("");
    } else {
      return price;
    }
  };

  handleChangeBrand = e => {
    if (e.target.checked) {
      this.setState({
        ...this.state,
        brands: [...this.state.brands, e.target.title]
      });
    } else {
      const removedBrand = this.state.brands.filter(
        brand => brand !== e.target.title
      );
      this.setState({
        ...this.state,
        brands: [...removedBrand]
      });
    }
  };
  handleChangePrice = e => {
    this.setState({
      ...this.state,
      price: {
        ...this.state.price,
        [e.target.title]: Number(e.target.value)
      }
    });
  };

  submitPriceFilter = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      price: {
        ...this.state.price,
        from: Number(e.target[0].value),
        to: Number(e.target[1].value)
      }
    });
  };

  handleNumberOnly = e => {
    if (e.which > 31 && (e.which < 48 || e.which > 57)) {
      e.preventDefault();
    }
  };
  nameShortener = string => {
    if (string.length > 100) {
      return string.slice(0, 100) + "...";
    } else {
      return string;
    }
  };

  renderUniqueBrands = products => {
    const arrayOfAllBrands = products.map(prod => prod.details.Brand);
    const uniqueBrands = [...new Set(arrayOfAllBrands)];
    return uniqueBrands.map(brand => (
      <div className="each-brand" key={brand}>
        <label>{brand}</label>
        <input
          type="checkbox"
          className="checkbox"
          title={brand}
          onChange={this.handleChangeBrand}
        >
          {}
        </input>
      </div>
    ));
  };

  mapFilteredProducts = products => {
    const { brands, price } = this.state;
    const numberfyPrice = price =>
      Number(price.replace(/^€\s/g, "").replace(/,/g, ""));
    const minPrice = price.from;
    const maxPrice = price.to;

    const brandFilter = products.filter(
      product => !brands.includes(product.details.Brand)
    );
    brandFilter.length === products.length && (brandFilter.length = 0);

    const priceFilter = products.filter(product => {
      let priceAfterSale = this.applySale(product.price, product.onSale);
      if (maxPrice === 0 && minPrice === 0) {
        return false;
      } else if (maxPrice === 0 && minPrice !== 0) {
        return numberfyPrice(priceAfterSale) <= minPrice;
      } else if (maxPrice !== 0 && minPrice === 0) {
        return numberfyPrice(priceAfterSale) >= maxPrice;
      } else {
        return (
          numberfyPrice(priceAfterSale) <= minPrice ||
          numberfyPrice(priceAfterSale) >= maxPrice
        );
      }
    });

    const productsToFilter = [...new Set([].concat(brandFilter, priceFilter))];
    const filteredProducts = products.filter(
      product => !productsToFilter.includes(product)
    );

    if (JSON.stringify(this.state) === JSON.stringify(this.initialState)) {
      return (
        <React.Fragment>
          <h1>{products.length} Results:</h1>
          <div className="search-render-space">
            {products.map(eachProduct => (
              <div className="each-product" key={eachProduct.id}>
                <Link to={"/product/" + eachProduct.id}>
                  <img src={eachProduct.image} alt="#" />
                  <p className="product-price">
                    {this.applySale(eachProduct.price, eachProduct.onSale)}
                  </p>
                  <p className="product-name">
                    {this.nameShortener(eachProduct.name)}
                  </p>
                  {eachProduct.onSale && eachProduct.onSale > 0 ? (
                    <div className="on-sale-tag">
                      SALE{" "}
                      <span className="on-sale-tag-amount">
                        {eachProduct.onSale * 100}%
                      </span>
                    </div>
                  ) : null}
                </Link>
              </div>
            ))}
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <h1>{filteredProducts.length} Results:</h1>
          <div className="search-render-space">
            {filteredProducts.map(eachProduct => (
              <div className="each-product" key={eachProduct.id}>
                <Link to={"/product/" + eachProduct.id}>
                  <img src={eachProduct.image} alt="#" />
                  <p className="product-price">
                    {this.applySale(eachProduct.price, eachProduct.onSale)}
                  </p>
                  <p className="product-name">
                    {this.nameShortener(eachProduct.name)}
                  </p>
                  {eachProduct.onSale && eachProduct.onSale > 0 ? (
                    <div className="on-sale-tag">
                      SALE <span>{eachProduct.onSale * 100}%</span>
                    </div>
                  ) : null}
                </Link>
              </div>
            ))}
          </div>
        </React.Fragment>
      );
    }
  };

  render() {
    const { productsToRender } = this.props;
    return (
      <div className="container top-padding search-page">
        <div className="searchpage-left-bar">
          {productsToRender && productsToRender.length > 0 && (
            <ul className="sorting-filters">
              <li className="price-filter">
                <h4>Price</h4>
                <form className="from-to" onSubmit={this.submitPriceFilter}>
                  <label className="from">From: </label>
                  <input
                    type="text"
                    title="from"
                    onKeyPress={this.handleNumberOnly}
                  />
                  <label className="to">To: </label>
                  <input
                    type="text"
                    title="to"
                    onKeyPress={this.handleNumberOnly}
                  />
                  <button type="submit">Filter</button>
                </form>
              </li>
              {
                <li className="brand-filter">
                  <h4>Brand</h4>
                  {productsToRender &&
                    this.renderUniqueBrands(productsToRender)}
                </li>
              }
            </ul>
          )}
        </div>
        <div className="searchpage-right-container">
          {productsToRender && this.mapFilteredProducts(productsToRender)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const myProducts = state.firestore.ordered.products;
  const paramsToArray = ownProps.match.params.search_words.split("-");
  if (myProducts) {
    const searchAlg = () => {
      let allResults = [];
      paramsToArray.forEach(wordInSearch => {
        let newRegex;
        if (wordInSearch !== "") {
          newRegex = new RegExp(wordInSearch, "ig");
        }
        //The following three return various products using the given input;
        const findByName = myProducts.filter(product => {
          if (newRegex) {
            return newRegex.test(product.name);
          } else return null;
        });
        const findByDetails = myProducts.filter(product => {
          let myArr = [];
          for (let detail in product.details) {
            if (newRegex) {
              myArr.push(newRegex.test(product.details[detail]));
            }
          }
          if (myArr.includes(true)) {
            return product;
          } else {
            return null;
          }
        });
        const findByTags = myProducts.filter(product => {
          let myArr = [];
          for (let tag in product.tags) {
            if (newRegex) {
              myArr.push(newRegex.test(product.tags[tag]));
            }
          }
          if (myArr.includes(true)) {
            return product;
          } else {
            return null;
          }
        });

        const concatFindings = (name, details, tags) => {
          let myArr = [];
          name.concat(details, tags).forEach(product => {
            if (!myArr.includes(product)) {
              myArr.push(product);
            }
          });
          return myArr;
        };

        allResults.push(concatFindings(findByName, findByDetails, findByTags));
      });
      let resultsNoDuplicates = [];
      allResults[0].concat(allResults[1], allResults[2]).forEach(product => {
        if (!resultsNoDuplicates.includes(product)) {
          resultsNoDuplicates.push(product);
        }
      });

      return resultsNoDuplicates.filter(product => product);
    };
    return {
      productsToRender: searchAlg()
    };
  } else return {};

  // ==================================================
};

export default compose(
  firestoreConnect([{ collection: "products" }]),
  connect(mapStateToProps)
)(SearchPage);
