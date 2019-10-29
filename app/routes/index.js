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
	SignUpAddImagePage,
	SignUpAddVehiclesPage,
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
	AddVehiclePage,
	DashboardPage,
	RecommendedPage,
	ForgotPasswordPage,
	MonthlyCarPhotoPage
} from '../pages';
import BackgroundTaskTest from '../pages/BackgroundTaskTest';

export default class Route extends Component {
	constructor(props) {
		super(props);
    console.disableYellowBox = true;
	}

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
	SignUp: SignUpPage,
	SignUpAddImage: SignUpAddImagePage,
	SignUpAddVehicles: SignUpAddVehiclesPage,
	ForgotPassword: ForgotPasswordPage
	}, {
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
		StartCampaign: StartCampaignPage,
		Dashboard: DashboardPage,
		Recommended: RecommendedPage,
		MonthlyCarPhoto: MonthlyCarPhotoPage,
		// BackgroundTaskTest: BackgroundTaskTest,
	}, {
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
