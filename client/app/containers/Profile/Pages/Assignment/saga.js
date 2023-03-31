import { takeLatest, call, select } from 'redux-saga/effects';
import Api from '../../../../utils/Api';
import { makeSelectToken } from '../../../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadAssignment(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `dashboard/user/assignments`,
      actions.loadAssignmentSuccess,
      actions.loadAssignmentFailure,
      token,
    ),
  );
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_ASSIGNMENT_REQUEST, loadAssignment);
}
