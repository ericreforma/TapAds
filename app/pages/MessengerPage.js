import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    Animated,
    Image
} from 'react-native';

import ModalMenu from '../components/Modal/Navigation';
import { HeaderNav, UserInfo } from '../components/HeaderNav';
import {
    LabelText,
    Common,
    CommonOverflow,
    LabelOverflow
} from '../components/Text';

import theme from '../styles/theme.style';
import styles from '../styles/page.Home.style';

export default class MessengerPage extends Component {
    state = {
        modalFadeBackground: new Animated.Value(0),
        modalContainerzIndex: 0,
        modalXValue: new Animated.Value(Dimensions.get('window').width),
        scrollEnable: true,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

        textInputHeight: '10%',

        userData: {
            name: 'Patrick Cua',
            rate: 4.60239,
            totalRate: 35, //total number of clients(rating)
            userType: 'user'
        },

        conversations: [
            {
                id: 5,
                client_id: 4,
                business_name: 'Mcdonalds Philippines',
                message: 'Greetings! We are pleased to announce that lorem ipsum dolor sit amet',
                sender: 1,
                client_media_url: require('../assets/image/sample_client_mcdo.png'),
                created_at: '2019-07-09 10:00:00'
            },{
                id: 10,
                client_id: 5,
                business_name: 'Kia Philippines',
                message: 'Hello! We are pleased to announce that lorem ipsum dolor sit amet',
                sender: 1,
                client_media_url: require('../assets/image/sample_client_kia.png'),
                created_at: '2019-07-09 09:00:00'
            },{
                id: 11,
                client_id: 6,
                business_name: 'Davies Paints',
                message: 'Thank you! I hope to be lorem ipsum dolor sit amet',
                sender: 0,
                client_media_url: require('../assets/image/sample_client_davies.png'),
                created_at: '2019-07-09 22:00:00'
            },{
                id: 12,
                client_id: 7,
                business_name: 'Pioneer Adhesives',
                message: 'Hi! I have some inquiries regarding the lorem ipsum dolor sit amet',
                sender: 0,
                client_media_url: require('../assets/image/sample_client_pioneer.png'),
                created_at: '2019-07-09 21:00:00'
            },{
                id: 13,
                client_id: 8,
                business_name: 'Manulife Philippines',
                message: 'Hello! Thank you for this! I love the lorem ipsum dolor sit amet',
                sender: 0,
                client_media_url: require('../assets/image/sample_client_manulife.png'),
                created_at: '2019-07-09 19:00:00'
            },{
                id: 14,
                client_id: 9,
                business_name: 'Fujifilm Philippines',
                message: 'Thank you so much! I would love to lorem ipsum dolor sit amet',
                sender: 0,
                client_media_url: require('../assets/image/sample_client_fuji.png'),
                created_at: '2019-07-09 17:00:00'
            },{
                id: 15,
                client_id: 10,
                business_name: 'Lorem Philippines',
                message: 'Thank you so much! I would love to lorem ipsum dolor sit amet',
                sender: 0,
                client_media_url: null,
                created_at: '2019-07-09 17:00:00'
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

    convert12HourTime = (timestamp) => {
        var time = timestamp.split(' ')[1],
            hour = parseInt(time.split(':')[0]),
            min = time.split(':')[1],
            time = hour == 0 ? '12' : (
                hour < 12 ? hour : hour - 12
            ) + `:${min} ${hour < 12 ? 'AM' : 'PM'}`;

        return time;
    }

    render() {
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                <ImageBackground
                    style={styles.homePageBackgroundImage}
                    resizeMode="stretch"
                    source={require('../assets/image/common_page_background.png')}
                ></ImageBackground>

                <HeaderNav
                    menuButtonOnPress={this.menuButtonOnPress}
                    navigation={this.props.navigation}
                />
                
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <ScrollView
                        overScrollMode='never'
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={this.state.scrollEnable}
                    >
                        <UserInfo
                            profilePicture={require('../assets/image/male_avatar.png')}
                            userData={this.state.userData}
                            navigation={this.props.navigation}
                        />

                        <View
                            style={{
                                margin: 20,
                            }}
                        >
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: 20,
                                }}
                            >
                                <LabelText color="white">Messenger</LabelText>
                            </View>
                            
                            <View
                                style={{
                                    borderRadius: 15,
                                    paddingHorizontal: 10,
                                    paddingVertical: 20,
                                    backgroundColor: theme.COLOR_WHITE
                                }}
                            >
                                {this.state.conversations.map(c =>
                                    <TouchableOpacity
                                        key={c.id}
                                        style={{
                                            marginVertical: 7,
                                            borderRadius: 15,
                                            paddingVertical: 10,
                                            paddingHorizontal: 20,
                                            backgroundColor: theme.COLOR_WHITE,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            elevation: 3
                                        }}
                                        onPress={e => this.props.navigation.navigate('Chat')}
                                    >
                                        {/* client image */}
                                        <View
                                            style={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: 30,
                                                backgroundColor: theme.COLOR_GRAY_HEAVY,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            {c.client_media_url ? (
                                                <Image
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        borderRadius: 30
                                                    }}
                                                    resizeMode="cover"
                                                    source={c.client_media_url}
                                                />
                                            ) : (
                                                <Image
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                        borderRadius: 30
                                                    }}
                                                    resizeMode="cover"
                                                    source={require('../assets/image/icons/gallery-icon.png')}
                                                />
                                            )}
                                        </View>
                                    
                                        {/* client name and message and time*/}
                                        <View
                                            style={{
                                                flex: 1,
                                                marginLeft: 15,
                                                flexDirection: 'row',
                                                alignItems: 'flex-end'
                                            }}
                                        >
                                            <View
                                                style={{
                                                    marginRight: 10,
                                                    flex: 1,
                                                }}
                                            >
                                                <LabelOverflow
                                                    label={c.business_name}
                                                    nonActive={c.sender == 0 ? true : false}
                                                    numberOfLines={1}
                                                />

                                                <CommonOverflow
                                                    label={c.sender == 0 ? `You: ${c.message}` : c.message}
                                                    numberOfLines={1}
                                                    nonActive={c.sender == 0 ? true : false}
                                                />
                                            </View>

                                            <View>
                                                <Common
                                                    label={this.convert12HourTime(c.created_at)}
                                                    nonActive={c.sender == 0 ? true : false}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </ScrollView>
                </View>
                    
                <ModalMenu
                    modalContainerzIndex={this.state.modalContainerzIndex}
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
