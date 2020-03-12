import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Icon from 'react-native-fa-icons';
import styled from 'styled-components';
import theme from '../../../styles/theme.style';
import { RFValue } from 'react-native-responsive-fontsize';
import Modal from 'react-native-modal';

// view
export const PickerButtonLabelWrapper = styled(View)`
  padding: 0px 15px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const PickerModal = styled(Modal)``;
export const PickerModalContainer = styled(View)`
  background-color: ${theme.COLOR_WHITE};
  border-radius: 5px;
  overflow: hidden;
`;
export const PickerModalHeader = styled(View)`
  background-color: ${theme.COLOR_GRAY_MEDIUM};
  align-items: center;
  justify-content: center;
  padding: 15px;
`;
export const PickerModalBody = styled(View)`
  max-height: ${theme.SCREEN_HEIGHT / 1.51}px;
`;
export const PickerModalItemWrapper = props => {
  return (
    <ScrollView
      overScrollMode="never"
      contentContainerStyle={{
        paddingVertical: 5
      }}>
      {props.children}
    </ScrollView>
  )
}

// button
export const PickerButton = styled(TouchableOpacity)`
  background-color: ${theme.COLOR_WHITE};
  border-radius: 10px;
  padding: 10px;
  elevation: 5;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const PickerModalItem = styled(TouchableOpacity)`
  padding: 10px 0px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.active ? theme.COLOR_GRAY_LIGHT : 'transparent'};
`;


// label
export const PickerButtonLabel = styled(Text)`
  font-family: 'Montserrat-Bold';
  font-size: ${RFValue(15)}px;
  color: ${theme.COLOR_BLACK};
`;
export const PickerModalHeaderLabel = styled(Text)`
  font-family: 'Montserrat-Medium';
  font-size: ${RFValue(15)}px;
  color: ${theme.COLOR_NORMAL_FONT};
`;
export const PickerModalItemLabel = styled(Text)`
  font-family: 'Montserrat-Bold';
  font-size: ${RFValue(15)}px;
  color: ${props => props.active ? theme.COLOR_GRAY_HEAVY : theme.COLOR_NORMAL_FONT};
`;


// icon, image
export const PickerButtonCaret = styled(Icon)`
  color: ${theme.COLOR_BLACK};
  font-size: ${RFValue(15)}px;
`;