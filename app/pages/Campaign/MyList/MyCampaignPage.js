import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
	PermissionsAndroid,
	Dimensions
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { RFPercentage } from 'react-native-responsive-fontsize';

import {
	Card,
	CardHeader,
	CardBody,
	CardFooter
} from '../../../components/Card';
import Page from '../../../pages/Page';
import { VehicleType } from '../../../components/VehicleType';
import UserInfo from '../../../components/UserInfo';
import { LabelText, CommonText } from '../../../components/Text';
import { VEHICLE, IMAGES } from '../../../config/variables';
import { CampaignAction } from '../../../redux/actions/campaign.action';
import theme from '../../../styles/theme.style';
import styles from '../../../styles/page.Home.style';
import {
	numberWithCommas,
	getTotalEarnings,
	earnUpTo,
	checkIfCampaignActive
} from '../../../config/functions';

import CampaignCompleted from './CampaignCompleted';

class MyCampaignPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			vehicleType: Object.values(VEHICLE.TYPE),
			startTripLoader: [],

			myList: [],
			activeCampaigns: [],
			completedCampaigns: [],
			
			nav: 'ACTIVE',
			maxContentCount: 4,
			
			loader: true,
			navLoader: false
		};
	}

	init = () => {
		const campaignID = this.props.navigation.getParam('cid', false);
		var myList = this.props.myList;
		if(campaignID) {
			var index = myList.findIndex((e) => {
				return e.id === campaignID;
			});

			if(index !== -1) {
				var campaign = myList.splice(index, 1);
				myList.unshift(campaign);
			}
		}
		
		const activeCampaigns = myList.filter(l => {
			const {duration_from, duration_to} = l.campaignDetails;
			const checkData = {
				dateFrom: duration_from,
				dateTo: duration_to
			};

			if(l.request_status === 1 && !l.end && checkIfCampaignActive(checkData))
				return true;
			return false;
		});
		const completedCampaigns = myList.filter(d => {
			const {duration_from, duration_to} = d.campaignDetails;
			const checkData = {
				dateFrom: duration_from,
				dateTo: duration_to
			};

			if((d.end || !checkIfCampaignActive(checkData)) &&
				d.request_status === 1)
				return true;
			return false;
		});
		const startTripLoader = Array(activeCampaigns.length).fill(false);
		
		this.setState({
			loader: false,
			startTripLoader,
			myList,
			activeCampaigns,
			completedCampaigns,
		});
	}

	navigationOnPress = nav => () => {
		this.toggleNavLoader(true);
		this.setState({nav, maxContentCount: 5});
		this.toggleNavLoader(false);
	}

	toggleNavLoader = navLoader => this.setState({navLoader})

	seeMoreOnPress = () => this.setState({maxContentCount: this.state.maxContentCount + 4})
	
	async requestCameraPermission(id, location_id) {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: 'TapAds',
					message: `TapAds reuires your location`,
					buttonNegative: 'Cancel',
					buttonPositive: 'OK',
				},
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				this.props.campaignSelected(id, false, () => {
					this.props.checkCampaignLocation(location_id, () => {
						this.props.dispatchTrip();
					});
				});
			} else {

			}
		} catch (err) {
			console.warn(err);
		}
	}

	activeCampaignStartTrip = (id, location_id, index) => () => {
		const { startTripLoader } = this.state;
		startTripLoader[index] = !startTripLoader[index];
		this.setState({startTripLoader});
		this.requestCameraPermission(id, location_id);
	}


	campaignContent = () => {
		switch (this.state.nav) {
			case 'ACTIVE':
				return this.activeCampaign();
				
			case 'CAMPAIGNS':
				return this.allCampaigns();

			case 'INCOMPLETE':
				return this.incompleteCampaigns();

			case 'COMPLETED':
				return this.completedCampaigns();
		}
	}

	activeCampaign = () => {
		const campaignDisplay = this.state.activeCampaigns;

		return (
			<View
        style={{
          padding: RFPercentage(2),
        }}
      >
				{campaignDisplay.length !== 0 ?
					campaignDisplay.map((data, index) =>
						this.state.maxContentCount > (index + 1) ? (
							<View
								key={index}
								style={{
									marginVertical: 7
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
											<View
												style={{
													flex: 1
												}}
											>
												<CommonText numberOfLines={1}>
													{data.client.business_name}
												</CommonText>
											</View>
											
											<View
												style={{
													width: 90,
													alignItems: 'flex-end'
												}}
											>
												<TouchableOpacity onPress={() => { this.props.campaignSelected(data.id); }}>
													<Text style={styles.homePageViewAll}>
														Full details
													</Text>
												</TouchableOpacity>
											</View>
										</View>
									</CardHeader>

									<CardBody>
										<View style={styles.homePageRecommendedCampaignBody}>
											<View style={styles.homePageRecommendedCampaignFirstCol}>
												<LabelText>{data.campaignDetails.location}</LabelText>
												<CommonText>Location</CommonText>
											</View>

											<View style={styles.homePageAlignCenter}>
												<VehicleType
													vehicleType={data.campaignDetails.vehicle_classification}
													vehicleColor="black"
												/>

												<CommonText>{ this.state.vehicleType[data.campaignDetails.vehicle_type].name }</CommonText>
											</View>

											<View style={styles.homePageAlignRight}>
												<LabelText>P {earnUpTo(data.campaignDetails)}</LabelText>
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
												onPress={() => { this.props.campaignSelected(data.id, 'MonthlyCarPhoto') }}
											>
												<Text style={styles.homePageViewAll}>
													Upload
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
												onPress={this.activeCampaignStartTrip(data.id, data.campaignDetails.location_id, index)}
												disabled={this.state.startTripLoader[index]}
											>
												{this.state.startTripLoader[index] ? (
													<ActivityIndicator color="#fff" />
												) : (
													<LabelText color="white">
														Start trip
													</LabelText>
												)}
											</TouchableOpacity>
										</View>
									</CardBody>

									<CardFooter active>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-between'
											}}
										>
											<LabelText color="blue" large>{data.campaign_traveled}km</LabelText>
											<LabelText color="blue" large>P {numberWithCommas(getTotalEarnings(data))}</LabelText>
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
						) : null
				) : (
					<View
						style={{
							marginTop: 5,
							alignItems: 'center'
						}}
					>
						<CommonText color="white">-- no active campaign --</CommonText>
					</View>
				)}

				{campaignDisplay.length >= this.state.maxContentCount ? (
					<TouchableOpacity
						style={{
							alignSelf: 'center',
							justifyContent: 'center',
							marginVertical: 7
						}}
						onPress={this.seeMoreOnPress}
					>
						<LabelText color="white">Load more</LabelText>
					</TouchableOpacity>
				) : null}
			</View>
		);
	}

	allCampaigns = () => {
		const campaignDisplay = this.state.myList;

		return (
			<View
        style={{
          padding: RFPercentage(2),
        }}
      >
				{campaignDisplay.length !== 0 ?
					campaignDisplay.map((data, index) =>
						this.state.maxContentCount > (index + 1) ? (
							<View
								key={index}
								style={{
									marginVertical: 7
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
											<View
												style={{
													flex: 1
												}}
											>
												<CommonText numberOfLines={1}>
													{data.client.business_name}
												</CommonText>
											</View>
											
											<View
												style={{
													width: 90,
													alignItems: 'flex-end'
												}}
											>
												<TouchableOpacity onPress={() => { this.props.campaignSelected(data.id); }}>
													<Text style={styles.homePageViewAll}>
														Full details
													</Text>
												</TouchableOpacity>
											</View>
										</View>
									</CardHeader>

									<CardBody>
										<View style={styles.homePageRecommendedCampaignBody}>
											<View style={styles.homePageRecommendedCampaignFirstCol}>
												<LabelText>{data.campaignDetails.location}</LabelText>
												<CommonText>Location</CommonText>
											</View>

											<View style={styles.homePageAlignCenter}>
												<VehicleType
													vehicleType={data.campaignDetails.vehicle_classification}
													vehicleColor="black"
												/>

												<CommonText>{ this.state.vehicleType[data.campaignDetails.vehicle_type].name }</CommonText>
											</View>

											<View style={styles.homePageAlignRight}>
												<LabelText>P {earnUpTo(data.campaignDetails)}</LabelText>
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
												onPress={() => { this.props.campaignSelected(data.id, 'MonthlyCarPhoto') }}
											>
												<Text style={styles.homePageViewAll}>
													Upload
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
												onPress={this.activeCampaignStartTrip(data.id, data.campaignDetails.location_id, index)}
												disabled={this.state.startTripLoader[index]}
											>
												{this.state.startTripLoader[index] ? (
													<ActivityIndicator color="#fff" />
												) : (
													<LabelText color="white">
														Start trip
													</LabelText>
												)}
											</TouchableOpacity>
										</View>
									</CardBody>

									<CardFooter active>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-between'
											}}
										>
											<LabelText color="blue" large>{data.campaign_traveled}km</LabelText>
											<LabelText color="blue" large>P {numberWithCommas(getTotalEarnings(data))}</LabelText>
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
						) : null
				) : (
					<View
						style={{
							marginTop: 5,
							alignItems: 'center'
						}}
					>
						<CommonText color="white">-- no registered campaign --</CommonText>
					</View>
				)}

				{campaignDisplay.length >= this.state.maxContentCount ? (
					<TouchableOpacity
						style={{
							alignSelf: 'center',
							justifyContent: 'center',
							marginVertical: 7
						}}
						onPress={this.seeMoreOnPress}
					>
						<LabelText color="white">Load more</LabelText>
					</TouchableOpacity>
				) : null}
			</View>
		);
	}

	completedCampaigns = () => {
		const campaignDisplay = this.state.completedCampaigns;

		return (
			<View
        style={{
          padding: RFPercentage(2),
        }}
      >
				{campaignDisplay.length !== 0 ?
					campaignDisplay.map((data, index) =>
						this.state.maxContentCount > (index + 1) ? (
							<CampaignCompleted key={index} campaign={data} />
						) : null
				) : (
					<View
						style={{
							marginTop: 5,
							alignItems: 'center'
						}}
					>
						<CommonText color="white">-- no completed campaign --</CommonText>
					</View>
				)}

				{campaignDisplay.length >= this.state.maxContentCount ? (
					<TouchableOpacity
						style={{
							alignSelf: 'center',
							justifyContent: 'center',
							marginVertical: 7
						}}
						onPress={this.seeMoreOnPress}
					>
						<LabelText color="white">Load more</LabelText>
					</TouchableOpacity>
				) : null}
			</View>
		);
	}

	incompleteCampaigns = () => {
		return (
			<LabelText color="white">Incomplete Campaigns</LabelText>
		);
	}

	render() {
		return (
			<Page campaignPage>
				<NavigationEvents	onDidFocus={this.init} />

				<ScrollView
					// style={styles.homePageScrollView}
					overScrollMode='never'
					showsVerticalScrollIndicator={false}
					scrollEnabled={this.state.scrollEnable}
				>
					<UserInfo />

					<View
						style={{
							marginVertical: 20,
							// marginHorizontal: theme.PAGE_PADDING_HORIZONTAL
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
							this.state.navLoader ? (
                <View>
                  <ActivityIndicator color="#fff" />
                </View>
              ) : this.campaignContent()
						)}
					</View>
				</ScrollView>

				{/* <NavigationBottom
					contents={[
						'ACTIVE',
						'CAMPAIGNS',
						'COMPLETED',
					]}
					navigationOnPress={this.navigationOnPress}
					activeNav={this.state.nav}
				/> */}
			</Page>
		);
	}
}

