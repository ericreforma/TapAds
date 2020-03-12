import React from 'react';
import { connect } from 'react-redux';
import {
	PermissionsAndroid
} from 'react-native';

import { LabelText, CommonText } from '../../../components/Text';
import ButtonBlue from '../../../components/ButtonBlue';

import styles from '../../../styles/page.Home.style';
import MapCard from '../../../components/MapCard';
import NavigationService from '../../../services/navigation';
import { CampaignAction } from '../../../redux/actions/campaign.action';
import { numberWithCommas, earnUpTo } from '../../../config/functions';
import PageLayout from '../../../components/PageLayout';
import PageContainer from '../../../components/PageContainer';
import { 
	CampaignDetailContainer,
	CDMapWrapper,
	CDHeaderWrapper,
	CDTopBodyWrapper,
	CDDivider,
	CDDescriptionLabel,
	CDDashboardButton,
	CDDashboardLabel,
	CDBottomBodyWrapper,
	CDRowLeftFlex,
	CDRowRightFlex,
	CDFooterWrapper,
	CDVehicleInfoWrapper,
	CDVehicleImage,
	CDRowCenterFlex
} from './CampaignDetailsStyledComponents';
import theme from '../../../styles/theme.style';
import { VEHICLE } from '../../../config/variables';

const vehicleType = id => Object.values(VEHICLE.TYPE).find(t => t.id === id);
const vehicleClass = id => Object.values(VEHICLE.CLASS).find(c => c.id === id);
const statusColor = [theme.COLOR_YELLOW, 'blue', theme.COLOR_RED];
const status = ['PENDING', 'ACTIVE', 'REJECTED'];

const CampaignCardActive = props => {
	const requestCameraPermission = async() => {
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
				props.dispatchTrip()
			} else {

			}
		} catch (err) {
			console.warn(err);
		}
	}

	return (
		<PageLayout>
			<PageContainer
				style={styles.homePageScrollView}
				overScrollMode='never'
				showsVerticalScrollIndicator={false}>
				<CampaignDetailContainer>
					<CDMapWrapper>
						<MapCard location_id={props.campaign.campaignDetails.location_id} />
					</CDMapWrapper>

					{/* header */}
					<CDHeaderWrapper>
						<LabelText small color={statusColor[props.campaign.request_status]}>
							{status[props.campaign.request_status]}
						</LabelText>

						<LabelText>
							{props.campaign.campaignDetails.name}
						</LabelText>

						<CommonText>
							{props.campaign.client.business_name}
						</CommonText>
					</CDHeaderWrapper>

					{/* body top */}
					<CDTopBodyWrapper>
						<CDDescriptionLabel>
							{props.campaign.campaignDetails.description}
						</CDDescriptionLabel>
					</CDTopBodyWrapper>

					<CDDivider />

					{/* body bottom */}
					<CDBottomBodyWrapper>
						<CDRowLeftFlex>
							<LabelText>
								{props.campaign.campaign_traveled}km
							</LabelText>

							<CommonText>
								travel counter
							</CommonText>
						</CDRowLeftFlex>

						<CDRowCenterFlex>
							<CDVehicleImage
								source={vehicleClass(props.campaign.campaignDetails.vehicle_classification).icon.black} />

							<CommonText>
								{vehicleType(props.campaign.campaignDetails.vehicle_type).nameOnCaps}
							</CommonText>
						</CDRowCenterFlex>

						<CDRowRightFlex>
							<LabelText textAlign="right">
								{props.campaign.campaignDetails.location}
							</LabelText>
							
							<CommonText textAlign="right">
								Location
							</CommonText>
						</CDRowRightFlex>
					</CDBottomBodyWrapper>

					{/* footer */}
					<CDFooterWrapper>
						<CDRowLeftFlex>
							<LabelText color="white">
								P{earnUpTo(props.campaign.campaignDetails)}
							</LabelText>
							
							<CommonText color="white">
								Earn up to
							</CommonText>
						</CDRowLeftFlex>

						<CDRowRightFlex>
							<ButtonBlue
								label="Start Trip"
								onPress={requestCameraPermission} />
						</CDRowRightFlex>
					</CDFooterWrapper>
				</CampaignDetailContainer>
			</PageContainer>
		</PageLayout>
	);
}

const mapStateToProps = (state) => ({
  campaign: state.campaignReducer.mylist_selected
});

const mapDispatchToProps = dispatch => ({
  dispatchTrip: () => dispatch(CampaignAction.startTrip())
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignCardActive);
