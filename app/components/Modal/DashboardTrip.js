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
	Marker,
	AnimatedRegion
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
import { IfElse, Then, Else } from '../IfElse';

const animationDuration = 1000;

export default class DashboardTrip extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loader: false,
			coordinates: [],
			pointToPoint: {
				firstPos: new AnimatedRegion({
          latitude: 14.6307252,
          longitude: 121.0436033,
          latitudeDelta: 0.01,
          longitudeDelta: 0.005
        }),
				lastPos: {
					latitude: 14.6307252,
					longitude: 121.0436033,
				}
			},
			currentHeading: 0,
			heading: [],
			tripMap: [],
			tripTimeStamp: {
				start: false,
				end: false,
			},
			totalTime: 0,
			totalDistance: 0,
			totalCampaignDistance: 0,
			animationCount: 0,
			intervalId: 0,
			noTripPresent: false,
			init: false
		};
		console.disableYellowBox = true;
	}

	componentDidUpdate = (prevProps) => {
		if(!this.state.init) {
			if(this.props.modalVisible !== prevProps.modalVisible) {
				this.toggleLoader();
				var { modalData, campaignLocations } = this.props;
				UserController.request.tripInfo(modalData.tripId)
				.then(res => {
					if(res.data.length !== 0) {
						const coor = this.getCoordinates(campaignLocations, res.data);
						
						var totalDistance = 0,
							totalCampaignDistance = 0;
						const pointToPoint = {
							firstPos: new AnimatedRegion({
								latitude: 14.6307252,
								longitude: 121.0436033,
								latitudeDelta: 0.01,
								longitudeDelta: 0.005
							}),
							lastPos: {
								latitude: 14.6307252,
								longitude: 121.0436033,
							}
						};

						const tripMap = res.data.map((trip, index) => {
							const coor = {
								latitude: parseFloat(trip.latitude),
								longitude: parseFloat(trip.longitude),
							};
							
							if(index === 0) {
								pointToPoint.firstPos = new AnimatedRegion({
									latitude: parseFloat(trip.latitude),
									longitude: parseFloat(trip.longitude),
									latitudeDelta: 0.01,
									longitudeDelta: 0.005
								});
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

						const heading = res.data.map(trip => parseFloat(trip.heading));

						const firstTrip = res.data.find((x, idx) => idx === 0);
						const lastTrip = res.data.find((x, idx) => idx === (res.data.length - 1));
						const tripTimeStamp = {
							start: timeStamp(firstTrip ? firstTrip.created_at : false),
							end: timeStamp(lastTrip ? lastTrip.created_at : false)
						};

						const hourDiff = getHourDiff((firstTrip ? firstTrip.created_at : false), (lastTrip ? lastTrip.created_at : false));
						const totalTime = hourDiff ? (`${hourDiff.hours} hrs, ${hourDiff.min} min`) : '--';
								
						this.setState({
							coordinates: coor.coordinates,
							region: coor.region,
							tripMap,
							pointToPoint,
							tripTimeStamp,
							totalTime,
							heading,
							currentHeading: heading[0] ? heading[0] : 0,
							totalDistance: totalDistance.toFixed(2),
							totalCampaignDistance: totalCampaignDistance.toFixed(2),
							init: true
						});

						if(tripMap.length !== 0 && this.props.modalVisible) {
							var intervalId = setInterval(this.movingCar, animationDuration); //(5000 / tripMap.length)
							this.setState({intervalId});
						}

						this.toggleLoader();
					}
				})
				.catch(error => {
					console.log(error);
					this.toggleLoader();
				});
			} else {
				this.setState({ noTripPresent: true, init: true });
			}
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
		var {
			tripMap,
			heading,
			currentHeading,
			animationCount
		} = this.state;

		this.zoomToMe(tripMap[animationCount]);
		this.goAnimate(tripMap[animationCount]);
		currentHeading = heading[animationCount];

		animationCount += 1;
		if(animationCount === tripMap.length)
			animationCount = 0;


		this.setState({
			animationCount,
			currentHeading
		});
	}
  
  goAnimate = newCoordinate => {
    if(Platform.OS === 'android') {
      if(this.markerRef) {
        this.markerRef._component
        .animateMarkerToCoordinate(
          newCoordinate,
          animationDuration
        );
      }
    } else {
      this.state.pointToPoint.firstPos.timing({
        newCoordinate,
        animationDuration
      }).start();
    }
  }

	closeModal = () => {
		clearInterval(this.state.intervalId);
		this.setState({
			pointToPoint: {
				firstPos: new AnimatedRegion({
					latitude: 14.6307252,
					longitude: 121.0436033,
					latitudeDelta: 0.01,
					longitudeDelta: 0.005
				}),
				lastPos: {
					latitude: 14.6307252,
					longitude: 121.0436033,
				}
			},
			animationCount: 0,
			noTripPresent: false
		});
		this.props.toggleModal();
	}

  zoomToMe(coords) {
    const c = {
      latitude: coords.latitude,
      longitude: coords.longitude,
			latitudeDelta: 0.01,
			longitudeDelta: 0.005
    };

    this.mapView.animateToRegion(c, animationDuration);
  }
	
	render() {
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={this.props.modalVisible}
				onRequestClose={this.closeModal}>
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: theme.COLOR_BLACK + '59',
						flex: 1
					}}>
					<ScrollView
						overScrollMode='never'
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							marginVertical: 15,
						}}>
						<View
							style={{
									backgroundColor: theme.COLOR_WHITE,
									width: Dimensions.get('window').width - 50,
									borderRadius: theme.PAGE_CARD_RADIUS,
									overflow: 'hidden'
							}}>
							<IfElse condition={this.state.noTripPresent}>
								<Then>
									<View
										style={{
											justifyContent: 'center',
											alignItems: 'center',
											paddingVertical: 20
										}}>
										<LabelText>
											-- no trips recorded --
										</LabelText>
									</View>
								</Then>

								<Else>
									<View
										style={{
											height: (Dimensions.get('window').height / 2),
										}}>
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
													}} >
													<MapView
														ref={ref => this.mapView = ref}
														style={{
															...StyleSheet.absoluteFillObject
														}}
														initialRegion={this.state.region}
														provider={PROVIDER_GOOGLE} >
														<IfElse condition={this.state.tripMap.length !== 0}>
															<Then>
																{this.state.coordinates.map(polygon =>
																	polygon.map((c, index) =>
																		<Polygon
																			key={index}
																			coordinates={c}
																			fillColor="rgba(255, 17, 44, 0.3)"
																			strokeColor="rgba(255, 17, 44, 0.3)" />
																	)
																)}

																<Polyline
																	coordinates={this.state.tripMap}
																	strokeColor="rgba(38, 96, 255, 0.8)"
																	strokeWidth={6}
																	lineCap="round" />
																
																<Marker.Animated
																	ref={ref => this.markerRef = ref}
																	image={IMAGES.ICONS.car_icon}
																	coordinate={this.state.pointToPoint.firstPos}
																	rotation={this.state.currentHeading}
																	anchor={{x: 0.5, y: 0.5}} />

																<IfElse condition={this.state.pointToPoint.lastPos}>
																	<Then>
																		<Marker
																			image={IMAGES.ICONS.end_trip_icon}
																			coordinate={this.state.pointToPoint.lastPos} />
																	</Then>
																</IfElse>
															</Then>
														</IfElse>
													</MapView>
												</View>
											</View>
										)}
									</View>

									<View
										style={{
											padding: 20
										}}>
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
								</Else>
							</IfElse>

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