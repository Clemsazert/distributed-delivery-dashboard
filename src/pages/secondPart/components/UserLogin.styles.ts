import styled from 'styled-components';

export const LoginContainer = styled.div`
  max-width: 50%;
  max-height: 300px;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.grey};
  padding: 20px 30px;
`;

export const LoginTitle = styled.h4`
  font-weight: 400;
  font-size: ${props => props.theme.fontSizes.large}px;
  margin-top: 0;
  margin-bottom: ${props => props.theme.gridUnit * 2}px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const StyledFormButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  border: 0;
  border-radius: 10px;
  width: 100px;
  height: 30px;
  color: ${props => props.theme.colors.white};
  font-weight: 800;
  box-shadow: ${props => props.theme.shadows.default};
`;

export const StyledInput = styled.input`
  border-radius: 3px;
  padding: 5px 10px;
  max-width: 250px;
  margin-bottom: ${props => props.theme.gridUnit}px;
  font-family: inherit;
`;
