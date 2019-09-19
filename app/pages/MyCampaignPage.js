import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    Image,
    ScrollView,
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
import { Page } from '../pages/Page';
import { VehicleType } from '../components/VehicleType';
import UserInfo from '../components/UserInfo';
import { LabelText, CommonText } from '../components/Text';
import ButtonBlue from '../components/ButtonBlue';
import { VEHICLE } from '../config/variables';
import { CampaignAction } from '../redux/actions/campaign.action';
import theme from '../styles/theme.style';
import styles from '../styles/page.Home.style';

class MyCampaignPage extends Component {
    constructor(props) {
      super(props);

      this.state = {
          width: Dimensions.get('window').width,
          myCampaignClick: 'active',
          vehicleType: Object.values(VEHICLE.TYPE),
      };
    }

    clickCampaign = (active) => () => {
        this.setState({ myCampaignClick: active })
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
            this.props.myList.map((data, index) => {
                if (!data.completed) {
                    return (
                        <View
                            key={index}
                            style={{
                                paddingVertical: 10
                            }}
                        >
                            <Card shadow={true}>
                                <CardHeader active={true}>
                                    <LabelText>{data.campaignDetails.name}</LabelText>
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
                                            <LabelText>P {data.campaignDetails.pay_basic}</LabelText>
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
                                        <LabelText color="blue" large={true}>P {0}</LabelText>
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
        );
    }

    completeCampaignView = () => {
        return (
            this.props.myList.map((data, index) => {
            if (data.completed) {
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
                                    <LabelText>{data.campaignDetails.name}</LabelText>
                                    <CommonText>TODAY</CommonText>
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
                                                {0}
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
                                    <LabelText>TODAY</LabelText>
                                    <CommonText>STATUS</CommonText>
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
                                    <LabelText color="blue" large={true}>P100</LabelText>
                                    <CommonText color="white">Total Earnings</CommonText>
                                </View>
                            </View>
                        </CardFooter>
                    </Card>
                </View>
              );
              }
            })
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

            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state.campaignReducer.mylist);
    return {
        myList: state.campaignReducer.mylist
    };
};

const mapDispatchToProps = (dispatch) => ({
  campaignSelected: (id) => dispatch(CampaignAction.mylistSelected(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyCampaignPage);
