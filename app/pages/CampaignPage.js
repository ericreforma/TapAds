import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Image,
    ScrollView,
    Dimensions,
    Text
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import UserInfo from '../components/UserInfo';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from '../components/Card';
import { LabelText, CommonText } from '../components/Text';
import { VehicleType } from '../components/VehicleType';
import ButtonBlue from '../components/ButtonBlue';
import Page from './Page';
import { VEHICLE } from '../config/variables';
import theme from '../styles/theme.style';
import styles from '../styles/page.Home.style';
import { CampaignAction } from '../redux/actions/campaign.action';
import { numberWithCommas, getDate, totalKmDistance, earnUpTo } from '../config/functions';
import NavigationService from '../services/navigation';

import PopupMessage from '../components/Modal/popup';
import ChooseVehicleModal from '../components/Modal/ChooseVehicleModal';

const STICKER_AREA = Object.values(VEHICLE.STICKER_AREA);

class CampaignPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			height: Dimensions.get('window').height,
			width: Dimensions.get('window').width,
			vehicleType: Object.values(VEHICLE.TYPE),
			loader: false,

			popupModal: {
				visible: false,
				message: '',
				description: ''
			},

			chooseVehicleModal: {
				visible: false
			}
		};
	}

	interestedButton = () => {
		this.setState({loader: true});
		const { user } = this.props;
		var noVehicles = false,
			noLicense = false;
			
		if(user.vehicles.length === 0)
			noVehicles = true;
		if(!user.licenseImage)
			noLicense = true;
			
		if(!noVehicles && !noLicense) {
			this.setState({loader: false});
			this.toggleVehicleModal();
		} else {
			this.setState({loader: false});
			const description = `Please register your${noVehicles ? ' vehicle' : ''}${noVehicles && noLicense ? ' and ' : ' '}${noLicense ? 'license ' : ''}in Profile page in order to proceed. Thank you!`;
			this.dropDownAlertRef.alertWithType(
				'error',
				'Additional info required',
				description
			);
		}
	}

	closePopupModal = () => {
		const { popupModal } = this.state;
		popupModal.visible = false;
		this.setState({popupModal});
		NavigationService.navigate('Home');
	}

	toggleVehicleModal = () => {
		const {chooseVehicleModal} = this.state;
		chooseVehicleModal.visible = !chooseVehicleModal.visible;
		this.setState({chooseVehicleModal});
	}

	vehicleSelect = selectedVehicleId => {
		this.props.interestedCampaign(selectedVehicleId, () => {
			this.toggleVehicleModal();
			
			const { popupModal } = this.state;
			popupModal.visible = true;
			popupModal.message = 'Campaign request sent!';
			popupModal.description = 'You will be notified once the\nrequest status has been updated.\n\nThank you!';
			this.setState({popupModal});
		});
	}

	render() {
		return (
			<Page>
				<PopupMessage
					isVisible={this.state.popupModal.visible}
					message={this.state.popupModal.message}
					description={this.state.popupModal.description}
					closeModal={this.closePopupModal}
				/>

				<ChooseVehicleModal
					isVisible={this.state.chooseVehicleModal.visible}
					closeModal={this.toggleVehicleModal}
					vehicles={this.props.user.vehicles}
					mylist={this.props.mylist}
					campaign={this.props.campaign}
					vehicleSelect={this.vehicleSelect}
				/>

				<ScrollView
					style={styles.homePageScrollView}
					overScrollMode='never'
					showsVerticalScrollIndicator={false}
					scrollEnabled={this.state.scrollEnable}
				>
					<UserInfo />

					<View style={styles.homePageContainer}>
						<View
							style={{
								marginHorizontal: theme.PAGE_PADDING_HORIZONTAL,
								backgroundColor: theme.COLOR_WHITE,
								borderRadius: 15
							}}
						>
							<Card>
								<CardHeader active={true}>
									<LabelText>{this.props.campaign.name}</LabelText>
									<CommonText>{this.props.campaign.client.business_name}</CommonText>
								</CardHeader>

								<CardBody divider={true}>
									<Text
										style={[
											styles.homePageCommonText,
											styles.homePageTextCommonColor,
											{
												lineHeight: 18,
												marginBottom: 10
											}
										]}
									>
										{this.props.campaign.description}
									</Text>
								</CardBody>

								<CardBody>
									<View	style={styles.homePageRecommendedCampaignBody}>
										<View style={styles.homePageRecommendedCampaignFirstCol}>
											<LabelText>{this.props.campaign.location}</LabelText>
											<CommonText>Location</CommonText>
										</View>

										<View style={styles.homePageAlignCenter}>
											<VehicleType
												vehicleType={this.props.campaign.vehicle_classification}
												vehicleColor="black"
											/>

											<CommonText>{this.state.vehicleType[this.props.campaign.vehicle_type].name}</CommonText>
										</View>

										<View style={styles.homePageAlignRight}>
											<View style={{flexDirection: 'row'}}>
												<LabelText>{this.props.campaign.slots - this.props.campaign.slots_used}</LabelText>
												<Text style={styles.homePageOfTextBlack}>of</Text>
												<LabelText>{this.props.campaign.slots}</LabelText>
											</View>

											<CommonText>Slots available</CommonText>
										</View>
									</View>

									<View
										style={{
											marginVertical: 10
										}}
									>
										<InformationCard
											info={[
												{name: 'common', text: 'From'},
												{name: 'label', text: getDate(this.props.campaign.duration_from)},
												{name: 'common', text: 'to'},
												{name: 'label', text: getDate(this.props.campaign.duration_to)},
											]}
										/>

										<InformationCard
											info={[
												{name: 'common', text: 'Earn up to'},
												{name: 'label', text: `P${earnUpTo(this.props.campaign)}`},
												{name: 'common', text: 'for'},
												{name: 'label', text: `${totalKmDistance(this.props.campaign)}km`},
											]}
										/>

										<InformationCard
											info={[
												{name: 'common', text: 'Bonus'},
												{name: 'label', text: `P${numberWithCommas(this.props.campaign.completion_bonus)}`},
												{name: 'common', text: 'for campaign completion'},
											]}
										/>
									</View>

									<View
										style={{
											marginVertical: 10,
											paddingHorizontal: 20
										}}
									>
										<View
											style={{
												marginTop: 10,
												marginBottom: [3,4,6].indexOf(parseInt(this.props.campaign.vehicle_stickerArea)) !== -1 ? 20 : 0,
												alignItems: 'center',
												justifyContent: 'center'
											}}
										>
											<LabelText>{STICKER_AREA[this.props.campaign.vehicle_stickerArea].name}</LabelText>
										</View>

										{this.props.campaign.vehicle_classification === 2 ? (
											<Image
												style={{
													width: '100%',
													height: this.state.height / 5
												}}
												resizeMode="contain"
												source={VEHICLE.STICKER_AREA.motorcycle.image}
											/>
										) : this.props.campaign.vehicle_stickerArea === 1 ? (
												<View>
													<Image
														style={{
															width: '100%',
															height: this.state.height / 5,
														}}
														resizeMode="contain"
														source={STICKER_AREA[this.props.campaign.vehicle_stickerArea].imageLeft}
													/>
													
													<Image
														style={{
															width: '100%',
															height: this.state.height / 5
														}}
														resizeMode="contain"
														source={STICKER_AREA[this.props.campaign.vehicle_stickerArea].imageRight}
													/>
												</View>
											) : (
												<Image
													style={{
														width: '100%',
														height: this.state.height / 5
													}}
													resizeMode="contain"
													source={STICKER_AREA[this.props.campaign.vehicle_stickerArea].image}
												/>
											)
										}
									</View>
								</CardBody>

								<CardFooter active>
									<View
										style={{
											justifyContent: 'center',
											alignItems: 'center',
											paddingHorizontal: 10
										}}
									>
										<ButtonBlue
											label="I'm interested"
											disabled={this.state.loader}
											onPress={this.interestedButton}
										/>
									</View>
								</CardFooter>
							</Card>
						</View>
					</View>
				</ScrollView>
		
				<DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
			</Page>
		);
	}
}

const mapStateToProps = (state) => ({
	campaign: state.campaignReducer.selected,
	mylist: state.campaignReducer.mylist,
	user: state.userReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
  interestedCampaign: (userVehicleId, successCallback) => dispatch(CampaignAction.interested(userVehicleId, successCallback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignPage);

class InformationCard extends Component {
	render() {
		return (
			<View
				style={{
					marginVertical: 10,
					paddingVertical: 15,
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: theme.COLOR_WHITE,
					borderRadius: theme.PAGE_CARD_RADIUS,
					elevation: 3
				}}
			>
				{this.props.info.map((i, index) =>
					<View
						key={index}
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						{i.name === 'common' ? (
							<CommonText>{i.text}</CommonText>
						) : (
							<LabelText>{i.text}</LabelText>
						)}

						{index !== (this.props.info.length - 1) ? (
							<View style={{width: 5}}></View>
						) : null}
					</View>
				)}
			</View>
		);
	}
}
