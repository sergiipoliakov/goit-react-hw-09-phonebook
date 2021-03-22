import { createAction } from '@reduxjs/toolkit';

const registerRequest = createAction('auth/registerRequest');
const registerSeccess = createAction('auth/registerSeccess');
const registerError = createAction('auth/registerError');

const loginRequest = createAction('auth/loginRequest');
const loginSeccess = createAction('auth/loginSeccess');
const loginError = createAction('auth/loginError');

const logoutRequest = createAction('auth/logoutRequest');
const logoutSeccess = createAction('auth/logoutSeccess');
const logoutError = createAction('auth/logoutError');

const getCurrentUserRequest = createAction('auth/getCurrentRequest');
const getCurrentUserSuccess = createAction('auth/getCurrentSeccess');
const getCurrentUserError = createAction('auth/getCurrentError');

export default {
  registerRequest,
  registerSeccess,
  registerError,
  loginRequest,
  loginSeccess,
  loginError,
  logoutRequest,
  logoutSeccess,
  logoutError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
};
