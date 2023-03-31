import produce from 'immer';
import * as types from './constants';

export const initialState = {
  assignment: {},
  loading: false,
};

const assignmentPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.LOAD_ASSIGNMENT_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ASSIGNMENT_SUCCESS:
        draft.assignment = action.payload;
        draft.loading = false;
        break;
      case types.LOAD_ASSIGNMENT_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default assignmentPageReducer;
