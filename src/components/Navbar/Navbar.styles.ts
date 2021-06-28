import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from '../Container';

export const Nav = styled.nav`
  font-size: ${props => props.theme.fontSizes.big}px;
  position: sticky;
  top: 0;
  z-index: 999;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: ${props => props.theme.shadows.default};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavbarContainer = styled(Container)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  ${Container};
`;

export const NavTitle = styled(Link)`
  color: ${props => props.theme.colors.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: ${props => props.theme.fontSizes.big}px;
  font-weight: 600;
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.09);
  }
`;

export const NavList = styled.ul`
  display: flex;
  align-items: center;
  text-align: center;
`;

export const NavListItem = styled.li`
  list-style: none;
  height: 60px;
`;

export const NavListLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  font-size: ${props => props.theme.fontSizes.large}px;
  color: ${props => props.theme.colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 2rem;
  height: 100%;
  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.orange};
    transform: scale(1.09);
  }
`;
