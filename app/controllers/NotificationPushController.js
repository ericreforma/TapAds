import PushNotification from 'react-native-push-notification';
import theme from '../styles/theme.style';

export const Notification = {
  newMessage: ({subText, title, message, data}) => {
    PushNotification.localNotification({
      /* Android Only Properties */
      ticker: "My Notification Ticker", // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
      smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
      // bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
      subText, // (optional) default: none
      color: theme.COLOR_BLUE, // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'some_tag', // (optional) add tag to message
      group: "group", // (optional) add group to message
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      priority: "high", // (optional) set notification priority, default: high
      visibility: "private", // (optional) set notification visibility, default: private
      importance: "high", // (optional) set notification importance, default: high
  
      /* iOS and Android properties */
      title, // (optional)
      message, // (required)
      playSound: false, // (optional) default: true,
      soundName: 'chat_sound.mp3',
      // actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more

      // additional data
      data,
    });
  }
};