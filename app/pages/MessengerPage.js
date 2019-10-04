import React, { Component } from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';

import Page from './Page';
import {
    LabelText,
    Common,
    CommonOverflow,
    LabelOverflow
} from '../components/Text';
import { USER } from '../redux/actions/types.action';
import UserInfo from '../components/UserInfo';
import { UserController } from '../controllers/UserController';
import { URL } from '../config/variables';
import NavigationService from '../services/navigation';

import theme from '../styles/theme.style';

class MessengerPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            loader: true,
            conversations: []
        };
    }

    getChatList = () => {
        UserController.request.chatList()
        .then(conversations => {
            this.setState({
                conversations: conversations.data,
                loader: false
            });
        })
        .catch(e => {
            console.log(e);
            setTimeout(() => this.getChatList(), 1000);
        });
    }

    addNewChat = (newClientChat) => {
        var { conversations } = this.state,
            { user } = this.props,
            userKeys = Object.keys(user),
            toDispatchUser = {};

        for(var x in userKeys) {
            var key = userKeys[x];
            if(key === 'notificationCount') {
                toDispatchUser[key] = user[key] + 1;
            } else {
                toDispatchUser[key] = user[key];
            }
        }

        conversations.splice(0, 0, newClientChat);
        this.props.dispatchUpdateNotification(toDispatchUser);
        this.setState({ conversations });
    }

    conversationContent = () => {
        if(this.state.loader) {
            return <ActivityIndicator color="#000" style={{ height: 75 }} />
        } else if(this.state.conversations.length === 0) {
            return (
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
            );
        } else {
            return this.state.conversations.map(c =>
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
                    <ClientImage c={c} />
                    
                    {/* client name and message and time*/}
                    <ChatInfo c={c} />
                </TouchableOpacity>
            );
        }
    }

    render() {
        return (
            <Page>
                <NavigationEvents onWillFocus={this.getChatList} />

                <ScrollView
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                >
                    <UserInfo />

                    <View
                        style={{
                            margin: 20,
                            marginBottom: 70
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
                            {this.conversationContent()}
                        </View>
                    </View>
                </ScrollView>
            </Page>
        );
    }
}

class ClientImage extends Component {
    render() {
        const {c} = this.props;

        return (
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
        );
    }
}

class ChatInfo extends Component {
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
        const {c} = this.props;

        return (
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
                        nonActive={c.sender == 0 ? true : (c.seen === 0 ? false : true)}
                        numberOfLines={1}
                    />

                    <CommonOverflow
                        label={c.sender == 0 ? `You: ${c.message}` : c.message}
                        numberOfLines={1}
                        nonActive={c.sender == 0 ? true : (c.seen === 0 ? false : true)}
                    />
                </View>

                <View>
                    <Common
                        label={this.convert12HourTime(c.created_at)}
                        nonActive={c.sender == 0 ? true : (c.seen === 0 ? false : true)}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
	user: state.userReducer.user
});

const mapDispatchToProps = (dispatch) => ({
    dispatchUpdateNotification: (user) => dispatch({ type: USER.GET.PROFILE.SUCCESS, user }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessengerPage);

