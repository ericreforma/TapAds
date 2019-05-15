import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    ScrollView,
    Animated,
    Dimensions
} from 'react-native';
import { HeaderNav, UserInfo } from '../components/HeaderNav';
import styles from '../styles/page.Notification.style';
import ModalMenu from '../components/Modal/Navigation';
import NotificationCard from '../components/NotificationCard';

export default class NotificationPage extends Component {
    state = {
        // menu data
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        scrollEnable: true,
        modalFadeBackground: new Animated.Value(0),
        modalContainerzIndex: 0,
        modalXValue: new Animated.Value(Dimensions.get('window').width),

        // user data
        userData: {
            name: 'Patrick Cua',
            rate: 4.60239,
            totalRate: 35 //total number of clients(rating)
        },

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

    render() {
        return (
            <View>
                <ImageBackground
                    style={styles.notifPageBackgroundImage}
                    resizeMode="stretch"
                    source={require('../assets/image/common_page_background.png')}
                ></ImageBackground>
                
                <HeaderNav
                    menuButtonOnPress={this.menuButtonOnPress}
                    navigation={this.props.navigation}
                />

                <ScrollView
                    style={styles.notifPageScrollView}
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={this.state.scrollEnable}
                >
                
                    <UserInfo 
                        profilePicture={require('../assets/image/male_avatar.png')}
                        userData={this.state.userData}
                    />

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
                                        onPress={() => alert('pressed!')}
                                    />
                                )}
                            </View>
                        </View>
                    </View>

                </ScrollView>

                <ModalMenu
                    modalContainerzIndex={this.state.modalContainerzIndex}
                    modalContainerTop={this.state.modalContainerTop}
                    width={this.state.width}
                    height={this.state.scrollEnable ? 0 : this.state.height}
                    modalFadeBackground={this.state.modalFadeBackground}
                    modalXValue={this.state.modalXValue}
                    menuButtonOnPress={this.menuButtonOnPress}
                    navigation={this.props.navigation}
                />
            </View>
        );
    }
}