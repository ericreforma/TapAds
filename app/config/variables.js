import { TokenSchema } from '../database';

const SERVER_MAIN = 'http://10.0.2.2';
const SERVER_WEBSOCKET = 'http://127.0.0.1';
const WEBSOCKET_PORT = '3000';
const WEBSOCKET_API = `${SERVER_WEBSOCKET}:${WEBSOCKET_PORT}`;

const SERVER_API = `${SERVER_MAIN}/api`;
const SERVER_MEDIA = `${SERVER_MAIN}/storage/media`;

const schema = TokenSchema.get();

export const URL = {
  SERVER_MAIN,
  SERVER_API,
  SERVER_MEDIA,
  PAGE: {
    USER: '/user',
    CAMPAIGN: {
      BROWSE: '/user/campaign/browse',
      LIST: '/user/campaign/list',
      ADD: '/user/campaign/add',
    },
    TRIP: {
      ADD: '/user/campaign/trip/add',
      MAP: '/user/campaign/trip/map',
      END: '/user/campaign/trip/end',
    },
  },
};

export const VEHICLE = {
  CLASS: {
    small: {
      id: 0,
      name: 'small',
      description: 'Sedan or smaller',
      icon: {
        large: require('../assets/image/category_car_small.png'),
        black: require('../assets/image/icons/car_small_black_icon.png'),
        white: require('../assets/image/icons/car_small_white_icon.png'),
      },
    },
    mid: {
      id: 1,
      name: 'mid',
      description: 'Compact SUV to Regular SUV',
      icon: {
        large: require('../assets/image/category_car_mid.png'),
        black: require('../assets/image/icons/car_mid_black_icon.png'),
        white: require('../assets/image/icons/car_mid_white_icon.png'),
      },
    },
    large: {
      id: 2,
      name: 'large',
      description: 'Van to Truck',
      icon: {
        large: require('../assets/image/category_car_large.png'),
        black: require('../assets/image/icons/car_large_black_icon.png'),
        white: require('../assets/image/icons/car_large_white_icon.png'),
      },
    },
    motorcycle: {
      id: 3,
      name: 'motorcycle',
      description: 'Motorcycle',
      icon: {
        large: require('../assets/image/category_motorcycle.png'),
        black: require('../assets/image/icons/motorcycle_black_icon.png'),
        white: require('../assets/image/icons/motorcycle_white_icon.png'),
      },
    },
  },
  TYPE: {
    public: {
      id: 0,
      name: 'public',
    },
    private: {
      id: 1,
      name: 'private',
    },
    oncall: {
      id: 2,
      name: 'on-call',
    },
  },
};

export const MAP = {
  initialRegion: {
    latitude: 14.1144363,
    longitude: 120.1410504,
  },
};

export const WEBSOCKET = {
  WEBSOCKET_API,
  CONNECT: {
    MESSAGE: `/chat/authentication?token=${schema.token}&userType=0`
  },
  EVENTS: {
    ON_CONNECT: 'connect',
    ONLINE_USERS: 'online users',
    ONLINE_USER: 'online user',
    NEW_MESSAGE: 'new message',
    DC_USER: 'disconnected user'
  }
};