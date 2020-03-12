import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, PermissionsAndroid } from 'react-native';
import {
  ActiveContentContainer,
  ActiveContentHeader,
  ActiveContentRow,
  ActiveContentHeaderBrand,
  FullDetailsButton,
  FullDetailsLabel,
  ActiveContentBody,
  ActiveContentBodyInfoContainer,
  ActiveContentBodyInfoLeftWrapper,
  ActiveContentBodyInfoCenterWrapper,
  ActiveContentBodyInfoRightWrapper,
  ActiveContentBodyActionWrapper,
  ActiveContentBodyUploadButton,
  ActiveContentBodyStartButton,
  ActiveContentFooter
} from './ActiveContentStyledComponents';
import {
  LabelText,
  CommonText
} from '../../../../components/Text';
import {
	numberWithCommas,
	getTotalEarnings,
	earnUpTo
} from '../../../../config/functions';
import { VehicleType } from '../../../../components/VehicleType';
import { VEHICLE } from '../../../../config/variables';
import { IfElse, Then, Else } from '../../../../components/IfElse';
import { CampaignAction } from '../../../../redux/actions/campaign.action';

const vehicleType = Object.values(VEHICLE.TYPE);

const ActiveCampaign = props => {
	const [startTripLoader, setStartTripLoader] = useState(Array(props.campaigns.length).fill(false));
	const [campaigns, setCampaigns] = useState(props.campaigns);
  const [maxCount, setMaxCount] = useState(4);

	useEffect(() => {
    setCampaigns(props.campaigns);
    setStartTripLoader(Array(props.campaigns.length).fill(false));
  }, [props.campaigns]);
  
  const seeMoreOnPress = () =>
		setMaxCount(maxCount + 4);
		
	const requestCameraPermission = async(id, location_id) => {
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
				props.campaignSelected(id, false, () => {
					props.checkCampaignLocation(location_id, () => {
						props.dispatchTrip();
					});
				});
			} else {

			}
		} catch (err) {
			console.warn(err);
		}
	}

	const activeCampaignStartTrip = (id, location_id, index) => () => {
		const newStartTripLoader = startTripLoader.map(s => s);
		newStartTripLoader[index] = !newStartTripLoader[index];
		setStartTripLoader(newStartTripLoader);
		requestCameraPermission(id, location_id);
  }
  
  return campaigns.map((data, index) =>
    <ActiveContentContainer key={index}>
      <ActiveContentHeader>
        <LabelText
          numberOfLines={1}>
          {data.campaignDetails.name}
        </LabelText>

        <ActiveContentRow>
          <ActiveContentHeaderBrand>
            <CommonText
              numberOfLines={1}>
              {data.client.business_name}
            </CommonText>
          </ActiveContentHeaderBrand>

          <FullDetailsButton
            onPress={() => {
              props.campaignSelected(data.id);
            }}>
            <FullDetailsLabel>
              Full details
            </FullDetailsLabel>
          </FullDetailsButton>
        </ActiveContentRow>
      </ActiveContentHeader>

      <ActiveContentBody>
        <ActiveContentBodyInfoContainer>
          <ActiveContentBodyInfoLeftWrapper>
            <LabelText>{data.campaignDetails.location}</LabelText>
            <CommonText>Location</CommonText>
          </ActiveContentBodyInfoLeftWrapper>

          <ActiveContentBodyInfoCenterWrapper>
            <VehicleType
              vehicleType={data.campaignDetails.vehicle_classification}
              vehicleColor="black" />

            <CommonText>
              {vehicleType[data.campaignDetails.vehicle_type].name}
            </CommonText>
          </ActiveContentBodyInfoCenterWrapper>

          <ActiveContentBodyInfoRightWrapper>
            <LabelText>P {earnUpTo(data.campaignDetails)}</LabelText>
            <CommonText>Earn up to</CommonText>
          </ActiveContentBodyInfoRightWrapper>
        </ActiveContentBodyInfoContainer>

        <ActiveContentBodyActionWrapper>
          <ActiveContentBodyUploadButton
            onPress={() => {
              props.campaignSelected(data.id, 'MonthlyCarPhoto')
            }}>
            <FullDetailsLabel>
              Upload
            </FullDetailsLabel>
          </ActiveContentBodyUploadButton>

          <ActiveContentBodyStartButton
            onPress={activeCampaignStartTrip(data.id, data.campaignDetails.location_id, index)}
            disabled={startTripLoader[index]}>
            <IfElse condition={startTripLoader[index]}>
              <Then>
                <ActivityIndicator color="#fff" />
              </Then>

              <Else>
                <LabelText color="white">
                  Start trip
                </LabelText>
              </Else>
            </IfElse>
          </ActiveContentBodyStartButton>
        </ActiveContentBodyActionWrapper>
      </ActiveContentBody>

      <ActiveContentFooter>
        <ActiveContentRow>
          <LabelText color="blue" large>
            {data.campaign_traveled}km
          </LabelText>
          <LabelText color="blue" large>
            P {numberWithCommas(getTotalEarnings(data))}
          </LabelText>
        </ActiveContentRow>

        <ActiveContentRow>
          <CommonText color="white">Traveled Counter</CommonText>
          <CommonText color="white">Earnings</CommonText>
        </ActiveContentRow>
      </ActiveContentFooter>
    </ActiveContentContainer>
  )
}

const mapDispatchToProps = (dispatch) => ({
  campaignSelected: (id, navigate = false, callback = false) => dispatch(CampaignAction.mylistSelected(id, navigate, callback)),
	favoriteCampaign: (id) => dispatch(CampaignAction.favorite(id)),
	dispatchTrip: () => dispatch(CampaignAction.startTrip()),
	checkCampaignLocation: (id, callback) => dispatch(CampaignAction.checkCampaignLocation(id, callback))
});

export default connect(null, mapDispatchToProps)(ActiveCampaign);