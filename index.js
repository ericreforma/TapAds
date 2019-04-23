import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import LogInPage from './app/pages/LogInPage';

class App extends Component {
  render() {
    return (
      <LogInPage />
      // <Routes />
    );
  }
}

AppRegistry.registerComponent('TapAds', () => App);
