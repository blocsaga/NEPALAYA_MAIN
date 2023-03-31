import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = (state) => state.userAssignmentPage || initialState;

export const makeSelectAssignment = () =>
  createSelector(selectDomain, (state) => state.assignment);

export const makeSelectLoading = () =>
  createSelector(selectDomain, (state) => state.loading);
