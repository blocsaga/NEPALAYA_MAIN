import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = (state) => state.userNotificationPage || initialState;

export const makeSelectNotification = () =>
  createSelector(selectDomain, (state) => state.notification);

export const makeSelectLoading = () =>
  createSelector(selectDomain, (state) => state.loading);
