import { takeLatest, call, select } from 'redux-saga/effects';
import Api from '../../../../utils/Api';
import { makeSelectToken } from '../../../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadNotifications(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `dashboard/user/notifications`,
      actions.loadNotificationSuccess,
      actions.loadNotificationFailure,
      token,
    ),
  );
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_NOTIFICATION_REQUEST, loadNotifications);
}
