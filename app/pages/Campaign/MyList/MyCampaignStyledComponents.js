import styled from 'styled-components';
import { View } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import theme from '../../../styles/theme.style';

export const MyCampaignContainer = styled(View)`
  margin: 20px 0px;
`;

export const MyCampaignHeaderWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

export const MyCampaignContentContainer = styled(View)`
  padding: ${RFPercentage(2)}px;
`;

export const MyCampaignPickerWrapper = styled(View)`
  margin-bottom: 10px;
`;