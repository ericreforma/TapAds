const SERVER_MAIN = 'http://192.168.0.50/TapAdsServer/public';
// const SERVER_MAIN = 'https://dev.bcdpinpoint.com/TapAdsServer/public';

const SERVER_API = `${SERVER_MAIN}/api`;
const SERVER_MEDIA = `${SERVER_MAIN}/storage`;
const FIREBASE_API = 'https://fcm.googleapis.com';

export const URL = {
  SERVER_MAIN,
  SERVER_API,
  SERVER_MEDIA,
  FIREBASE_API,
  PAGE: {
    USER: '/user',
    CAMPAIGN: {
      BROWSE: '/user/campaign/browse',
      LIST: '/user/campaign/list',
      ADD: '/user/campaign/add',
      FAVORITE: (id) => { return `/user/campaign/favorite/${id}`; },
      RECOMMENDED: '/user/campaign/recommended',
      REMOVE: '/user/campaign/remove',
    },
    TRIP: {
      ADD: '/user/campaign/trip/add',
      MAP: '/user/campaign/trip/map',
      END: '/user/campaign/trip/end',
    },
    FIREBASE: {
      UPDATE_TOKEN: '/user/firebase/update',
      GET_TOKEN: '/user/firebase/getToken'
    }
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
      name: 'Regular',
      description: 'Compact to light SUVs',
      icon: {
        large: require('../assets/image/category_car_small.png'),
        black: require('../assets/image/icons/car_small_black_icon.png'),
        white: require('../assets/image/icons/car_small_white_icon.png'),
      },
      sticker: [
        {
          name: 'Full Wrap',
          delimiter: '',
          image: [
            require('../assets/image/sticker_regular/full-wrap.png')
          ]
        }, {
          name: '2 Doors',
          delimiter: 'or',
          image: [
            require('../assets/image/sticker_regular/two-door-left.png'),
            require('../assets/image/sticker_regular/two-door-right.png')
          ]
        }, {
          name: '4 Doors',
          delimiter: 'and',
          image: [
            require('../assets/image/sticker_regular/two-door-left.png'),
            require('../assets/image/sticker_regular/two-door-right.png')
          ]
        }, {
          name: 'Bumper',
          delimiter: '',
          image: [
            require('../assets/image/sticker_regular/bumper.png')
          ]
        }, {
          name: 'Rear Window',
          delimiter: '',
          image: [
            require('../assets/image/sticker_regular/rear-window.png')
          ]
        }, {
          name: 'In-car',
          delimiter: '',
          image: [
            require('../assets/image/sticker_regular/in-car.png')
          ]
        }
      ]
    },
    premium: {
      id: 1,
      name: 'Premium',
      description: 'Large SUVs',
      icon: {
        large: require('../assets/image/category_car_mid.png'),
        black: require('../assets/image/icons/car_mid_black_icon.png'),
        white: require('../assets/image/icons/car_mid_white_icon.png'),
      },
      sticker: [
        {
          name: 'Full Wrap',
          delimiter: '',
          image: [
            require('../assets/image/sticker_premium/full-wrap.png')
          ]
        }, {
          name: '2 Doors',
          delimiter: 'or',
          image: [
            require('../assets/image/sticker_premium/two-door-left.png'),
            require('../assets/image/sticker_premium/two-door-right.png')
          ]
        }, {
          name: '4 Doors',
          delimiter: 'and',
          image: [
            require('../assets/image/sticker_premium/two-door-left.png'),
            require('../assets/image/sticker_premium/two-door-right.png')
          ]
        }, {
          name: 'Bumper',
          delimiter: '',
          image: [
            require('../assets/image/sticker_premium/bumper.png')
          ]
        }, {
          name: 'Rear Window',
          delimiter: '',
          image: [
            require('../assets/image/sticker_premium/rear-window.png')
          ]
        }, {
          name: 'In-car',
          delimiter: '',
          image: [
            require('../assets/image/sticker_premium/in-car.png')
          ]
        }
      ]
    },
    motorcycle: {
      id: 2,
      name: 'Motorcycle',
      description: null,
      icon: {
        large: require('../assets/image/category_motorcycle.png'),
        black: require('../assets/image/icons/motorcycle_black_icon.png'),
        white: require('../assets/image/icons/motorcycle_white_icon.png'),
      },
      sticker: [
        {
          name: 'Motorcycle',
          delimiter: '',
          image: [
            require('../assets/image/sticker_motorcycle/motorcycle.png')
          ]
        }
      ]
    },
    vans: {
      id: 3,
      name: 'Vans',
      description: null,
      icon: {
        large: require('../assets/image/category_car_large.png'),
        black: require('../assets/image/icons/car_large_black_icon.png'),
        white: require('../assets/image/icons/car_large_white_icon.png'),
      },
      sticker: [
        {
          name: 'Full Wrap',
          delimiter: '',
          image: [
            require('../assets/image/sticker_van/full-wrap.png')
          ]
        }, {
          name: '1 Side',
          delimiter: 'or',
          image: [
            require('../assets/image/sticker_van/left-part.png'),
            require('../assets/image/sticker_van/right-part.png')
          ]
        }, {
          name: '2 Sides',
          delimiter: 'and',
          image: [
            require('../assets/image/sticker_van/left-part.png'),
            require('../assets/image/sticker_van/right-part.png')
          ]
        }, {
          name: 'Back Door',
          delimiter: '',
          image: [
            require('../assets/image/sticker_van/back-door.png')
          ]
        }, {
          name: 'Hood',
          delimiter: '',
          image: [
            require('../assets/image/sticker_van/hood.png')
          ]
        }
      ]
    },
    truck: {
      id: 4,
      name: 'Truck',
      description: null,
      icon: {
        large: require('../assets/image/category_truck.png'),
        black: require('../assets/image/icons/truck_black_icon.png'),
        white: require('../assets/image/icons/truck_white_icon.png'),
      },
      sticker: [
        {
          name: 'Full Wrap',
          delimiter: '',
          image: [
            require('../assets/image/sticker_truck/full-wrap.png')
          ]
        }, {
          name: '1 Door',
          delimiter: 'or',
          image: [
            require('../assets/image/sticker_truck/left-door.png'),
            require('../assets/image/sticker_truck/right-door.png')
          ]
        }, {
          name: '2 Doors',
          delimiter: 'and',
          image: [
            require('../assets/image/sticker_truck/left-door.png'),
            require('../assets/image/sticker_truck/right-door.png')
          ]
        }, {
          name: '1 Cargo',
          delimiter: 'or',
          image: [
            require('../assets/image/sticker_truck/left-part.png'),
            require('../assets/image/sticker_truck/right-part.png')
          ]
        }, {
          name: '2 Cargo',
          delimiter: 'and',
          image: [
            require('../assets/image/sticker_truck/left-part.png'),
            require('../assets/image/sticker_truck/right-part.png')
          ]
        }, {
          name: 'Back Door',
          delimiter: '',
          image: [
            require('../assets/image/sticker_truck/back-door.png')
          ]
        }, {
          name: 'Hood',
          delimiter: '',
          image: [
            require('../assets/image/sticker_truck/hood.png')
          ]
        }
      ]
    }
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
    LOGIN_USERNAME: require('../assets/image/icons/login_username_icon.png'),
    LOGIN_PASSWORD: require('../assets/image/icons/login_password_icon.png'),
    PASSWORD_HIDE: require('../assets/image/icons/login_password_hide_icon.png'),
    PASSWORD_SHOW: require('../assets/image/icons/login_password_show_icon.png'),
    LOGIN_ARROW_RIGHT: require('../assets/image/icons/login_arrow_right_icon.png'),
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
    back_icon_black: require('../assets/image/icons/back_arrow_left_black_icon.png'),
    back_icon_white: require('../assets/image/icons/back_arrow_left_white_icon.png'),
    check_blue: require('../assets/image/icons/login_verify_icon_blue.png'),
    approve_icon: require('../assets/image/icons/approve_icon.png'),
    rejected_icon: require('../assets/image/icons/reject_icon.png'),
    flash_icon: {
      on: require('../assets/image/icons/flash_on_icon.png'),
      auto: require('../assets/image/icons/flash_auto_icon.png'),
      off: require('../assets/image/icons/flash_off_icon.png'),
    },
    cameraRotate: require('../assets/image/icons/image_rotate_icon.png'),
    dropDown_icon: require('../assets/image/icons/dropdown_icon.png'),
    dropDown_icon: require('../assets/image/icons/dropdown_icon.png'),
    dragUp_icon: require('../assets/image/icons/dragup_icon.png'),
    avatar: {
      male: require('../assets/image/male_avatar.png'),
      female: require('../assets/image/female_avatar.png')
    },
    favorite_icon: require('../assets/image/icons/completed_favorite_icon.png'),
    mail_icon: require('../assets/image/icons/mail_icon.png'),
    caret_right: require('../assets/image/icons/caret-circle-right.png'),
  },
  BG_LOGIN_PAGE: require('../assets/image/login_page_bg.png'),
  LOGO: {
    TAPTAB: require('../assets/image/app_logo.png')
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