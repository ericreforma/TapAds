import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    Animated,
    ImageBackground,
    TouchableHighlight,
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
import ButtonBlue from '../components/ButtonBlue';

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
                id: 5,
                campaign: 'Campaign Name',
                client: 'Brand name here',
                location: 'Quezon City',
                vehicleType: 2,
                vehicleClass: 'Private',
                distance: '300km',
                basicPay: '5,000',
                totalPay: '7,000'
            },{
                id: 8,
                campaign: 'Campaign Name',
                client: 'Brand name here',
                location: 'Quezon City',
                vehicleType: 2,
                vehicleClass: 'Private',
                distance: '300km',
                basicPay: '5,000',
                totalPay: '7,000'
            },{
                id: 15,
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
                id: 1,
                campaign: 'Campaign Name',
                totalEarnings: '7,000',
                messageNotif: '1',
                favorite: '1',
                completionDate: 'MAR. 30, 2019',
                campaignStatus: 'Completed'
            },{
                id: 2,
                campaign: 'Campaign Name',
                totalEarnings: '7,000',
                messageNotif: '1',
                favorite: '1',
                completionDate: 'MAR. 30, 2019',
                campaignStatus: 'Completed'
            },{
                id: 6,
                campaign: 'Campaign Name',
                totalEarnings: '7,000',
                messageNotif: '1',
                favorite: '1',
                completionDate: 'MAR. 30, 2019',
                campaignStatus: 'Completed'
            }
        ],
    
        myCampaignClick: 'active',
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

    viewCampaignFullDetails = (id) => () => {
        alert('Full details campaign id: ' + id);
    }

    viewCampaignDashboard = (id) => () => {
        alert('View dashboard campaign id: ' + id);
    }

    mailOnPress = (id) => () => {
        alert('Mail pressed campaign id: ' + id);
    }

    favoriteOnPress = (id) => () => {
        alert('Favorite pressed campaign id: ' + id);
    }

    activeCampaignView = () => {
        return (
            this.state.activeCampaign.map((data, index) =>
                <View
                    key={index}
                    style={{
                        paddingVertical: 10
                    }}
                >
                    <Card shadow={true}>
                        <CardHeader active={true}>
                            <LabelText>{data.campaign}</LabelText>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <CommonText>{data.client}</CommonText>
                                
                                <TouchableOpacity
                                    onPress={this.viewCampaignFullDetails(data.id)}
                                >
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
            )
        );
    }

    completeCampaignView = () => {
        return (
            this.state.completeCampaign.map((data, index) =>
                <View
                    key={index}
                    style={{
                        paddingVertical: 10
                    }}
                >
                    <Card shadow={true}>
                        <View
                            style={{
                                backgroundColor: theme.COLOR_WHITE,
                                borderTopLeftRadius: theme.PAGE_CARD_RADIUS,
                                borderTopRightRadius: theme.PAGE_CARD_RADIUS
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                }}
                            >
                                <View
                                    style={{
                                        flex: 7,
                                        borderBottomWidth: 1,
                                        borderBottomColor: theme.COLOR_GRAY_LIGHT,
                                        paddingHorizontal: 20,
                                        paddingVertical: 15,
                                    }}
                                >
                                    <LabelText>{data.campaign}</LabelText>
                                    <CommonText>{data.completionDate}</CommonText>
                                </View>

                                <View
                                    style={{
                                        flex: 2,
                                        borderBottomColor: theme.COLOR_WHITE,
                                        borderBottomWidth: 1,
                                        borderTopRightRadius: theme.PAGE_CARD_RADIUS,
                                        backgroundColor: theme.COLOR_GRAY_LIGHT,
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        onPress={this.mailOnPress(data.id)}
                                    >
                                        <Image
                                            style={{
                                                width: '40%',
                                                resizeMode: 'contain'
                                            }}
                                            source={require('../assets/image/icons/mail_icon.png')}
                                        />
                                        
                                        <View
                                            style={{
                                                backgroundColor: theme.COLOR_BLUE,
                                                width: 14,
                                                height: 14,
                                                borderRadius: 7,
                                                position: 'absolute',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                top: '30%',
                                                left: '55%'
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 8,
                                                    color: theme.COLOR_WHITE,
                                                    fontFamily: 'Montserrat-Bold'
                                                }}
                                            >
                                                {data.messageNotif}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                            <View
                                style={{
                                    flexDirection: 'row',
                                }}
                            >
                                <View
                                    style={{
                                        flex: 7,
                                        paddingHorizontal: 20,
                                        paddingVertical: 15,
                                    }}
                                >
                                    <LabelText>{data.completionDate}</LabelText>
                                    <CommonText>{data.campaignStatus}</CommonText>
                                </View>

                                <View
                                    style={{
                                        flex: 2,
                                        backgroundColor: theme.COLOR_GRAY_LIGHT,
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        onPress={this.favoriteOnPress(data.id)}
                                    >
                                        <Image
                                            style={{
                                                width: '45%',
                                                resizeMode: 'contain'
                                            }}
                                            source={require('../assets/image/icons/completed_favorite_icon.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <CardFooter
                            active={true}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >   
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start'
                                    }}
                                >
                                    <ButtonBlue
                                        label="Dashboard"
                                        onPress={this.viewCampaignDashboard(data.id)}
                                    />
                                </View>
                                
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end'
                                    }}
                                >
                                    <LabelText color="blue" large={true}>P{data.totalEarnings}</LabelText>
                                    <CommonText color="white">Total Earnings</CommonText>
                                </View>
                            </View>
                        </CardFooter>
                    </Card>
                </View>
            )
        );
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
                                <TouchableHighlight
                                    style={{
                                        flex: 1
                                    }}
                                    onPress={this.clickCampaign('active')}
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
                                                this.state.myCampaignClick == 'active'
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
                                                    this.state.myCampaignClick == 'active'
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
                                </TouchableHighlight>
                                
                                <TouchableHighlight
                                    style={{
                                        flex: 1,
                                    }}
                                    onPress={this.clickCampaign('complete')}
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
                                                this.state.myCampaignClick == 'complete'
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
                                                    this.state.myCampaignClick == 'complete'
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
                                </TouchableHighlight>
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
                                    {
                                        this.state.myCampaignClick == 'active'
                                        ? this.activeCampaignView()
                                        : this.completeCampaignView()
                                    }
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