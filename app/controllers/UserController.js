import { HttpRequest } from '../services/http';

export const UserController = {
  request: {
    profile: () => HttpRequest.get('/user'),
    chatList: () => HttpRequest.get('/user/chat/list'),
    messages: (cid) => HttpRequest.get(`/user/chat/${cid}`),
    update: {
      details: (args = {}) => HttpRequest.post('/user/update/details', args),
      photo: (args = {}) => HttpRequest.post('/user/update/photo', args),
      license: (args = {}) => HttpRequest.post('/user/update/license', args),
      password: (args = {}) => HttpRequest.post('/user/update/password', args),
    },
    remove: {
      photo: () => HttpRequest.get('/user/remove/photo'),
      license: () => HttpRequest.get('/user/remove/license'),
      account: (args = {}) => HttpRequest.post('/user/remove/account', args)
    }
  },

  rating: (ratings) => {
    const rate = {
      total: 0,
      average: 0,
      count: 0,
    };
    let rates = 0;

    if(ratings.length !== 0) {
      rate.count = ratings.length;

      for (let i = 0; i < ratings.length; i++) {
        rates += ratings[i].rate;
      }
      
      rate.average = Math.round((rates / rate.count) * 10) / 10;
      rate.total = rates;
    }
    
    return rate;
  }
};
