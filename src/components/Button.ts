import styled from 'styled-components';

export const Button = styled.button`
  border-radius: '20px';
  background-color: '#000';
  color: '#fff';
  padding: '10px 28px';
  font-size: '18px';
  outline: none;
  cursor: pointer;
  border: none;
  transition: all 0.5s ease;

  &:hover {
    background-color: '#E38B06';
    transform: translateY(-0.5rem) scale(1.02);
    color: #000;
  }
  &:active {
    transform: translateY(0.5rem);
  }
`;

export const OutlineButton = styled.button`
  border-radius: '30px';
  border: 2px solid #333;
  color: #333;
  outline: none;
  padding: '13px 55px';
  font-size: '18px';
  transition: all 0.5s ease;
  background-color: #fefefe;

  &:hover {
    background-color: #333;
    color: #fff;
    border: none;
    transform: translateY(-0.5rem) scale(1.02);
  }
  &:active {
    transform: translateY(0.5rem);
  }
`;
