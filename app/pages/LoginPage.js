import React, { Component } from 'react';
import { Text, Button, View } from 'react-native';

export default class LogInPage extends Component {
  static navigationOptions = {
    title: 'Login'
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
      <Text>This is the login Screen</Text>
      <Button
        title="Sign Up"
        onPress={() => this.props.navigation.navigate('signup')}
      />
      </View>
    );
  }
}
