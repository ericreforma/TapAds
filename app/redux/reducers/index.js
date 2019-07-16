import { combineReducers } from 'redux';
import { userReducer } from './user';
import { loginReducer } from './auth';
import { campaignReducer } from './campaign';

export const rootReducer = combineReducers({
  userReducer,
  loginReducer,
  campaignReducer
});
