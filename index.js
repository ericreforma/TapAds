import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
// import Routes from './app/routes';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';
import LogInPage from './app/pages/LoginPage';

class App extends Component {


	render() {
		return (
			// <LogInPage />
			<Provider store={store}>

				<LogInPage />

			</Provider>
		);
	}


}

AppRegistry.registerComponent('TapAds', () => App);
