import { RawHttpRequest, HttpRequest } from '../services/http';

export const AuthController = {
  login: (email, password) =>
    RawHttpRequest.post('/user/login', {
      email,
      password,
    }),
  logout: () => HttpRequest.get('/user/logout'),

  register: userData =>
    RawHttpRequest.post('/user/register', {
      userData,
    }),
};
