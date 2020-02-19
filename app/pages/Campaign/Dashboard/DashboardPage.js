import React, { Component } from 'react';
import {
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';

import {
  LabelText,
  CommonText,
} from '../../../components/Text';
import {
  Card,
  CardHeader,
  CardBody
} from '../../../components/Card';
import PageLayout from '../../../components/PageLayout';
import DashboardTrip from '../../../components/Modal/DashboardTrip';
import NavigationService from '../../../services/navigation';
import styles from '../../../styles/page.Home.style';
import { VehicleType } from '../../../components/VehicleType';
import { VEHICLE } from '../../../config/variables';
import {
	numberWithCommas,
	getTotalEarnings,
	timeStamp
} from '../../../config/functions';
import PageContainer from '../../../components/PageContainer';
import {
  Container,
  Header,
  CampaignInfoTop,
  CampaignInfoLeft,
  CampaignInfoRight,
  DistanceRow,
  DistanceSpace,
  TripHistoryHeader,
  TripHistoryColumnHeader,
  TripsContainer,
  NoTripsRecorded,
  ViewMoreButton,
  ViewMoreWrapper,
  TripButton,
  TripLeftContainer,
  TripLeftWrapper,
  TripRightContainer,
  TripRightWrapper
} from './DashboardPageStyledComponents';
import { IfElse, Then, Else } from '../../../components/IfElse';

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
			<PageLayout>
				<DashboardTrip
					campaignLocations={this.props.campaign_location}
					modalVisible={this.state.modalVisible}
					modalData={this.state.modalData}
					toggleModal={this.toggleModal} />
				
        <PageContainer
					style={styles.homePageScrollView}
					overScrollMode='never'
					showsVerticalScrollIndicator={false}>
          <Container>
            <Header>
              <LabelText color="white">
                Dashboard
              </LabelText>
            </Header>

            
            {this.props.myList.filter(m => m.campaign_id === this.cid).map(campaign =>
              <Card key={campaign.id}>
                <CardHeader active>
                  <LabelText>{campaign.campaignDetails.name}</LabelText>
                  <CommonText>{campaign.client.business_name}</CommonText>
                </CardHeader>

                <CardBody divider>
                  <CampaignInfoTop>
                    <CampaignInfoLeft>
                      <LabelText>{campaign.campaignDetails.location}</LabelText>
                      <CommonText>Location</CommonText>
                    </CampaignInfoLeft>

                    <CampaignInfoRight>
                      <VehicleType
                        vehicleType={campaign.campaignDetails.vehicle_classification}
                        vehicleColor="black" />

                      <CommonText>
                        {this.state.vehicleTypes[campaign.campaignDetails.vehicle_type].name}
                      </CommonText>
                    </CampaignInfoRight>
                  </CampaignInfoTop>

                  <DistanceRow>
                    <CommonText color="white">Total distance traveled:</CommonText>
                    <DistanceSpace />
                    <LabelText color="blue">{campaign.campaign_traveled}km</LabelText>
                  </DistanceRow>

                  <DistanceRow>
                    <CommonText color="white">Total earnings:</CommonText>
                    <DistanceSpace />
                    <LabelText color="blue">P{numberWithCommas(getTotalEarnings(campaign))}</LabelText>
                  </DistanceRow>
                </CardBody>
                    
                <CardBody footer>
                  <TripHistoryHeader>
                    <LabelText>Trip History</LabelText>
                  </TripHistoryHeader>

                  <TripHistoryColumnHeader>
                    <LabelText small>Start</LabelText>
                    <LabelText small>End</LabelText>
                  </TripHistoryColumnHeader>

                  <TripsContainer>
                    <IfElse condition={campaign.trips.length !== 0}>
                      <Then>
                        {campaign.trips.map((trip, tIdx) =>
                          <IfElse 
                            key={trip.id}
                            condition={tIdx < this.state.tripLength}>
                            <Then>
                              <TripButton onPress={this.tripOnPress(trip.id, trip.campaign_id)}>
                                <TripLeftContainer>
                                  <TripLeftWrapper>
                                    <CommonText>{timeStamp(trip.started).date.toUpperCase()}</CommonText>
                                    <CommonText>{timeStamp(trip.started).time}</CommonText>
                                  </TripLeftWrapper>
                                    
                                  <LabelText
                                    color="blue"
                                    numberOfLines={1}>
                                    {this.tripLocation(trip.location_start_address)}
                                  </LabelText>
                                </TripLeftContainer>

                                <TripRightContainer>
                                  <TripRightWrapper>
                                    <CommonText>{timeStamp(trip.ended).date.toUpperCase()}</CommonText>
                                    <CommonText>{timeStamp(trip.ended).time}</CommonText>
                                  </TripRightWrapper>
                                  
                                  <LabelText
                                    color="blue"
                                    numberOfLines={1}>
                                    {this.tripLocation(trip.location_end_address)}
                                  </LabelText>
                                </TripRightContainer>
                              </TripButton>
                            </Then>
                          </IfElse>
                        )}

                        <IfElse condition={this.state.tripLength < campaign.trips.length}>
                          <Then>
                            <ViewMoreWrapper>
                              <IfElse condition={this.state.loader}>
                                <Then>
                                  <ActivityIndicator />
                                </Then>

                                <Else>
                                  <ViewMoreButton onPress={this.viewMoreTrips(campaign.trips.length)}>
                                    <CommonText>view more</CommonText>
                                  </ViewMoreButton>
                                </Else>
                              </IfElse>
                            </ViewMoreWrapper>
                          </Then>
                        </IfElse>
                      </Then>

                      <Else>
                        <NoTripsRecorded>
                          <CommonText>-- no trips recorded --</CommonText>
                        </NoTripsRecorded>
                      </Else>
                    </IfElse>
                  </TripsContainer>
                </CardBody>
              </Card>
            )}
          </Container>
        </PageContainer>
      </PageLayout>
		);
	}
}

const mapStateToProps = (state) => ({
	myList: state.campaignReducer.mylist,
	campaign_location: state.campaignReducer.campaign_location
});

export default connect(mapStateToProps)(DashboardPage);
