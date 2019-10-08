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
import { numberWithCommas } from '../config/functions';

class CampaignPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			height: Dimensions.get('window').height,
			width: Dimensions.get('window').width,
			vehicleType: Object.values(VEHICLE.TYPE),
			loader: false
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
			this.props.interestedCampaign();
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
												<LabelText>{this.props.campaign.slots_used}</LabelText>
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
											<CommonText>Additional</CommonText>
											<View style={{width: 5}}></View>
											<LabelText>P{numberWithCommas(this.props.campaign.pay_additional)}</LabelText>
											<View style={{width: 5}}></View>
											<CommonText>every</CommonText>
											<View style={{width: 5}}></View>
											<LabelText>{this.props.campaign.pay_additional_km}km</LabelText>
										</View>

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
											<CommonText>Basic Pay</CommonText>
											<View style={{width: 5}}></View>
											<LabelText>P{numberWithCommas(this.props.campaign.pay_basic)}</LabelText>
											<View style={{width: 5}}></View>
											<CommonText>for</CommonText>
											<View style={{width: 5}}></View>
											<LabelText>{this.props.campaign.pay_basic_km}km</LabelText>
										</View>
									</View>

									<View
										style={{
											marginVertical: 10,
											paddingHorizontal: 20
										}}
									>
										<Image
											style={{
												width: '100%',
												height: this.state.height / 5
											}}
											resizeMode="contain"
											source={require('../assets/image/car_sticker_placement_front.png')}
										/>
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
	user: state.userReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
  interestedCampaign: () => dispatch(CampaignAction.interested()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignPage);
