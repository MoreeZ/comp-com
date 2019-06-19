import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="footer container-fluid">
        <div className="links">
          <ul>
            <li>CUSTOMER SERVICE</li>
            <li>
              <a href="CHANGE">Track an order</a>
            </li>
            <li>
              <a href="CHANGE">Return an Item</a>
            </li>
            <li>
              <a href="CHANGE">Return Policy</a>
            </li>
            <li>
              <a href="CHANGE">Privacy and Security</a>
            </li>
            <li>
              <a href="CHANGE">Feedback</a>
            </li>
          </ul>
          <ul className="my-account">
            <li>MY ACCOUNT</li>
            <li>
              <a href="CHANGE">Login/Register</a>
            </li>
            <li>
              <a href="CHANGE">My Dashboard</a>
            </li>
            <li>
              <a href="CHANGE">Order History</a>
            </li>
            <li>
              <a href="CHANGE">My Returns</a>
            </li>
            <li>
              <a href="CHANGE">Wish List</a>
            </li>
            <li>
              <a href="CHANGE">Notification Settings</a>
            </li>
          </ul>
          <ul>
            <li>OUR COMPANY</li>
            <li>
              <a href="CHANGE">About comp.com</a>
            </li>
            <li>
              <a href="CHANGE">Open Hours & Locations</a>
            </li>
            <li>
              <a href="CHANGE">Careers</a>
            </li>
            <li>
              <a href="CHANGE">News</a>
            </li>
            <li>
              <a href="CHANGE">Testimonials</a>
            </li>
          </ul>
          <ul>
            <li>TOOLS & RESOURCES</li>
            <li>
              <a href="CHANGE">Shipping Calculator</a>
            </li>
            <li>
              <a href="CHANGE">Site Map</a>
            </li>
            <li>
              <a href="CHANGE">Shop by Brand</a>
            </li>
            <li>
              <a href="CHANGE">Rebates</a>
            </li>
            <li>
              <a href="CHANGE">Product Reviews</a>
            </li>
          </ul>
        </div>
        <p className="copyright">
          Policy & Agreement | Privacy Policy | Cookie Policy | Manage Cookie |
          Your Information © 2000-2019 comp.com All rights reserved.{" "}
        </p>
      </div>
    );
  }
}

export default Footer;
