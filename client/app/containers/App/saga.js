import {
  call,
  takeEvery,
  takeLatest,
  select,
  put,
  takeLeading,
  delay,
} from 'redux-saga/effects';
import Api from '../../utils/Api';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectToken } from './selectors';
import { push } from 'redux-first-history';

function* loadMedia(action) {
  yield call(
    Api.get(
      `media/${action.payload}`,
      actions.loadMediaSuccess,
      actions.loadMediaFailure,
    ),
  );
}

function* logOut() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(`user/logout`, actions.logoutSuccess, actions.logoutFailure, token),
  );
}

function* logOutSuccessFunc() {
  yield put(push('/login'));
}

function* sessionExpired() {
  // token expired case, logout user and show alert that relogin is required
  // yield put(actions.logoutSuccess());

  const snackbarData = {
    message: 'User Session expired. please login again',
    options: {
      variant: 'warning',
    },
  };
  yield put(actions.enqueueSnackbar(snackbarData));
  yield delay(2000);
}

function* networkError() {
  // token expired case, logout user and show alert that relogin is required

  const snackbarData = {
    message: 'Something went wrong. Please check your network!',
    options: {
      variant: 'warning',
    },
  };
  yield put(actions.enqueueSnackbar(snackbarData));
  yield delay(2000);
}

export default function* defaultSaga() {
  yield takeEvery(types.LOAD_MEDIA_REQUEST, loadMedia);
  yield takeLatest(types.LOGOUT_REQUEST, logOut);
  yield takeLatest(types.LOGOUT_SUCCESS, logOutSuccessFunc);
  yield takeLeading(types.SESSION_EXPIRED, sessionExpired);
  yield takeLeading(types.NETWORK_ERROR, networkError);
}
