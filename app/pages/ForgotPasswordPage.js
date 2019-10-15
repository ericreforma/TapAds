import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal
} from 'react-native';
import NavigationService from '../services/navigation';
import DropdownAlert from 'react-native-dropdownalert';
import { connect } from 'react-redux';

import { AuthController } from '../controllers/AuthController';
import { AuthAction } from '../redux/actions/auth.action';

import {
  CommonText,
  LabelText
} from '../components/Text';
import {
  IMAGES
} from '../config/variables';

import theme from '../styles/theme.style';

class ForgotPasswordPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      userData: {},
      emailView: true,
      modalVisible: false
    };
  }

  searchEmailIfExist = (email, callback) => {
    AuthController.forgotPassword.create({email})
    .then(res => {
      if(!this.state.modalVisible) {
        this.setState({email});
        this.modalToggle();
      }
      callback(true);
    })
    .catch(error => {
      const { data } = error.response;
      if(data.errors) {
        const message = data.errors.email.join('. ');
        this.dropDownAlertRef.alertWithType(
          'error',
          'Error occurred!',
          message
        );
      } else {
        this.dropDownAlertRef.alertWithType(
          'error',
          'Error occurred!',
          data.message
        );
      }
      callback(false);
    });
  }

  modalToggle = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  storeUserData = (userData) => {
    this.setState({
      userData,
      emailView: false
    });
    this.modalToggle();
    this.dropDownAlertRef.alertWithType(
      'success',
      'Code verified!',
      'Fill in your new password in the fields below'
    );
  }

  submitChangePassword = ({password, passwordConfirmation}, callback) => {
    if(password === '') {
      this.dropDownAlertRef.alertWithType(
        'error',
        'Fill in new password',
        ''
      );
      callback();
    } else if(passwordConfirmation === '') {
      this.dropDownAlertRef.alertWithType(
        'error',
        'Fill in password confirmation',
        ''
      );
      callback(true);
    } else if(password !== passwordConfirmation) {
      this.dropDownAlertRef.alertWithType(
        'error',
        "Password didn't match",
        'The password you fill in does not match. Please try again and make sure it matches'
      );
      callback(true);
    } else {
      AuthController.forgotPassword.reset({
        'email': this.state.userData.email,
        'password': password,
        'password_confirmation': passwordConfirmation,
        'token': this.state.userData.token
      })
      .then(res => {
        callback(false);
        this.dropDownAlertRef.alertWithType(
          'success',
          'Password updated! Logging in your account..',
          "Please don't forget your password the next time you will login. Thank you!"
        );
        setTimeout(() => {
          this.props.loginPressed(this.state.userData.email, password);
        }, 2000);
      })
      .catch(error => {
        const { data } = error.response;
        if(data.errors) {
          const message = data.errors.email.join('. ');
          this.dropDownAlertRef.alertWithType(
            'error',
            'Error occurred!',
            message
          );
        } else {
          this.dropDownAlertRef.alertWithType(
            'error',
            'Error occurred!',
            data.message
          );
        }
        callback(true);
      });
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.COLOR_DIRTY_WHITE,
          paddingHorizontal: 20,
        }}
      >
        <InputCodeModal
          modalVisible={this.state.modalVisible}
          modalToggle={this.modalToggle}
          storeUserData={this.storeUserData}
          searchEmailIfExist={this.searchEmailIfExist}
          email={this.state.email}
        />

        <TouchableOpacity
          style={{
            paddingVertical: 30,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start'
          }}
          onPress={() => NavigationService.navigate('Login')}
        >
          <Image
            style={{
              height: 17,
              width: 15,
              marginRight: 10
            }}
            resizeMode="stretch"
            source={IMAGES.ICONS.back_icon}
          />

          <CommonText>Back to login</CommonText>
        </TouchableOpacity>

        <LabelText large>Find your account</LabelText>
        
        <View
          style={{
            marginVertical: 20
          }}
        >
          <CommonText>
            Please enter your email or phone number to search for your account.
          </CommonText>

          {this.state.emailView ? (
            <GetEmailView
              searchEmailIfExist={this.searchEmailIfExist}
            />  
          ) : (
            <NewPasswordView
              submitChangePassword={this.submitChangePassword}
              email={this.state.email}
            />
          )}
        </View>
      
        <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
	loginPressed: (email, password) => dispatch(AuthAction.login(email, password))
});

