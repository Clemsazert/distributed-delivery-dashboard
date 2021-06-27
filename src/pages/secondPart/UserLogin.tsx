import React, { useReducer, Reducer } from 'react';

import { LoginInfo } from '../../types/User';

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
    const handleClickLogin = () => {
      if (loginInfo && loginInfo.identifiant && loginInfo.password) {
        handleLogin(loginInfo.identifiant, loginInfo.password);
      }
    };
    return (
      <form>
        <label htmlFor="identifiant">
          Enter your identifiant:
          <input
            type="text"
            name="identifiant"
            id="identifiant"
            onChange={handleChangeValue('identifiant')}
          />
        </label>
        <label htmlFor="password">
          Enter your password:
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChangeValue('password')}
          />
        </label>
        <button onClick={handleClickLogin} type="button">
          Login
        </button>
      </form>
    );
  };
