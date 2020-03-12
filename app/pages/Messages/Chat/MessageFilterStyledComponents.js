import styled from 'styled-components';
import { View, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../../styles/theme.style';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-fa-icons';

export const FilterButton = styled(TouchableOpacity)`
  background-color: ${theme.COLOR_WHITE};
  border-radius: 10px;
  elevation: 3;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

export const FilterButtonLabel = styled(Text)`
  font-family: 'Montserrat-Bold';
  font-size: ${RFValue(15)}px;
  color: ${theme.COLOR_BLACK};
`;

export const FilterButtonIcon = styled(Icon)`
  color: ${theme.COLOR_BLACK};
  font-size: ${RFValue(15)}px;
`;

export const FilterModal = styled(Modal)``;
export const FilterModalContainer = styled(View)`
  background-color: ${theme.COLOR_WHITE};
  border-radius: ${theme.PAGE_CARD_RADIUS}px;
  padding: 5px 0px 0px;
  width: 100%;
  overflow: hidden;
`;

export const FilterModalPickerWrapper = styled(View)`
  margin: 15px 20px;
`;

export const FilterLabel = styled(Text)`
  font-family: 'Montserrat-Regular';
  font-size: ${RFValue(15)}px;
  color: ${theme.COLOR_BLACK};
  margin-bottom: 7px;
  text-align: center;
`;

export const FilterActionWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px 0px 0px;
`;

export const FilterProceedButton = styled(TouchableOpacity)`
  background-color: ${theme.COLOR_GREEN};
  padding: 15px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const FilterCancelButton = styled(TouchableOpacity)`
  background-color: ${theme.COLOR_GRAY_BUTTON};
  padding: 15px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const FilterActionButtonLabel = styled(Text)`
  font-family: 'Montserrat-Medium';
  color: ${theme.COLOR_WHITE};
  font-size: ${RFValue(15)}px;
`;