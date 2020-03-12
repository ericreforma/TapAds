import styled from 'styled-components';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-fa-icons';

import theme from '../../../styles/theme.style';

export const AlertButtonLabel = styled(Text)`
  font-family: 'Montserrat-Regular';
  font-size: 12px;
`;

export const AlertContainer = styled(View)`
  background-color: ${theme.COLOR_WHITE};
  border-radius: 20px;
  overflow: hidden;
`;

export const AlertLoadingWrapper = styled(View)`
  background-color: ${theme.COLOR_WHITE};
  align-self: center;
  padding: 25px;
  border-radius: 10px;
`;

export const AlertTitleWrapper = styled(View)`
  background-color: ${theme.COLOR_GRAY_HEAVY};
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

export const AlertTitleLabel = styled(Text)`
  font-size: 15px;
  font-family: 'Montserrat-Bold';
  color: ${theme.COLOR_WHITE};
`;

export const AlertBodyWrapper = styled(View)`
  padding: 15px;
`;

export const AlertBodyContentWrapper = styled(View)`
  margin-bottom: 25px;
`;

export const AlertBodyContentLabel = styled(Text)`
  color: ${theme.COLOR_BLACK};
  font-family: 'Montserrat-Regular';
  font-size: 14px;
  text-align: center;
`;

export const AlertBodyFooterWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const AlertBodyProceedButton = styled(TouchableOpacity)`
  padding: 10px 30px;
  border-radius: 10px;
  background-color: ${theme.COLOR_GREEN};
  margin-right: 7px;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const AlertBodyCloseButton = styled(TouchableOpacity)`
  padding: 10px 30px;
  border-radius: 10px;
  background-color: ${theme.COLOR_RED};
  margin-left: 7px;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const AlertBodyDefaultButton = styled(TouchableOpacity)`
  padding: 10px 30px;
  border-radius: 10px;
  background-color: ${theme.COLOR_BLUE};
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const AlertBodyButtonLabel = styled(Text)`
  color: ${theme.COLOR_WHITE};
  font-family: 'Montserrat-Regular';
  font-size: 12px;
`;

export const AlertBodyButtonIcon = styled(Icon)`
  color: ${theme.COLOR_WHITE};
  font-size: 15px;
`;