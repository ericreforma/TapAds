import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LogInPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import NotificationPage from '../pages/NotificationPage';
import SignUpPage from '../pages/SignUpPage';
import ProfilePage from '../pages/ProfilePage';
import MyCampaignPage from '../pages/MyCampaignPage';
import CampaignCardActive from '../pages/CampaignCardActive';
import MessengerPage from '../pages/MessengerPage';

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
		Messenger: MessengerPage
	}, {
        initialRouteName: 'Home',
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		}
	}
);

const AppContainer = createAppContainer(RouteStack);
