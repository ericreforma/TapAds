import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LogInPage from '../pages/LogInPage';
import HomePage from '../pages/HomePage';
import NotificationPage from '../pages/NotificationPage';
import SignUpPage from '../pages/SignUpPage';

export default class Route extends Component {
	render() {
		return (
			<AppContainer />
		);
	}
}

const RouteStack = createStackNavigator(
	{
		Login: LogInPage,
		Home: HomePage,
		Notification: NotificationPage,
		Signup: SignUpPage
	}, {
        initialRouteName: 'Login',
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		}
	}
);

const AppContainer = createAppContainer(RouteStack);
