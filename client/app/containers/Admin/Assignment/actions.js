/*
 *
 * AdsListingPage actions
 *
 */

import * as types from './constants';

export const loadAllRequest = (payload) => ({
  type: types.LOAD_ALL_REQUEST,
  payload,
});
export const loadAllSuccess = (payload) => ({
  type: types.LOAD_ALL_SUCCESS,
  payload,
});
export const loadAllFailure = (payload) => ({
  type: types.LOAD_ALL_FAILURE,
  payload,
});

export const loadUsersRequest = (payload) => ({
  type: types.LOAD_USERS_REQUEST,
  payload,
});
export const loadUsersSuccess = (payload) => ({
  type: types.LOAD_USERS_SUCCESS,
  payload,
});
export const loadUsersFailure = (payload) => ({
  type: types.LOAD_USERS_FAILURE,
  payload,
});

export const setUserValue = (payload) => ({
  type: types.SET_USER_VALUE,
  payload,
});

export const loadOneRequest = (payload) => ({
  type: types.LOAD_ONE_REQUEST,
  payload,
});
export const loadOneSuccess = (payload) => ({
  type: types.LOAD_ONE_SUCCESS,
  payload,
});
export const loadOneFailure = (payload) => ({
  type: types.LOAD_ONE_FAILURE,
  payload,
});

export const addEditRequest = (payload) => ({
  type: types.ADD_EDIT_REQUEST,
  payload,
});
export const addEditSuccess = (payload) => ({
  type: types.ADD_EDIT_SUCCESS,
  payload,
});
export const addEditFailure = (payload) => ({
  type: types.ADD_EDIT_FAILURE,
  payload,
});

export const deleteOneRequest = (payload) => ({
  type: types.DELETE_ONE_REQUEST,
  payload,
});
export const deleteOneSuccess = (payload) => ({
  type: types.DELETE_ONE_SUCCESS,
  payload,
});
export const deleteOneFailure = (payload) => ({
  type: types.DELETE_ONE_FAILURE,
  payload,
});

export const setOneValue = (payload) => ({
  type: types.SET_ONE_VALUE,
  payload,
});
export const clearOne = () => ({
  type: types.CLEAR_ONE,
});

export const setQueryValue = (payload) => ({
  type: types.SET_QUERY_VALUE,
  payload,
});
export const clearQuery = () => ({
  type: types.CLEAR_QUERY,
});
export const clearErrors = () => ({
  type: types.CLEAR_ERRORS,
});
export const setMetaTagValue = (payload) => ({
  type: types.SET_META_TAG_VALUE,
  payload,
});

export const setShowForm = (payload) => ({
  type: types.SET_SHOW_FORM,
  payload,
});
