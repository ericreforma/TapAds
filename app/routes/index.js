import React from 'react';
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
	MyCampaignPage,
	CampaignDetailsPage,
	StartCampaignPage,
	ProfileInfoPage,
	MessageListPage,
	MessageChatPage,
	TermsAndConditionPage,
	AddVehiclePage,
	DashboardPage,
	RecommendedPage,
	ForgotPasswordPage,
	MonthlyCarPhotoPage,
} from '../pages';

import TestPage from '../pages/TestPage';

console.disableYellowBox = true;

const Route = () => {
	return (
		<AppContainer
			ref={(navigatorRef) => {
				NavigationService.setTopLevelNavigator(navigatorRef);
			}}
		/>
	);s
}

export default Route;

const AuthStack = createStackNavigator(
	{
		Login: LogInPage,
		SignUp: SignUpPage,
		SignUpAddImage: SignUpAddImagePage,
		SignUpAddVehicles: SignUpAddVehiclesPage,
		ForgotPassword: ForgotPasswordPage
	}, {
		initialRouteName: 'Login',
		headerMode: 'none',
		navigationOptions: { headerVisible: false }
	}
);

const AppStack = createStackNavigator(
	{
		Home: HomePage,
		Notification: NotificationPage,
		Profile: ProfilePage,
		MyCampaign: MyCampaignPage,
		CampaignDetails: CampaignDetailsPage,
		Messenger: MessageListPage,
		ProfileInfo: ProfileInfoPage,
		Chat: MessageChatPage,
		TermsAndCondition: TermsAndConditionPage,
		Addvehicle: AddVehiclePage,
		StartCampaign: StartCampaignPage,
		Dashboard: DashboardPage,
		Recommended: RecommendedPage,
		MonthlyCarPhoto: MonthlyCarPhotoPage,
	}, {
		initialRouteName: 'Home',
		headerMode: 'none',
		navigationOptions: { headerVisible: false }
	}
);

const AppRoute = createSwitchNavigator(
	{
		Loading: LoadingPage,
		Auth: AuthStack,
		App: AppStack,
		StartCampaign: StartCampaignPage,
		TestPage: TestPage
	}, {
		initialRouteName: 'Loading',
		// initialRouteName: 'TestPage'
	}
);

const AppContainer = createAppContainer(AppRoute);
