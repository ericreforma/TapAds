import { USER } from '../actions/types.action';

 const initialState = {
   user: null
};

export function userReducer(state = initialState, action) {
  switch (action.type) {

    case USER.GET.PROFILE.REQUEST:
      return Object.assign({}, state, {
        user: initialState.user
      });
    case USER.GET.PROFILE.SUCCESS:
      return Object.assign({}, state, {
        user: action.user
      });
    case USER.GET.PROFILE.FAILED:
      return Object.assign({}, state, {
        user: initialState.user
      });
    case USER.UPDATE.NOTIFICATION:
      return Object.assign({}, state, {
        user: action.user
      });
    default:
      return state;
  }
}
