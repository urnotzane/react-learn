import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from './store/store'
import LoginForm from "./containers/LoginForm";
import HomePage from "./containers/HomePage";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route path="/Home" component={HomePage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
