import axios from 'axios';
import { TOKENIZED_API } from '../config';

let httpRequest;

export const UserController = {
  request: {
    profile: () => {
      httpRequest = axios.create(TOKENIZED_API());
      return httpRequest.get('/user');
    }
  },

  rating: (ratings) => {
    const rate = {
      total: 0,
      average: 0,
      count: 0,
    };
    let rates = 0;
    rate.count = ratings.length;

    for (let i = 0; i < ratings.length; i++) {
      rates += ratings[i].rate;
    }

    rate.average = Math.round((rates / rate.count) * 10) / 10;
    rate.total = rates;

    return rate;
  }
};
