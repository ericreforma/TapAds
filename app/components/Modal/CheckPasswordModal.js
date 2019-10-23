import React, { Component } from 'react';
import {
  Modal,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TextInput
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import { AuthController } from '../../controllers';

import {
  LabelText,
  CommonText
} from '../Text';
import theme from '../../styles/theme.style';

export default class CheckPasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      loader: false
    };
  }

  checkUserPassword = () => {
    this.setState({loader: true});
    const { password } = this.state;
    AuthController.checkPassword({password})
    .then(res => {
      this.setState({loader: false});
      if(res.data) {
        this.props.proceed();
      } else {
        this.failedFlashMessage('The password you entered is incorrect.');
      }
    })
    .catch(error => {
      console.log(error);
      this.setState({loader: false});
      this.failedFlashMessage(error.message);
    });
  }

  failedFlashMessage = (description) => {
    this.dropDownAlertRef.alertWithType(
      'error',
      'Error!',
      description
    );
  }

  render() {
    return (
      <Modal
        visible={this.props.isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={this.props.close}
      >
        <View
          style={{
            backgroundColor: theme.COLOR_BLACK + '81',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              width: "80%",
              padding: 20,
              backgroundColor: theme.COLOR_WHITE,
              borderRadius: theme.PAGE_CARD_RADIUS,
              overflow: 'hidden',
              elevation: 5
            }}
          >
            <LabelText>Enter password to proceed:</LabelText>

            <View
              style={{
                marginTop: 10,
                marginBottom: 15
              }}
            >
              <TextInput
                placeholder="password.."
                placeholderTextColor={theme.NEW_COLOR.COLOR_GRAY}
                style={{
                  fontFamily: 'Montserrat-Medium',
                  fontSize: theme.FONT_SIZE_SMALL,
                  color: theme.NEW_COLOR.COLOR_BLACK,
                  paddingHorizontal: 0,
                  borderBottomColor: theme.COLOR_LIGHT_BLUE,
                  borderBottomWidth: 2,
                  paddingVertical: 5
                }}
                secureTextEntry={true}
                onSubmitEditing={this.checkUserPassword}
                onChangeText={password => this.setState({ password })}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: theme.COLOR_BLUE,
                  borderRadius: 15,
                  paddingVertical: 12,
                  paddingHorizontal: 20,
                  alignSelf: 'center'
                }}
                onPress={this.checkUserPassword}
                disabled={this.state.loader}
              >
                {this.state.loader ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <CommonText color="white">Submit</CommonText>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: theme.COLOR_GRAY_BUTTON,
                  borderRadius: 15,
                  paddingVertical: 12,
                  paddingHorizontal: 20,
                  alignSelf: 'center'
                }}
                onPress={this.props.close}
                disabled={this.state.loader}
              >
                <CommonText color="white">Cancel</CommonText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
				<DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
      </Modal>
    );
  }
}