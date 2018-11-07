import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from '../containers/HomePage'
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

const App = () => (
  <Router>
    <HomePage history={history}>

    </HomePage>
  </Router>
)

export default App