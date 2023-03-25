import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the notificationManagePage state domain
 */

export const selectNotificationPageDomain = (state) =>
  state.notificationManagePage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(selectNotificationPageDomain, (substate) => substate.all);

export const makeSelectOne = () =>
  createSelector(selectNotificationPageDomain, (substate) => substate.one);

export const makeSelectQuery = () =>
  createSelector(selectNotificationPageDomain, (substate) => substate.query);

export const makeSelectCategory = () =>
  createSelector(selectNotificationPageDomain, (state) => state.category);

export const makeSelectLoading = () =>
  createSelector(selectNotificationPageDomain, (state) => state.loading);

export const makeSelectErrors = () =>
  createSelector(selectNotificationPageDomain, (state) => state.errors);

/**
 * Default selector used by NotificationPage
 */

const makeSelectNotificationPage = () =>
  createSelector(selectNotificationPageDomain, (substate) => substate);

export default makeSelectNotificationPage;
