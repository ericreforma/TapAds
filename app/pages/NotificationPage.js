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
            this.setState({
                notification: notif,
                loader: false
            });
            
            const { user } = this.props;
            const userKeys = Object.keys(user);
            const newUserData = {};
            for(const u of userKeys) {
                if(u === 'notificationCount') {
                    newUserData[u] = 0;
                } else {
                    newUserData[u] = user[u];
                }
            }
            this.props.updateUserNotification(newUserData);
        })
        .catch(error => console.log(error.response));
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
            <Page notif>
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
                                            seen={notif.seen}
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

const mapStateToProps = (state) => ({
	user: state.userReducer.user
});

const mapDispatchToProps = (dispatch) => ({
	updateUserNotification: (user) => dispatch({ type: USER.GET.PROFILE.SUCCESS, user }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage);
  