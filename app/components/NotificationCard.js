import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import theme from '../styles/theme.style';
import styles from '../styles/component.NotificationCard.style';

export default class NotificationCard extends Component {
    notificationIcon = (action) => {
        var icons = [
            {
                action: 1,
                message: 'sent you a message',
                source: require('../assets/image/icons/mail_icon.png')
            },{
                action: 2,
                message: 'approved your post',
                source: require('../assets/image/icons/approve_icon.png')
            },{
                action: 3,
                message: 'sent payment',
                source: require('../assets/image/icons/payment_icon.png')
            }
        ];

        return icons.filter(i => i.action == action)[0];
    }

    render() {
        var icons = this.notificationIcon(this.props.action);

        return (
            <TouchableOpacity
                style={styles.cardContainer}
                activeOpacity={0.8}
                onPress={this.props.onPress}
            >
                <View>
                    <Text
                        style={styles.cardBodyClientLabel}
                    >
                        {this.props.client}
                    </Text>

                    <Text
                        style={styles.cardBodyMessageText}
                    >
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