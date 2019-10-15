import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import BackgroundJob from 'react-native-background-job';
import theme from '../styles/theme.style';
import { Socket } from '../websocket';
import PushController from '../controllers/PushController';
import { Notification } from '../controllers/NotificationPushController';

const backgroundJob = {
  jobKey: "myJob",
  job: () => {
    Socket.login();
    // Socket.newMessage((data) => {
    //   console.log(data);
    //   Notification.newMessage({
    //     subText: '',
    //     title: 'New Message',
    //     message: 'Vince sent you a new message'
    //   });
    // });
  }
};
BackgroundJob.register(backgroundJob);

export default class BackgroundTaskTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    console.disableYellowBox = true;
  }

  componentDidMount = () => {
    BackgroundJob.schedule({
      jobKey: "myJob",
      period: 30000
    })
    .then(() => console.log('Success'))
    .catch(err => console.err(err));
  }

  sendMessage = () => {

  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text> Socket test with background job and push notif </Text>

        <View
          style={{
            marginTop: 20,
          }}
        >
          <TextInput
            style={{
              borderBottomColor: '#a7a7a7',
              borderBottomWidth: 2,
              paddingVertical: 10,
              width: Dimensions.get('window').width * 0.8
            }}
            onChangeText={message => this.setState({message})}
          />

          <TouchableOpacity
            onPress={() => {
              this.setState({
                message: ''
              });
              this.sendMessage();
            }}
            style={{
              backgroundColor: theme.COLOR_BLUE,
              paddingVertical: 10,
              paddingHorizontal: 20,
              marginTop: 10,
              alignSelf: 'center'
            }}
          >
            <Text style={{color:theme.COLOR_WHITE}}>Send</Text>
          </TouchableOpacity>
        </View>
      
        <PushController />
      </View>
    )
  }
}