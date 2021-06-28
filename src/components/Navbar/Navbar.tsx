import React from 'react';

import { Nav, NavbarContainer, NavTitle, NavList, NavListItem, NavListLink } from './Navbar.styles';

export const Navbar: React.FC = () => (
  <div>
    <Nav>
      <NavbarContainer>
        <NavTitle to="/part1">Distributed Deliver Dashboard</NavTitle>
        <NavList>
          <NavListItem>
            <NavListLink to="/part1">Part 1</NavListLink>
          </NavListItem>
          <NavListItem>
            <NavListLink to="/part2">Part 2</NavListLink>
          </NavListItem>
        </NavList>
      </NavbarContainer>
    </Nav>
  </div>
);
