
import axios from 'axios';
import { API } from '../config';

const request = axios.create(API);

export const AuthController = {

  login: (email, password) =>
      request.post('/user/login', {
          email, password
      })

};
