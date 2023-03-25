import * as types from './constants';

export const loadSectionRequest = (payload) => ({
  type: types.LOAD_SECTION_REQUEST,
  payload,
});
export const loadSectionSuccess = (payload) => ({
  type: types.LOAD_SECTION_SUCCESS,
  payload,
});
export const loadSectionFailure = (payload) => ({
  type: types.LOAD_SECTION_FAILURE,
  payload,
});