const mapStateToProps = (state) => ({
	myList: state.campaignReducer.mylist
});

const mapDispatchToProps = (dispatch) => ({
  campaignSelected: (id, navigate = false, callback = false) => dispatch(CampaignAction.mylistSelected(id, navigate, callback)),
	favoriteCampaign: (id) => dispatch(CampaignAction.favorite(id)),
	dispatchTrip: () => dispatch(CampaignAction.startTrip()),
	checkCampaignLocation: (id, callback) => dispatch(CampaignAction.checkCampaignLocation(id, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyCampaignPage);

class NavigationBottom extends Component {
	render() {
		return (
			<View
				style={{
					borderTopRightRadius: theme.PAGE_CARD_RADIUS,
					borderTopLeftRadius: theme.PAGE_CARD_RADIUS,
					overflow: 'hidden',
					position: 'absolute',
					width: Dimensions.get('window').width,
					backgroundColor: theme.COLOR_WHITE,
					bottom: 0,
					padding: 10,
					elevation: 5
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					{this.props.contents.map((c, cIdx) =>
						<View
							key={cIdx}
							style={{
								flex: 1,
								// borderColor: theme.COLOR_GRAY_HEAVY,
								// borderLeftWidth: cIdx === 0 ? 0 : 0.5,
								// borderRightWidth: (cIdx + 1) === this.props.contents.length ? 0 : 0.5
							}}
						>
							<TouchableOpacity
								style={[
									{
										flex: 1,
										alignSelf: 'center',
										justifyContent: 'center',
										padding: 10,
									}, this.props.activeNav === c ? {
										borderBottomColor: theme.COLOR_LIGHT_BLUE,
										borderBottomWidth: 3
									} : {}
								]}
								activeOpacity={0.9}
								onPress={this.props.navigationOnPress(c)}
							>
								<Text
									style={{
										color: theme.COLOR_BLACK,
										fontSize: theme.FONT_SIZE_XSMALL,
										fontFamily: 'Montserrat-Bold',
									}}
								>
									{c}
								</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</View>
		);
	}
}