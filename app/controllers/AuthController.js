import { RawHttpRequest, HttpRequest } from '../services/http';

export const AuthController = {
  login: (email, password) =>
    RawHttpRequest.post('/user/login', {
      email,
      password,
    }),
  logout: () => HttpRequest.get('/user/logout'),

  register: form =>
    RawHttpRequest.post('/user/register', form),

  registerValidation: userData =>
    RawHttpRequest.post('/user/register/validation', {
      userData,
    }),
  
  checkPassword: (args = {}) => HttpRequest.post('/user/password/verify', args),

  forgotPassword: {
    create: (args = {}) => RawHttpRequest.post('/user/password/create', args),
    verify: (token) => RawHttpRequest.get(`/user/password/find/${token}`),
    reset: (args = {}) => RawHttpRequest.post('/user/password/reset', args)
  }
};
