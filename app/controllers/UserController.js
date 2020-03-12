import { HttpRequest, RawHttpRequest } from '../services/http';

export const UserController = {
  request: {
    profile: () => HttpRequest.get('/user'),
    vehicleDB: () => RawHttpRequest.get('/user/vehicle/all'),
    notificationContent: () => HttpRequest.get('/user/notif/content'),
    tripInfo: (tripID) => HttpRequest.get(`/user/campaign/trip/info/${tripID}`),
    submitPayment: (args = {}) => HttpRequest.post('/user/payment/withdraw', args),
    chat: {
      chatList: () => HttpRequest.get('/user/chat/list'),
      initial: (args) => HttpRequest.get(`/user/chat/initial${args}`),
      paginate: (args) => HttpRequest.get(`/user/chat/paginate${args}`),
      latest: (args) => HttpRequest.get(`/user/chat/latest${args}`),
    },
    update: {
      details: (args = {}) => HttpRequest.post('/user/update/details', args),
      photo: (args = {}) => HttpRequest.post('/user/update/photo', args),
      license: (args = {}) => HttpRequest.post('/user/update/license', args),
      password: (args = {}) => HttpRequest.post('/user/update/password', args),
      bankDetails: (args = {}) => HttpRequest.post('/user/update/bank', args),
      carMonthlyUpdate: (args = {}) => HttpRequest.post('/user/update/cars/monthly', args),
      pNumber: form => HttpRequest.post('/user/update/request/pnumber', form),
      vehiclePhoto: form => HttpRequest.post('/user/update/vehicle_photo', form),
      seen: {
        chat: form => HttpRequest.post('/user/update/seen/chat', form),
        campaign: form => HttpRequest.post(`/user/update/seen/campaign`, form),
        payment: form => HttpRequest.post(`/user/update/seen/payment`, form)
      }
    },
    get: {
      notifications: () => HttpRequest.get('/user/get/notifications')
    },
    create: {
      vehicle: (args = {}) => HttpRequest.post('/user/create/vehicle', args),
    },
    remove: {
      photo: () => HttpRequest.get('/user/remove/photo'),
      license: () => HttpRequest.get('/user/remove/license'),
      account: (args = {}) => HttpRequest.post('/user/remove/account', args),
      vehicle: args => HttpRequest.get(`/user/remove/vehicle${args}`)
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
