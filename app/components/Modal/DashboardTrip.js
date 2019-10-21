import React, { Component } from 'react';
import {
	Modal,
	View,
	ScrollView,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native';
import MapView, {
	Polygon,
	PROVIDER_GOOGLE,
	Polyline,
	Marker
} from 'react-native-maps';

import { UserController } from '../../controllers/UserController';

import { IMAGES } from '../../config/variables';
import theme from '../../styles/theme.style';
import {
	CommonText,
	LabelText
} from '../Text';
import {
	timeStamp,
	getHourDiff
} from '../../config/functions';

export default class DashboardTrip extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loader: false,
			coordinates: [],
			pointToPoint: {
				firstPos: false,
				lastPos: false
			},
			tripMap: [],
			tripTimeStamp: {
				start: false,
				end: false,
			},
			totalTime: 0,
			totalDistance: 0,
			totalCampaignDistance: 0,
			animationCount: 0,
			intervalId: 0
		};
		console.disableYellowBox = true;
	}

	componentDidUpdate = (prevProps) => {
		if(this.props.modalVisible !== prevProps.modalVisible) {
			this.toggleLoader();
			var { modalData, campaignLocations } = this.props;
			UserController.request.tripInfo(modalData.tripId)
			.then(res => {
				const coor = this.getCoordinates(campaignLocations, res.data);
				
				var totalDistance = 0,
					totalCampaignDistance = 0;
				const pointToPoint = {
					firstPos: false,
					lastPos: false
				};
				const tripMap = res.data.map((trip, index) => {
					const coor = {
						latitude: parseFloat(trip.latitude),
						longitude: parseFloat(trip.longitude),
					};
					
					if(index === 0) {
						pointToPoint.firstPos = {
							latitude: parseFloat(trip.latitude),
							longitude: parseFloat(trip.longitude),
						};
					} else if(index === (res.data.length - 1)) {
						pointToPoint.lastPos = {
							latitude: parseFloat(trip.latitude),
							longitude: parseFloat(trip.longitude),
						};
					}

					totalDistance += parseFloat(trip.distance);
					if(trip.counted === 1)
						totalCampaignDistance += parseFloat(trip.distance);

					return coor;
				});

				const firstTrip = res.data.find((x, idx) => idx === 0);
				const lastTrip = res.data.find((x, idx) => idx === (res.data.length - 1));
				const tripTimeStamp = {
					start: timeStamp(firstTrip ? firstTrip.created_at : false),
					end: timeStamp(lastTrip ? lastTrip.created_at : false)
				};

				const hourDiff = getHourDiff((firstTrip ? firstTrip.created_at : false), (lastTrip ? lastTrip.created_at : false));
				const totalTime = hourDiff ? (`${hourDiff.hours} hrs, ${hourDiff.min} min`) : '--';

				if(pointToPoint.firstPos && pointToPoint.lastPos) {

				}
						
				this.setState({
					coordinates: coor.coordinates,
					region: coor.region,
					tripMap,
					pointToPoint,
					tripTimeStamp,
					totalTime,
					totalDistance: totalDistance.toFixed(2),
					totalCampaignDistance: totalCampaignDistance.toFixed(2),
				});

				if(pointToPoint.firstPos && pointToPoint.lastPos && this.props.modalVisible) {
					var intervalId = setInterval(this.movingCar, (5000 / tripMap.length));
					this.setState({intervalId});
				}
				this.toggleLoader();
			})
			.catch(error => {
				console.log(error);
				this.toggleLoader();
			});
		}
	}

	toggleLoader = () => {
		this.setState({loader: !this.state.loader});
	}

	getCoordinates = (dataMap, trips) => {
		const lats = [];
		const lons = [];
		let latitudeDelta = 0;
		let longitudeDelta = 0;

		const coordinates = dataMap.map(c => {
			const returnCoord = JSON.parse(c.json_coordinates).map(geo =>
				geo.map(coord => {
					const coor = {
						latitude: coord.lat,
						longitude: coord.lng,
					};
					return coor;
				})
			);
			return returnCoord;
		});

		trips.map(t => {
			lats.push(t.latitude);
			lons.push(t.longitude);
		});

		const minX = Math.min.apply(null, lats) - 0.04;
		const maxX = Math.max.apply(null, lats) + 0.04;
		const minY = Math.min.apply(null, lons) - 0.04;
		const maxY = Math.max.apply(null, lons) + 0.04;

		latitudeDelta = maxX - minX;
		longitudeDelta = maxY - minY;
		const region = {
			latitude: (minX + maxX) / 2,
			longitude: (minY + maxY) / 2,
			latitudeDelta,
			longitudeDelta
		};
		
		return { region, coordinates };
	}

	movingCar = () => {
		var { pointToPoint,
			tripMap,
			animationCount } = this.state;

		pointToPoint.firstPos = tripMap[animationCount];
		animationCount += 1;
		if(animationCount === tripMap.length) {
			animationCount = 0;
		}
		this.setState({
			pointToPoint,
			animationCount
		});
	}

	closeModal = () => {
		clearInterval(this.state.intervalId);
		this.setState({
			pointToPoint: {
				firstPos: false,
				lastPos: false
			},
			animationCount: 0,
		});
		this.props.toggleModal();
	}
	
	render() {
			return (
					<Modal
							animationType="fade"
							transparent={true}
							visible={this.props.modalVisible}
							onRequestClose={this.closeModal}
					>
							<View
									style={{
											justifyContent: 'center',
											alignItems: 'center',
											backgroundColor: theme.COLOR_BLACK + '59',
											flex: 1
									}}
							>
									<ScrollView
											overScrollMode='never'
											showsVerticalScrollIndicator={false}
											contentContainerStyle={{
													marginVertical: 15,
											}}
									>
											<View
													style={{
															backgroundColor: theme.COLOR_WHITE,
															width: Dimensions.get('window').width - 50,
															borderRadius: theme.PAGE_CARD_RADIUS,
															overflow: 'hidden'
													}}
											>
													<View
															style={{
																	height: (Dimensions.get('window').height / 2),
															}}
													>
															{this.state.loader ? (
																	<View
																			style={{
																					flex: 1,
																					justifyContent: 'center',
																					alignItems: 'center'
																			}}
																	>
																			<ActivityIndicator />
																	</View>
															) : (
																	<View>
																			<View
																					style={{
																							...StyleSheet.absoluteFillObject,
																							height: Dimensions.get('window').height / 2,
																							width: '100%'
																					}}
																			>
																					<MapView
																							style={{
																									...StyleSheet.absoluteFillObject
																							}}
																							initialRegion={this.state.region}
																							provider={PROVIDER_GOOGLE}
																					>
																							{this.state.coordinates.map(polygon =>
																									polygon.map((c, index) =>
																											<Polygon
																													key={index}
																													coordinates={c}
																													fillColor="rgba(255, 17, 44, 0.3)"
																													strokeColor="rgba(255, 17, 44, 0.3)"
																											/>
																									)
																							)}

																							<Polyline
																									coordinates={this.state.tripMap}
																									strokeColor="rgba(38, 96, 255, 0.8)"
																									strokeWidth={6}
																									lineCap="round"
																							/>
																							
																							{this.state.pointToPoint.firstPos ? (
																									<Marker.Animated
																											image={IMAGES.ICONS.car_icon}
																											coordinate={this.state.pointToPoint.firstPos}
																											anchor={{x: 0.5, y: 0.5}}
																									/>
																							) : null}
																							
																							{this.state.pointToPoint.lastPos ? (
																									<Marker
																											image={IMAGES.ICONS.end_trip_icon}
																											coordinate={this.state.pointToPoint.lastPos}
																									/>
																							) : null}
																					</MapView>
																			</View>
																	</View>
															)}
													</View>

													<View
															style={{
																	padding: 20
															}}
													>
															{this.state.loader ? (
																	<View
																			style={{
																					justifyContent: 'center',
																					alignItems: 'center'
																			}}
																	>
																			<ActivityIndicator />
																	</View>
															) : (
																	<View>
																			<View
																					style={{
																							flexDirection: 'row',
																							justifyContent: 'space-between',
																							borderBottomWidth: 2,
																							borderBottomColor: '#e7e7e7',
																							paddingBottom: 10
																					}}
																			>
																					<View
																							style={{
																									flex: 1,
																									alignItems: 'flex-start'
																							}}
																					>
																							<LabelText small>Start</LabelText>
																							<CommonText>{this.state.tripTimeStamp.start.date}</CommonText>
																							<CommonText>{this.state.tripTimeStamp.start.time}</CommonText>
																					</View>

																					<View
																							style={{
																									flex: 1,
																									alignItems: 'flex-end'
																							}}
																					>
																							<LabelText small>End</LabelText>
																							<CommonText>{this.state.tripTimeStamp.end.date}</CommonText>
																							<CommonText>{this.state.tripTimeStamp.end.time}</CommonText>
																					</View>
																			</View>
																	
																			<View
																					style={{
																							marginTop: 10
																					}}
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
																											alignSelf: 'center'
																									}}
																							>
																									<CommonText>
																											Total time spent:
																									</CommonText>
																							</View>

																							<View
																									style={{
																											flex: 1,
																											alignSelf: 'center'
																									}}
																							>
																									<LabelText>
																											{this.state.totalTime}
																									</LabelText>
																							</View>
																					</View>
																					
																					<View
																							style={{
																									flexDirection: 'row',
																									alignItems: 'center'
																							}}
																					>
																							<View
																									style={{
																											flex: 1,
																											alignSelf: 'center'
																									}}
																							>
																									<CommonText>
																											Total distance traveled:
																									</CommonText>
																							</View>

																							<View
																									style={{
																											flex: 1,
																											alignSelf: 'center'
																									}}
																							>
																									<LabelText>
																											{this.state.totalDistance}km
																									</LabelText>
																							</View>
																					</View>
																					
																					<View
																							style={{
																									flexDirection: 'row',
																									alignItems: 'center'
																							}}
																					>
																							<View
																									style={{
																											flex: 1,
																											alignSelf: 'center'
																									}}
																							>
																									<CommonText>
																											Total campaign traveled:
																									</CommonText>
																							</View>

																							<View
																									style={{
																											flex: 1,
																											alignSelf: 'center'
																									}}
																							>
																									<LabelText>
																											{this.state.totalCampaignDistance}km
																									</LabelText>
																							</View>
																					</View>
																			</View>
																	</View>
															)}
													</View>

													<TouchableOpacity
															activeOpacity={0.8}
															style={{
																	paddingHorizontal: 30,
																	paddingVertical: 10,
																	backgroundColor: theme.COLOR_BLUE,
																	borderRadius: 15,
																	marginBottom: 20,
																	alignSelf: 'center'
															}}
															onPress={this.closeModal}
													>
															<CommonText color="white">Close</CommonText>
													</TouchableOpacity>
											</View>
									</ScrollView>
							</View>
					</Modal>
			);
	}
}