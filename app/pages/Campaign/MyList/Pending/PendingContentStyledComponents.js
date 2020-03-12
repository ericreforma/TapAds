import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import styled from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../../../styles/theme.style';

const imageWrapperWidth = theme.SCREEN_WIDTH / 3.5;

export const PendingContainer = styled(TouchableOpacity)`
  background-color: ${theme.COLOR_WHITE};
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
  elevation: 5;
  margin: 7px 0px;
`;

export const PendingImageWrapper = styled(View)`
  width: ${imageWrapperWidth}px;
  height: ${imageWrapperWidth}px;
  background-color: ${theme.COLOR_GRAY_HEAVY};
  overflow: hidden;
`;

export const PendingImage = styled(Image)`
  resize-mode: cover;
  width: ${imageWrapperWidth}px;
  height: ${imageWrapperWidth}px;
`;

export const PendingInfoWrapper = styled(View)`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  height: ${imageWrapperWidth}px;
  padding: 10px 15px;
`;

export const PendingInfoTopSection = styled(View)``;
export const PendingInfoBottomSection = styled(View)``;

export const PendingDeleteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: ${theme.COLOR_RED};
  border-bottom-left-radius: 10px;
  elevation: 5;
  padding: 5px 10px;
`;

export const PendingDeleteLabel = styled(Text)`
  font-size: 15px;
  font-family: 'Montserrat-Bold';
  color: ${theme.COLOR_WHITE};
`;

export const PendingInfoContentLabel = styled(Text)`
  font-size: ${RFValue(18)}px;
  font-family: 'Montserrat-Bold';
  color: ${theme.COLOR_BLACK};
  padding-right: 30px;
`;

export const PendingInfoContentCommonLabel = styled(Text)`
  font-size: ${RFValue(12)}px;
  font-family: 'Montserrat-Medium';
  color: ${theme.COLOR_NORMAL_FONT};
  line-height: ${RFValue(14)}px;
`;

export const PendingInfoContentValueLabel = styled(Text)`
  font-size: ${RFValue(12)}px;
  font-family: 'Montserrat-Bold';
  color: ${theme.COLOR_NORMAL_FONT};
  line-height: ${RFValue(14)}px;
`;

export const PendingInfoRow = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;