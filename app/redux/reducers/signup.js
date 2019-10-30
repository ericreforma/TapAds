import { SIGNUP } from '../actions/types.action';

const initialState = {
  info: null,
  licenseImage: null,
  profileImage: null
};

export function signupReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP.INFO:
      return Object.assign({}, state, {
        info: action.data.info
      });

    case SIGNUP.IMAGES:
      return Object.assign({}, state, {
        licenseImage: action.data.licenseImage,
        profileImage: action.data.profileImage
      });

    case SIGNUP.RESET:
      return Object.assign({}, state, {
        info: null,
        licenseImage: null,
        profileImage: null
      });

    default:
      return state;
  }
}