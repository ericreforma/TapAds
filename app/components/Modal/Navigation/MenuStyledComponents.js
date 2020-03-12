import React from 'react';
import styled from 'styled-components';
import {
  View, 
  TouchableOpacity,
  Animated,
  Text,
  Image,
  ActivityIndicator
} from 'react-native';
import theme from '../../../styles/theme.style';
import { RFValue } from 'react-native-responsive-fontsize';
import Modal from 'react-native-modal';

export const MenuContainer = styled(View)``;

export const MenuButton = styled(TouchableOpacity)``;
export const MenuImage = styled(Image)`
  width: ${RFValue(27)}px;
  resize-mode: contain;
`;

export const MenuModal = styled(Modal)`
  margin: 0px;
`;

export const MenuModalContainer = styled(View)`
  flex: 1;
  width: 330px;
  align-self: flex-end;
`;

export const MenuModalContentWrapper = styled(View)`
  backgroundColor: ${theme.COLOR_BLUE};
  width: 330px;
  align-self: flex-end;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  padding: 15px;
  margin-top: 70px;
`;

export const MenuCloseButton = styled(TouchableOpacity)`
  align-self: flex-start;
`;

export const MenuCloseLabel = styled(Text)`
  color: ${theme.COLOR_WHITE};
  font-family: 'Montserrat-Regular';
`;

export const MenuModalContentBody = styled(View)`
  align-items: flex-end;
  padding: 20px;
`;

export const MenuModalContentBodyTopContainer = styled(View)`
  align-items: flex-end;
`;

export const MenuModalContentBodyButtonLine = styled(View)`
  border-bottom-width: 1px;
  border-top-width: ${props => props.index === 0 ? 1 : 0}px;
  border-color: ${theme.COLOR_WHITE};
`;

export const MenuModalContentBodyButton = styled(TouchableOpacity)`
  width: 210px;
  padding: 10px 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MenuModalContentBodyBottomContainer = styled(View)`
  width: 150px;
  margin-top: 100px;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const MenuBodyDescriptionWrapper = styled(View)`
  border-bottom-width: 0.5px;
  border-bottom-color: ${theme.COLOR_WHITE};
  padding: 10px 0px;
`;

export const DescriptionLabel = styled(Text)`
  font-family: 'Montserrat-Regular';
  font-size: ${theme.FONT_SIZE_SMALL}px;
  color: ${theme.COLOR_WHITE};
  text-align: right;
`;

export const MenuLogoutWrapper = styled(View)`
  padding: 10px 0px;
`;

export const MenuLogoutButton = styled(TouchableOpacity)``;

export const MenuLogoutLoader = () => <ActivityIndicator color={theme.COLOR_WHITE} />