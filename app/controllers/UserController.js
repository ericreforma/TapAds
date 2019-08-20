import { HttpRequest } from '../services/http';

export const UserController = {
  request: {
    profile: () => HttpRequest.get('/user'),
    chatList: () => HttpRequest.get('/user/chat/list'),
    messages: (cid) => HttpRequest.get(`/user/chat/${cid}`),
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
