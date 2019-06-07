import axios from 'axios';
import { TOKENIZED_API } from '../config';

let httpRequest;

export const UserController = {
  request: {
    profile: () => {
      httpRequest = axios.create(TOKENIZED_API());
      return httpRequest.get('/user');
    }
  }
  
};
