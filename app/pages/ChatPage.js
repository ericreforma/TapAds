import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Animated,
    Image,
    Keyboard,
    ActivityIndicator
} from 'react-native';

import { LabelText, CommonText } from '../components/Text';
import UserInfo from '../components/UserInfo';
import { UserController } from '../controllers/UserController';
import { Page } from './Page';

import theme from '../styles/theme.style';

export default class ChatPage extends Component {
    constructor(props) {
        super(props);

        const cid = this.props.navigation.getParam('id', null);

        if(!cid) {
            this.props.navigation.navigate('Messenger');
        }

        this.state = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
    
            message: '',
            keyboardPress: true,
            loadMore: 15,
            loader: true,
            loderLoadMore: false,
            messengerData: {
                id: '',
                brand: ''
            },
            messengerMessages: []
        };

        // alert(this.props.navigation.getParam('id', null));
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentDidMount = () => {
        this.getMessages();
    }

    componentWillUnmount = () => {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    
    getMessages = () => {
        var cid = this.props.navigation.getParam('id');
        UserController.request.messages(cid)
        .then(response => {
            var { chat,
                client } = response.data,
                { messengerData } = this.state,
                loader = false,
                messengerMessages = [];
            
            messengerData = {
                id: client.id,
                brand: client.business_name
            }

            messengerMessages = chat.map(c => {
                return {
                    from: c.sender == 0 ? 'user' : 'client',
                    message: c.message
                }
            });

            this.setState({loader, messengerData, messengerMessages});
        })
        .catch(e => {
            console.log(e);
            setTimeout(() => this.getMessages(), 1000);
        });
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
    
    _keyboardDidShow = () => {
        setTimeout(() => this._scrollView.scrollToEnd({animated: true}), 500);
        var keyboardPress = true;
        this.setState({keyboardPress});
    }
    
    messageInputOnChangeText = (text) => {
        this.setState({ message: text });
    }

    sendMessageOnPress = () => {
        var message = this.state.message,
            messengerMessages = this.state.messengerMessages;

        if(message !== '') {
            messengerMessages.push({
                from: 'user',
                message: message
            });

            this.setState({
                message: '',
                messengerMessages: messengerMessages
            });
        }
    }

    seeMoreOnPress = () => {
        var { loadMore } = this.state,
            loaderLoadMore = true,
            keyboardPress = false;
        loadMore += 15;

        this.setState({
            loadMore,
            loaderLoadMore,
            keyboardPress
        });
    }

    render() {
        return (
            <Page
                {...this.props}
                message
            >
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <ScrollView
                        overScrollMode='never'
                        showsVerticalScrollIndicator={false}
                        ref={ref => this._scrollView = ref}
                        onContentSizeChange={(contentWidth, contentHeight) => {
                            var { keyboardPress } = this.state;
                            if(keyboardPress) {
                                this._scrollView.scrollToEnd({animated: true});
                            } else {
                                this.setState({loaderLoadMore: false});
                            }
                        }}
                    >
                        <UserInfo />

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
                                }}
                            >
                                {this.state.loader ? (
                                    <ActivityIndicator color="#000" style={{ height: 75 }} />
                                ) : (
                                    this.state.messengerMessages.length === 0 ? (
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flex: 1
                                            }}
                                        >
                                            <CommonText color={'black'} >
                                                -- No message available --
                                            </CommonText>
                                        </View>
                                    ) : (
                                        <View>
                                            {this.state.messengerMessages.length > this.state.loadMore ? (
                                                this.state.loaderLoadMore ? (
                                                    <View
                                                        style={{
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            paddingVertical: 20
                                                        }}
                                                    >
                                                        <ActivityIndicator color="#000" />
                                                    </View>
                                                ) : (
                                                    <TouchableOpacity
                                                        style={{
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            paddingVertical: 20
                                                        }}
                                                        onPress={this.seeMoreOnPress}
                                                    >
                                                        <CommonText color={'black'} >
                                                            -- See More --
                                                        </CommonText>
                                                    </TouchableOpacity>
                                                )
                                            ) : null}
                                            
                                            {this.state.messengerMessages.map((message, index) =>
                                                (this.state.messengerMessages.length - this.state.loadMore) <= index ? (
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
                                                                flexWrap: 'wrap',
                                                                flexDirection: 'row'
                                                            }}
                                                        >
                                                            <CommonText
                                                                color={message.from == 'client' ? 'black' : 'white'}
                                                            >
                                                                {message.message}
                                                            </CommonText>
                                                        </View>
                                                    </View>
                                                ) : null
                                            )}
                                        </View>
                                    )
                                )}
                            </View>
                        </View>
                    </ScrollView>
                </View>
                
                {/* message input container */}
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
            </Page>
        )
    }
}
