import styled from 'styled-components';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import theme from '../../../styles/theme.style';

const horizontalPadding = `${25}px`;

export const CampaignDetailContainer = styled(View)`
  margin: 30px ${theme.PAGE_PADDING_HORIZONTAL}px 30px;
  border-radius: ${theme.PAGE_CARD_RADIUS}px;
  background-color: ${theme.COLOR_WHITE};
  overflow: hidden;
`;

export const CDMapWrapper = styled(View)`
  height: ${theme.SCREEN_WIDTH - 50}px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const CDHeaderWrapper = styled(View)`
  background-color: ${theme.COLOR_DIRTY_WHITE};
  padding: 15px ${horizontalPadding};
`;

export const CDTopBodyWrapper = styled(View)`
  padding: 15px ${horizontalPadding};
`;

export const CDDivider = styled(View)`
  height: 2px;
  background-color: ${theme.COLOR_GRAY_LIGHT};
  margin: 0px ${horizontalPadding};
`;

export const CDDescriptionLabel = styled(Text)`
  font-size: ${theme.FONT_SIZE_SMALL}px;
  font-family: 'Montserrat-Regular';
  color: ${theme.COLOR_NORMAL_FONT};
  line-height: 18px;
  padding-bottom: 5px;
`;

export const CDDashboardButton = styled(TouchableOpacity)`
  align-self: flex-start;
  padding-top: 5px;
`;

export const CDDashboardLabel = styled(Text)`
  font-size: ${theme.FONT_SIZE_SMALL}px;
  font-family: 'Montserrat-Regular';
  color: ${theme.COLOR_PINK};
`;

export const CDBottomBodyWrapper = styled(View)`
  padding: 15px ${horizontalPadding} 20px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const CDRowLeftFlex = styled(View)`
  flex: 1;
  align-items: flex-start;
`;

export const CDRowCenterFlex = styled(View)`
  padding: 0px 10px;
  flex: 1;
  align-items: center;
`;

export const CDRowRightFlex = styled(View)`
  flex: 1;
  align-items: flex-end;
`;

export const CDVehicleInfoWrapper = styled(View)`
  padding: 15px ${horizontalPadding};
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const CDVehicleImage = styled(Image)`
  width: ${theme.SCREEN_WIDTH / 10}px;
  height: ${theme.SCREEN_WIDTH / 15}px;
  resize-mode: contain;
`;

export const CDFooterWrapper = styled(View)`
  background-color: ${theme.COLOR_GRAY_HEAVY};
  padding: 15px ${horizontalPadding};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;