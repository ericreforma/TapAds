import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LogInPage from '../pages/LogInPage';
import HomePage from '../pages/HomePage';
import NotificationPage from '../pages/NotificationPage';

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
		Notification: NotificationPage
	}, {
        initialRouteName: 'Notification',
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		}
	}
);

const AppContainer = createAppContainer(RouteStack);
