import produce from 'immer';
import * as types from './constants';

export const initialState = {
  section: {},
  loading: false,
};

const sectionPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.LOAD_SECTION_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_SECTION_SUCCESS:
        draft.section = action.payload;
        draft.loading = false;
        break;
      case types.LOAD_SECTION_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default sectionPageReducer;
