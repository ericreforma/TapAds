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

        activeCampaign: [
            {
                campaign: 'Campaign Name',
                client: 'Brand name here',
                location: 'Quezon City',
                vehicleType: 2,
                vehicleClass: 'Private',
                distance: '300km',
                basicPay: '5,000',
                totalPay: '7,000'
            },{
                campaign: 'Campaign Name',
                client: 'Brand name here',
                location: 'Quezon City',
                vehicleType: 2,
                vehicleClass: 'Private',
                distance: '300km',
                basicPay: '5,000',
                totalPay: '7,000'
            },{
                campaign: 'Campaign Name',
                client: 'Brand name here',
                location: 'Quezon City',
                vehicleType: 2,
                vehicleClass: 'Private',
                distance: '300km',
                basicPay: '5,000',
                totalPay: '7,000'
            }
        ],
        completeCampaign: [
            {
                campaign: 'Campaign Name',
                client: 'Brand name here',
                location: 'Quezon City',
                vehicleType: 2,
                vehicleClass: 'Private',
                distance: '300km',
                basicPay: '5,000',
                totalPay: '7,000'
            }
        ],
    
        myCampaignClick: 'activeCampaign',
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

    clickCampaign = (active) => () => {
        this.setState({ myCampaignClick: active })
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
                                <TouchableOpacity
                                    style={{
                                        flex: 1
                                    }}
                                    onPress={this.clickCampaign('activeCampaign')}
                                >
                                    <View
                                        style={[
                                            {
                                                borderTopLeftRadius: theme.PAGE_CARD_RADIUS,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                paddingVertical: 15
                                            },
                                            (
                                                this.state.myCampaignClick == 'activeCampaign'
                                                ? {
                                                    backgroundColor: theme.COLOR_GRAY_HEAVY,
                                                    borderBottomWidth: 3,
                                                    borderBottomColor: theme.COLOR_LIGHT_BLUE
                                                }
                                                : {
                                                    backgroundColor: theme.COLOR_GRAY_LIGHT,
                                                    borderBottomWidth: 3,
                                                    borderBottomColor: theme.COLOR_WHITE,
                                                }
                                            )
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                {
                                                    fontSize: theme.FONT_SIZE_MEDIUM,
                                                    fontFamily: 'Montserrat-Bold',
                                                },
                                                (
                                                    this.state.myCampaignClick == 'activeCampaign'
                                                    ? {
                                                        color: theme.COLOR_WHITE
                                                    }
                                                    : {
                                                        color: theme.COLOR_NORMAL_FONT + '70'
                                                    }
                                                )
                                            ]}
                                        >
                                            Active 
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                    }}
                                    onPress={this.clickCampaign('completeCampaign')}
                                >
                                    <View
                                        style={[
                                            {
                                                borderTopRightRadius: theme.PAGE_CARD_RADIUS,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                paddingVertical: 15
                                            },
                                            (
                                                this.state.myCampaignClick == 'completeCampaign'
                                                ? {
                                                    backgroundColor: theme.COLOR_GRAY_HEAVY,
                                                    borderBottomWidth: 3,
                                                    borderBottomColor: theme.COLOR_LIGHT_BLUE
                                                }
                                                : {
                                                    backgroundColor: theme.COLOR_GRAY_LIGHT,
                                                    borderBottomWidth: 3,
                                                    borderBottomColor: theme.COLOR_WHITE,
                                                }
                                            )
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                {
                                                    fontSize: theme.FONT_SIZE_MEDIUM,
                                                    fontFamily: 'Montserrat-Bold',
                                                },
                                                (
                                                    this.state.myCampaignClick == 'completeCampaign'
                                                    ? {
                                                        color: theme.COLOR_WHITE
                                                    }
                                                    : {
                                                        color: theme.COLOR_NORMAL_FONT + '70'
                                                    }
                                                )
                                            ]}
                                        >
                                            Completed
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View
                                style={{
                                    backgroundColor: theme.COLOR_WHITE,
                                    paddingVertical: 5,
                                    borderBottomLeftRadius: 15,
                                    borderBottomRightRadius: 15
                                }}
                            >
                                <View
                                    style={{
                                        marginTop: 10,
                                        marginBottom: 20,
                                        marginHorizontal: 10
                                    }}
                                >
                                    {this.state[this.state.myCampaignClick].map((data, index) =>
                                        <View
                                            key={index}
                                            style={{
                                                paddingVertical: 10
                                            }}
                                        >
                                            <Card shadow={true}>
                                                <CardHeader active={true}>
                                                    <LabelText>Campaign Name</LabelText>
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <CommonText>Brand name here</CommonText>
                                                        
                                                        <TouchableOpacity>
                                                            <Text
                                                                style={styles.homePageViewAll}
                                                            >
                                                                Full details
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </CardHeader>
                                                
                                                <CardBody>
                                                    <View
                                                        style={styles.homePageRecommendedCampaignBody}
                                                    >
                                                        <View
                                                            style={styles.homePageRecommendedCampaignFirstCol}
                                                        >
                                                            <LabelText>{data.location}</LabelText>
                                                            <CommonText>Location</CommonText>
                                                        </View>
                                                        
                                                        <View
                                                            style={styles.homePageAlignCenter}
                                                        >
                                                            <VehicleType
                                                                vehicleType={data.vehicleType}
                                                                vehicleColor="black"
                                                            />
                                                            
                                                            <CommonText>{data.vehicleClass}</CommonText>
                                                        </View>

                                                        <View
                                                            style={styles.homePageAlignRight}
                                                        >
                                                            <LabelText>P{data.basicPay}</LabelText>
                                                            <CommonText>Basic Pay</CommonText>
                                                        </View>
                                                    </View>
                                                </CardBody>
                                                
                                                <CardFooter
                                                    active={true}
                                                >
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between'
                                                        }}
                                                    >
                                                        <LabelText color="blue" large={true}>{data.distance}</LabelText>
                                                        <LabelText color="blue" large={true}>P{data.totalPay}</LabelText>
                                                    </View>
                                                    
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between'
                                                        }}
                                                    >
                                                        <CommonText color="white">Traveled Counter</CommonText>
                                                        <CommonText color="white">Earnings</CommonText>
                                                    </View>
                                                </CardFooter>
                                            </Card>
                                        </View>
                                    )}
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