// const SERVER_MAIN = 'http://192.168.0.100/TapAdsServer/public';
const SERVER_MAIN = 'https://dev.bcdpinpoint.com/TapAdsServer/public';

const SERVER_API = `${SERVER_MAIN}/api`;
const SERVER_MEDIA = `${SERVER_MAIN}/storage`;
const FIREBASE_API = 'https://fcm.googleapis.com';
const FIREBASE_TOKEN = 'AAAApdV3IHA:APA91bECXNiEFnF3C2C3B7N3fYHUuITkodN13fIa8UF1qWky_93n6-3hN-39iT7-XypuuIh2Bw8mn3rWnIhWCZKf6-hI8AysiuMakAY7kf-7zTNB6oZSisPGMId0CMeRSJKwJtPAkTv0';

export const URL = {
  SERVER_MAIN,
  SERVER_API,
  SERVER_MEDIA,
  FIREBASE_TOKEN,
  FIREBASE_API,
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
    regular: {
      id: 0,
      name: 'regular',
      description: ['Compact SUV to', 'Regular SUV,', 'Sedan or smaller'],
      icon: {
        large: require('../assets/image/category_car_small.png'),
        black: require('../assets/image/icons/car_small_black_icon.png'),
        white: require('../assets/image/icons/car_small_white_icon.png'),
      },
    },
    premium: {
      id: 1,
      name: 'premium',
      description: 'Van to Truck',
      icon: {
        large: require('../assets/image/category_car_large.png'),
        black: require('../assets/image/icons/car_large_black_icon.png'),
        white: require('../assets/image/icons/car_large_white_icon.png'),
      },
    },
    motorcycle: {
      id: 2,
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
    private: {
      id: 0,
      name: 'private',
      nameOnCaps: 'Private',
    },
    public: {
      id: 1,
      name: 'public',
      nameOnCaps: 'Public',
    },
    oncall: {
      id: 2,
      name: 'on-call',
      nameOnCaps: 'On-call',
    },
  },
  STICKER_AREA: {
    full_wrap: {
      name: 'Full Wrap',
      image: require('../assets/image/full-wrap.png')
    },
    '4_doors': {
      name: '4 Doors',
      imageLeft: require('../assets/image/two-door-left.png'),
      imageRight: require('../assets/image/two-door-right.png'),
    },
    '2_doors': {
      name: '2 Doors',
      image: require('../assets/image/two-door-right.png'),
    },
    bumper: {
      name: 'Bumper',
      image: require('../assets/image/bumper.png'),
    },
    rear_windows: {
      name: 'Rear Windows',
      image: require('../assets/image/rear-window.png'),
    },
    in_car: {
      name: 'In-Car',
      image: require('../assets/image/in-car.png'),
    },
    motorcycle: {
      name: 'Motorcycle',
      image: require('../assets/image/motorcycle.png'),
    }
  }
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
    close_white: require('../assets/image/icons/close_icon_white.png'),
    add: require('../assets/image/icons/add_icon.png'),
    car_icon: require('../assets/image/car_blue_marker.png'),
    end_trip_icon: require('../assets/image/icons/car_end_trip.png'),
    send_icon: require('../assets/image/icons/send_icon.png'),
    send_icon_circle: require('../assets/image/icons/send_icon_circle.png'),
    peso_sign_icon: require('../assets/image/icons/peso_sign.png'),
    payment_icon: require('../assets/image/icons/payment_icon.png'),
    payment_white_icon: require('../assets/image/icons/payment_white_icon.png'),
    bag_of_cash_icon: require('../assets/image/icons/bag_cash_icon.png'),
    back_icon: require('../assets/image/icons/back_arrow_left_icon.png'),
    back_icon_white: require('../assets/image/icons/back_arrow_left_white_icon.png'),
    check_blue: require('../assets/image/icons/login_verify_icon_blue.png'),
    flash_icon: {
      on: require('../assets/image/icons/flash_on_icon.png'),
      auto: require('../assets/image/icons/flash_auto_icon.png'),
      off: require('../assets/image/icons/flash_off_icon.png'),
    },
    cameraRotate: require('../assets/image/icons/image_rotate_icon.png'),
    dropDown_icon: require('../assets/image/icons/dropdown_icon.png'),
    dropDown_icon: require('../assets/image/icons/dropdown_icon.png'),
    dragUp_icon: require('../assets/image/icons/dragup_icon.png'),
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