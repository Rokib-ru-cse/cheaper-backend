import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { connect } from "react-redux";
import React, { Component } from "react";
import { isUserLoggedIn } from "./store/actions";
import Product from "./containers/Products/index";
import Order from "./containers/Orders/index";
import Category from "./containers/Category/index";
import Page from './containers/Page/index'
import { getAllCategory } from "./store/actions";
import { getInitialData } from "./store/actions/initialData";

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    isUserLoggedIn: () => dispatch(isUserLoggedIn()),
    getAllCategory: () => dispatch(getAllCategory()),
    getInitialData: () => dispatch(getInitialData()),
  };
};

class App extends Component {
  state = {
    flag: true
  }
  componentDidMount() {
    this.props.isUserLoggedIn();
  }
  render() {
    if (this.props.authReducers.authenticate) {
      <Redirect to={"/mern-flipkart-backend/"} />;
    }
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/products" component={Product} />
          <PrivateRoute exact path="/orders" component={Order} />
          <PrivateRoute exact path="/categories" component={Category} />
          <PrivateRoute path="/page" component={Page} />
          <PrivateRoute exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
