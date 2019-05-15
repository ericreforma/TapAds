import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Route from './app/routes/index';

class App extends Component {
	render() {
		return (
			<Route />
		);
	}
}

AppRegistry.registerComponent('TapAds', () => App);
