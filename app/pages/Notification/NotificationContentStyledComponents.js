import styled from 'styled-components';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Image
} from 'react-native';
import theme from '../../styles/theme.style';
import { RFValue } from 'react-native-responsive-fontsize';

const iconDimension = theme.SCREEN_WIDTH / 15;

export const NotifContainer = styled(View)`
  margin: 20px 15px;
`;

export const NotifHeaderWrapper = styled(View)`
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const NotifHeaderLabel = styled(Text)`
  font-family: 'Montserrat-Bold';
  font-size: ${RFValue(16)}px;
  color: ${theme.COLOR_WHITE};
`;

export const NotifContentContainer = styled(View)`
  padding: 0px 0px ${theme.PAGE_PADDING_HORIZONTAL}px;
`;

export const NotifContentLoader = styled(ActivityIndicator)`
  height: 75px;
`;

export const NotifContentNoData = styled(View)`
  align-items: center;
  justify-content: center;
`;

export const NotifContentWrapper = styled(TouchableOpacity)`
  border-radius: 15px;
  background-color: ${theme.COLOR_WHITE};
  padding: 15px 20px;
  margin: 5px 0px;
  flex-direction: row;
  align-items: center;
  elevation: 5;
`;

export const NotifContentLabelWrapper = styled(View)`
  flex: 1;
  padding-right: 15px;
`;

export const NotifContentTitleLabel = styled(Text)`
  color: ${theme.COLOR_BLACK};
  font-family: 'Montserrat-Bold';
  font-size: ${RFValue(16)}px;
`;

export const NotifContentSubTitleLabel = styled(Text)`
  font-family: 'Montserrat-Light';
  font-size: ${RFValue(theme.FONT_SIZE_SMALL)}px;
`;

export const NotifContentIcon = styled(Image)`
  width: ${iconDimension}px;
  height: ${iconDimension}px;
  resize-mode: contain;
`;