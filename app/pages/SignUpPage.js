import React, { Component } from 'react';
import { Text, Button, View } from 'react-native';

export default class SignUpPage extends Component {
  static navigationOptions = {
    title: 'SignUp'
  }
  render() {
    return (
      <View>
      <Text>This is the login Screen</Text>
      <Button
        title="Login"
        onPress={() => this.props.navigation.navigate('login')}
      />
      </View>
    );
  }
}
