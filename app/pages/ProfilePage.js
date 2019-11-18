import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
		Dimensions,
    ActivityIndicator
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Carousel from 'react-native-snap-carousel';
import DropdownAlert from 'react-native-dropdownalert';

import { CampaignAction } from '../redux/actions/campaign.action';
import Page from './Page';
import { URL } from '../config/variables';
import { USER } from '../redux/actions/types.action';
import UserInfo from '../components/UserInfo';
import { LabelText, CommonText } from '../components/Text';
import ButtonBlue from '../components/ButtonBlue';
import {
    Card,
    CardBody,
    CardColumnContent,
    CardColumnContentBody
} from '../components/Card';
import NavigationService from '../services/navigation';
import {
	getTotalEarnings,
	numberWithCommas,
	timeStampNumeric
} from '../config/functions';

import BankDetails from '../components/Modal/profile/BankDetails';
import Withdraws from '../components/Modal/profile/Withdraws';
import HistoryFilter from '../components/Modal/profile/HistoryFilter';
import VehicleFilter from '../components/Modal/profile/VehicleFilter';

import { UserController } from '../controllers/UserController';

import theme from '../styles/theme.style';
import styles from '../styles/page.Home.style';

class ProfilePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loader: true,
			user: [],

			// navigation menu
			width: Dimensions.get('window').width,
			height: Dimensions.get('window').height,

			// history data
			historyData: [],
			historyDataLength: 3,
			historyModal: false,

			// vehicle data
			vehicleData: [],
			vehicleModal: false,
			vehicleCampaignColor: [
				theme.COLOR_YELLOW,
				theme.COLOR_GREEN,
				theme.COLOR_RED
			],

			// vehicle card height
			vehicleCardSize: [],
			
			//earnings
			totalEarnings: 0,
			bankDetailsModal: false,
			withdrawsModal: false,
		};
	}

	init = () => {
		const alert = this.props.navigation.getParam('alert', null);
		if(alert) {
			this.successFlashMessage(alert.message, alert.description);
		}

		var { user,
			myList } = this.props,
			loader = false,
			vehicleData = this.getVehicles(),
			earnings = myList.map(m => {
				return parseFloat(getTotalEarnings(m));
			}),
			totalEarnings = earnings.length === 0 ? 0 : earnings.reduce((a, b) => a + b),
			historyData = this.getHistoryData();
		
		this.setState({
			vehicleData,
			user,
			loader,
			totalEarnings,
			historyData
		});
	}

	getVehicles = () => {
		var { user, myList } = this.props,
			{ vehicles } = user,
			vehicleData = vehicles.map(v => {
				const campaignData = myList.find(x => x.user_vehicle_id === v.id && x.end === 0 && x.request_status !== 2);
				return {
					carType: v.type,
					carSize: v.vehicle.classification,
					model: v.vehicle.model,
					year: v.vehicle.year,
					manufacturer: v.vehicle.manufacturer,
					campaign: campaignData ? {
						name: campaignData.campaignDetails.name,
						request_status: campaignData.request_status
					} : false,
					vehicleImages: v.photo.map(vp => {
						return {uri: `${URL.SERVER_MEDIA}/${vp.url}`}
					})
				};
			});
		return vehicleData;
	}

	getHistoryData = () => {
		var { myList } = this.props,
			historyData = [];
		
		myList.map(ml => {
			const campaignName = ml.campaignDetails.name;
			ml.payments.map(p => {
				if(p.status === 1) {
					historyData.push({
						name: campaignName,
						amount: p.amount,
						created_at: p.created_at
					});
				}
			});
		});

		return historyData;
	}

	getCardSize = (x, y, width, height, index) => {
		var vehicleCardSize = this.state.vehicleCardSize,
			vehicleDataImageLength = this.state.vehicleData[index].vehicleImages.length,
			vehicleCardSizePush = {
				height: height,
				width: width,
				active: [true].concat(vehicleDataImageLength - 1 > 0 ? Array(vehicleDataImageLength - 1).fill(false) : [])
			};

		vehicleCardSize[index] = vehicleCardSizePush;
		this.setState({ vehicleCardSize: vehicleCardSize });
	}

	_currentActiveVehicleImage = (index) => (slideIndex) => {
		var vehicleCardSize = this.state.vehicleCardSize;
		vehicleCardSize[index].active = Array(vehicleCardSize[index].active).fill(false);
		vehicleCardSize[index].active[slideIndex] = true;
		this.setState({ vehicleCardSize: vehicleCardSize });
	}

	_renderVehicleImage = (idx) => ({ item }) => (
		<Image
			style={{
				width: this.state.vehicleCardSize[idx].width,
				height: this.state.vehicleCardSize[idx].height,
				backgroundColor: theme.COLOR_GRAY_BUTTON
			}}
			source={item}
		/>
	);

	withdrawButtonOnPress = () => {
		if(!this.props.user.account_number) {
			this.modalToggle.bankDetails();
		} else {
			this.modalToggle.withdraws();
		}
	}

	getUserProfile = () => {
		UserController.request.profile()
		.then(res => {
			this.props.dispatchUpdateProfile(res.data);
			this.modalToggle.bankDetails();
			this.successFlashMessage(
				'Saving success!',
				'Bank details successfully saved'
			);
		})
		.catch(error => {
			this.props.errorUpdateProfile();
			console.log(error);
			this.modalToggle.bankDetails();
			this.failedFlashMessage(
				'Error saving account number!',
				'We apologize for the inconvenience,\nplease try again later'
			);
		});
	}

	historyDataViewMore = () => {
		if(this.state.historyDataLength < this.state.historyData.length) {
			this.setState({ historyDataLength: this.state.historyDataLength + 3 });
		}
	}

	modalToggle = {
		bankDetails: () => {
			this.setState({ bankDetailsModal: !this.state.bankDetailsModal });
		},
		withdraws: () => {
			this.setState({ withdrawsModal: !this.state.withdrawsModal });
		},
		history: () => {
			this.setState({ historyModal: !this.state.historyModal });
		},
		vehicles: () => {
			this.setState({ vehicleModal: !this.state.vehicleModal });
		}
	}

	modalFilter = {
		history: (data, callback) => {
			var historyData = this.getHistoryData(),
			historyDataLength = 3;

			if(data.search !== '') {
				historyData = historyData.filter(h => {
					if(h.name.toLowerCase().includes(data.search.toLowerCase())
						|| h.amount.toLowerCase().includes(data.search.toLowerCase())
						|| h.created_at.toLowerCase().includes(data.search.toLowerCase())) {
							return true;
					}
					return false;
				});
			}

			switch (data.sort) {
				case 'placement':
					historyData.sort((a, b) => {
						var textA = a.name.toUpperCase(),
							textB = b.name.toUpperCase();

						if(data.type === 'asc') {
							return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
						} else {
							return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
						}
					});
					break;

				case 'date':
					historyData.sort((a, b) => {
						var dateA = new Date(a.created_at),
							dateB = new Date(b.created_at);

						if(data.type === 'asc') {
							return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
						} else {
							return dateA < dateB ? 1 : dateA > dateB ? -1 : 0;
						}
					});
					break;

				case 'earnings':
					historyData.sort((a, b) => {
						var earningA = parseFloat(a.amount),
							earningB = parseFloat(b.amount);

						if(data.type === 'asc') {
							return (earningA < earningB) ? -1 : (earningA > earningB) ? 1 : 0;
						} else {
							return (earningA > earningB) ? -1 : (earningA < earningB) ? 1 : 0;
						}
					});
					break;
			}

			this.setState({ historyData, historyDataLength });
			callback();
		},
		vehicles: (data, callback) => {
			var vehicleData = this.getVehicles();

			if(data.search !== '') {
				vehicleData = vehicleData.filter(v => {
					if(v.model.toLowerCase().includes(data.search.toLowerCase())) {
							return true;
					}
					return false;
				});
			}

			switch (data.sort) {
				case 'model':
						vehicleData.sort((a, b) => {
						var textA = a.model.toUpperCase(),
							textB = b.model.toUpperCase();

						return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
					});
					break;
				
				case 'type':
					vehicleData.sort((a, b) => {
						var typeA = parseInt(a.carType),
							typeB = parseInt(b.carType);

						return typeA < typeB ? 1 : typeA > typeB ? -1 : 0;
					});
					break;

				case 'class':
					vehicleData.sort((a, b) => {
						var classA = parseInt(a.carSize),
							classB = parseInt(b.carSize);

						return (classA < classB) ? -1 : (classA > classB) ? 1 : 0;
					});
					break;
			}

			this.setState({ vehicleData });
			callback();
		}
	}

	successFlashMessage = (message, description) => {
		this.dropDownMainAlertRef.alertWithType(
			'success',
			message,
			description
		);
	}

	failedFlashMessage = (message, description) => {
		this.dropDownMainAlertRef.alertWithType(
			'error',
			message,
			description
		);
	}

	render() {
		return (
			<Page>
				<NavigationEvents
					onDidFocus={this.init}
					onWillFocus={() => this.setState({loader: true})}
				/>

				<BankDetails
					modalVisible={this.state.bankDetailsModal}
					modalToggle={this.modalToggle.bankDetails}
					accountNumber={this.props.user.account_number}
					getUserProfile={this.getUserProfile}
				/>

				<Withdraws
					modalVisible={this.state.withdrawsModal}
					modalToggle={this.modalToggle.withdraws}
					campaigns={this.props.myList}
					dispatchUpdateMyList={this.props.dispatchMyList}
				/>

				<HistoryFilter
					modalVisible={this.state.historyModal}
					modalToggle={this.modalToggle.history}
					search={this.modalFilter.history}
				/>

				<VehicleFilter
					modalVisible={this.state.vehicleModal}
					modalToggle={this.modalToggle.vehicles}
					search={this.modalFilter.vehicles}
				/>

				<ScrollView
					style={styles.homePageScrollView}
					overScrollMode='never'
					showsVerticalScrollIndicator={false}
					scrollEnabled={this.state.scrollEnable}
				>
					<UserInfo />

					{/* profile info button */}
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: 5
						}}
					>
						<TouchableOpacity
							onPress={e => NavigationService.navigate('ProfileInfo')}
						>
							<Text style={styles.homePageViewAll}>
								View Profile Info
							</Text>
						</TouchableOpacity>
					</View>

					{/* earnings */}
					<View
						style={{
							marginVertical: 20,
							marginHorizontal: theme.PAGE_PADDING_HORIZONTAL
						}}
					>
						<Card>
							<CardBody
								header={true}
								footer={true}
							>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center'
									}}
								>
									<LabelText>Earnings</LabelText>

									<TouchableOpacity
										onPress={this.modalToggle.bankDetails}
										disabled={this.state.loader}
									>
										<Text style={styles.homePageViewAll}>
											Edit Bank Details
										</Text>
									</TouchableOpacity>
								</View>

								<View
									style={{
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'center'
									}}
								>
									{this.state.loader ? (
										<ActivityIndicator color="#000" style={{ height: 75 }} />
									) : (
										<View>
											<View
												style={{
													marginTop: 15
												}}
											>
												<Text
													style={{
														color: theme.COLOR_NORMAL_FONT,
														fontSize: this.state.width / 8,
														fontFamily: 'Montserrat-Bold'
													}}
												>
													P{numberWithCommas(this.state.totalEarnings)}
												</Text>
											</View>

											<View
												style={{
													marginTop: 15,
													marginBottom: 5,
													alignSelf: 'center'
												}}
											>
												<ButtonBlue
													label="Withdraw"
													onPress={this.withdrawButtonOnPress}
												/>
											</View>
										</View>
									)}
								</View>
							</CardBody>
						</Card>
					</View>

					{/* history */}
					<View
						style={{
							marginVertical: 20,
							marginHorizontal: theme.PAGE_PADDING_HORIZONTAL
						}}
					>
						{/* labels */}
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}
						>
							<LabelText color="white">History</LabelText>

							<TouchableOpacity
								onPress={this.modalToggle.history}
							>
								<Text style={styles.homePageViewAll}>
									Filter
								</Text>
							</TouchableOpacity>
						</View>

						{/* content */}
						<View
							style={{
								marginTop: 10
							}}
						>
							<Card>
								<CardBody divider header>
									<View
										style={{
											flexDirection: 'row',
											alignItems: 'center'
										}}
									>
										<View
											style={{
												flex: 1
											}}
										>
											<LabelText>Placements</LabelText>
										</View>

										<View
											style={{
												width: this.state.width / 4.5,
												justifyContent: 'flex-end',
												alignItems: 'flex-end'
											}}
										>
											<LabelText>Date</LabelText>
										</View>

										<View
											style={{
												width: this.state.width / 4,
												justifyContent: 'flex-end',
												alignItems: 'flex-end',
											}}
										>
											<LabelText>Earnings</LabelText>
										</View>
									</View>
								</CardBody>

								<CardBody footer>
									{this.state.loader ? (
										<ActivityIndicator color="#000" style={{ height: 75 }} />
									) : (
										<View>
											{this.state.historyData.length !== 0 ?
												this.state.historyData.map((hd, hdIdx) =>
													hdIdx < this.state.historyDataLength ?
														<View
															key={hdIdx}
															style={[
																{
																	flexDirection: 'row',
																	alignItems: 'center'
																},
																(
																	hdIdx == 0
																	? { marginBottom: 5 }
																	: (
																		hdIdx == (this.state.historyData.length - 1)
																		? { marginTop: 5 }
																		: { marginVertical: 5 }
																	)
																)
															]}
														>
															<View
																style={{
																	flex: 1
																}}
															>
																<CommonText numberOfLines={1}>{hd.name}</CommonText>
															</View>

															<View
																style={{
																	width: this.state.width / 4.5,
																	justifyContent: 'flex-end',
																	alignItems: 'flex-end'
																}}
															>
																<CommonText>{timeStampNumeric(hd.created_at)}</CommonText>
															</View>

															<View
																style={{
																	width: this.state.width / 4,
																	justifyContent: 'flex-end',
																	alignItems: 'flex-end',
																}}
															>
																<CommonText>P{numberWithCommas(hd.amount)}</CommonText>
															</View>
														</View>
													: null
												)
												: (
													<View
														style={{
															alignSelf: 'center',
															marginVertical: 10
														}}
													>
														<CommonText>-- no transaction history --</CommonText>
													</View>
												)
											}

											{this.state.historyDataLength < this.state.historyData.length ? (
												<TouchableOpacity
													style={{
														alignSelf: 'center',
														marginTop: 10
													}}
													onPress={this.historyDataViewMore}
												>
													<CommonText color="pink">view more</CommonText>
												</TouchableOpacity>
											) : null}
										</View>
									)}
								</CardBody>
							</Card>
						</View>
					</View>

					{/* vehicles */}
					<View
						style={{
							marginTop: 20,
							marginBottom: 40,
							marginHorizontal: theme.PAGE_PADDING_HORIZONTAL
						}}
					>
						{/* labels */}
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginBottom: 3
							}}
						>
							<LabelText color="white">Listed Vehicles</LabelText>

							<View
								style={{
									flexDirection: 'row'
								}}
							>
								<TouchableOpacity
									onPress={e => NavigationService.navigate('Addvehicle')}
								>
									<Text
										style={[
											styles.homePageViewAll,
											{ paddingRight: 5 }
										]}
									>
										Add Vehicle
									</Text>
								</TouchableOpacity>

								<Text style={styles.homePageViewAll}>|</Text>

								<TouchableOpacity
									onPress={this.modalToggle.vehicles}
								>
									<Text
										style={[
											styles.homePageViewAll,
											{ paddingLeft: 5 }
										]}
									>
										Filter
									</Text>
								</TouchableOpacity>
							</View>
						</View>

						{/* content */}
						{this.state.loader ? (
							<ActivityIndicator color="#000" style={{ height: 75 }} />
						) : this.state.vehicleData.length !== 0
							? this.state.vehicleData.map((vehicle, index) =>
								<View
									key={index}
									style={{
										marginVertical: 7
									}}
								>
									<Card
										justifyContent={true}
									>
										<CardColumnContent
											firstChild={true}
											backgroundColor={vehicle.vehicleImages.length !== 0 ? theme.COLOR_GRAY_HEAVY + '00' : theme.COLOR_GRAY_HEAVY}
											getCardSize={this.getCardSize}
											cardIndex={index}
										>
											<View
												style={{
													flexDirection: 'row'
												}}
											>
												{
													this.state.vehicleCardSize[index]
													? (
														vehicle.vehicleImages.length !== 0
														? <View
															style={{
																borderBottomLeftRadius: 15,
																borderTopLeftRadius: 15,
																overflow: 'hidden',
																backgroundColor: theme.COLOR_GRAY_BUTTON
															}}
														>
															<Carousel
																data={vehicle.vehicleImages}
																renderItem={this._renderVehicleImage(index)}
																layout={'default'}
																inactiveSlideScale={1}
																inactiveSlideOpacity={1}
																sliderWidth={this.state.vehicleCardSize[index].width}
																itemHeight={this.state.vehicleCardSize[index].height}
																itemWidth={this.state.vehicleCardSize[index].width}
																onBeforeSnapToItem={this._currentActiveVehicleImage(index)}
															/>

															{/* carousel */}
															<View
																	style={{
																			justifyContent: 'center',
																			alignItems: 'center'
																	}}
															>
																<View
																		style={{
																				position: 'absolute',
																				top: -20
																		}}
																>
																	<View
																			style={{
																					flexDirection: 'row',
																			}}
																	>
																		{vehicle.vehicleImages.map((vi, viIdx) =>
																			<View
																				key={viIdx}
																				style={{
																					backgroundColor: this.state.vehicleCardSize[index].active[viIdx] ? theme.COLOR_BLUE : theme.COLOR_WHITE,
																					elevation: 5,
																					height: 10,
																					width: 10,
																					borderRadius: 5,
																					marginHorizontal: 3.5
																				}}
																			></View>
																		)}
																	</View>
																</View>
															</View>
														</View>
														: <Image
															style={{
																width: this.state.width / 5,
																height: this.state.width / 5,
															}}
															resizeMode='contain'
															source={require('../assets/image/icons/gallery-icon.png')}
														/>
													)
													: <Image
														style={{
															width: this.state.width / 5,
															height: this.state.width / 5,
														}}
														resizeMode='contain'
														source={require('../assets/image/icons/gallery-icon.png')}
													/>
												}
											</View>
										</CardColumnContent>

										<CardColumnContent
											lastChild={true}
											carType={vehicle.carType}
											carSize={vehicle.carSize}
										>
											<CardColumnContentBody>
												<View
													style={{
														alignItems: 'flex-end'
													}}
												>
													<Text
														style={{
															fontSize: 14,
															fontFamily: 'Montserrat-Bold',
															color: theme.COLOR_NORMAL_FONT,
														}}
														numberOfLines={1}
													>{vehicle.manufacturer}</Text>
												</View>

												<View
													style={{
														marginVertical: 7,
														backgroundColor: theme.COLOR_LIGHT_BLUE,
														height: 2
													}}
												></View>

												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'flex-start',
														alignItems: 'flex-start'
													}}
												>
													<View style={{width: 80}}>
														<Text
															style={{
																fontSize: 12,
																fontFamily: 'Montserrat-Regular',
																color: theme.COLOR_NORMAL_FONT
															}}
														>
															Model
														</Text>
													</View>

													<View style={{flex: 1, alignItems: 'flex-end'}}>
														<Text
															style={{
																fontSize: 12,
																fontFamily: 'Montserrat-Bold',
																color: theme.COLOR_NORMAL_FONT,
															}}
															numberOfLines={1}
														>
															{vehicle.model}
														</Text>
													</View>
												</View>

												<View
													style={{
														flexDirection: 'row',
														alignItems: 'center'
													}}
												>
													<View style={{width: 80}}>
														<Text
															style={{
																fontSize: 12,
																fontFamily: 'Montserrat-Regular',
																color: theme.COLOR_NORMAL_FONT
															}}
															numberOfLines={1}
														>
															Year
														</Text>
													</View>

													<View style={{flex: 1, alignItems: 'flex-end'}}>
														<Text
															style={{
																fontSize: 12,
																fontFamily: 'Montserrat-Bold',
																color: theme.COLOR_NORMAL_FONT,
															}}
														>
															{vehicle.year}
														</Text>
													</View>
												</View>
												
												{/* campaign */}
												<View
													style={{
														flexDirection: 'row',
														alignItems: 'center'
													}}
												>
													<View style={{width: 80}}>
														<Text
															style={{
																fontSize: 12,
																fontFamily: 'Montserrat-Regular',
																color: theme.COLOR_NORMAL_FONT
															}}
															numberOfLines={1}
														>
															Campaign
														</Text>
													</View>

													<View style={{flex: 1, alignItems: 'flex-end'}}>
														<Text
															style={{
																fontSize: 12,
																fontFamily: 'Montserrat-Bold',
																color: vehicle.campaign
																	? this.state.vehicleCampaignColor[vehicle.campaign.request_status]
																	: this.state.vehicleCampaignColor[2],
															}}
															numberOfLines={1}
														>
															{vehicle.campaign ? vehicle.campaign.name : 'none'}
														</Text>
													</View>
												</View>
											</CardColumnContentBody>
										</CardColumnContent>
									</Card>
								</View>
							) : (
								<View
									style={{
										alignItems: 'center',
										justifyContent: 'center',
										paddingTop: 20
									}}
								>
									<CommonText color="white">-- No vehicle listed --</CommonText>
								</View>
							)
						}
					</View>
				</ScrollView>

				<DropdownAlert ref={ref => this.dropDownMainAlertRef = ref} />
			</Page>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.userReducer.user,
	myList: state.campaignReducer.mylist
});

const mapDispatchToProps = (dispatch) => ({
	dispatchUpdateProfile: (user) => dispatch({ type: USER.GET.PROFILE.SUCCESS, user }),
	errorUpdateProfile: () => dispatch({ type: USER.GET.PROFILE.FAILED }),
  dispatchMyList: () => dispatch(CampaignAction.mylist())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
