import styled from 'styled-components';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import theme from '../../../styles/theme.style';

const imageDimension = theme.SCREEN_WIDTH / 7;

export const MessageListContainer = styled(View)`
  margin: 20px 15px 70px;
`;

export const MessageListLabelWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const MessageListBodyContainer = styled(View)`
  border-radius: 15px;
  padding: 10px;
  background-color: ${theme.COLOR_WHITE};
`;

export const MessageListClientImageWrapper = styled(View)`
  width: ${imageDimension}px;
  height: ${imageDimension}px;
  border-radius: ${imageDimension}px;
  background-color: ${theme.COLOR_GRAY_HEAVY};
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const MessageListClientImage = styled(Image)`
  width: ${imageDimension}px;
  height: ${imageDimension}px;
  border-radius: ${imageDimension}px;
  resize-mode: cover;
`;

export const MessageListClientOnlineIndicator = styled(View)`
  position: absolute;
  right: -5px;
  bottom: -3px;
  background-color: ${theme.COLOR_GREEN};
  height: 20px;
  width: 20px;
  border-radius: 10px;
  border-width: 3px;
  border-color: ${theme.COLOR_WHITE};
`;

export const MessageListChatInfoWrapper = styled(View)`
  flex: 1;
  margin-left: 15px;
`;

export const MessageListChatInfoTopWrapper = styled(View)`
  flex-direction: row;
  align-items: flex-start;
`;

export const MessageListChatInfoTopCampaignWrapper = styled(View)`
  flex: 1;
`;

export const MessageListChatInfoNotification = styled(View)`
  width: 25px;
  height: 25px;
  border-radius: 20px;
  background-color: ${theme.COLOR_RED};
  margin-left: 15px;
  margin-top: 3px;
  align-items: center;
  justify-content: center;
`;

export const MessageListChatInfoNotificationLabel = styled(Text)`
  font-family: 'Montserrat-Regular';
  font-size: 12px;
  color: ${theme.COLOR_WHITE};
`;

export const MessageListChatInfoBottomWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const MessageListChatInfoMessageWrapper = styled(View)`
  flex: 1;
  margin-right: 10px;
`;

export const MessageListNoConversationWrapper = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const MessageListConversationWrapper = styled(TouchableOpacity)`
  margin: 7px 0px;
  border-radius: 15px;
  padding: 15px 20px;
  background-color: ${theme.COLOR_WHITE};
  flex-direction: row;
  align-items: center;
  elevation: 3;
`;

export const MessageListConversationLoader = styled(ActivityIndicator)`
  height: 75px;
`;