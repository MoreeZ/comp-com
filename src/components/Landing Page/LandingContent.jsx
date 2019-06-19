import React, { Component } from "react";
import ProductCategory from "./ProductCategory";

class LandingContent extends Component {
  render() {
    return (
      <div className="landing-content container">
        {/* The main landing/Home view -> More content can be added here for marketing */}
        <ProductCategory category="featured-products" />
        <ProductCategory category="recently-viewed" />
        <ProductCategory category="on-sale" />
        <ProductCategory category="popular-searches" />
      </div>
    );
  }
}

export default LandingContent;
