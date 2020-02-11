import {
  ScrollView,
  ImageBackground,
  Dimensions,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import styled from 'styled-components';
import { loginStyles } from '../../../config/responsive';
import theme from '../../../styles/theme.style';

export const PageWrapper = styled(ScrollView)``;

export const LoginBackgroundImage = styled(ImageBackground)`
  flex: 1;
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
  padding: 0px ${loginStyles().paddingHorizontal}px;
`;

export const TapTabLogoWrapper = styled(View)`
  height: 40%;
  justify-content: center;
  align-items: flex-end;
`;

export const TapTabLogo = styled(Image)`
  width: ${Dimensions.get('window').width / 2.5}px;
  resize-mode: contain;
`;

export const FormContainer = styled(View)`
  flex: 1;
  padding-top: ${loginStyles().padding}px;
`;

export const FieldContainer = styled(View)`
  margin-right: 20px;
`;

export const FieldWrapper = styled(View)`
  background-color: rgba(255, 255, 255, 0);
  border-bottom-width: 2px;
  border-bottom-color: ${theme.COLOR_WHITE};
  padding: ${loginStyles().paddingVertical}px 0px;
  margin: ${loginStyles().marginVertical}px 0px;
  flex-direction: row;
  align-items: center;
`;

export const FieldIcon = styled(Image)`
  background-color: rgba(255, 255, 255, 0);
  width: 22px;
  resize-mode: contain;
`;

export const InputWrapper = styled(View)`
  flex: 1;
`;

export const Input = styled(TextInput)`
  background-color: rgba(255, 255, 255, 0);
  padding: 5px 20px;
  color: ${theme.COLOR_NORMAL_FONT};
  font-size: ${loginStyles().fontSize}px;
  font-family: 'Montserrat-Light';
`;

export const ShowHideButton = styled(TouchableOpacity)``;

export const ShowHideIcon = styled(Image)`
  width: 22px;
  resize-mode: contain;
`;

export const ForgotPasswordButton = styled(TouchableOpacity)`
  align-self: flex-start;
`;

export const LabelForgotPassword = styled(Text)`
  color: ${theme.COLOR_WHITE};
  font-size: ${theme.FONT_SIZE_SMALL}px;
  font-family: 'Montserrat-Regular';
  margin-top: 5px;
`;

export const LoginButton = styled(TouchableOpacity)`
  background-color: ${theme.COLOR_BLUE};
  border-radius: 15px;
  padding: 0px 15px;
  max-width: 200px;
  min-width: 110px;
  height: 45px;
  flex-direction: row;
  justify-content: space-between;
  margin: ${loginStyles().marginTop}px 0px 7px;
`;

export const LoginButtonView = styled(View)`
  background-color: ${theme.COLOR_BLUE};
  border-radius: 15px;
  padding: 0px 15px;
  max-width: 200px;
  min-width: 110px;
  height: 45px;
  flex-direction: row;
  justify-content: space-between;
  margin: ${loginStyles().marginTop}px 0px 7px;
`;

export const LabelLogin = styled(Text)`
  color: ${theme.COLOR_WHITE};
  font-family: 'Montserrat-Medium';
  font-size: 16px;
  padding: 11px 0px;
`;

export const LoginButtonIcon = styled(Image)`
  margin: 15px 0px;
  height: 14px;
  resize-mode: contain;
`;

export const LabelNormal = styled(Text)`
  color: ${theme.COLOR_WHITE};
  font-size: ${theme.FONT_SIZE_SMALL}px;
  font-family: 'Montserrat-Regular';
`;

export const SignupButton = styled(TouchableOpacity)`
  align-self: flex-start;
`;

export const LabelSignup = styled(Text)`
  color: ${theme.COLOR_WHITE};
  font-family: 'Montserrat-Bold';
`;