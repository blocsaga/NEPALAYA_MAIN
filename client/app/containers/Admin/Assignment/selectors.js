import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the assignmentPage state domain
 */

export const selectAssignmentPageDomain = (state) =>
  state.assignmentListingPage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(selectAssignmentPageDomain, (substate) => substate.all);

export const makeSelectUsers = () =>
  createSelector(selectAssignmentPageDomain, (substate) => substate.users);

export const makeSelectShowForm = () =>
  createSelector(selectAssignmentPageDomain, (substate) => substate.showForm);

export const makeSelectOne = () =>
  createSelector(selectAssignmentPageDomain, (substate) => substate.one);

export const makeSelectQuery = () =>
  createSelector(selectAssignmentPageDomain, (substate) => substate.query);

export const makeSelectLoading = () =>
  createSelector(selectAssignmentPageDomain, (substate) => substate.loading);

export const makeSelectErrors = () =>
  createSelector(selectAssignmentPageDomain, (state) => state.errors);

export const makeSelectMetaTag = () =>
  createSelector(selectAssignmentPageDomain, (state) => state.tempMetaTag);

/**
 * Default selector used by assignmentPage
 */

const makeSelectAssignmentPage = () =>
  createSelector(selectAssignmentPageDomain, (substate) => substate);

export default makeSelectAssignmentPage;
