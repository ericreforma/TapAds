import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import styles from '../styles/component.NotificationCard.style';

export default class NotificationCard extends Component {
	notificationIcon = (action, requestStatus) => {
		if(!requestStatus) {
			const icons = {
				action: 1,
				message: 'sent you a message',
				source: require('../assets/image/icons/mail_icon.png')
			};

			return icons;
		} else {
			const status = [
				{
					action: 2,
					requestStatus: 1,
					message: 'approved your post',
					source: require('../assets/image/icons/approve_icon.png')
				}, {
					action: 2,
					requestStatus: 2,
					message: 'rejected your post',
					source: require('../assets/image/icons/reject_icon.png')
				}, {
					action: 3,
					requestStatus: 1,
					message: 'sent payment',
					source: require('../assets/image/icons/payment_icon.png')
				}, {
					action: 3,
					requestStatus: 2,
					message: 'sent payment',
					source: require('../assets/image/icons/payment_icon.png')
				}
			];

			return status.find(i => i.requestStatus === requestStatus && i.action === action);
		}
	}

	render() {
		const icons = this.notificationIcon(this.props.action, this.props.requestStatus);

		return (
			<TouchableOpacity
				style={styles.cardContainer}
				activeOpacity={0.8}
				onPress={this.props.onPress}
			>
				<View
					style={{
						flexGrow: 1,
						flex: 1,
						paddingRight: 10
					}}
				>
					<Text
						style={styles.cardBodyClientLabel}
						numberOfLines={1}
					>
						{this.props.client}
					</Text>

					<Text style={styles.cardBodyMessageText}>
						{icons.message}
					</Text>
				</View>

				<Image
					style={styles.cardBodyIconSize}
					resizeMode="contain"
					source={icons.source}
				/>
			</TouchableOpacity>
		);
	}
}
