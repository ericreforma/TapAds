import React, { Component } from 'react';
import {
	createStackNavigator,
	createSwitchNavigator,
	createAppContainer,
} from 'react-navigation';

import NavigationService from '../services/navigation';
import {
	LogInPage,
	HomePage,
	NotificationPage,
	SignUpPage,
	ProfilePage,
	LoadingPage,
	CampaignPage,
	MyCampaignPage
} from '../pages';

export default class Route extends Component {
	render() {
		return (
			<AppContainer
				ref={(navigatorRef) => {
					NavigationService.setTopLevelNavigator(navigatorRef);
				}}
			/>
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
		Campaign: CampaignPage,
		MyCampaign: MyCampaignPage
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
