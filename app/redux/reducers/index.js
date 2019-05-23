import { combineReducers } from 'redux';
import { userReducer } from './user';
import { loginReducer } from './auth';

export const rootReducer = combineReducers({
  userReducer,
  loginReducer
});
