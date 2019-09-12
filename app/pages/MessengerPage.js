import React, { Component } from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { Page } from './Page';
import {
    LabelText,
    Common,
    CommonOverflow,
    LabelOverflow
} from '../components/Text';
import UserInfo from '../components/UserInfo';
import { UserController } from '../controllers/UserController';
import { URL } from '../config/variables';
import NavigationService from '../services/navigation';

import { WEBSOCKET } from '../config/variables';
const {EVENTS} = WEBSOCKET;

import theme from '../styles/theme.style';

export default class MessengerPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            loader: true,
            conversations: [],
            websocketData: {}
        };

        console.log('messenger page');
    }

    websocketFunctions = (websocketData) => {
        var {updatedData} = websocketData;
        console.log(websocketData);
        this.setState({websocketData});
        switch(updatedData) {
            case EVENTS.ONLINE_USERS:
                var {conversations} = this.state,
                    {onlineUsers} = websocketData,
                    onlineIDs = onlineUsers.map(u => u.id);

                conversations = conversations.map(c => {
                    if(onlineIDs.indexOf(c.id) !== -1) {
                        c.online = true;
                    }
                    return c;
                });

                this.setState({conversations});
                break;

            case EVENTS.ONLINE_CLIENT:
                var {conversations} = this.state,
                    {onlineClient} = websocketData;
                    
                conversations = conversations.map(c => {
                    if(onlineClient.id === c.id) {
                        c.online = true;
                    }
                    return c;
                });

                this.setState({conversations});
                break;

            case EVENTS.NEW_MESSAGE:
                var { conversations } = this.state,
                    { newMessage } = websocketData,
                    { chat } = newMessage,
                    { client_id,
                    message,
                    created_at } = chat,
                    cIndex = conversations.map(c => c.id).indexOf(client_id);

                if(cIndex !== -1) {
                    var userMessage = conversations.splice(cIndex, 1),
                        userMessage = userMessage[0];
                    userMessage.message = message;
                    userMessage.sender = 1;
                    userMessage.created_at = created_at;
                    userMessage.notif = userMessage.notif ? newMessage.notif + 1 : 1;
                    conversations.unshift(userMessage);
                    
                } else {

                }
                
                this.setState({conversations});
                break;

            case EVENTS.DC_USER:
                var {conversations} = this.state,
                    {disconnectedUser} = websocketData;

                conversations = conversations.map(c => {
                    if(disconnectedUser.id === c.id) {
                        c.online = false;
                    }
                    return c;
                });

                this.setState({conversations});
                break;
        }
    }

    getChatList = () => {
        UserController.request.chatList()
        .then(conversations => {
            var conversations = conversations.data,
                loader = false;
            conversations = conversations.map(c => {
                c.online = false;
                return c;
            });
            console.log(conversations);
            this.setState({conversations, loader});
        })
        .catch(e => {
            console.log(e);
            setTimeout(() => this.getChatList(), 1000);
        });
    }

    convert12HourTime = (timestamp) => {
        var date = timestamp.split(' ')[0],
            year = parseInt(date.split('-')[0]),
            month = parseInt(date.split('-')[1]),
            day = parseInt(date.split('-')[2]),
            time = timestamp.split(' ')[1],
            hour = parseInt(time.split(':')[0]),
            min = time.split(':')[1],
            dateNow = new Date(),
            dateDB = new Date(year, month - 1, day, time.split(':')[0], time.split(':')[1], time.split(':')[2]),
            yearNow = dateNow.getFullYear(),
            millis = dateDB.getTime(),
            millisNow = dateNow.getTime(),
            hourDiff = Math.abs(millisNow - millis) / 36e5,
            months = [
                'Jan', 'Feb', 'Mar',
                'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep',
                'Oct', 'Nov', 'Dec'
            ],
            time;

        if(yearNow > year) {
            time = date.replace(/-/g,'/');
        } else if(hourDiff >= 48) {
            time = `${months[month - 1]} ${day}`;
        } else {
            time = (hour == 0 ? '12' : (
                hour < 12 ? hour : hour - 12
            )) + `:${min} ${hour < 12 ? 'AM' : 'PM'}`;
        }

        return time;
    }

    render() {
        return (
            <Page
                websocket={{
                    websocketFunctions: this.websocketFunctions
                }}
            >
                <NavigationEvents onWillFocus={this.getChatList} />

                <ScrollView
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                >
                    <UserInfo />

                    <View
                        style={{
                            margin: 20,
                            marginBottom: 90
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
                            {this.state.loader ? (
                                <ActivityIndicator color="#000" style={{ height: 75 }} />
                            ) : (this.state.conversations.length === 0 ? (
                                <View
                                    style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <CommonOverflow
                                        label="-- No message available --"
                                        nonActive={true}
                                    />
                                </View>
                            ) : this.state.conversations.map(c =>
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
                                    onPress={e => NavigationService.navigate('Chat', {id: c.id})}
                                >
                                    {/* client image */}
                                    <View
                                        style={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: 30,
                                            backgroundColor: theme.COLOR_GRAY_HEAVY,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'relative'
                                        }}
                                    >
                                        {c.url ? (
                                            <Image
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    borderRadius: 30
                                                }}
                                                resizeMode="cover"
                                                source={{uri: `${URL.SERVER_MEDIA}/${c.url}`}}
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

                                        {c.online ? (
                                            <View
                                                style={{
                                                    position: 'absolute',
                                                    right: -5,
                                                    bottom: -3,
                                                    backgroundColor: theme.COLOR_GREEN,
                                                    height: 20,
                                                    width: 20,
                                                    borderRadius: 10,
                                                    borderWidth: 3,
                                                    borderColor: theme.COLOR_WHITE
                                                }}
                                            ></View>
                                        ) : null}
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
                                                nonActive={c.sender == 0 ? true : (c.seen == 0 ? true : false)}
                                                numberOfLines={1}
                                            />

                                            <CommonOverflow
                                                label={c.sender == 0 ? `You: ${c.message}` : c.message}
                                                numberOfLines={1}
                                                nonActive={c.sender == 0 ? true : (c.seen == 0 ? true : false)}
                                            />
                                        </View>

                                        <View>
                                            <Common
                                                label={this.convert12HourTime(c.created_at)}
                                                nonActive={c.sender == 0 ? true : (c.seen == 0 ? true : false)}
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </Page>
        );
    }
}
