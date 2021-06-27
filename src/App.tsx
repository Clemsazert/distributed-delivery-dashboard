import React from 'react';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { theme } from './lib/theme';
import { Navbar } from './components';
import { routes } from './routes';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Navbar />
      <Switch>
        {routes.map(({ path, component }) => (
          <Route key={path} path={path} component={component} />
        ))}
        <Redirect to="/part1" />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
