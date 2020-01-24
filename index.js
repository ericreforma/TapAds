import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import Route from './app/routes';
import { store } from './app/redux/store';
import TestPage from './app/pages/TestPage';

export default class App extends Component {
	render() {
		return (
			// <TestPage />
			<Provider store={store}>
				<Route />
			</Provider>
		);
	}
}

AppRegistry.registerComponent('TapAds', () => App);
