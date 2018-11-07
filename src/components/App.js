import React from "react";
import { Route } from "react-router-dom";
import HomePage from '../containers/HomePage'
import routes from '../router'

const App = () => (
  <HomePage>
    {routes.map(item => (
      <Route exact key={item.name} path={item.path} component={item.component} />
    ))}
  </HomePage>
)

export default App