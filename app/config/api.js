import { URL } from './variables';
import { TokenSchema } from '../database';

const baseURL = URL.SERVER_API;
const timeout = 30000;
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const API = {
  baseURL,
  timeout,
  headers
};

const TOKENIZED_API = () => {
  const schema = TokenSchema.get();
  const api = API;

  api.headers.Authorization = `Bearer ${schema.token}`;

  return api;
};

export { API, TOKENIZED_API };
