import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = (state) => state.userSectionPage || initialState;

export const makeSelectSection = () =>
  createSelector(selectDomain, (state) => state.section);

export const makeSelectLoading = () =>
  createSelector(selectDomain, (state) => state.loading);
