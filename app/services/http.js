import axios from 'axios';
import { API, TOKENIZED_API, FIREBASE_API } from '../config';

let httpRequest;

export const HttpRequest = {
  get: (url) => {
    httpRequest = axios.create(TOKENIZED_API());
    return httpRequest.get(url);
  },
  post: (url, args = {}) => {
    httpRequest = axios.create(TOKENIZED_API());
    return httpRequest.post(url, args);
  }
};

export const RawHttpRequest = {
  get: (url) => {
    httpRequest = axios.create(API);
    return httpRequest.get(url);
  },
  post: (url, args = {}) => {
    httpRequest = axios.create(API);
    return httpRequest.post(url, args);
  }
};

export const FirebaseHttpRequest = {
  post: (url = '/fcm/send', args = {}) => {
    httpRequest = axios.create(FIREBASE_API);
    return httpRequest.post(url, args);
  }
};
