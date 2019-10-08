import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	ScrollView,
	Dimensions,
	PermissionsAndroid,
	TouchableOpacity
} from 'react-native';
import Page from '../pages/Page';

import UserInfo from '../components/UserInfo';
import { LabelText, CommonText } from '../components/Text';
import ButtonBlue from '../components/ButtonBlue';

import theme from '../styles/theme.style';
import styles from '../styles/page.Home.style';
import MapCard from '../components/MapCard';
import NavigationService from '../services/navigation';
import { CampaignAction } from '../redux/actions/campaign.action';
import { numberWithCommas } from '../config/functions';

class CampaignCardActive extends Component {
	constructor(props) {
		super(props);

		this.state = {
			height: Dimensions.get('window').height,
			width: Dimensions.get('window').width,
			campaign: {},
		};
	}

	async requestCameraPermission() {
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
				this.props.dispatchTrip()
			} else {

			}
		} catch (err) {
			console.warn(err);
		}
	}

	render() {
		return (
			<Page>
				<ScrollView
					style={styles.homePageScrollView}
					overScrollMode='never'
					showsVerticalScrollIndicator={false}
				>
					<UserInfo />

					<View
						style={{
							padding: theme.PAGE_PADDING_HORIZONTAL,
							paddingTop: 30
						}}
					>
						<View
							style={{
								borderRadius: theme.PAGE_CARD_RADIUS,
								backgroundColor: theme.COLOR_WHITE
							}}
						>
							{/* map portion */}
							<View
								style={{
									height: this.state.width - 50,
									width: '100%',
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								<MapCard location_id={this.props.campaign.campaignDetails.location_id} />
							</View>

							{/* header information */}
							<View
								style={{
									backgroundColor: theme.COLOR_DIRTY_WHITE,
									paddingVertical: 15,
									paddingHorizontal: 30
								}}
							>
								<CommonText	color="blue">Active</CommonText>
								<LabelText>{this.props.campaign.campaignDetails.name}</LabelText>
								<CommonText>{this.props.campaign.client.business_name}</CommonText>
							</View>

							<View
								style={{
									paddingVertical: 15,
									marginHorizontal: 30,
									borderBottomColor: theme.COLOR_GRAY_LIGHT,
									borderBottomWidth: 2
								}}
							>
								<Text
									style={{
										fontSize: theme.FONT_SIZE_SMALL,
										fontFamily: 'Montserrat-Regular',
										color: theme.COLOR_NORMAL_FONT,
										lineHeight: 18,
										paddingBottom: 5
									}}
								>{this.props.campaign.campaignDetails.description}</Text>

								<View
									style={{
										alignSelf: 'flex-start',
										paddingTop: 5
									}}
								>
									<TouchableOpacity
										onPress={
											() => NavigationService.navigate('Dashboard', {campaign_id: this.props.campaign.campaignDetails.id})
										}
									>
										<Text
											style={{
												fontSize: theme.FONT_SIZE_SMALL,
												fontFamily: 'Montserrat-Regular',
												color: theme.COLOR_PINK
											}}
										>view dashboard</Text>
									</TouchableOpacity>
								</View>
							</View>

							<View
								style={{
									paddingVertical: 15,
									marginHorizontal: 30,
								}}
							>
								<View
									style={{
										flexDirection: 'row',
										paddingBottom: 5
									}}
								>
									<View
										style={{
											flex: 1,
											justifyContent: 'flex-start',
											alignItems: 'flex-start'
										}}
									>
										<LabelText large={true}>{this.props.campaign.campaign_traveled}km</LabelText>
										<CommonText>km travelled counter</CommonText>
									</View>

									<View
										style={{
											flex: 1,
											justifyContent: 'flex-end',
											alignItems: 'flex-end'
										}}
									>
										<LabelText large={true}>{this.props.campaign.campaignDetails.location}</LabelText>
										<CommonText>Frequent Location</CommonText>
									</View>
								</View>
							</View>

							<View
								style={{
									backgroundColor: theme.COLOR_GRAY_HEAVY,
									paddingVertical: 15,
									paddingHorizontal: 30,
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
									borderBottomLeftRadius: theme.PAGE_CARD_RADIUS,
									borderBottomRightRadius: theme.PAGE_CARD_RADIUS,
								}}
							>
								<View
									style={{
										flex: 1,
										justifyContent: 'flex-start',
										alignItems: 'flex-start'
									}}
								>
									<LabelText color="white">
											P{numberWithCommas(this.props.campaign.campaignDetails.pay_basic)}
									</LabelText>

									<CommonText color="white">Basic Pay</CommonText>
								</View>

								<View
									style={{
										flex: 1,
										justifyContent: 'flex-end',
										alignItems: 'flex-end'
									}}
								>
									<ButtonBlue
										label="Start Trip"
										onPress={() => { this.requestCameraPermission() } }
									/>
								</View>
							</View>
						</View>
					</View>
				</ScrollView>
			</Page>
		);
	}
}

const mapStateToProps = (state) => ({
  campaign: state.campaignReducer.mylist_selected
});

const mapDispatchToProps = dispatch => ({
  dispatchTrip: () => dispatch(CampaignAction.startTrip())
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignCardActive);
