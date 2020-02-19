import {
  View, TouchableOpacity
} from 'react-native';
import styled from 'styled-components';

import theme from '../../../styles/theme.style';

export const Container = styled(View)`
  padding: 15px ${theme.PAGE_PADDING_HORIZONTAL}px;
`;

export const Header = styled(View)`
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

export const CampaignInfoTop = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
`;

export const CampaignInfoLeft = styled(View)`
  flex: 1;
  align-items: flex-start;
`;

export const CampaignInfoRight = styled(View)`
  flex: 1;
  align-items: flex-end;
`;

export const DistanceRow = styled(View)`
  margin: 5px 0px;
  padding: 15px 0px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${theme.COLOR_GRAY_HEAVY};
  border-radius: ${theme.PAGE_CARD_RADIUS}px;
`;

export const DistanceSpace = styled(View)`
  width: 5px;
`;

export const TripHistoryHeader = styled(View)`
  justify-content: center;
  align-items: center;
`;

export const TripHistoryColumnHeader = styled(View)`
  margin-top: 10px;
  padding: 0px 15px;
  flex-direction: row;
  justify-content: space-between;
`;

export const TripsContainer = styled(View)`
  margin: 5px 0px 10px;
`;

export const TripButton = styled(TouchableOpacity)`
  margin: 5px 0px;
  padding: 10px 15px;
  background-color: ${theme.COLOR_WHITE};
  border-radius: ${theme.PAGE_CARD_RADIUS}px;
  elevation: 3;
  flex-direction: row;
  justify-content: space-between;
`;

export const TripLeftContainer = styled(View)`
  flex: 1;
  align-items: flex-start;
`;

export const TripLeftWrapper = styled(View)`
  flex: 1;
  align-items: flex-start;
  border-bottom-width: 2px;
  border-bottom-color: #e7e7e7;
  padding-bottom: 5px;
`;

export const TripRightContainer = styled(View)`
  flex: 1;
  align-items: flex-end;
`;

export const TripRightWrapper = styled(View)`
  flex: 1;
  align-items: flex-end;
  border-bottom-width: 2px;
  border-bottom-color: #e7e7e7;
  padding-bottom: 5px;
`;

export const ViewMoreWrapper = styled(View)`
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

export const ViewMoreButton = styled(TouchableOpacity)``;

export const NoTripsRecorded = styled(View)`
  align-self: center;
`;