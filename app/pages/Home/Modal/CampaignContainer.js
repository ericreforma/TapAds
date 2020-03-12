import React, { useState } from 'react';

import CampaignChooseVehicle from './CampaignChooseVehicle';
import { IMAGES, VEHICLE, URL } from '../../../config/variables';
import {
  getSlotAvailable,
  totalKmDistance,
  numberWithCommas,
  earnUpTo,
  getDate
} from '../../../config/functions';
import theme from '../../../styles/theme.style';
import {
  CampaignContainerButton,
  ModalBackWrapper,
  ModalBackButton,
  ModalBackImage,
  ModalContentContainer,
  ModalContentScroll,
  ModalContentWrapper,
  CampaignChooseVehicleContainer,
  CampaignImageWrapper,
  CampaignImage,
  CampaignInfoWrapper,
  CampaignInfoLabel,
  CampaignInfoCommon,
  CampaignInfoDivider,
  CampaignInfoDescription,
  CampaignInfoCardCommon,
  CampaignInfoCardLabel,
  CampaignAdditionalInfoContainer,
  CampaignAdditionalInfoWrapper,
  CampaignLVSWrapper,
  CampaignLVSLocationWrapper,
  CampaignInfoCommonLabel,
  CampaignLVSVehicleClassWrapper,
  CampaignLVSSlotsWrapper,
  CampaignLVSVehicleClassImageWrapper,
  CampaignLVSVehicleClassImage,
  CampaignStickerLocationWrapper,
  CampaignStickerLocationHeading,
  CampaignStickerImageLocation,
  CampaignContainerModal
} from './CampaignContainerStyledComponents';
import { IfElse, Then, Else } from '../../../components/IfElse';

const recCampaignImage = require('../../../assets/image/recommended_campaign_image.png');
const vehicleType = id => Object.values(VEHICLE.TYPE).find(t => t.id === id);
const vehicleClass = id => Object.values(VEHICLE.CLASS).find(c => c.id === id);
const vehicleStickerArea = Object.values(VEHICLE.STICKER_AREA);

