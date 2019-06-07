import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Routes from './app/routes';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';

class App extends Component {


	render() {
		return (
			// <LogInPage />
			<Provider store={store}>

				<Routes />

			</Provider>
		);
	}


}

AppRegistry.registerComponent('TapAds', () => App);
