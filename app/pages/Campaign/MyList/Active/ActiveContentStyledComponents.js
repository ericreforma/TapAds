import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import styled from 'styled-components';
import theme from '../../../../styles/theme.style';
import { RFValue } from 'react-native-responsive-fontsize';

export const ActiveContentContainer = styled(View)`
  background-color: ${theme.COLOR_WHITE};
  border-radius: ${theme.PAGE_CARD_RADIUS}px;
  overflow: hidden;
  margin: 7px 0px;
  elevation: 5;
`;

export const ActiveContentHeader = styled(View)`
  padding: 10px 20px;
  background-color: ${theme.COLOR_DIRTY_WHITE};
`;

export const ActiveContentRow = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ActiveContentHeaderBrand = styled(View)`
  flex: 1;
`;

export const FullDetailsButton = styled(TouchableOpacity)`
  width: 90px;
  align-items: flex-end;
`;
export const FullDetailsLabel = styled(Text)`
  font-family: 'Montserrat-Bold';
  font-size: ${RFValue(15)}px;
  color: ${theme.COLOR_PINK};
`;

export const ActiveContentBody = styled(View)`
  padding: 10px 20px;
`;

export const ActiveContentBodyInfoContainer = styled(View)`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: 10px;
  padding: 10px 0px;
`;

export const ActiveContentBodyInfoLeftWrapper = styled(View)`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-start;
`;

export const ActiveContentBodyInfoCenterWrapper = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ActiveContentBodyInfoRightWrapper = styled(View)`
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const ActiveContentBodyActionWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 5px 0px;
`;

export const ActiveContentBodyUploadButton = styled(TouchableOpacity)`
  flex: 1;
  margin-right: 10px;
`;

export const ActiveContentBodyStartButton = styled(TouchableOpacity)`
  flex: 1;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${theme.COLOR_BLUE};
  border-radius: 15px;
  padding: 10px 0px;
`;

export const ActiveContentFooter = styled(View)`
  background-color: ${theme.COLOR_GRAY_HEAVY};
  padding: 15px 20px;
`;