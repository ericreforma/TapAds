import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import { NavigationEvents } from 'react-navigation';

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter
} from '../components/Card';
import Page from '../pages/Page';
import { VehicleType } from '../components/VehicleType';
import UserInfo from '../components/UserInfo';
import { LabelText, CommonText } from '../components/Text';
import ButtonBlue from '../components/ButtonBlue';
import { VEHICLE } from '../config/variables';
import { CampaignAction } from '../redux/actions/campaign.action';
import theme from '../styles/theme.style';
import styles from '../styles/page.Home.style';
import {
    numberWithCommas,
    getTotalEarnings,
    timestamp
} from '../config/functions';

class MyCampaignPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: Dimensions.get('window').width,
            myCampaignClick: 'active',
            vehicleType: Object.values(VEHICLE.TYPE),
            loader: true,
            myList: []
        };
    }

    init = () => {
        this.setState({loader: false});
    }

    static getDerivedStateFromProps(nextProps) {
        const campaignID = nextProps.navigation.getParam('cid', false);
        var myList = nextProps.myList;
        if(campaignID) {
            var index = myList.findIndex((e) => {
                return e.id === campaignID;
            });
    
            if(index !== -1) {
                var campaign = myList.splice(index, 1);
                myList.unshift(campaign);
            }
        }
        return { myList };
    }

    clickCampaign = (active) => () => {
        this.setState({ myCampaignClick: active })
    }

    startTripButtonPressed = (id) => () => {
        this.props.campaignSelected(id);
        this.props.dispatchTrip();
    }

    activeCampaignView = () => {
        return (
            this.state.myList.filter(d => !d.end).length !== 0
            ? this.state.myList.map((data, index) => {
                if (!data.end) {
                    return (
                        <View
                            key={index}
                            style={{
                                paddingVertical: 10
                            }}
                        >
                            <Card shadow>
                                <CardHeader active>
                                    <LabelText numberOfLines={1}>{data.campaignDetails.name}</LabelText>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <CommonText numberOfLines={1}>
                                            {data.client.business_name}
                                        </CommonText>
                                        
                                        <View
                                            style={{
                                                paddingLeft: 10
                                            }}
                                        >
                                            <TouchableOpacity
                                                onPress={this.props.campaignSelected(data.id)}
                                            >
                                                <Text
                                                    style={styles.homePageViewAll}
                                                >
                                                    Full details
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </CardHeader>

                                <CardBody>
                                    <View
                                        style={styles.homePageRecommendedCampaignBody}
                                    >
                                        <View
                                            style={styles.homePageRecommendedCampaignFirstCol}
                                        >
                                            <LabelText>{data.campaignDetails.location}</LabelText>
                                            <CommonText>Location</CommonText>
                                        </View>

                                        <View
                                            style={styles.homePageAlignCenter}
                                        >
                                            <VehicleType
                                                vehicleType={data.campaignDetails.vehicle_classification}
                                                vehicleColor="black"
                                            />

                                            <CommonText>{ this.state.vehicleType[data.campaignDetails.vehicle_type].name }</CommonText>
                                        </View>

                                        <View
                                            style={styles.homePageAlignRight}
                                        >
                                            <LabelText>P {numberWithCommas(data.campaignDetails.pay_basic)}</LabelText>
                                            <CommonText>Earn up to</CommonText>
                                        </View>
                                    </View>

                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: 15
                                        }}
                                    >
																			<TouchableOpacity
																				style={{
																					flex: 1,
																					marginRight: 10,
																				}}
																				onPress={this.props.campaignSelected(data.id, 'MonthlyCarPhoto')}
																			>
																				<Text style={styles.homePageViewAll}>
																					Calendar
																				</Text>
																			</TouchableOpacity>

																			<TouchableOpacity
																				style={{
																					flex: 1,
																					marginLeft: 10,
																					justifyContent: 'center',
																					alignItems: 'center',
																					backgroundColor: theme.COLOR_BLUE,
																					borderRadius: 15,
																					paddingVertical: 10,
																				}}
																				onPress={this.props.campaignSelected(data.id)}
																			>
																				<LabelText color="white">Start trip</LabelText>
																			</TouchableOpacity>
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
                                        <LabelText color="blue" large={true}>{data.campaign_traveled}km</LabelText>
                                        <LabelText color="blue" large={true}>P {numberWithCommas(getTotalEarnings(data))}</LabelText>
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
                    );
                }
            })
            : (
                <View
                    style={{
                        marginTop: 5,
                        alignItems: 'center'
                    }}
                >
                    <CommonText>-- no active campaign --</CommonText>
                </View>
            )
        );
    }

    completeCampaignView = () => {
        return (
            this.state.myList.filter(d => d.end).length !== 0
            ? this.state.myList.map((data, index) => {
                if (data.end) {
                    return (
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
                                        borderTopRightRadius: theme.PAGE_CARD_RADIUS,
                                        overflow: 'hidden'
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
                                                paddingHorizontal: 20,
                                                paddingVertical: 15,
                                            }}
                                        >
                                            <LabelText>{data.campaignDetails.name}</LabelText>
                                            <CommonText>{timeStamp(data.end_timestamp).date}</CommonText>
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
                                                onPress={
                                                    () => { this.props.favoriteCampaign(data.id); }
                                                }
                                            >
                                                {data.favorite ? (
                                                    <Image
                                                        style={{
                                                            width: '45%',
                                                            resizeMode: 'contain'
                                                        }}
                                                        source={require('../assets/image/icons/completed_favorite_icon.png')}
                                                    />
                                                ) : (
                                                    <Image
                                                        style={{
                                                            width: '45%',
                                                            resizeMode: 'contain'
                                                        }}
                                                        source={require('../assets/image/icons/completed_unfavorite_icon.png')}
                                                    />
                                                )}
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
                                                onPress={this.props.campaignSelected(data.id)}
                                            />
                                        </View>

                                        <View
                                            style={{
                                                flex: 1,
                                                justifyContent: 'flex-end',
                                                alignItems: 'flex-end'
                                            }}
                                        >
                                            <LabelText color="blue" large={true}>P {numberWithCommas(getTotalEarnings(data.id))}</LabelText>
                                            <CommonText color="white">Total Earnings</CommonText>
                                        </View>
                                    </View>
                                </CardFooter>
                            </Card>
                        </View>
                    );
                }
            })
            : (
                <View
                    style={{
                        marginTop: 5,
                        alignItems: 'center'
                    }}
                >
                    <CommonText>-- no completed campaign --</CommonText>
                </View>
            )
        );
    }

    render() {
        return (
            <Page>
                <NavigationEvents
                    onDidFocus={this.init}
                />

                <ScrollView
                    style={styles.homePageScrollView}
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={this.state.scrollEnable}
                >
                    <UserInfo />

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
                        
                        {this.state.loader ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
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
                                        activeOpacity={0.85}
                                        onPress={this.clickCampaign('active')}
                                        disabled={this.state.myCampaignClick == 'active' ? true : false}
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
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{
                                            flex: 1
                                        }}
                                        activeOpacity={0.85}
                                        onPress={this.clickCampaign('complete')}
                                        disabled={this.state.myCampaignClick == 'complete' ? true : false}
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
                                        {
                                            this.state.myCampaignClick == 'active'
                                            ? this.activeCampaignView()
                                            : this.completeCampaignView()
                                        }
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </Page>
        );
    }
}

const mapStateToProps = (state) => ({
    myList: state.campaignReducer.mylist
});

const mapDispatchToProps = (dispatch) => ({
    campaignSelected: (id, navigate = false) => () => dispatch(CampaignAction.mylistSelected(id, navigate)),
    favoriteCampaign: (id) => dispatch(CampaignAction.favorite(id)),
    dispatchTrip: () => dispatch(CampaignAction.startTrip())
});

export default connect(mapStateToProps, mapDispatchToProps)(MyCampaignPage);