import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    Animated,
    ImageBackground,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter
} from '../components/Card';
import ModalMenu from '../components/Modal/Navigation';
import { VehicleType, VehicleCategory } from '../components/VehicleType';
import { HeaderNav, UserInfo } from '../components/HeaderNav';
import { LabelText, CommonText } from '../components/Text';

import theme from '../styles/theme.style';
import styles from '../styles/page.Home.style';

export default class MyCampaignPage extends Component {
    state = {
        modalFadeBackground: new Animated.Value(0),
        modalContainerzIndex: 0,
        modalXValue: new Animated.Value(Dimensions.get('window').width),
        scrollEnable: true,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

        userData: {
            name: 'Patrick Cua',
            rate: 4.60239,
            totalRate: 35 //total number of clients(rating)
        },
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
                    style={styles.homePageBackgroundImage}
                    resizeMode="stretch"
                    source={require('../assets/image/common_page_background.png')}
                ></ImageBackground>
                
                <HeaderNav
                    menuButtonOnPress={this.menuButtonOnPress}
                    navigation={this.props.navigation}
                />

                <ScrollView
                    style={styles.homePageScrollView}
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
                            marginVertical: 20,
                            marginHorizontal: theme.PAGE_PADDING_HORIZONTAL
                        }}
                    >
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 15
                            }}
                        >
                            <LabelText color="white">My Campaigns</LabelText>
                        </View>

                        <View>
                            <View
                                style={{
                                    flexDirection: 'row'
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: theme.COLOR_GRAY_HEAVY,
                                        borderTopLeftRadius: theme.PAGE_CARD_RADIUS,
                                        borderBottomWidth: 1,
                                        borderBottomColor: theme.COLOR_LIGHT_BLUE,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingVertical: 15
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: theme.FONT_SIZE_MEDIUM,
                                            fontFamily: 'Montserrat-Bold',
                                            color: theme.COLOR_WHITE
                                        }}
                                    >
                                        Active 
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: theme.COLOR_GRAY_LIGHT,
                                        borderTopRightRadius: theme.PAGE_CARD_RADIUS,
                                        borderBottomWidth: 1,
                                        borderBottomColor: theme.COLOR_LIGHT_BLUE + '00',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingVertical: 15
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: theme.FONT_SIZE_MEDIUM,
                                            fontFamily: 'Montserrat-Bold',
                                            color: theme.COLOR_NORMAL_FONT + '70'
                                        }}
                                    >
                                        Completed
                                    </Text>
                                </View>
                            </View>

                            <View
                                style={{
                                    backgroundColor: theme.COLOR_WHITE,
                                    paddingVertical: 5
                                }}
                            >
                                <View
                                    style={{
                                        marginVertical: 10,
                                        marginHorizontal: 10
                                    }}
                                >
                                    <Card>
                                        <CardHeader>
                                            <LabelText>Campaign Name</LabelText>
                                            <CommonText>Brand name here</CommonText>
                                        </CardHeader>
                                    </Card>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>

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