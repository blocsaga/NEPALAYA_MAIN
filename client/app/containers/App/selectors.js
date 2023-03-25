import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRouter = (state) => state.router;
export const reduxKey = 'global';

export const makeSelectLocation = () =>
  createSelector(selectRouter, (routerState) => routerState.location);

const selectGlobal = (state) => state[reduxKey] || initialState;

export const makeSelectIsAuthenticated = () =>
  createSelector(selectGlobal, (state) => !!state.token);

export const makeSelectToken = () =>
  createSelector(selectGlobal, (state) => state.token);

export const makeSelectUser = () =>
  createSelector(selectGlobal, (state) => state.user);

export const makeSelectUserIsAdmin = () =>
  createSelector(makeSelectUser(), (state) => state.isAdmin);

export const makeSelectRoles = () =>
  createSelector(makeSelectUser(), (state) => state.roles);

export const makeSelectMedia = () =>
  createSelector(selectGlobal, (state) => state.media);

export const makeSelectNotifications = () =>
  createSelector(selectGlobal, (state) => state.notifications);

export const makeSelectAccess = () =>
  createSelector(selectGlobal, (state) => state.access);

export const makeSelectShowExpired = () =>
  createSelector(selectGlobal, (state) => state.showExpired);
