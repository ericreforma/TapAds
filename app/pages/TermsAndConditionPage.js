import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    Animated
} from 'react-native';

import ModalMenu from '../components/Modal/Navigation';
import { HeaderNav, UserInfo } from '../components/HeaderNav';
import {
    LabelText,
    Label,
    Common
} from '../components/Text';
import {
    Card,
    CardBody
} from '../components/Card';

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

        termsOfService: 'Welcome to Tap Ads! Lorem ipsum dolor sit' +
                        'amet, consectetur adipiscing elit, sed do eiusmod' +
                        'tempor incididunt ut labore et dolore magna aliqua.' +
                        'Ut enim ad minim veniam, quis nostrud exercitation' +
                        'ullamco laboris nisi ut aliquip ex ea commodo ' +
                        'lorem ipsum consequat.\n\n' +
                        
                        'Lorem ipsum dolor sit amet, consectetur adipiscing' +
                        'tempor incididunt ut labore et dolore.',
        
        termsCondition: [
            {
                title: 'Our Services',
                active: false,
                animatedHeight: new Animated.Value(0),
                animatedPadding: new Animated.Value(0),
                height: 0,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo augue in condimentum vulputate. Donec scelerisque, elit a egestas posuere, quam neque pharetra neque, eu consequat nisl leo ut nibh. Aliquam aliquet vel risus eget commodo. Suspendisse potenti. Aenean finibus justo erat, blandit fringilla leo porttitor vitae. Praesent sit amet ligula erat. Nunc rutrum tincidunt odio, vel cursus elit. In rhoncus in elit vel sagittis. Vestibulum ante ipsum primis in.'
            },{
                title: 'Our Data Policy',
                active: false,
                animatedHeight: new Animated.Value(0),
                animatedPadding: new Animated.Value(0),
                height: 0,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo augue in condimentum vulputate. Donec scelerisque, elit a egestas posuere, quam neque pharetra neque, eu consequat nisl leo ut nibh. Aliquam aliquet vel risus eget commodo. Nunc rutrum tincidunt odio, vel cursus elit. In rhoncus in elit vel sagittis. Vestibulum ante ipsum primis in.'
            },{
                title: 'Your Privacy Choices',
                active: false,
                animatedHeight: new Animated.Value(0),
                animatedPadding: new Animated.Value(0),
                height: 0,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquet vel risus eget commodo. Suspendisse potenti. Aenean finibus justo erat, blandit fringilla leo porttitor vitae. Praesent sit amet ligula erat. Nunc rutrum tincidunt odio, vel cursus elit. In rhoncus in elit vel sagittis. Vestibulum ante ipsum primis in.'
            },{
                title: 'Your Commitments',
                active: false,
                animatedHeight: new Animated.Value(0),
                animatedPadding: new Animated.Value(0),
                height: 0,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo augue in condimentum vulputate. Donec scelerisque, elit a egestas posuere, quam neque pharetra neque, eu consequat nisl leo ut nibh. Aliquam aliquet vel risus eget commodo. Suspendisse potenti. Aenean finibus justo erat, blandit fringilla leo porttitor vitae. Praesent sit amet ligula erat. Nunc rutrum tincidunt odio, vel cursus elit. In rhoncus in elit vel sagittis. Vestibulum ante ipsum primis in.'
            },{
                title: 'Lorem Ipsum',
                active: false,
                animatedHeight: new Animated.Value(0),
                animatedPadding: new Animated.Value(0),
                height: 0,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque, elit a egestas posuere, quam neque pharetra neque, eu consequat nisl leo ut nibh. Aliquam aliquet vel risus eget commodo. Suspendisse potenti. Aenean finibus justo erat, blandit fringilla leo porttitor vitae. Praesent sit amet ligula erat. Nunc rutrum tincidunt odio, vel cursus elit. In rhoncus in elit vel sagittis. Vestibulum ante ipsum primis in.'
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
    
    termsAndConditionHeight = (index) => (event) => {
        var { termsCondition } = this.state;
        termsCondition[index].height = event.nativeEvent.layout.height + 30;
        this.setState({termsCondition});
    }

    readMoreTermsAndCondition = (index) => (e) => {
        var { termsCondition } = this.state;

        termsCondition = termsCondition.map((tc, tcIdx) => {
            Animated.timing(this.state.termsCondition[tcIdx].animatedHeight, {
                toValue: tcIdx == index ? tc.height : 0,
                duration: 300
            }).start();

            Animated.timing(this.state.termsCondition[tcIdx].animatedPadding, {
                toValue: tcIdx == index ? 20 : 0,
                duration: 300
            }).start();

            tc.active = tcIdx == index ? true : false;
            return tc;
        });

        this.setState({termsCondition});
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
                                <LabelText color="white">Terms and Conditions</LabelText>
                            </View>

                            <View
                                style={{
                                    marginBottom: 20
                                }}
                            >
                                <Card shadow={true}>
                                    <CardBody
                                        header={true}
                                        footer={true}
                                    >
                                        <View
                                            style={{
                                                paddingHorizontal: 5
                                            }}
                                        >
                                            <Label
                                                label="Terms of Service"
                                            />

                                            <View
                                                style={{
                                                    marginVertical: 20
                                                }}
                                            >
                                                <Common
                                                    label={this.state.termsOfService}
                                                />
                                            </View>
                                        </View>
                                    </CardBody>
                                </Card>
                            </View>

                            {this.state.termsCondition.map((tc, tcIdx) =>
                                <View
                                    key={tcIdx}
                                    style={{
                                        marginBottom: 20
                                    }}
                                >
                                    <Card shadow={true}>
                                        <CardBody
                                            header={true}
                                            footer={true}
                                        >
                                            <View
                                                style={{
                                                    paddingHorizontal: 5
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <Label
                                                        label={`${tcIdx + 1}. ${tc.title}`}
                                                    />

                                                    {!tc.active ? (
                                                        <TouchableOpacity
                                                            onPress={this.readMoreTermsAndCondition(tcIdx)}
                                                        >
                                                            <Common
                                                                label="Read More"
                                                            />
                                                        </TouchableOpacity>
                                                    ) : null}
                                                </View>

                                                <Animated.View
                                                    style={{
                                                        paddingTop: tc.animatedPadding,
                                                        height: tc.animatedHeight,
                                                        overflow: 'hidden'
                                                    }}
                                                >
                                                    <Common
                                                        label={tc.description}
                                                        onLayout={this.termsAndConditionHeight(tcIdx)}
                                                    />
                                                </Animated.View>
                                            </View>
                                        </CardBody>
                                    </Card>
                                </View>    
                            )}
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