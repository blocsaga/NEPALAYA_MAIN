import * as types from './constants';

export const loadNotificationRequest = (payload) => ({
  type: types.LOAD_NOTIFICATION_REQUEST,
  payload,
});
export const loadNotificationSuccess = (payload) => ({
  type: types.LOAD_NOTIFICATION_SUCCESS,
  payload,
});
export const loadNotificationFailure = (payload) => ({
  type: types.LOAD_NOTIFICATION_FAILURE,
  payload,
});
