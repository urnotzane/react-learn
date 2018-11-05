import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from './store/store'
import LoginForm from "./containers/LoginForm";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={LoginForm} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
