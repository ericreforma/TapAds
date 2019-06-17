const SERVER_MAIN = 'http://192.168.0.108/tapads/public/';
const SERVER_API = 'http://192.168.0.108/tapads/public/api';
const SERVER_MEDIA = 'http://192.168.0.108/tapads/public/storage/media';

export const URL = {
  SERVER_MAIN,
  SERVER_API,
  SERVER_MEDIA,
  PAGE: {
    USER: '/user',
    CAMPAIGN: '/user/campaign/browse',
    MYLIST: '/user/campaign/mylist',
    ADDLIST: '/user/campaign/addmylist'
  }
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
        white: require('../assets/image/icons/car_small_white_icon.png')
      }
    },
    mid: {
      id: 1,
      name: 'mid',
      description: 'Compact SUV to Regular SUV',
      icon: {
        large: require('../assets/image/category_car_mid.png'),
        black: require('../assets/image/icons/car_mid_black_icon.png'),
        white: require('../assets/image/icons/car_mid_white_icon.png')
      }
    },
    large: {
      id: 2,
      name: 'large',
      description: 'Van to Truck',
      icon: {
        large: require('../assets/image/category_car_large.png'),
        black: require('../assets/image/icons/car_large_black_icon.png'),
        white: require('../assets/image/icons/car_large_white_icon.png')
      }
    },
    motorcycle: {
      id: 3,
      name: 'motorcycle',
      description: 'Motorcycle',
      icon: {
        large: require('../assets/image/category_motorcycle.png'),
        black: require('../assets/image/icons/motorcycle_black_icon.png'),
        white: require('../assets/image/icons/motorcycle_white_icon.png')
      }
    }
  },
  TYPE: {
    public: {
      id: 0,
      name: 'public'
    },
    private: {
      id: 1,
      name: 'private'
    },
    oncall: {
      id: 2,
      name: 'on-call'
    }
  }
};
