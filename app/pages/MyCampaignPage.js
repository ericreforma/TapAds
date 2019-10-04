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
import NavigationService from '../services/navigation';
import { numberWithCommas } from '../config/functions';

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

    timeFormat = (timestamp) => {
        var date = timestamp.split(' ')[0],
            year = parseInt(date.split('-')[0]),
            month = parseInt(date.split('-')[1]),
            day = parseInt(date.split('-')[2]),
            months = [
                'Jan', 'Feb', 'Mar',
                'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep',
                'Oct', 'Nov', 'Dec'
            ];

        return `${months[month - 1].toUpperCase()}. ${day}, ${year}`;
    }
    
    componentDidMount = () => {
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

    viewCampaignDashboard = (id) => () => {
        alert('View dashboard campaign id: ' + id);
    }

    favoriteOnPress = (id) => () => {
        alert('Favorite pressed campaign id: ' + id);
    }

    totalEarnings = (campaign) => {
        var campaignTraveled = parseFloat(campaign.campaign_traveled),
            payBasic = parseFloat(campaign.campaignDetails.pay_basic),
            payBasicKm = parseFloat(campaign.campaignDetails.pay_basic_km),
            payAdditional = parseFloat(campaign.campaignDetails.pay_additional),
            payAdditionalKm = parseFloat(campaign.campaignDetails.pay_additional_km),
            d = campaignTraveled - payBasicKm,
            d = (d >= 1 ? d : 0),
            totalEarnings = (Math.floor(d / payAdditionalKm) * payAdditional) + (payBasic * (d >= 1 ? 1 : 0));
            return numberWithCommas(totalEarnings.toFixed(2));
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
                            <Card shadow={true}>
                                <CardHeader active={true}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexGrow: 1,
                                                flex: 1
                                            }}
                                        >
                                            <LabelText numberOfLines={1}>{data.campaignDetails.name}</LabelText>
                                        </View>

                                        <TouchableOpacity
                                            style={{
                                                paddingLeft: 15
                                            }}
                                            onPress={() => NavigationService.navigate('Chat', {id: data.campaignDetails.client_id})}
                                        >
                                            <Image
                                                style={{
                                                    height: 17,
                                                    resizeMode: 'contain'
                                                }}
                                                source={require('../assets/image/icons/mail_icon.png')}
                                            />

                                            {data.messages.length !== 0 ? (
                                                <View
                                                    style={{
                                                        backgroundColor: theme.COLOR_BLUE,
                                                        width: 14,
                                                        height: 14,
                                                        borderRadius: 7,
                                                        position: 'absolute',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        top: -5,
                                                        right: 3
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 8,
                                                            color: theme.COLOR_WHITE,
                                                            fontFamily: 'Montserrat-Bold'
                                                        }}
                                                    >
                                                        {data.messages.length}
                                                    </Text>
                                                </View>
                                            ) : null}
                                        </TouchableOpacity>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexGrow: 1,
                                                flex: 1
                                            }}
                                        >
                                            <CommonText numberOfLines={1}>{data.client.business_name}</CommonText>
                                        </View>
                                        
                                        <View
                                            style={{
                                                paddingLeft: 10
                                            }}
                                        >
                                            <TouchableOpacity
                                                onPress={() => { this.props.campaignSelected(data.id); } }
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
                                        <LabelText color="blue" large={true}>{data.campaign_traveled}km</LabelText>
                                        <LabelText color="blue" large={true}>P {this.totalEarnings(data)}</LabelText>
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
                                            <CommonText>{this.timeFormat(data.end_timestamp)}</CommonText>
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
                                                onPress={() => { this.props.campaignSelected(data.id); }}
                                            />
                                        </View>

                                        <View
                                            style={{
                                                flex: 1,
                                                justifyContent: 'flex-end',
                                                alignItems: 'flex-end'
                                            }}
                                        >
                                            <LabelText color="blue" large={true}>P {this.totalEarnings(data.id)}</LabelText>
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
    campaignSelected: (id) => dispatch(CampaignAction.mylistSelected(id)),
    favoriteCampaign: (id) => dispatch(CampaignAction.favorite(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyCampaignPage);