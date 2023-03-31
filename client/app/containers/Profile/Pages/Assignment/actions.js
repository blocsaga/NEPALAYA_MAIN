import * as types from './constants';

export const loadAssignmentRequest = (payload) => ({
  type: types.LOAD_ASSIGNMENT_REQUEST,
  payload,
});
export const loadAssignmentSuccess = (payload) => ({
  type: types.LOAD_ASSIGNMENT_SUCCESS,
  payload,
});
export const loadAssignmentFailure = (payload) => ({
  type: types.LOAD_ASSIGNMENT_FAILURE,
  payload,
});
