import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal
} from 'react-native';
import styled from 'styled-components';
import theme from '../../../styles/theme.style';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const CampaignContainerButton = styled(TouchableOpacity)``;

export const CampaignContainerModal = styled(Modal)``;

export const ModalBackWrapper = styled(View)`
  background-color: ${theme.COLOR_WHITE};
  padding: ${RFPercentage(3)}px ${RFPercentage(1.5)}px;
`;
export const ModalBackButton = styled(TouchableOpacity)`
  align-self: flex-start;
`;

export const ModalBackImage = styled(Image)`
  width: ${RFPercentage(2.5)}px;
  height: ${RFPercentage(2.5)}px;
  resize-mode: contain;
`;

export const ModalContentContainer = styled(View)`
  flex: 1;
`;

export const ModalContentScroll = styled(ScrollView)``;

export const ModalContentWrapper = styled(View)`
  margin: ${RFPercentage(2)}px ${RFPercentage(1.5)}px ${RFPercentage(4)}px;
  border-radius: ${theme.PAGE_CARD_RADIUS}px;
  background-color: ${theme.COLOR_WHITE};
  overflow: hidden;
  elevation: 5;
`;

export const CampaignChooseVehicleContainer = styled(View)`
  margin: 15px 0px 30px;
`;

// campaign image
export const CampaignImageWrapper = styled(View)`
  flex: 1;
  height: ${theme.SCREEN_HEIGHT / 3.5}px;
  background-color: ${theme.COLOR_BLUE};
`;

export const CampaignImage = styled(Image)`
  resize-mode: cover;
  width: 100%;
  height: ${theme.SCREEN_HEIGHT / 3.5}px;
`;

// campaign info
export const CampaignInfoWrapper = styled(View)`
  padding: 15px 20px;
`;

export const CampaignInfoDivider = styled(View)`
  background-color: ${props => props.color ? props.color : theme.COLOR_WHITE};
  height: ${props => props.color ? (props.height ? props.height : 3) : 0}px;
  margin: 10px 0px;
`;

export const CampaignInfoLabel = styled(Text)`
  font-family: 'Montserrat-Bold';
  font-size: ${RFValue(15)}px;
  color: ${theme.COLOR_BLACK};
`;

export const CampaignInfoCommon = styled(Text)`
  font-family: 'Montserrat-Medium';
  font-size: ${RFValue(11)}px;
  line-height: ${RFValue(13)}px;
  color: ${props => props.color ? props.color : theme.COLOR_NORMAL_FONT};
`;

export const CampaignInfoCommonLabel = styled(Text)`
  font-family: 'Montserrat-Bold';
  font-size: ${RFValue(12)}px;
  line-height: ${RFValue(13)}px;
  color: ${theme.COLOR_NORMAL_FONT};
`;

export const CampaignInfoDescription = styled(Text)`
  font-family: 'Montserrat-Regular';
  font-size: ${RFValue(11)}px;
  color: ${theme.COLOR_NORMAL_FONT};
`;

export const CampaignInfoCardLabel = styled(Text)`
  font-family: 'Montserrat-Bold';
  font-size: ${RFValue(11)}px;
  line-height: ${RFValue(11)}px;
  color: ${theme.COLOR_BLACK};
  padding: 0px 2px;
`;

export const CampaignInfoCardCommon = styled(Text)`
  font-family: 'Montserrat-Regular';
  font-size: ${RFValue(11)}px;
  line-height: ${RFValue(11)}px;
  color: ${theme.COLOR_BLACK};
  padding: 0px 2px;
`;

// campaign LVS
export const CampaignLVSWrapper = styled(View)`
  flex-direction: row;
  align-items: flex-end;
  padding: 20px 0px 25px;
`;

export const CampaignLVSLocationWrapper = styled(View)`
  flex: 1;
  align-items: flex-start;
`;

export const CampaignLVSVehicleClassWrapper = styled(View)`
  padding: 0px 10px;
  align-items: center;
`;

export const CampaignLVSVehicleClassImageWrapper = styled(View)`
  width: ${theme.SCREEN_WIDTH / 10}px;
  height: ${theme.SCREEN_WIDTH / 15}px;
`;

export const CampaignLVSVehicleClassImage = styled(Image)`
  resize-mode: contain;
  width: ${theme.SCREEN_WIDTH / 10}px;
  height: ${theme.SCREEN_WIDTH / 15}px;
`;

export const CampaignLVSSlotsWrapper = styled(View)`
  flex: 1;
  align-items: flex-end;
`;

// campaign additional info
export const CampaignAdditionalInfoContainer = styled(View)`
  margin: 7px 0px;
  padding: 15px 0px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${theme.COLOR_WHITE};
  border-radius: ${theme.PAGE_CARD_RADIUS}px;
  elevation: 3;
`;

export const CampaignAdditionalInfoWrapper = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

// camapaign sticker location
export const CampaignStickerLocationWrapper = styled(View)`
  margin: 10px 0px;
  padding: 0px 20px;
`;

export const CampaignStickerLocationHeading = styled(View)`
  margin: 10px 0px ${props => props.marginBottom}px;
  justify-content: center;
  align-items: center;
`;

export const CampaignStickerImageLocation = styled(Image)`
  width: 100%;
  height: ${theme.SCREEN_HEIGHT / 5}px;
  resize-mode: contain;
`;