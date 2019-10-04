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

  forgotPassword: {
    create: (args = {}) => RawHttpRequest.post('/user/password/create', args),
    verify: (token) => RawHttpRequest.get(`/user/password/find/${token}`),
    reset: (args = {}) => RawHttpRequest.post('/user/password/reset', args)
  }
};
