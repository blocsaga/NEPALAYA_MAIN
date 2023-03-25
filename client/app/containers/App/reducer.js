/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import produce from 'immer';

import * as types from './constants';

// The initial state of the App
export const initialState = {
  user: { isAdmin: false },
  token: '',
  media: {},
  notifications: [],
  access: {},
  showExpired: false,
};

/* eslint-disable default-case */
const appReducer = (state = initialState, action = { type: '' }) =>
  produce(state, (draft) => {
    const access = {};
    let isAdmin = false;
    switch (action.type) {
      case types.SET_USER:
        localStorage.setItem(
          'routes',
          action.payload.routes
            ? JSON.stringify(action.payload.routes)
            : localStorage.routes,
        );
        (action.payload.routes || []).map((each) => {
          if (each.admin_routes.includes('/admin/dashboard')) {
            isAdmin = true;
          }
          each.admin_routes.map((route) => {
            access[route] = [...(access[route] || []), each.access_type];
          });
        });
        draft.user = {
          ...action.payload,
          isAdmin,
        };
        draft.access = access;
        break;
      case types.SET_TOKEN:
        localStorage.setItem('token', action.payload);
        draft.token = action.payload;
        break;
      case types.LOGOUT:
      case types.LOGOUT_SUCCESS:
        localStorage.setItem('token', '');
        localStorage.setItem('routes', '');
        draft.user = {};
        draft.token = '';
        break;

      case types.LOAD_MEDIA_SUCCESS:
        draft.media = {
          ...draft.media,
          [action.payload.data._id]: action.payload.data, // eslint-disable-line no-underscore-dangle
        };
        break;

      case types.ENQUEUE_SNACKBAR:
        draft.notifications = [...draft.notifications, { ...action.payload }];
        break;
      case types.REMOVE_SNACKBAR:
        draft.notifications = [
          ...draft.notifications.filter(
            (notification) => notification.key !== action.payload,
          ),
        ];
        break;
      case types.LOAD_MENU_SUCCESS:
        draft.menu = {
          ...draft.menu,
          [action.payload.data.key]: action.payload.data.child,
        };
        break;

      case types.SESSION_EXPIRED:
        draft.showExpired = true;
        break;

      case types.SET_EXPIRED:
        draft.showExpired = action.payload;
        break;
    }
  });

export default appReducer;
