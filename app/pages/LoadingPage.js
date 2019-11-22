import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  ActivityIndicator
} from 'react-native';
import firebase from 'react-native-firebase';

import { AUTH, USER } from '../redux/actions/types.action';
import { UserController, FirebaseController } from '../controllers';
import theme from '../styles/theme.style';
import { CampaignAction } from '../redux/actions/campaign.action';
import NavigationService from '../services/navigation';

class LoadingPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount = () => this.authenticate()

  navigateToHome = (args = null) => NavigationService.navigate('Home', { jumpTo: args });

  authenticate = () => {
    this.props.dispatchLoginRequest();
    UserController.request.profile()
    .then((authResponse) => {
      this.props.dispatchLoginSuccess();
      this.props.dispatchGetProfile(authResponse.data);
      this.props.dispatchGetMyList();
      this.firebaseInit();
    })
    .catch((error) => {
      NavigationService.navigate('Login');
      console.log(error.response);
      console.log(error);
    });
  }

  firebaseInit = () => {
    FirebaseController.init(async() => {
      const notificationOpen = await firebase.notifications().getInitialNotification();
      if(notificationOpen) {
        console.log('Initial Notification opened');
        const { data } = notificationOpen.notification;
        this.notificationOpened(JSON.parse(data.data));
      } else {
        this.navigateToHome();
      }
    }, () => {
      console.log('Firebase error');
      setTimeout(() => this.firebaseInit(), 1500);
    });
  }

  notificationOpened = data => {
		const { sender_id, page, name, args } = data;
		if(page) {
			if(name === 'Custom') {
        this.navigateToHome({ page, args });
			} else {
				const argsToPass = page === 'Chat' ? { id: sender_id } : null;
        this.navigateToHome({ page, args: argsToPass });
			}
		} else {
      this.navigateToHome();
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: theme.COLOR_MEDIUM_BLUE
        }}
      >
        <ActivityIndicator color="#fff" />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchGetMyList: () => dispatch(CampaignAction.mylist()),
  dispatchGetProfile: (user) => dispatch({ type: USER.GET.PROFILE.SUCCESS, user }),
  dispatchLoginRequest: () => dispatch({ type: AUTH.LOGIN.REQUEST }),
  dispatchLoginSuccess: () => dispatch({ type: AUTH.LOGIN.SUCCESS }),
  dispatchLoginFailed: () => dispatch({ type: AUTH.LOGIN.FAILED })
});

export default connect(null, mapDispatchToProps)(LoadingPage);
