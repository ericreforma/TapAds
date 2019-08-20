import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Animated,
    Dimensions
} from 'react-native';
import styles from '../styles/page.Notification.style';
import NotificationCard from '../components/NotificationCard';
import { Page } from './Page';
import UserInfo from '../components/UserInfo';
import NavigationService from '../services/navigation';

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
            notification: [
                {
                    client: 'Mcdonalds Philippines',
                    action: 1
                },{
                    client: 'KIA Philippines',
                    action: 2
                },{
                    client: 'Davies Paint',
                    action: 3
                },{
                    client: 'Mcdonalds Philippines',
                    action: 1
                },{
                    client: 'KIA Philippines',
                    action: 2
                },{
                    client: 'Davies Paint',
                    action: 3
                }
            ]
        };
    }
    
    menuButtonOnPress = () => {
        Animated.timing(this.state.modalFadeBackground, {
            toValue: this.state.scrollEnable ? 0.7 : 0,
            duration: 600
        }).start(() => {
            this.setState({
                modalContainerzIndex: this.state.scrollEnable ? 0 : 1
            });
        });

        Animated.timing(this.state.modalXValue, {
            toValue: this.state.scrollEnable ? this.state.width - 330 : this.state.width,
            duration: 500
        }).start();

        this.setState({
            scrollEnable: !this.state.scrollEnable,
            modalContainerzIndex: 1
        });
    }

    notificationOnPress = (action) => () => {
        if(action == 1) {
            NavigationService.navigate('Chat');
        }
    }

    render() {
        return (
            <Page>
                <ScrollView
                    style={styles.notifPageScrollView}
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                >
                
                    <UserInfo />

                    {/* notification content */}
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
                                {this.state.notification.map((notif, index) =>
                                    <NotificationCard
                                        key={index}
                                        client={notif.client}
                                        action={notif.action}
                                        onPress={this.notificationOnPress(notif.action)}
                                    />
                                )}
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </Page>
        );
    }
}