export default connect(null, mapDispatchToProps)(ForgotPasswordPage);

class InputCodeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code:'',
      submitLoader: false,
      resendCodeLoader: false,
    };
  }

  verifyCode = () => {
    this.toggleSubmitLoader();
    const { code } = this.state;
    AuthController.forgotPassword.verify(code)
    .then(res => {
      console.log(code);
      this.toggleSubmitLoader();
      this.props.storeUserData(res.data);
      console.log(res.data);
    })
    .catch(error => {
      this.toggleSubmitLoader();
      const { data } = error.response;
      if(data.message) {
        this.dropDownAlertRef.alertWithType(
          'error',
          'Invalid Code',
          data.message
        );
      }
    });
  }

  resendCode = () => {
    this.toggleResendCodeLoader();
    this.props.searchEmailIfExist(this.props.email, () => {
      this.toggleResendCodeLoader();
      this.dropDownAlertRef.alertWithType(
        'success',
        'Code sent successfully!',
        'Open your email and input the code below to change your password, thanks!'
      );
    });
  }

  toggleSubmitLoader = () => {
    this.setState({ submitLoader: !this.state.submitLoader });
  }

  toggleResendCodeLoader = () => {
    this.setState({ resendCodeLoader: !this.state.resendCodeLoader });
  }

  render() {
    return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={this.props.modalVisible}
			>
        <View
          style={{
            flex: 1,
            backgroundColor: theme.COLOR_BLACK + '81',
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <View
            style={{
              backgroundColor: theme.COLOR_DIRTY_WHITE,
              width: '100%',
              borderRadius: theme.PAGE_CARD_RADIUS,
              paddingHorizontal: 20,
              paddingVertical: 15,
              elevation: 10
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                paddingBottom: 10,
              }}
            >
              <LabelText large>
                Code Verificaton
              </LabelText>

              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                }}
                onPress={this.props.modalToggle}
              >
                <LabelText large>X</LabelText>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginBottom: 10
              }}
            >
              <CommonText>
                Input the code we've sent in your email in order to proceed:
              </CommonText>
            </View>

            {/* input buttons */}
            <TextInput
              value={this.state.code}
              style={{
                borderBottomColor: theme.COLOR_LIGHT_BLUE,
                borderBottomWidth: 3,
                paddingVertical: 5,
                paddingHorizontal: 5,
                marginBottom: 3,
                textAlign: 'center',
                fontSize: 15,
                fontFamily: 'Montserrat-Regular',
              }}
              placeholder="Enter code"
              placeholderTextColor={theme.COLOR_NORMAL_FONT + '70'}
              onChangeText={code => this.setState({code})}
            />

            {/* resend code button */}
            <View
              style={{
                alignSelf: 'center'
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.resendCode}
                disabled={this.resendCodeLoader}
              >
                {this.state.resendCodeLoader ? (
                  <ActivityIndicator
                    color={theme.COLOR_PINK}
                    style={{
                      height: 10,
                      marginTop: 7
                    }}
                  />
                ) : (
                  <CommonText color="pink">Resend code</CommonText>
                )}
              </TouchableOpacity>
            </View>

            {/* action buttons */}
            <TouchableOpacity
              style={{
                backgroundColor: theme.COLOR_BLUE,
                borderRadius: theme.PAGE_CARD_RADIUS,
                paddingVertical: 10,
                paddingHorizontal: 30,
                alignSelf: 'center',
                marginTop: 20,
              }}
              onPress={this.verifyCode}
            >
              {this.state.submitLoader ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <CommonText color="white">
                  Verify
                </CommonText>
              )}
            </TouchableOpacity>
          </View>
        </View>

				<DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
      </Modal>
    );
  }
}

class GetEmailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loader: false,
    };
  }

  searchEmailIfExist = () => {
    this.setState({loader: true});
    this.props.searchEmailIfExist(this.state.email, () => {
      this.setState({loader: false});
    });
  }

  render() {
    return (
      <View>
        <TextInput
          value={this.state.email}
          style={{
            borderBottomColor: theme.COLOR_LIGHT_BLUE,
            borderBottomWidth: 3,
            paddingVertical: 5,
            paddingHorizontal: 5,
            color: theme.COLOR_BLACK,
            marginBottom: 10,
            marginTop: 5,
            fontSize: 15,
            fontFamily: 'Montserrat-Regular',
          }}
          editable={!this.state.loader}
          placeholder="Email"
          placeholderTextColor={theme.COLOR_GRAY_HEAVY}
          onChangeText={email => this.setState({email})}
          onSubmitEditing={this.searchEmailIfExist}
          returnKeyType="search"
        />

        <TouchableOpacity
          style={{
            backgroundColor: theme.COLOR_BLUE,
            borderRadius: 5,
            paddingVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            alignSelf: 'flex-end'
          }}
          onPress={this.searchEmailIfExist}
          disabled={this.state.loader}
        >
          {this.state.loader ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <CommonText color="white">
              Search
            </CommonText>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

class NewPasswordView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      password: '',
      passwordConfirmation: '',
      passwordSubmitLoader: false,
    };
  }

  submitChangePassword = () => {
    this.setState({ passwordSubmitLoader: true });
    const password = this.state.password;
    const passwordConfirmation = this.state.passwordConfirmation;
    this.props.submitChangePassword({password, passwordConfirmation}, res => {
      if(res) {
        this.setState({ passwordSubmitLoader: false });
      }
    });
  }

  render() {
    return (
      <View
        style={{
          marginVertical: 20,
          paddingTop: 20,
          borderTopColor: '#a7a7a7',
          borderTopWidth: 1
        }}
      >
        {/* email part */}
        <LabelText>Email</LabelText>
        <View
          style={{
            paddingTop: 3,
          }}
        >
          <CommonText large>{this.state.email}</CommonText>
        </View>

        {/* password */}
        <TextInput
          style={{
            borderBottomColor: theme.COLOR_LIGHT_BLUE,
            borderBottomWidth: 3,
            paddingVertical: 5,
            paddingHorizontal: 0,
            marginTop: 10,
            color: theme.COLOR_BLACK,
            fontSize: 15,
            fontFamily: 'Montserrat-Regular',
          }}
          secureTextEntry={true}
          placeholder="Input New Password"
          placeholderTextColor={theme.COLOR_GRAY_HEAVY}
          onChangeText={password => this.setState({password})}
          onSubmitEditing={() => {this.newPasswordTextInput.focus();}}
          returnKeyType="next"
        />

        {/* confirm password */}
        <TextInput
          ref={ref => this.newPasswordTextInput = ref}
          style={{
            borderBottomColor: theme.COLOR_LIGHT_BLUE,
            borderBottomWidth: 3,
            paddingVertical: 5,
            paddingHorizontal: 0,
            marginTop: 15,
            color: theme.COLOR_BLACK,
            fontSize: 15,
            fontFamily: 'Montserrat-Regular',
          }}
          secureTextEntry={true}
          placeholder="Confirm Password"
          placeholderTextColor={theme.COLOR_GRAY_HEAVY}
          onChangeText={passwordConfirmation => this.setState({passwordConfirmation})}
          onSubmitEditing={this.submitChangePassword}
          returnKeyType="send"
        />

        <TouchableOpacity
          style={{
            backgroundColor: theme.COLOR_BLUE,
            borderRadius: 5,
            paddingVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            alignSelf: 'flex-end',
            marginTop: 20
          }}
          onPress={this.submitChangePassword}
          disabled={this.state.passwordSubmitLoader}
        >
          {this.state.passwordSubmitLoader ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <CommonText color="white">Submit</CommonText>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}