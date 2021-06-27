import React from 'react';

import { Nav, NavbarContainer, NavTitle, NavList, NavListItem, NavListLink } from './Navbar.styles';
import { routes } from '../../routes';

export const Navbar: React.FC = () => (
  <Nav>
    <NavbarContainer>
      <NavTitle to="/part1">Distributed Deliver Dashboard</NavTitle>
      <NavList>
        {routes.map(route => (
          <NavListItem key={route.path}>
            <NavListLink to={route.path}>{route.title}</NavListLink>
          </NavListItem>
        ))}
      </NavList>
    </NavbarContainer>
  </Nav>
);
