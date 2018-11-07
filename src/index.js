import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from './store/store'
import LoginForm from "./containers/LoginForm";
import HomePage from "./components/App";
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route path="/Home" component={HomePage} />
        </Switch>
      </Router>
    </Provider>
  </LocaleProvider>,
  document.getElementById("root")
);
