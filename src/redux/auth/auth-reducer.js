import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import authActions from './auth-actions';

const initialUserState = { name: null, email: null };

const user = createReducer(initialUserState, {
  [authActions.registerSeccess]: (_, { payload }) => payload.user,
  [authActions.loginSeccess]: (_, { payload }) => payload.user,
  [authActions.logoutSeccess]: () => initialUserState,
  [authActions.getCurrentUserSuccess]: (_, { payload }) => payload,
});

const token = createReducer(null, {
  [authActions.registerSeccess]: (_, { payload }) => payload.token,
  [authActions.loginSeccess]: (_, { payload }) => payload.token,
  [authActions.logoutSeccess]: () => null,
});

const error = createReducer(null, {
  [authActions.registerError]: (_, { payload }) => payload,
  [authActions.loginError]: (_, { payload }) => payload,
  [authActions.logoutError]: (_, { payload }) => payload,
  [authActions.getCurrentUserError]: (_, { payload }) => payload,
});

const isAuthenticated = createReducer(false, {
  [authActions.registerSeccess]: () => true,
  [authActions.loginSeccess]: () => true,
  [authActions.getCurrentUserSuccess]: () => true,
  [authActions.registerError]: () => false,
  [authActions.loginError]: () => false,
  [authActions.getCurrentUserError]: () => false,
});

export default combineReducers({
  user,
  token,
  isAuthenticated,
  error,
});
