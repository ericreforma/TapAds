import { combineReducers } from 'redux';
import { userReducer } from './user';
import { loginReducer } from './auth';
import { campaignReducer } from './campaign';
import { signupReducer } from './signup';

export const rootReducer = combineReducers({
  signupReducer,
  userReducer,
  loginReducer,
  campaignReducer
});
