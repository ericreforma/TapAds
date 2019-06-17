import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    Animated,
} from 'react-native';
import { Page } from '../pages';

import { UserInfo } from '../components/UserInfo';
import { LabelText, CommonText } from '../components/Text';
import ButtonBlue from '../components/ButtonBlue';

import theme from '../styles/theme.style';
import styles from '../styles/page.Home.style';

export default class CampaignCardActive extends Component {
    state = {
        modalFadeBackground: new Animated.Value(0),
        modalContainerzIndex: 0,
        modalXValue: new Animated.Value(Dimensions.get('window').width),
        scrollEnable: true,

        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        userData: {
            name: 'Patrick Cua',
            rate: 4.60239,
            totalRate: 35 //total number of clients(rating)
        },

        campaignData: {
            status: 'Active',
            campaign: 'Campaign Name',
            client: 'Brand name here',
            description: 'Porttitor congue quam ridiculus mi felis sollicitudin etiam non conubia blandit viverra ullamcorper. Torquent donec hac nulla.',
            kmTravelled: '3',
            frequentLocation: 'Quezon City',
            basicPay: '5,000'
        }
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
            <Page>
                <ScrollView
                    style={styles.homePageScrollView}
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={this.state.scrollEnable}
                >

                    <UserInfo />

                    <View
                        style={{
                            padding: theme.PAGE_PADDING_HORIZONTAL,
                            paddingTop: 30
                        }}
                    >
                        <View
                            style={{
                                borderRadius: theme.PAGE_CARD_RADIUS,
                                backgroundColor: theme.COLOR_WHITE
                            }}
                        >
                            {/* map portion */}
                            <View
                                style={{
                                    height: this.state.width - 50,
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Text>this is the map</Text>
                            </View>

                            {/* header information */}
                            <View
                                style={{
                                    backgroundColor: theme.COLOR_DIRTY_WHITE,
                                    paddingVertical: 15,
                                    paddingHorizontal: 30
                                }}
                            >
                                <CommonText
                                    color="blue"
                                >
                                    {this.state.campaignData.status}
                                </CommonText>

                                <LabelText>
                                    {this.state.campaignData.campaign}
                                </LabelText>

                                <CommonText>
                                    {this.state.campaignData.client}
                                </CommonText>
                            </View>

                            <View
                                style={{
                                    paddingVertical: 15,
                                    marginHorizontal: 30,
                                    borderBottomColor: theme.COLOR_GRAY_LIGHT,
                                    borderBottomWidth: 2
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: theme.FONT_SIZE_SMALL,
                                        fontFamily: 'Montserrat-Regular',
                                        color: theme.COLOR_NORMAL_FONT,
                                        lineHeight: 18,
                                        paddingBottom: 5
                                    }}
                                >
                                    {this.state.campaignData.description}
                                </Text>
                            </View>

                            <View
                                style={{
                                    paddingVertical: 15,
                                    paddingHorizontal: 30,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        paddingBottom: 5
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start'
                                        }}
                                    >
                                        <LabelText
                                            large={true}
                                        >
                                            {this.state.campaignData.kmTravelled}km
                                        </LabelText>

                                        <CommonText>
                                            km travelled counter
                                        </CommonText>
                                    </View>

                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: 'flex-end',
                                            alignItems: 'flex-end'
                                        }}
                                    >
                                        <LabelText
                                            large={true}
                                        >
                                            {this.state.campaignData.frequentLocation}
                                        </LabelText>

                                        <CommonText>
                                            Frequent Location
                                        </CommonText>
                                    </View>
                                </View>
                            </View>

                            <View
                                style={{
                                    backgroundColor: theme.COLOR_GRAY_HEAVY,
                                    paddingVertical: 15,
                                    paddingHorizontal: 30,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderBottomLeftRadius: theme.PAGE_CARD_RADIUS,
                                    borderBottomRightRadius: theme.PAGE_CARD_RADIUS,
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start'
                                    }}
                                >
                                    <LabelText
                                        color="white"
                                    >
                                        P{this.state.campaignData.basicPay}
                                    </LabelText>

                                    <CommonText
                                        color="white"
                                    >
                                        Basic Pay
                                    </CommonText>
                                </View>

                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end'
                                    }}
                                >
                                    <ButtonBlue
                                        label="Start Trip"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>


            </Page>
        )
    }
}
