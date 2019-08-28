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
	MyCampaignPage,
	CampaignCardActive,
	StartCampaignPage,
	ProfileInfoPage,
	MessengerPage,
	ChatPage,
	TermsAndConditionPage,
	AddVehiclePage
} from '../pages';

console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
	'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
	'Warning: componentWillMount is deprecated',
	'Warning: componentWillReceiveProps is deprecated',
	'Module RCTImageLoader requires',
]);

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
		initialRouteName: 'Login',
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		}
});

const AppStack = createStackNavigator({
		Home: HomePage,
		Notification: NotificationPage,
		Profile: ProfilePage,
		MyCampaign: MyCampaignPage,
		CampaignCardActive: CampaignCardActive,
		Messenger: MessengerPage,
		Campaign: CampaignPage,
		ProfileInfo: ProfileInfoPage,
		Chat: ChatPage,
		TermsAndCondition: TermsAndConditionPage,
		Addvehicle: AddVehiclePage,
		StartCampaign: StartCampaignPage
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
	StartCampaign: StartCampaignPage
	}, {
		initialRouteName: 'Loading',
	}
);

const AppContainer = createAppContainer(AppRoute);