const CampaignContainer = props => {
  const { campaign, homePageInit } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const imageSource = campaign.photo
    ? {uri: `${URL.SERVER_MEDIA}/${campaign.photo}`}
    : recCampaignImage;

  const campaignInfo = [
    [
      {name: 'common', text: 'From'},
      {name: 'label', text: getDate(campaign.duration_from)},
      {name: 'common', text: 'to'},
      {name: 'label', text: getDate(campaign.duration_to)},
    ], [
      {name: 'common', text: 'Earn up to'},
      {name: 'label', text: `P${earnUpTo(campaign, true)}`},
      {name: 'common', text: 'for'},
      {name: 'label', text: `${totalKmDistance(campaign)}km`},
    ], [
      {name: 'common', text: 'Bonus'},
      {name: 'label', text: `P${numberWithCommas(campaign.completion_bonus)}`},
      {name: 'common', text: 'for campaign completion'},
    ]
  ];

  const CampaignContainerText = {
    location: 'Location',
    slotsAvail: 'Slots available'
  };
  
  return (
    <>
      <CampaignContainerButton 
        style={props.style}
        activeOpacity={props.activeOpacity}
        onPress={e => {
          props.onPress(e);
          setModalVisible(true);
        }}
        disabled={modalVisible}>
        {props.children}
      </CampaignContainerButton>

      <CampaignContainerModal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        presentationStyle="fullScreen">
        <ModalBackWrapper>
          <ModalBackButton onPress={() => setModalVisible(false)}>
            <ModalBackImage source={IMAGES.ICONS.back_icon_black} />
          </ModalBackButton>
        </ModalBackWrapper>
        
        <ModalContentContainer>
          <ModalContentScroll
            overScrollMode='never'
            showsVerticalScrollIndicator={false}>
            <ModalContentWrapper>
              <CampaignImageWrapper>
                <CampaignImage source={imageSource} />
              </CampaignImageWrapper>

              <CampaignInfoWrapper>
                <CampaignInfoLabel>
                  {campaign.name}
                </CampaignInfoLabel>

                <CampaignInfoCommon>
                  {campaign.client.business_name}
                </CampaignInfoCommon>

                <CampaignInfoDivider
                  color={theme.COLOR_LIGHT_BLUE} />

                <CampaignInfoDescription>
                  {campaign.description}
                </CampaignInfoDescription>

                <CampaignInfoDivider
                  color="#e7e7e7"
                  height={2} />

                <CampaignLVSWrapper>
                  <CampaignLVSLocationWrapper>
                    <CampaignInfoLabel numberOfLines={2}>
                      {campaign.location}
                    </CampaignInfoLabel>

                    <CampaignInfoCommonLabel>
                      {CampaignContainerText.location}
                    </CampaignInfoCommonLabel>
                  </CampaignLVSLocationWrapper>
                  
                  <CampaignLVSVehicleClassWrapper>
                    <CampaignLVSVehicleClassImageWrapper>
                      <CampaignLVSVehicleClassImage
                        source={vehicleClass(campaign.vehicle_classification).icon.black} />
                    </CampaignLVSVehicleClassImageWrapper>

                    <CampaignInfoCommonLabel>
                      {vehicleType(campaign.vehicle_type).nameOnCaps}
                    </CampaignInfoCommonLabel>
                  </CampaignLVSVehicleClassWrapper>
                  
                  <CampaignLVSSlotsWrapper>
                    <CampaignInfoLabel>
                      {getSlotAvailable(campaign)} 
                    </CampaignInfoLabel>

                    <CampaignInfoCommonLabel>
                      {CampaignContainerText.slotsAvail}
                    </CampaignInfoCommonLabel>
                  </CampaignLVSSlotsWrapper>
                </CampaignLVSWrapper>

                {campaignInfo.map((c, cIdx) =>
                  <CampaignAdditionalInfoContainer key={cIdx}>
                    {c.map((i, index) =>
                      <CampaignAdditionalInfoWrapper key={index}>
                        <IfElse condition={i.name === 'common'}>
                          <Then>
                            <CampaignInfoCardCommon>
                              {i.text}
                            </CampaignInfoCardCommon>
                          </Then>

                          <Else>
                            <CampaignInfoCardLabel>
                              {i.text}
                            </CampaignInfoCardLabel>
                          </Else>
                        </IfElse>
                      </CampaignAdditionalInfoWrapper>
                    )}
                  </CampaignAdditionalInfoContainer>
                )}
                
                <CampaignStickerLocationWrapper>
                  <CampaignStickerLocationHeading
                    marginBottom={[3,4,6].indexOf(parseInt(campaign.vehicle_stickerArea)) !== -1 ? 20 : 0}>
                    <CampaignInfoLabel>
                      {vehicleStickerArea[campaign.vehicle_stickerArea].name}
                    </CampaignInfoLabel>
                  </CampaignStickerLocationHeading>

                  <IfElse condition={campaign.vehicle_classification === 2}>
                    <Then>
                      <CampaignStickerImageLocation
                        source={VEHICLE.STICKER_AREA.motorcycle.image} />
                    </Then>

                    <Else>
                      <IfElse condition={campaign.vehicle_stickerArea === 1}>
                        <Then>
                          <CampaignStickerImageLocation
                            source={vehicleStickerArea[campaign.vehicle_stickerArea].imageLeft} />
                            
                          <CampaignStickerImageLocation
                            source={vehicleStickerArea[campaign.vehicle_stickerArea].imageRight} />
                        </Then>

                        <Else>
                          <CampaignStickerImageLocation
                            source={vehicleStickerArea[campaign.vehicle_stickerArea].image} />
                        </Else>
                      </IfElse>
                    </Else>
                  </IfElse>
                </CampaignStickerLocationWrapper>
              </CampaignInfoWrapper>

              <CampaignChooseVehicleContainer>
                <CampaignChooseVehicle
                  homePageInit={homePageInit}
                  closeCampaignModal={() => setModalVisible(false)} />
              </CampaignChooseVehicleContainer>
            </ModalContentWrapper>
          </ModalContentScroll>
        </ModalContentContainer>
      </CampaignContainerModal>
    </>
  );
};

export default CampaignContainer;