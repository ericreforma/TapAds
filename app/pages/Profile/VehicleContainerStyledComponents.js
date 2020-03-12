import styled from 'styled-components';
import {
  View,
  Text,
  Image
} from 'react-native';
import theme from '../../styles/theme.style';
import { RFValue } from 'react-native-responsive-fontsize';

export const VehicleTypeWrapper = styled(View)`
  position: absolute;
  top: 15px;
  left: 0px;
  padding: 0px 10px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: ${theme.COLOR_BLUE};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const VehicleTypeImage = styled(Image)`
  width: 30px;
  height: 30px;
  resize-mode: contain;
  margin-right: 5px;
`;

export const VehicleTypeLabel = styled(Text)`
  font-family: 'Montserrat-Bold';
  font-size: ${RFValue(10)}px;
  color: ${theme.COLOR_WHITE};
`;