import { URL } from './variables';
import { TokenSchema } from '../database';

const baseURL = URL.SERVER_API;
const timeout = 30000;
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};
const firebaseHeader = {
  'Content-Type': 'application/json',
  'Authorization': `key=${URL.FIREBASE_TOKEN}`
};

export const API = {
  baseURL,
  timeout,
  headers
};

export const TOKENIZED_API = () => {
  const schema = TokenSchema.get();
  const api = API;

  api.headers.Authorization = `Bearer ${schema.token}`;

  return api;
};

export const FIREBASE_API = () => {
  return {
    baseURL: URL.FIREBASE_API,
    timeout,
    headers: firebaseHeader
  }
};