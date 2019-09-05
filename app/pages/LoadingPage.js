import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  ActivityIndicator
} from 'react-native';
import { AUTH, USER } from '../redux/actions/types.action';
import { UserController } from '../controllers';
import { UserSchema } from '../database';
import theme from '../styles/theme.style';
import { CampaignAction } from '../redux/actions/campaign.action';
import NavigationService from '../services/navigation';

class LoadingPage extends Component {

  constructor(props) {
    super(props);
    this.authenticate();
    
  }

  authenticate = () => {
      this.props.dispatchLoginRequest();
      UserController.request.profile()
      .then((authResponse) => {
        this.props.dispatchLoginSuccess();
        this.props.dispatchGetProfile(authResponse.data);
        this.props.dispatchGetMyList();
        UserSchema.update(authResponse.data,
        () => {
          NavigationService.navigate('ProfileInfo');
        });
      })
      .catch((error) => {
          NavigationService.navigate('Login');
          console.log(error);
      });
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
  dispatchLoginFailed: () => dispatch({ type: AUTH.LOGIN.FAILED }),

});

export default connect(null, mapDispatchToProps)(LoadingPage);
