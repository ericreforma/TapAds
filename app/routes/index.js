import React, { Component } from 'react';
import {
	createStackNavigator,
	createSwitchNavigator,
	createAppContainer,
} from 'react-navigation';

import {
	LogInPage,
	HomePage,
	NotificationPage,
	SignUpPage,
	ProfilePage,
	LoadingPage,
	SamplePage
} from '../pages';

import { UserInfo } from '../components/UserInfo';

export default class Route extends Component {
	render() {
		return (
			<AppContainer />
		);
	}
}

const AuthStack = createStackNavigator({
	Login: LogInPage,
	SignUp: SignUpPage
	}, {
		initialRouteName: 'Login'
});

const AppStack = createStackNavigator({
		Home: HomePage,
		Notification: NotificationPage,
		Profile: ProfilePage,
		Sample: SamplePage,
	}, {
    initialRouteName: 'Home',
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		}
});

const AppRoute = createSwitchNavigator({
	Loading: LoadingPage,
	Auth: AuthStack,
	App: AppStack,
	}, {
		initialRouteName: 'Loading',
	}
);

const AppContainer = createAppContainer(AppRoute);
