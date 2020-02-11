import {
  View,
  Image,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import styled from 'styled-components';

import theme from '../../../styles/theme.style';

export const Container = styled(View)`
  background-color: ${theme.COLOR_WHITE};
`;

export const AppLogo = styled(Image)`
  align-self: center;
  margin: 80px 0px;
  resize-mode: contain;
`;

export const ContentContainer = styled(View)`
  padding: 0px 30px;
`;

export const LabelHeading = styled(Text)`
  color: ${theme.COLOR_BLUE};
  font-size: ${theme.FONT_SIZE_LARGE}px;
  font-family: 'Montserrat-Bold';
`;

export const FormContainer = styled(View)`
  margin: 20px 0px;
`;

export const InputWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 2px;
  border-bottom-color: ${theme.COLOR_LIGHT_BLUE};
`;

export const FormGroup = styled(View)`
  margin: 10px 0px;
`;

export const Input = styled(TextInput)`
  font-family: 'Montserrat-Light';
  font-size: 16px;
  padding: 7px 0px;
  color: ${theme.COLOR_BLACK};
  flex: 1;
`;

export const LabelNumberPrefix = styled(Text)`
  color: ${theme.COLOR_BLACK};
  font-family: 'Montserrat-Light';
  font-size: 16px;
  margin-right: 10px;
`;

export const InputDate = styled(DatePicker)`
  width: ${Dimensions.get('window').width - 60}px;
`;

export const inputDatePicker = {
  customStyles: {
    dateInput: {
      borderWidth: 0,
      borderBottomWidth: 2,
      borderBottomColor: theme.COLOR_LIGHT_BLUE,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingVertical: 7,
      paddingHorizontal: 0,
    },
    dateText: {
      fontFamily: 'Montserrat-Light',
      fontSize: 16,
      color: theme.COLOR_BLACK
    },
    placeholderText: {
      fontFamily: 'Montserrat-Light',
      fontSize: 16,
      color: theme.COLOR_NORMAL_FONT + '70'
    }
  }
}

export const LabelError = styled(Text)`
  color: ${theme.COLOR_RED};
  font-size: 12px;
  line-height: 15px;
  font-family: 'Montserrat-Medium';
  margin-top: 5px;
`;

export const TermsAndConditionContainer = styled(View)`
  margin: 40px 0px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CheckboxButton = styled(TouchableOpacity)`
  height: 25px;
  width: 25px;
  border-radius: 5px;
  border-color: #a7a7a7;
  border-width: 1px;
  elevation: 2;
  justify-content: center;
  align-items: center;
  background-color: ${theme.COLOR_WHITE};
`;

export const CheckboxCheckImage = styled(Image)`
  height: 10px;
  width: 10px;
  resize-mode: cover;
`;

export const TermsTextWrapper = styled(View)`
  padding-left: 15px;
`;

export const TermsRow = styled(View)`
  flex-direction: row;
`;

export const LabelNormal = styled(Text)`
  font-size: ${theme.FONT_SIZE_SMALL}px;
  color: ${theme.COLOR_NORMAL_FONT};
  font-family: 'Montserrat-Light';
`;

export const TermsAndConditionButton = styled(TouchableOpacity)`
  border-bottom-color: ${theme.COLOR_NORMAL_FONT + '70'};
  border-bottom-width: 1px;
`;

export const SignUpButtonWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const SignUpButton = styled(TouchableOpacity)`
  background-color: ${theme.COLOR_BLUE};
  border-radius: 15px;
  padding: 0px 15px;
  align-items: center;
  justify-content: center;
  width: ${Dimensions.get('window').width / 2}px;
  max-width: 300px;
  height: 45px;
`;

export const LabelSignUp = styled(Text)`
  color: ${theme.COLOR_WHITE};
  font-family: 'Montserrat-Medium';
  font-size: 16px;
  padding: 11px 0px;
`;

export const FooterWrapper = styled(View)`
  margin: 50px 0px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;