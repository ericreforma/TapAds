import { TokenSchema } from '../database';

const SERVER_MAIN = 'http://192.168.0.100/TapAdsServer/public';
const SERVER_WEBSOCKET = 'http://192.168.0.100';
const WEBSOCKET_PORT = '3000';
const WEBSOCKET_API = `${SERVER_WEBSOCKET}:${WEBSOCKET_PORT}`;
const WEBSOCKET_PARAM = { jsonp: false, transports: ['websocket'] };

const SERVER_API = `${SERVER_MAIN}/api`;
const SERVER_MEDIA = `${SERVER_MAIN}/storage`;

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
  WEBSOCKET_PARAM,
  CONNECT: {
    MESSAGE: () => {
      var outputToken = TokenSchema.get(),
        returnData = `chat/authentication?token=${outputToken.token}&userType=0`;

      return returnData;
    } 
  },
  
  EVENTS: {
    ON_CONNECT: 'connect',
    ONLINE_USERS: 'online users',
    ONLINE_CLIENT: 'online client',
    NEW_MESSAGE: 'new message',
    DC_USER: 'disconnected user',
    ERROR_CONN: 'connect_error'
  },
  GET_TOKEN: () => {
    var outputToken = TokenSchema.get();
    return outputToken.token;
  }
};

export const IMAGES = {
  ICONS: {
    close_red: require('../assets/image/icons/close_icon.png'),
    add: require('../assets/image/icons/add_icon.png'),
  }
};