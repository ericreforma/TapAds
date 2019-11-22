import { AUTH } from '../actions/types.action';

const initialState = {
    isLoggingIn: false,
    isLoggedIn: false,
    attempt_email: '',
    attempt_password: '',

};

export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH.LOGIN.REQUEST:

      return Object.assign({}, state, {
        isLoggingIn: true,
        attempt_email: action.email,
        attempt_password: action.password
      });

    case AUTH.LOGIN.SUCCESS:
      return Object.assign({}, state, {
        isLoggingIn: false,
        isLoggedIn: true,
      });

    case AUTH.LOGIN.FAILED:
      return Object.assign({}, state, {
        isLoggedIn: false,
        isLoggingIn: false
      });

    default:
      return state;
  }
}
