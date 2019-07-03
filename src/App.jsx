import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

//Components
import NavBar from "./components/Layout/NavBar";
import Footer from "./components/Layout/Footer";
import LoginModal from "./components/Popups/LoginModal";
import RegisterModal from "./components/Popups/RegisterModal";
import LandingPage from "./components/Landing Page/LandingContent";
import SideMenu from "./components/Popups/SideMenu";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Shopping Cart/Cart";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import UserProfile from "./components/ProfilePage/UserProfile";
import SearchPage from "./components/SearchPage";
import FavouriteProducts from "./components/FavouriteProducts";
import History from "./components/History";

//Inital render
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={LandingPage} />
          <Route path="/detail" component={ProductDetail} />
          <Route path="/product/:product_id" component={ProductDetail} />
          <Route path="/cart" component={Cart} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/profile/:tab" component={UserProfile} />
          <Route path="/search/:search_words" component={SearchPage} />
          <Route path="/favourites" component={FavouriteProducts} />
          <Route path="/history" component={History} />
          <Footer />
          <LoginModal />
          <RegisterModal />
          <SideMenu />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
