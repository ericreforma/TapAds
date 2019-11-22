import firebase from 'react-native-firebase';
import { HttpRequest, FirebaseHttpRequest } from '../services/http';
import { URL } from '../config/variables';
import { KEYS } from '../config/keys';

export const FirebaseController = {
  init: async (successCallback, errorCallback) => {
    const enabled = await firebase.messaging().hasPermission();
    if(enabled) {
      getFcmToken(successCallback, errorCallback);
    } else {
      try {
        await firebase.messaging().requestPermission();
        getFcmToken(successCallback, errorCallback);
      } catch (error) {
        console.log('Failed: Firebase User Unauthorized');
        errorCallback();
      }
    }
  },
  updateToken: (token, successCallback = false, errorCallback = false) => {
    const uniqueId = KEYS.DEVICE_UNIQUE_ID;
    HttpRequest.post(URL.PAGE.FIREBASE.UPDATE_TOKEN, { uniqueId, token })
    .then(res => {
      console.log('Firebase Token Updated');
      if(successCallback) successCallback();
    })
    .catch(error => {
      console.log(error.response);
      if(errorCallback) errorCallback();
    });
  },
  getClientToken: (clientId, successCallback, errorCallback) => {
    HttpRequest.get(URL.PAGE.FIREBASE.GET_TOKEN, { clientId })
    .then(successCallback)
    .catch(error => {
      console.log(error.response);
      errorCallback();
    });
  }
};

const getFcmToken = async (successCallback, errorCallback) => {
  const fcmToken = await firebase.messaging().getToken();
  if(fcmToken) {
    console.log('Success: Firebase User authorized');
    FirebaseController.updateToken(fcmToken, successCallback, errorCallback);
  } else {
    console.log('Failed: No firebase token received');
    errorCallback();
  }
};