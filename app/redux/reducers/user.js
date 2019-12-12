import { USER } from '../actions/types.action';

 const initialState = {
   user: null,
   notification: 0
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

    case USER.NOTIFICATION.SUCCESS:
    case USER.NOTIFICATION.FAILED:
      return Object.assign({}, state, {
        notification: initialState.notification
      });

    case USER.NOTIFICATION.GET:
    case USER.NOTIFICATION.UPDATE:
      return Object.assign({}, state, {
        notification: action.notification
      });

    case USER.VEHICLE.NEW:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          vehicles: [...state.user.vehicles, action.vehicle]
        })
      });

    default:
      return state;
  }
}
