import { takeLatest, call, select } from 'redux-saga/effects';
import Api from '../../../../utils/Api';
import { makeSelectToken } from '../../../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadSection(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `dashboard/user/sections`,
      actions.loadSectionSuccess,
      actions.loadSectionFailure,
      token,
    ),
  );
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_SECTION_REQUEST, loadSection);
}
