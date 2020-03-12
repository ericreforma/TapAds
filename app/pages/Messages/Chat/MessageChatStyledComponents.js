import styled from 'styled-components';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';
import theme from '../../../styles/theme.style';

export const MessageContainer = styled(View)`
  margin: 20px 15px 0px;
`;

export const MessageHeaderWrapper = styled(View)`
  background-color: ${theme.COLOR_DIRTY_WHITE};
  margin-top: 15px;
  padding: 15px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top-left-radius: ${theme.PAGE_CARD_RADIUS}px;
  border-top-right-radius: ${theme.PAGE_CARD_RADIUS}px;
`;

export const MessageHeaderAddInfoWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const MessageHeaderAddInfoDotWrapper = styled(View)`
  padding: 0px 7px;
`;

export const MessageLoader = styled(ActivityIndicator)`
  height: 150px;
`;

export const MessageBody = styled(View)`
  background-color: ${theme.COLOR_WHITE};
  padding: 0px 10px;
  min-height: ${theme.SCREEN_HEIGHT / 3}px;
`;

export const MessageNoData = styled(View)`
  align-items: center;
  flex: 1;
  padding: 20px 10px;
`;

export const MessageSeeMoreButtonWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
`;

export const MessageSeeMoreButtonLoader = styled(ActivityIndicator)``;

export const MessageSeeMoreButton = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
`;

export const MessageSeeMoreButtonNone = styled(View)`
  height: 15px;
`;

export const MessageClientContainer = styled(View)`
  margin-top: 5px;
  margin-bottom: ${props => props.last ? 20 : 5}px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
`;

export const MessageClientContainerTailWrapper = styled(View)`
  background-color: ${theme.COLOR_GRAY_CHAT};
  position: absolute;
  left: 0px;
  bottom: 0px;
`;

export const MessageClientContainerTail = styled(View)`
  background-color: ${theme.COLOR_WHITE};
  border-bottom-right-radius: 12px;
  width: 21px;
  height: 20px;
`;

export const MessageClientContainerWrapper = styled(View)`
  background-color: ${theme.COLOR_GRAY_CHAT};
  border-radius: 20px;
  border-bottom-left-radius: 0px;
  padding: 10px 20px;
  max-width: 80%;
  z-index: 10;
  margin-left: 20px;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const MessageUserContainer = styled(View)`
  margin-top: 5px;
  margin-bottom: ${props => props.last ? 20 : 5}px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`;


export const MessageUserContainerTailWrapper = styled(View)`
  background-color: ${theme.COLOR_LIGHT_BLUE};
  position: absolute;
  right: 0px;
  bottom: 0px;
`;

export const MessageUserContainerTail = styled(View)`
  background-color: ${theme.COLOR_WHITE};
  border-bottom-left-radius: 12px;
  width: 21px;
  height: 20px;
`;

export const MessageUserContainerWrapper = styled(View)`
  background-color: ${theme.COLOR_LIGHT_BLUE};
  border-radius: 20px;
  border-bottom-right-radius: 0px;
  padding: 10px 20px;
  max-width: 80%;
  z-index: 10;
  margin-right: 20px;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const MessageFooterContainer = styled(View)`
  width: 100%;
  background-color: ${theme.COLOR_GRAY_HEAVY};
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
`;

export const MessageFilesWrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;

export const MessageFilesButton = styled(TouchableOpacity)``;
export const MessageFilesImage = styled(Image)`
  width: 30px;
  height: 30px;
  resize-mode: contain;
`;

export const MessageInputContainer = styled(View)`
  flex: 6;
  flex-direction: row;
  align-items: center;
  padding: 0px 45px 0px 20px;
  border-radius: ${theme.PAGE_CARD_RADIUS + 20}px;
  background-color: ${theme.COLOR_WHITE};
`;

export const MessageInput = styled(TextInput)`
  width: 100%;
  font-size: ${theme.PAGE_CARD_RADIUS}px;
  max-height: ${theme.SCREEN_HEIGHT / 7}px;
  padding-left: 0px;
`;

export const MessageMicButton = styled(TouchableOpacity)`
  position: absolute;
  right: 5px;
`;

export const MessageMicImage = styled(Image)`
  width: 38px;
  height: 38px;
  resize-mode: contain;
`;

export const MessageSendWrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;

export const MessageSendButton = styled(TouchableOpacity)``;

export const MessageSendImage = styled(Image)`
  width: 30px;
  height: 30px;
  resize-mode: contain;
`;