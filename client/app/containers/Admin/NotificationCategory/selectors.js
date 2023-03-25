import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminNotificationCategoryManagePage state domain
 */

const selectNotificationCategoryDomain = (state) =>
  state.adminNotificationCategoryManagePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NotificationCategory
 */

export const makeSelectAll = () =>
  createSelector(selectNotificationCategoryDomain, (substate) => substate.all);

export const makeSelectQuery = () =>
  createSelector(
    selectNotificationCategoryDomain,
    (substate) => substate.query,
  );
export const makeSelectOne = () =>
  createSelector(selectNotificationCategoryDomain, (substate) => substate.one);

export const makeSelectCount = () =>
  createSelector(
    selectNotificationCategoryDomain,
    (substate) => substate.count,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectNotificationCategoryDomain,
    (substate) => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(selectNotificationCategoryDomain, (state) => state.errors);
