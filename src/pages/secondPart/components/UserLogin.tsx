import React, { useReducer, Reducer } from 'react';

import { LoginInfo } from '../../../types/User';

import {
  LoginContainer,
  LoginTitle,
  StyledForm,
  StyledInput,
  StyledFormButton
} from './UserLogin.styles';

type reducerAction = {
  field: keyof LoginInfo;
  payload: string;
};

export const UserLogin: React.FC<{ handleLogin: (identifiant: string, password: string) => void }> =
  ({ handleLogin }) => {
    const loginInfoReducer = (
      loginInfo: Partial<LoginInfo> | null,
      action: reducerAction
    ): Partial<LoginInfo> => ({
      ...loginInfo,
      [action.field]: action.payload
    });
    const [loginInfo, dispatch] = useReducer<Reducer<Partial<LoginInfo> | null, reducerAction>>(
      loginInfoReducer,
      null
    );
    const handleChangeValue =
      (field: keyof LoginInfo) => (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ field, payload: event.target.value });
      };
    const handleSubmitLoginForm = () => {
      if (loginInfo && loginInfo.identifiant && loginInfo.password) {
        handleLogin(loginInfo.identifiant, loginInfo.password);
      }
    };
    return (
      <LoginContainer>
        <LoginTitle>Login</LoginTitle>
        <StyledForm>
          <label htmlFor="identifiant">ID:</label>
          <StyledInput
            type="text"
            name="identifiant"
            id="identifiant"
            onChange={handleChangeValue('identifiant')}
          />
          <label htmlFor="password">Password:</label>
          <StyledInput
            type="password"
            name="password"
            id="password"
            onChange={handleChangeValue('password')}
          />
          <StyledFormButton type="button" onClick={handleSubmitLoginForm}>
            Login
          </StyledFormButton>
        </StyledForm>
      </LoginContainer>
    );
  };
