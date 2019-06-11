import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    Animated,
    Image,
    Keyboard
} from 'react-native';

import ModalMenu from '../components/Modal/Navigation';
import { HeaderNav, UserInfo } from '../components/HeaderNav';
import { LabelText, CommonText } from '../components/Text';

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

        message: '',
        messengerData: {
            id: 5,
            brand: 'Brand Name',
        },
        messengerMessages: [
            {
                from: 'client',
                message: 'Hi! Lorem ipsum dolor'
            },{
                from: 'client',
                message: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo re et dolore magna aliqua'
            },{
                from: 'user',
                message: 'Hey man! Ut enim ad minim'
            },{
                from: 'user',
                message: 'What\'s up?'
            },{
                from: 'client',
                message: 'Veniam, quis nostrud'
            }
        ]
    }
    
    componentWillMount = () => {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    }
    
    _keyboardDidShow = () => {
        this._scrollView.scrollToEnd({animated: true});
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
    
    messageInputOnChangeText = (text) => {
        this.setState({ message: text });
    }

    sendMessageOnPress = () => {
        var message = this.state.message,
            messengerMessages = this.state.messengerMessages;

        if(message !== '') {
            messengerMessages.push({
                from: this.state.userData.userType,
                message: message
            });

            this.setState({
                message: '',
                messengerMessages: messengerMessages
            });
        }
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
                
                <ScrollView
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={this.state.scrollEnable}
                    ref={ref => this._scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        this._scrollView.scrollToEnd({animated: true});
                    }}
                >
                    <UserInfo
                        profilePicture={require('../assets/image/male_avatar.png')}
                        userData={this.state.userData}
                        navigation={this.props.navigation}
                    />

                    <View
                        style={{
                            marginHorizontal: 15,
                            marginTop: 30
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: theme.COLOR_DIRTY_WHITE,
                                paddingVertical: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopLeftRadius: theme.PAGE_CARD_RADIUS,
                                borderTopRightRadius: theme.PAGE_CARD_RADIUS
                            }}
                        >
                            <LabelText>
                                {this.state.messengerData.brand}
                            </LabelText>
                        </View>

                        <View
                            style={{
                                backgroundColor: theme.COLOR_WHITE,
                                paddingHorizontal: 10,
                                minHeight: this.state.height / 2.5
                            }}
                        >
                            {this.state.messengerMessages.map((message, index) =>
                                <View
                                    key={index}
                                    style={{
                                        marginTop: index == 0 ? 20 : 5,
                                        marginBottom: index == (this.state.messengerMessages.length - 1) ? 20 : 5,
                                        justifyContent: message.from == 'client' ? 'flex-start' : 'flex-end',
                                        alignItems: message.from == 'client' ? 'flex-end' : 'flex-end',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: message.from == 'client' ? theme.COLOR_GRAY_CHAT : theme.COLOR_LIGHT_BLUE,
                                            position: 'absolute',
                                            left: message.from == 'client' ? 0 : null,
                                            right: message.from == 'client' ? null : 0,
                                            bottom: 0
                                        }}
                                    >
                                        <View
                                            style={{
                                                backgroundColor: theme.COLOR_WHITE,
                                                borderBottomRightRadius: message.from == 'client' ? 12 : 0,
                                                borderBottomLeftRadius: message.from == 'client' ? 0 : 12,
                                                width: 21,
                                                height: 20
                                            }}
                                        ></View>
                                    </View>

                                    <View
                                        style={{
                                            backgroundColor: message.from == 'client' ? theme.COLOR_GRAY_CHAT : theme.COLOR_LIGHT_BLUE,
                                            borderRadius: 20,
                                            borderBottomLeftRadius: message.from == 'client' ? 0 : 20,
                                            borderBottomRightRadius: message.from == 'client' ? 20 : 0,
                                            paddingVertical: 10,
                                            paddingHorizontal: 20,
                                            maxWidth: '80%',
                                            zIndex: 10,
                                            marginLeft: message.from == 'client' ? 20 : 0,
                                            marginRight: message.from == 'client' ? 0 : 20,
                                            flexWrap: 'wrap'
                                        }}
                                    >
                                        <CommonText
                                            color={message.from == 'client' ? 'black' : 'white'}
                                        >
                                            {message.message}
                                        </CommonText>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                </ScrollView>
                
                {/* message container */}
                <View
                    style={{
                        width: '100%',
                        backgroundColor: theme.COLOR_GRAY_HEAVY,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => alert('Open files')}
                        >
                            <Image
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                                resizeMode="contain"
                                source={require('../assets/image/icons/clip_icon.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flex: 6,
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end'
                        }}
                    >
                        <View
                            style={{
                                width: '100%',
                                paddingLeft: 20,
                                paddingRight: 45,
                                borderRadius: 50,
                                backgroundColor: theme.COLOR_WHITE,
                                justifyContent: 'center'
                            }}
                        >
                            <TextInput
                                style={{
                                    fontSize: theme.PAGE_CARD_RADIUS,
                                    maxHeight: this.state.height / 7
                                }}
                                placeholderTextColor={theme.COLOR_GRAY_MEDIUM}
                                placeholder="Message"
                                keyboardAppearance="dark"
                                multiline={true}
                                value={this.state.message}
                                onChangeText={this.messageInputOnChangeText}
                            />

                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    right: 5
                                }}
                                onPress={() => alert('Open mic')}
                            >
                                <Image
                                    style={{
                                        width: 38,
                                        height: 38,
                                    }}
                                    resizeMode="contain"
                                    source={require('../assets/image/icons/mic_icon.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-end'
                        }}
                    >
                        <TouchableOpacity
                            onPress={this.sendMessageOnPress}
                        >
                            <Image
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                                resizeMode="contain"
                                source={require('../assets/image/icons/send_icon.png')}
                            />
                        </TouchableOpacity>
                    </View>
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
        )
    }
}
