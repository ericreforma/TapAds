
// AUTHENTICATION TYPES
export const AUTH = {

  REGISTER: {
    REQUEST: 'AUTH_REGISTER_REQUEST',
    SUCCESS: 'AUTH_REGISTER_SUCCESS',
    FAILED: 'AUTH_REGISTER_FAILED',
  },

  LOGIN: {
    REQUEST: 'AUTH_LOGIN_REQUEST',
    SUCCESS: 'AUTH_LOGIN_SUCCESS',
    FAILED: 'AUTH_LOGIN_FAILED'
  }

};

export const USER = {
  GET: {
    PROFILE: {
      REQUEST: 'USER_GET_PROFILE_REQUEST',
      SUCCESS: 'USER_GET_PROFILE_SUCCESS',
      FAILED: 'USER_GET_PROFILE_FAILED'
    },
    TOKEN: 'USER_GET_TOKEN'
  }
};

export const CAMPAIGN = {
  SELECTED: 'CAMPAIGN_SELECTED',
  LIST: {
    CHANGE: 'CAMPAIGN_CHANGE_REQUEST',
    REQUEST: 'CAMPAIGN_GET_REQUEST',
    SUCCESS: 'CAMPAIGN_GET_SUCCESS',
    FAILED: 'CAMPAIGN_GET_FAILED'
  },
  RECOMMENDED: {
    REQUEST: 'CAMPAIGN_RECOMMENDED_REQUEST',
    SUCCESS: 'CAMPAIGN_RECOMMENDED_SUCCESS',
    FAILED: 'CAMPAIGN_RECOMMENDED_FAILED',
  },
  MYLIST: {
    GET: 'CAMPAIGN_MYLIST_GET',
    UPDATE: 'CAMPAIGN_MYLIST_UPDATE',
    ADD: 'CAMPAIGN_MYLIST_ADD',
    SELECTED: 'CAMPAIGN_MYLIST_SELECTED'
  }

};