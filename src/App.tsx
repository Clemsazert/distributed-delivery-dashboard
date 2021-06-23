import React from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";

import { FirstPart } from "./pages/firstPart";
import { SecondPart } from "./pages/secondPart";

const routes = [
  {
    path: "/part1",
    component: FirstPart,
    title: "First Part"
  },
  {
    path: "/part2",
    component: SecondPart,
    title: "Second Part"
  }
];

const App: React.FC = () => (
  <Router>
    <Switch>
      {routes.map(({ path, component }) => (
        <Route key={path} path={path} component={component} />
      ))}
      <Redirect to="/part1" />
    </Switch>
  </Router>
);

export default App;
