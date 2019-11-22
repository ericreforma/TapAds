import { RawHttpRequest, HttpRequest } from '../services/http';
import { KEYS } from '../config/keys';

export const AuthController = {
  login: (email, password) =>
    RawHttpRequest.post('/user/login', {
      email,
      password,
    }),
  logout: () => HttpRequest.get(`/user/logout/${KEYS.DEVICE_UNIQUE_ID}`),

  register: form =>
    RawHttpRequest.post('/user/register', form),

  registerValidation: userData =>
    RawHttpRequest.post('/user/register/validation', {
      userData,
    }),
  
  checkPassword: (args = {}) => HttpRequest.post('/user/password/verify', args),

  forgotPassword: {
    create: (args = {}) => RawHttpRequest.post('/user/password/create', args),
    verify: (token, email) => RawHttpRequest.get(`/user/password/find/${token}/${email}`),
    reset: (args = {}) => RawHttpRequest.post('/user/password/reset', args)
  }
};
