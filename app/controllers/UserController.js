import { HttpRequest } from '../services/http';

export const UserController = {
  request: {
    profile: () => HttpRequest.get('/user'),
    chatList: () => HttpRequest.get('/user/chat/list'),
    messages: (cid) => HttpRequest.get(`/user/chat/${cid}`),
    vehicleDB: () => HttpRequest.get('/user/vehicle/all'),
    notificationContent: () => HttpRequest.get('/user/notif/content'),
    tripInfo: (tripID) => HttpRequest.get(`/user/campaign/trip/info/${tripID}`),
    submitPayment: (args = {}) => HttpRequest.post('/user/payment/withdraw', args),
    update: {
      details: (args = {}) => HttpRequest.post('/user/update/details', args),
      photo: (args = {}) => HttpRequest.post('/user/update/photo', args),
      license: (args = {}) => HttpRequest.post('/user/update/license', args),
      password: (args = {}) => HttpRequest.post('/user/update/password', args),
      bankDetails: (args = {}) => HttpRequest.post('/user/update/bank', args)
    },
    create: {
      vehicle: (args = {}) => HttpRequest.post('/user/create/vehicle', args),
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
