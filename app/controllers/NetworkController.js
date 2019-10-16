import { RawHttpRequest } from '../services/http';

export const NetworkController = {
  checkPing: () => RawHttpRequest.get('/user/checkPing')
};