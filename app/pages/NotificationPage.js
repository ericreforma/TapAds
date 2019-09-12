import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { NavigationEvents } from 'react-navigation';

import NavigationService from '../services/navigation';
import { UserController } from '../controllers/UserController';

import { CommonText } from '../components/Text';
import styles from '../styles/page.Notification.style';
import NotificationCard from '../components/NotificationCard';
import { Page } from './Page';
import UserInfo from '../components/UserInfo';

export default class NotificationPage extends Component {
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
            this.setState({
                notification: res.data,
                loader: false
            });
        })
        .catch(error => console.log(error));
    }

    notificationOnPress = (action, id) => () => {
        if(action == 1) {
            NavigationService.navigate('Chat', {id});
        }
    }

    render() {
        return (
            <Page>
                <NavigationEvents onWillFocus={this.getNotificationContent} />

                <ScrollView
                    style={styles.notifPageScrollView}
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                >
                
                    <UserInfo />

                    <View
                        style={styles.notifPageContentMargin}
                    >
                        {/* notificaton label */}
                        <View
                            style={styles.notifPageContentLabelWrapper}
                        >
                            <Text
                                style={styles.notifPageContentLabelText}
                            >
                                Notifications
                            </Text>
                        </View>

                        {/* notification content */}
                        <View
                            style={styles.notifPageContentContainer}
                        >
                            <View
                                style={styles.notifPageContentBodyWrapper}
                            >
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
                                        />
                                    ) : (
                                        <View
                                            style={styles.notifPageNoNotif}
                                        >
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