import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView,
	ActivityIndicator
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';

import NavigationService from '../services/navigation';
import { UserController } from '../controllers/UserController';
import { USER } from '../redux/actions/types.action';

import { CommonText } from '../components/Text';
import styles from '../styles/page.Notification.style';
import NotificationCard from '../components/NotificationCard';
import Page from './Page';
import UserInfo from '../components/UserInfo';

class NotificationPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			/*
				notification data
				1 - sent a message
				2 - approve post
				3 - payment sent
			*/
			loader: true,
			notification: []
		};
	}

	getNotificationContent = () => {
		UserController.request.notificationContent()
		.then(res => {
			const { notif } = res.data;
			const { notification } = this.state;

			this.setState({
				notification: notif.concat(notification),
				loader: false
			});
			
			this.props.updateUserNotification(0);
		})
		.catch(error => console.log(error.response));
	}

	removeNotification = () => {
		this.setState({
			loader: true,
			notification: []
		});
	}

	notificationOnPress = (action, id) => () => {
		if(action == 1) {
			NavigationService.navigate('Chat', {id});
		} else if(action == 2) {
			NavigationService.navigate('MyCampaign');
		}
	}

	render() {
		return (
			<Page
				notif
				reInitializePage={this.getNotificationContent}
			>
				<NavigationEvents
					onWillFocus={this.getNotificationContent}
					onWillBlur={this.removeNotification}
				/>

				<ScrollView
					style={styles.notifPageScrollView}
					overScrollMode='never'
					showsVerticalScrollIndicator={false}
				>
					<UserInfo />

					<View style={styles.notifPageContentMargin}>
						{/* notificaton label */}
						<View style={styles.notifPageContentLabelWrapper}>
							<Text style={styles.notifPageContentLabelText}>
								Notifications
							</Text>
						</View>

						{/* notification content */}
						<View style={styles.notifPageContentContainer}>
							<View style={styles.notifPageContentBodyWrapper}>
								{this.state.loader ? (
									<ActivityIndicator color="#000" style={{ height: 75 }} />
								) : (
									this.state.notification.length !== 0
									? this.state.notification.map((notif, index) =>
										<NotificationCard
											key={index}
											client={notif.client}
											action={notif.action}
											requestStatus={notif.request_status}
											onPress={this.notificationOnPress(notif.action, notif.id)}
											seen={notif.seen}
										/>
									) : (
										<View style={styles.notifPageNoNotif}>
											<CommonText xsmall>
												-- No notification --
											</CommonText>
										</View>
									)
								)}
							</View>
						</View>
					</View>
				</ScrollView>
			</Page>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.userReducer.user
});

const mapDispatchToProps = (dispatch) => ({
	updateUserNotification: notification => dispatch({ type: USER.NOTIFICATION.UPDATE, notification }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage);
  