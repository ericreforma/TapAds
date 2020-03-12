import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, PermissionsAndroid } from 'react-native';
import {
  LabelText,
  CommonText
} from '../../../../components/Text';
import {
	numberWithCommas,
	getTotalEarnings,
  earnUpTo,
  timeStamp
} from '../../../../config/functions';
import { VehicleType } from '../../../../components/VehicleType';
import { VEHICLE, URL } from '../../../../config/variables';
import { IfElse, Then, Else } from '../../../../components/IfElse';
import { CampaignAction } from '../../../../redux/actions/campaign.action';
import {
  PendingContainer,
  PendingImageWrapper,
  PendingImage,
  PendingInfoWrapper,
  PendingInfoTopSection,
  PendingInfoContentLabel,
  PendingInfoContentCommonLabel,
  PendingInfoBottomSection,
  PendingInfoRow,
  PendingInfoContentValueLabel,
  PendingDeleteButton,
  PendingDeleteLabel
} from './PendingContentStyledComponents';
import { AlertFunction } from '../../../../components/App';
import { CAMPAIGN } from '../../../../redux/actions/types.action';

const checkCampaignImage = url => url
  ? {uri: `${URL.SERVER_MEDIA}/${url}`}
  : require('../../../../assets/image/test_campaign_category.png');

const alertTexts = {
  default: {
    title: 'Campaign Deleted',
    body: 'Your request has been deleted successfully'
  }
};

const PendingCampaign = props => {
  const [campaigns, setCampaigns] = useState(props.campaigns);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState(alertTexts.default)
  const [loading, setLoading] = useState(false);
  const [newCampaign, setNewCampaign] = useState([]);

	useEffect(() => {
    setCampaigns(props.campaigns);
  }, [props.campaigns]);

  const closeButtonOnPress = c => () => {
    if(!modalVisible) {
      setLoading(true);

      const dataToPass = {
        campaign_id: c.campaign_id,
        user_vehicle_id: c.user_vehicle_id,
        user_campaign_id: c.id
      };

      props.removeCampaign(dataToPass, message => {
        setLoading(false);
        setNewCampaign(message.data);
        setModalInfo({
          title: message.title,
          body: message.body
        });
      });
    }

    toggleModal();
  }

  const toggleModal = () => setModalVisible(!modalVisible);

  return (
    <>
      <AlertFunction
        cancelText="Close"
        title={modalInfo.title}
        body={modalInfo.body}
        toggleModal={toggleModal}
        isVisible={modalVisible}
        cancelOnPress={props.updateCampaign(newCampaign)}
        loading={loading} />

      {campaigns.map((data, index) =>
        <PendingContainer
          key={index}
          onPress={props.campaignSelected(data.id)}>
          <PendingImageWrapper>
            <PendingImage
              source={checkCampaignImage(data.campaignDetails.photo)} />
          </PendingImageWrapper>

          <PendingInfoWrapper>
            <PendingInfoTopSection>
              <PendingInfoContentLabel
                numberOfLines={1}>
                {data.campaignDetails.name}
              </PendingInfoContentLabel>

              <PendingInfoContentCommonLabel>
                {data.client.business_name}
              </PendingInfoContentCommonLabel>

              <PendingInfoContentCommonLabel>
                {data.campaignDetails.location}
              </PendingInfoContentCommonLabel>
            </PendingInfoTopSection>

            <PendingInfoBottomSection>
              <PendingInfoRow>
                <PendingInfoContentCommonLabel>
                  Earn up to
                </PendingInfoContentCommonLabel>

                <PendingInfoContentValueLabel>
                  P {earnUpTo(data.campaignDetails)}
                </PendingInfoContentValueLabel>
              </PendingInfoRow>

              <PendingInfoRow>
                <PendingInfoContentCommonLabel>
                  Request date
                </PendingInfoContentCommonLabel>

                <PendingInfoContentValueLabel>
                  {timeStamp(data.created_at, true).date.replace(/\s/g,'')}
                </PendingInfoContentValueLabel>
              </PendingInfoRow>
            </PendingInfoBottomSection>
          </PendingInfoWrapper>

          <PendingDeleteButton
            onPress={closeButtonOnPress(data)}>
            <PendingDeleteLabel>
              X
            </PendingDeleteLabel>
          </PendingDeleteButton>
        </PendingContainer>
      )}
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  campaignSelected: (id, navigate = false, callback = false) => () =>
    dispatch(CampaignAction.mylistSelected(id, navigate, callback)),
  removeCampaign: (data, callback) =>
    dispatch(CampaignAction.remove(data, callback)),
  updateCampaign: mylist => () =>
    dispatch({ type: CAMPAIGN.REMOVE.SUCCESS, mylist })
});

export default connect(null, mapDispatchToProps)(PendingCampaign);