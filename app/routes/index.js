import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LogInPage from '../pages/LogInPage';
import HomePage from '../pages/HomePage';
import NotificationPage from '../pages/NotificationPage';
import SignUpPage from '../pages/SignUpPage';
import ProfilePage from '../pages/ProfilePage';

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
		Signup: SignUpPage,
		Home: HomePage,
		Notification: NotificationPage,
		Profile: ProfilePage
	}, {
        initialRouteName: 'Home',
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		}
	}
);

const AppContainer = createAppContainer(RouteStack);
