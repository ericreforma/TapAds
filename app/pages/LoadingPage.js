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
        UserSchema.update(authResponse.data,
        () => {
          this.props.navigation.navigate('Home');
        });
      })
      .catch((error) => {
          this.props.dispatchLoginFailed();
          this.props.navigation.navigate('Login');
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
  dispatchGetProfile: (user) => dispatch({ type: USER.GET.PROFILE.SUCCESS, user }),
  dispatchLoginRequest: () => dispatch({ type: AUTH.LOGIN.REQUEST }),
  dispatchLoginSuccess: () => dispatch({ type: AUTH.LOGIN.SUCCESS }),
  dispatchLoginFailed: () => dispatch({ type: AUTH.LOGIN.FAILED })
});

export default connect(null, mapDispatchToProps)(LoadingPage);
