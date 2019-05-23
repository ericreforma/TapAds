import { API } from './api';
import { TokenSchema } from '../database';

export const TOKENIZED_API = () => {
  const schema = TokenSchema.get();
  const api = API;

  api.headers.Authorization = `Bearer ${schema.token}`;

  return api;
};
