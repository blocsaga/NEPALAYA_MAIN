import produce from 'immer';
import * as types from './constants';

export const initialState = {
  notification: {},
  loading: false,
};

const notificationPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.LOAD_NOTIFICATION_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_NOTIFICATION_SUCCESS:
        draft.notification = action.payload;
        console.log('Notification data', draft.notification);
        draft.loading = false;
        break;
      case types.LOAD_NOTIFICATION_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default notificationPageReducer;
