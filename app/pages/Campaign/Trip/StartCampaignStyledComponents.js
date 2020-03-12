import styled from 'styled-components';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import theme from '../../../styles/theme.style';
import { RFValue } from 'react-native-responsive-fontsize';

export const LoaderContainer = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${theme.COLOR_BLUE};
  top: 0;
  left: 0;
  elevation: ${props => props.visible ? '5' : '-1'};
  align-items: center;
  justify-content: center;
`;

export const LoaderWrapper = styled(View)`
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${theme.COLOR_WHITE};
  elevation: 4;
`;

export const Container = styled(View)`
  flex: 1;
  align-items: stretch;
  background-color: ${theme.COLOR_GRAY_HEAVY};
`;

export const TopPanel = styled(View)`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 20px;
  background-color: ${theme.COLOR_BLUE};
  padding: 7px 15px;
  flex-direction: row;
  align-items: center;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  elevation: 5;
`;

export const VehicleClassImage = styled(Image)`
  resize-mode: contain;
  width: ${theme.SCREEN_WIDTH / 11}px;
  height: ${theme.SCREEN_WIDTH / 11}px;
`;

export const VehicleInfoWrapper = styled(View)`
  padding-left: 15px;
  max-width: ${theme.SCREEN_WIDTH / 2}px;
`;

export const VehicleManufacturerLabel = styled(Text)`
  color: ${theme.COLOR_WHITE};
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(17)}px;
  font-family: 'Montserrat-Bold';
`;

export const VehiclePlateNumber = styled(Text)`
  color: ${theme.COLOR_WHITE};
  font-size: ${RFValue(12)}px;
  line-height: ${RFValue(12)}px;
  font-family: 'Montserrat-Regular';
`;

export const BottomPanel = styled(View)`
  background-color: ${theme.COLOR_DIRTY_WHITE};
  border-radius: 8px;
  margin: 10px;
  z-index: 1;
  elevation: 3;
  align-self: stretch;
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  overflow: hidden;
`;

export const CampaignRow = styled(View)`
  background-color: ${props => props.active ? theme.COLOR_GRAY_LIGHT : theme.COLOR_ALARM};
  color: ${props => props.active ? theme.COLOR_BLACK : theme.COLOR_WHITE};
  align-self: stretch;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 14px;
  align-items: center;
  flex-direction: row;
`;

export const CampaignLabelWrapper = styled(View)`
  padding-right: 10px;
  flex: 1;
`;

export const MinMaxWrapper = styled(TouchableOpacity)``;
export const MinMaxIcon = styled(Image)``;

export const CampaignRowWithPadding = styled(View)`
  padding: 14px;
`;

export const CampaignRowContent = styled(View)`
  padding-bottom: 7px;
  border-bottom-color: #a7a7a7;
  border-bottom-width: 1px;
`;

export const ContentRow = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const RedCircle = styled(View)`
  width: ${RFValue(20)}px;
  height: ${RFValue(20)}px;
  border-radius: ${RFValue(10)}px;
  margin-right: 4px;
  background-color: ${props => props.active ? theme.COLOR_GRAY_MEDIUM : theme.COLOR_RED};
`;

export const GreenCricle = styled(View)`
  width: ${RFValue(20)}px;
  height: ${RFValue(20)}px;
  border-radius: ${RFValue(10)}px;
  margin-left: 4px;
  background-color: ${props => props.active ? theme.COLOR_GREEN : theme.COLOR_GRAY_MEDIUM};
`;

export const TimeContentWrapper = styled(View)`
  padding-top: 7px;
`;

export const RowContentWrapper = styled(View)`
  flex-direction: row;
  align-items: flex-start;
`;

export const LeftColumnWrapper = styled(View)`
  flex: 1;
  padding-right: 10px;
  align-items: flex-start;
`;

export const RightColumnWrapper = styled(View)`
  flex: 1;
  padding-left: 10px;
  align-items: flex-end;
`;

export const ButtonWrapper = styled(TouchableOpacity)`
  background-color: ${theme.COLOR_BLUE};
  border-radius: 15px;
  padding: 0px 15px;
  max-width: 200px;
  min-width: 110px;
  height: 45px;
  align-self: center;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const LabelButton = styled(Text)`
  color: ${theme.COLOR_WHITE};
  font-family: 'Montserrat-Regular';
  font-size: ${RFValue(16)}px;
  padding: 11px 0px;
`;

export const SavingModalWrapper = styled(View)`
  font-family: 'Montserrat-Regular';
  background-color: ${theme.COLOR_WHITE};
  padding: 22px;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-radius: 4px;
  border-color: rgba(0, 0, 0, 0.1);
  width: 200px;
`;

export const LabelSaving = styled(Text)``;