import { TokenSchema } from '../database';

const SERVER_MAIN = 'http://dev.bcdpinpoint.com/TapAdsServer/public';

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
      FAVORITE: (id) => { return `/user/campaign/favorite/${id}`; },
      RECOMMENDED: '/user/campaign/recommended'
    },
    TRIP: {
      ADD: '/user/campaign/trip/add',
      MAP: '/user/campaign/trip/map',
      END: '/user/campaign/trip/end',
    },
  },
  TERMS_AND_COND: {
    PRIVACY_POLICY: '/termsAndCondition/privacyPolicy',
    TERMS_OF_USE: '/termsAndCondition/termsOfUse'
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
        white: require('../assets/image/icons/car_small_white_icon.png'),
      },
    },
    mid: {
      id: 1,
      name: 'mid',
      description: ['Compact SUV to', 'Regular SUV'],
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
      nameOnCaps: 'Public',
    },
    private: {
      id: 1,
      name: 'private',
      nameOnCaps: 'Private',
    },
    oncall: {
      id: 2,
      name: 'on-call',
      nameOnCaps: 'On-call',
    },
  },
};

export const MAP = {
  initialRegion: {
    latitude: 14.1144363,
    longitude: 120.1410504,
  },
};

export const IMAGES = {
  ICONS: {
    close_red: require('../assets/image/icons/close_icon.png'),
    add: require('../assets/image/icons/add_icon.png'),
    car_icon: require('../assets/image/car_blue_marker.png'),
    end_trip_icon: require('../assets/image/icons/car_end_trip.png'),
    peso_sign_icon: require('../assets/image/icons/peso_sign.png'),
    payment_icon: require('../assets/image/icons/payment_icon.png'),
    payment_white_icon: require('../assets/image/icons/payment_white_icon.png'),
    bag_of_cash_icon: require('../assets/image/icons/bag_cash_icon.png'),
    back_icon: require('../assets/image/icons/back_arrow_left_icon.png')
  }
};

export const screenSizes = {
  width: {
    small: 360,
    medium: 380,
  },
  height: {
    small: 620,
    medium: 750,
  }
};

export const earnings = {
  STATUS: {
    pending: {
      name: 'Pending'
    },
    accepted: {
      name: 'Sent'
    },
    rejected: {
      name: 'Denied'
    }
  }
};