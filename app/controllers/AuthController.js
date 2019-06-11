import { RawHttpRequest } from '../services/http';

export const AuthController = {

  login: (email, password) =>
      RawHttpRequest.post('/user/login', {
          email, password
      })

};
