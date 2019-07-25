import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LogInPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import NotificationPage from '../pages/NotificationPage';
import SignUpPage from '../pages/SignUpPage';
import ProfilePage from '../pages/ProfilePage';
import ProfileInfoPage from '../pages/ProfileInfoPage';
import MyCampaignPage from '../pages/MyCampaignPage';
import CampaignCardActive from '../pages/CampaignCardActive';
import MessengerPage from '../pages/MessengerPage';
import CampaignPage from '../pages/CampaignPage';
import ChatPage from '../pages/ChatPage';
import TermsAndConditionPage from '../pages/TermsAndConditionPage';
import AddVehiclePage from '../pages/AddVehiclePage';

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
		Profile: ProfilePage,
		Mycampaign: MyCampaignPage,
		CampaignCardActive: CampaignCardActive,
		Messenger: MessengerPage,
		Campaign: CampaignPage,
		ProfileInfo: ProfileInfoPage,
		Chat: ChatPage,
		TermsAndCondition: TermsAndConditionPage,
		Addvehicle: AddVehiclePage
	}, {
        initialRouteName: 'Login',
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		}
	}
);

const AppContainer = createAppContainer(RouteStack);
