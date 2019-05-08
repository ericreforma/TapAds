import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import LogInPage from './app/pages/LogInPage';
import HomePage from './app/pages/HomePage';

class App extends Component {
	render() {
		return (
			<HomePage />
			// <Routes />
		);
	}
}

AppRegistry.registerComponent('TapAds', () => App);
