import React, { Component } from 'react';
import {
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import Page from './Page';
import {
    LabelText,
    CommonText,
} from '../components/Text';
import {
    Card,
    CardHeader,
    CardBody
} from '../components/Card';
import DashboardTrip from '../components/Modal/DashboardTrip';
import NavigationService from '../services/navigation';
import UserInfo from '../components/UserInfo';
import styles from '../styles/page.Home.style';
import theme from '../styles/theme.style';
import { VehicleType } from '../components/VehicleType';
import { VEHICLE } from '../config/variables';
import {
	numberWithCommas,
	getTotalEarnings,
	timeStamp
} from '../config/functions';

class DashboardPage extends Component {
    constructor(props) {
        super(props);

        this.cid = this.props.navigation.getParam('campaign_id', null);

        if(!this.cid) {
            NavigationService.navigate('Home');
        }

        this.state = {
            vehicleTypes: Object.values(VEHICLE.TYPE),
            tripLength: 3,
            trips: [],
            loader: false,
            modalData: {
                cid: false,
                tripId: false,
            },
            modalVisible: false
        };
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

    viewMoreTrips = (campaignLength) => () => {
        this.setState({loader: true});
        var { tripLength } = this.state;
        if(tripLength < campaignLength) {
            tripLength += 3;
            this.setState({tripLength, loader: false});
        }
    }

    tripLocation = (address) => {
        if(address) {
            var locs = address.split(', ');
            return locs.splice((locs.length - 3), 1);
        } else {
            return '----';
        }
    }

    toggleModal = () => {
        this.setState({modalVisible: !this.state.modalVisible});
    }

    tripOnPress = (tripID, cid) => () => {
        var { modalData } = this.state;
        modalData.tripId = tripID;
        modalData.cid = cid;
        this.setState({modalData});
        this.toggleModal();
    }

    render() {
        return (
            <Page>
                <DashboardTrip
                    modalVisible={this.state.modalVisible}
                    modalData={this.state.modalData}
                    toggleModal={this.toggleModal}
                    campaignLocations={this.props.campaign_location}
                />
                
                <ScrollView
                    style={styles.homePageScrollView}
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                >
                    <UserInfo />

                    <View
                        style={{
                            paddingHorizontal: theme.PAGE_PADDING_HORIZONTAL,
                            paddingVertical: 15
                        }}
                    >
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 15
                            }}
                        >
                            <LabelText color="white">
                                Dashboard
                            </LabelText>
                        </View>
                        
                        {this.props.myList.filter(m => m.campaign_id === this.cid).map(campaign =>
                            <Card key={campaign.id}>
                                <CardHeader active>
                                    <LabelText>{campaign.campaignDetails.name}</LabelText>
                                    <CommonText>{campaign.client.business_name}</CommonText>
                                </CardHeader>

                                <CardBody divider>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-end',
                                            marginBottom: 10
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                                alignItems: 'flex-start'
                                            }}
                                        >
                                            <LabelText>{campaign.campaignDetails.location}</LabelText>
                                            <CommonText>Location</CommonText>
                                        </View>

                                        <View
                                            style={{
                                                flex: 1,
                                                alignItems: 'flex-end'
                                            }}
                                        >
                                            <VehicleType
                                                vehicleType={campaign.campaignDetails.vehicle_classification}
                                                vehicleColor="black"
                                            />

                                            <CommonText>
                                                {this.state.vehicleTypes[campaign.campaignDetails.vehicle_type].name}
                                            </CommonText>
                                        </View>
                                    </View>
                                    
                                    <View
                                        style={{
                                            marginVertical: 5,
                                            paddingVertical: 15,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: theme.COLOR_GRAY_HEAVY,
                                            borderRadius: theme.PAGE_CARD_RADIUS,
                                        }}
                                    >   
                                        <CommonText color="white">Total distance traveled:</CommonText>
                                        <View style={{width: 5}}></View>
                                        <LabelText color="blue">{campaign.campaign_traveled}km</LabelText>
                                    </View>
                                    
                                    <View
                                        style={{
                                            marginVertical: 5,
                                            paddingVertical: 15,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: theme.COLOR_GRAY_HEAVY,
                                            borderRadius: theme.PAGE_CARD_RADIUS,
                                        }}
                                    >   
                                        <CommonText color="white">Total earnings:</CommonText>
                                        <View style={{width: 5}}></View>
                                        <LabelText color="blue">P{numberWithCommas(getTotalEarnings(campaign))}</LabelText>
                                    </View>
                                </CardBody>
                                
                                <CardBody footer>
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <LabelText>Trip History</LabelText>
                                    </View>

                                    <View
                                        style={{
                                            marginTop: 10,
                                            paddingHorizontal: 15,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <LabelText small>Start</LabelText>
                                        <LabelText small>End</LabelText>
                                    </View>

                                    <View
                                        style={{
                                            marginTop: 5,
                                            marginBottom: 10
                                        }}
                                    >
                                        {campaign.trips.length !== 0 ? (
                                            <View>
                                                {campaign.trips.map((trip, tIdx) =>
                                                    tIdx < this.state.tripLength ? (
                                                        <TouchableOpacity
                                                            key={trip.id}
                                                            onPress={this.tripOnPress(trip.id, trip.campaign_id)}
                                                        >
                                                            <View
                                                                style={{
                                                                    marginVertical: 5,
                                                                    paddingVertical: 10,
                                                                    paddingHorizontal: 15,
                                                                    backgroundColor: theme.COLOR_WHITE,
                                                                    borderRadius: theme.PAGE_CARD_RADIUS,
                                                                    elevation: 3,
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'space-between'
                                                                }}
                                                            >
                                                                <View
                                                                    style={{
                                                                        flex: 1,
                                                                        alignItems: 'flex-start'
                                                                    }}
                                                                >
                                                                    <View
                                                                        style={{
                                                                            flex: 1,
                                                                            alignItems: 'flex-start',
                                                                            borderBottomWidth: 2,
                                                                            borderBottomColor: '#e7e7e7',
                                                                            paddingBottom: 5
                                                                        }}
                                                                    >
                                                                        <CommonText>{timeStamp(trip.started).date.toUpperCase()}</CommonText>
                                                                        <CommonText>{timeStamp(trip.started).time}</CommonText>
                                                                    </View> 
                                                                    
                                                                    <LabelText
                                                                        color="blue"
                                                                        numberOfLines={1}
                                                                    >{this.tripLocation(trip.location_start_address)}</LabelText>
                                                                </View>

                                                                <View
                                                                    style={{
                                                                        flex: 1,
                                                                        alignItems: 'flex-end'
                                                                    }}
                                                                >
                                                                    <View
                                                                        style={{
                                                                            flex: 1,
                                                                            alignItems: 'flex-end',
                                                                            borderBottomWidth: 2,
                                                                            borderBottomColor: '#e7e7e7',
                                                                            paddingBottom: 5
                                                                        }}
                                                                    >
                                                                        <CommonText>{timeStamp(trip.ended).date.toUpperCase()}</CommonText>
                                                                        <CommonText>{timeStamp(trip.ended).time}</CommonText>
                                                                    </View>
                                                                    
                                                                    <LabelText
                                                                        color="blue"
                                                                        numberOfLines={1}
                                                                    >{this.tripLocation(trip.location_end_address)}</LabelText>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    ) : null
                                                )}

                                                {this.state.tripLength < campaign.trips.length ? (
                                                    <View
                                                        style={{
                                                            marginTop: 10,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        {this.state.loader ? (
                                                            <ActivityIndicator />
                                                        ) : (
                                                            <TouchableOpacity
                                                                onPress={this.viewMoreTrips(campaign.trips.length)}
                                                            >
                                                                <CommonText>view more</CommonText>
                                                            </TouchableOpacity>
                                                        )}
                                                    </View>
                                                ) : null}
                                            </View>
                                        ) : (
                                            <View style={{alignSelf: 'center'}}>
                                                <CommonText>-- no trips recorded --</CommonText>
                                            </View>
                                        )}
                                    </View>
                                </CardBody>
                            </Card>
                        )}
                    </View>
                </ScrollView>
            </Page>
        );
    }
}

const mapStateToProps = (state) => ({
    myList: state.campaignReducer.mylist,
    campaign_location: state.campaignReducer.campaign_location
});

export default connect(mapStateToProps)(DashboardPage);
