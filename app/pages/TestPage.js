import React, { Component } from 'react';
import {
  Alert,
  View
} from 'react-native';
import firebase from 'react-native-firebase';

import theme from '../styles/theme.style';
import {
  LabelText,
  CommonText
} from '../components/Text';

export default class TestPage extends Component {
  componentDidMount = () => {
    this.checkPermission();
    this.messageListener();
  }

  componentWillUnmount = () => {
    this.notificationListener();
    this.notificationOpenedListener();
    this.messageListener();
  }

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getFcmToken();
    } else {
      this.requestPermission();
    }
  }

  getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      this.showAlert('Your Firebase Token is:', fcmToken);
    } else {
      this.showAlert('Failed', 'No token received');
    }
  }

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
  }

  messageListener = async () => {
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      console.log('Notification Listener');
      const { title, body, data } = notification;
      const res = JSON.parse(data.data);
      console.log(res);

      // this.showAlert(title, body);
    });
  
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      console.log('Notification opened');
      const { title, body } = notificationOpen.notification;
      console.log('Notification open: ', notificationOpen);

      // this.showAlert(title, body);
    });
  
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      console.log('Notification open: ', notificationOpen);
      
      // this.showAlert(title, body);
    }
  
    this.messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  }
  
  showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 20,
            backgroundColor: theme.COLOR_GRAY_HEAVY,
          }}
        >
          <LabelText color="blue" large>TapAds Firebase Test</LabelText>
        </View>

        <View
          style={{
            flex: 1,
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <CommonText large>So this is the body lorem ipsum dolor</CommonText>
        </View>
      </View>
    )
  }
}