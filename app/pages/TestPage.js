import React, { Component } from 'react';
import {
  Alert,
  View
} from 'react-native';
import firebase from 'react-native-firebase';

import NavigationService from '../services/navigation';

import { FirebaseController } from '../controllers/FirebaseController';
import { ChatController } from '../controllers/ChatController';

import theme from '../styles/theme.style';
import {
  LabelText,
  CommonText
} from '../components/Text';

export default class TestPage extends Component {
  componentDidMount = () => {
    this.messageListener();

    setTimeout(() => {
      console.log('Send message');
      const message = 'this is a test message';
      const cid = 1;
      const messageType = 0;

      ChatController.request.sendMessage({
        message, cid,
        type: messageType
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error.response);
      });
    }, 8000);
  }

  componentWillUnmount = () => {
    this.notificationListener();
    this.notificationOpenedListener();
    this.messageListener();
    this.onTokenRefresh();
  }

  messageListener = async () => {
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      console.log('Notification Listener');
      const { data } = notification;
      this.notificationOpened(JSON.parse(data.data));
    });
  
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      console.log('Notification opened');
      const { data } = notificationOpen.notification;
      this.notificationOpened(JSON.parse(data.data));
    });
  
    this.messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });

    this.onTokenRefresh = firebase.messaging().onTokenRefresh((fcmToken) => {
      FirebaseController.updateToken(fcmToken);
    });
  
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if(notificationOpen) {
      const { data } = notificationOpen.notification;
      this.notificationOpened(JSON.parse(data.data));
    }
  }

  notificationOpened = data => {
    if(data.page) {
      NavigationService.navigate(data.page);
    }
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