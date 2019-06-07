import { USER } from '../actions/types.action';

 const initialState = {
   user: {
     profile: {},
     status: ''
  }
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case USER.GET.PROFILE.REQUEST:
      return Object.assign({}, state, {
        user: {
          status: 'pending'
        }
      });
    case USER.GET.PROFILE.SUCCESS:
      return Object.assign({}, state, {
        user: {
          profile: action.user,
          status: 'active'
        }
      });
    case USER.GET.PROFILE.FAILED:
      return Object.assign({}, state, {
        user: {
          profile: initialState.user.profile,
          status: 'failed'
        }
      });
    default:
      return state;
  }
};
