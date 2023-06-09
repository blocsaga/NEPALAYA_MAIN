import { takeLatest, call, select } from 'redux-saga/effects';
import Api from '../../../utils/Api';
import { makeSelectToken } from '../../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadUser(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'dashboard/user/roles',
      actions.loadUserSuccess,
      actions.loadUserFailure,
      token,
    ),
  );
}
function* loadErrors() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'dashboard/error',
      actions.loadErrorSuccess,
      actions.loadErrorFailure,
      token,
    ),
  );
}

function* loadUserByRegister(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'dashboard/user/registration',
      actions.loadUserByRegisterSuccess,
      actions.loadUserByRegisterFailure,
      token,
    ),
  );
}

function* loadRecentUser(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'dashboard/user/recent',
      actions.loadRecentUserSuccess,
      actions.loadRecentUserFailure,
      token,
    ),
  );
}

function* loadUserByDays(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'dashboard/user/days/30',
      actions.loadUserByDaysSuccess,
      actions.loadUserByDaysFailure,
      token,
    ),
  );
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_USER_REQUEST, loadUser);
  yield takeLatest(types.LOAD_ERROR_REQUEST, loadErrors);
  yield takeLatest(types.LOAD_USER_BY_REGISTER_REQUEST, loadUserByRegister);
  yield takeLatest(types.LOAD_RECENT_USER_REQUEST, loadRecentUser);
  yield takeLatest(types.LOAD_USER_BY_DAYS_REQUEST, loadUserByDays);
}
