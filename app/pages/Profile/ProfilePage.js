import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
    View,
    Image,
    TouchableOpacity,
		Dimensions,
		RefreshControl,
    ActivityIndicator
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Carousel from 'react-native-snap-carousel';
import DropdownAlert from 'react-native-dropdownalert';
import { RFValue } from "react-native-responsive-fontsize";

import { CampaignAction } from '../../redux/actions/campaign.action';
import PageLayout from '../../components/PageLayout';
import PageContainer from '../../components/PageContainer';
import { URL } from '../../config/variables';
import { USER } from '../../redux/actions/types.action';
import { LabelText, CommonText } from '../../components/Text';
import {
    Card,
    CardBody,
    CardColumnContent,
    CardColumnContentBody
} from '../../components/Card';
import NavigationService from '../../services/navigation';
import {
	getTotalEarnings,
	numberWithCommas,
	timeStampNumeric
} from '../../config/functions';

import BankDetails from '../../components/Modal/profile/BankDetails';
import Withdraws from '../../components/Modal/profile/Withdraws';
import HistoryFilter from '../../components/Modal/profile/HistoryFilter';
import VehicleContainer from './VehicleContainer';

import { UserController } from '../../controllers/UserController';

import theme from '../../styles/theme.style';
import styles from '../../styles/page.Profile.style';
import { IfElse, Then, Else } from '../../components/IfElse';

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

			// vehicle card height
			vehicleCardSize: [],
			
			//earnings
			totalEarnings: 0,
			bankDetailsModal: false,
			withdrawsModal: false,
			
			refreshing: false,
		};
	}

	init = () => {
		const alert = this.props.navigation.getParam('alert', null);
		if(alert)
			this.successFlashMessage(alert.message, alert.description);

		var { user,
			myList } = this.props,
			loader = false,
			earnings = myList.map(m => {
				return parseFloat(getTotalEarnings(m));
			}),
			totalEarnings = earnings.length === 0 ? 0 : earnings.reduce((a, b) => a + b),
			historyData = this.getHistoryData();
		
		this.setState({
			user,
			loader,
			totalEarnings,
			historyData
		});
	}

	updateUserProfile = () => {
		this.setState({refreshing: true});
		UserController.request.profile()
		.then(res => {
			this.props.dispatchUpdateProfile(res.data);
			this.setState({refreshing: false});
		})
		.catch(error => {
			console.log(error);
			console.log(error.response);
			this.setState({refreshing: false});
		});
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
		var {vehicles} = this.props.user,
			vehicleDataImageLength = vehicles[index].photo.length,
			vehicleCardSizePush = {
				height: height,
				width: width,
				active: [true].concat(
					vehicleDataImageLength - 1 > 0
					? Array(vehicleDataImageLength - 1).fill(false)
					: []
				)
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

	_renderVehicleImage = (idx) => ({ item }) => {
		return (
			<Image
				style={{
					width: this.state.vehicleCardSize[idx].width,
					height: this.state.vehicleCardSize[idx].height,
					backgroundColor: theme.COLOR_GRAY_BUTTON
				}}
				source={item}
			/>
		);
	}

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
				'Error saving Gcash number!',
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
			<PageLayout>
				<NavigationEvents
					onDidFocus={this.init}
					onWillFocus={() => this.setState({loader: true})} />

				<BankDetails
					modalVisible={this.state.bankDetailsModal}
					modalToggle={this.modalToggle.bankDetails}
					accountNumber={this.props.user.account_number}
					getUserProfile={this.getUserProfile} />

				<Withdraws
					modalVisible={this.state.withdrawsModal}
					modalToggle={this.modalToggle.withdraws}
					campaigns={this.props.myList}
					dispatchUpdateMyList={this.props.dispatchMyList} />

				<HistoryFilter
					modalVisible={this.state.historyModal}
					modalToggle={this.modalToggle.history}
					search={this.modalFilter.history} />

				<PageContainer
					style={styles.scrollView}
					showsVerticalScrollIndicator={false}
					scrollEnabled={this.state.scrollEnable}
					refreshControl={
						<RefreshControl
							tintColor={theme.COLOR_GRAY_LIGHT}
							refreshing={this.state.refreshing}
							onRefresh={this.updateUserProfile}
						/>
					}>
					{/* profile info button */}
					<View style={styles.viewProfileButtonContainer}>
						<TouchableOpacity onPress={e => NavigationService.navigate('ProfileInfo')}>
							<Text style={styles.pinkButton}>
								View Profile Info
							</Text>
						</TouchableOpacity>
					</View>

					{/* earnings */}
					<View style={styles.cardContainer}>
						<Card>
							<CardBody
								header={true}
								footer={true}>
								<View style={styles.cardHeaderContainer}>
									<LabelText>Earnings</LabelText>

									<TouchableOpacity
										onPress={this.modalToggle.bankDetails}
										disabled={this.state.loader}>
										<Text style={styles.pinkButton}>
											Edit Gcash Details
										</Text>
									</TouchableOpacity>
								</View>

								<View style={styles.cardBodyContainer}>
									<IfElse condition={this.state.loader}>
										<Then>
											<ActivityIndicator color="#000" style={{ height: 75 }} />
										</Then>

										<Else>
											<View style={styles.earningWrapper}>
												<Text style={styles.earningText}>
													P{numberWithCommas(this.state.totalEarnings)}
												</Text>
											</View>
										</Else>
									</IfElse>
								</View>
							</CardBody>
						</Card>
					</View>

					{/* history */}
					<View style={styles.cardContainer}>
						{/* labels */}
						<View style={styles.cardHeaderContainer}>
							<LabelText color="white">History</LabelText>

							<TouchableOpacity onPress={this.modalToggle.history}>
								<Text style={styles.pinkButton}>
									Filter
								</Text>
							</TouchableOpacity>
						</View>

						{/* content */}
						<View style={styles.historyContainer}>
							<Card>
								<CardBody divider header>
									<View style={styles.historyCardContainer}>
										<View style={styles.contentFlex}>
											<LabelText>Placements</LabelText>
										</View>

										<View style={styles.historyDateContainer}>
											<LabelText>Date</LabelText>
										</View>

										<View style={styles.historyEarningsContainer}>
											<LabelText>Earnings</LabelText>
										</View>
									</View>
								</CardBody>

								<CardBody footer>
									<IfElse condition={this.state.loader}>
										<Then>
											<ActivityIndicator color="#000" style={{ height: 75 }} />
										</Then>

										<Else>
											<View>
												<IfElse condition={this.state.historyData.length !== 0}>
													<Then>
														{this.state.historyData.map((hd, hdIdx) =>
															<IfElse key={hdIdx} condition={hdIdx < this.state.historyDataLength}>
																<Then>
																	<View
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
																</Then>
															</IfElse>
														)}
													</Then>

													<Else>
														<View
															style={{
																alignSelf: 'center',
																marginVertical: 10
															}}>
															<CommonText>-- no transaction history --</CommonText>
														</View>
													</Else>
												</IfElse>

												<IfElse condition={this.state.historyDataLength < this.state.historyData.length}>
													<Then>
														<TouchableOpacity
															style={{
																alignSelf: 'center',
																marginTop: 10
															}}
															onPress={this.historyDataViewMore}>
															<CommonText color="pink">view more</CommonText>
														</TouchableOpacity>
													</Then>
												</IfElse>
											</View>
										</Else>
									</IfElse>
								</CardBody>
							</Card>
						</View>
					</View>

					{/* vehicles */}
					<VehicleContainer
						user={this.props.user}
						loader={this.state.loader}
						update={this.updateUserProfile} />
				</PageContainer>

				<DropdownAlert ref={ref => this.dropDownMainAlertRef = ref} />
			</PageLayout>
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
