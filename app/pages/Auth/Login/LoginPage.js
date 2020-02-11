import React, {
  useState,
  useEffect,
  useRef
} from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, ScrollView } from 'react-native';
import {
  PageWrapper,
  LoginBackgroundImage,
  TapTabLogoWrapper, 
  TapTabLogo,
  FormContainer,
  FieldContainer,
  FieldWrapper,
  FieldIcon,
  InputWrapper,
  Input,
  ShowHideButton,
  ShowHideIcon,
  ForgotPasswordButton,
  LabelForgotPassword,
  LoginButton,
  LabelLogin,
  LoginButtonIcon,
  LabelNormal,
  SignupButton,
  LabelSignup,
  LoginButtonView
} from './LoginPageStyledComponents';

import { IMAGES } from '../../../config/variables';
import theme from '../../../styles/theme.style';
import { IfElse, Then, Else } from '../../../components/IfElse';
import NavigationService from '../../../services/navigation';
import { AuthAction } from '../../../redux/actions/auth.action';

const LoginPage = props => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const scrollRef = useRef(null);
  const [passShow, setPassShow] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [yPosition, setYPosition] = useState(0);

  const emailSelectionTextInput = selection => () => {
		const start = selection;
		const end = selection;
    usernameRef.current.setNativeProps({ text: username, selection:{start, end} });
    inputOnFocus();
  }

  const inputOnFocus = () => {
    console.log(yPosition);
    console.log(scrollRef);
    scrollRef.current.scrollTo({ y: yPosition - 10 });
  }
  
  const loginSubmit = () => {
    props.loginPressed(username, password);
  }

  const layoutViewDone = ({nativeEvent}) => {
    console.log(nativeEvent.layout.y);
    setYPosition(nativeEvent.layout.y);
  }

  return (
    <ScrollView
      ref={scrollRef}
      scrollEnabled={false}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}>
      <LoginBackgroundImage
        resizeMode="stretch"
        source={IMAGES.BG_LOGIN_PAGE}>
        <TapTabLogoWrapper>
          <TapTabLogo
            source={IMAGES.LOGO.TAPTAB} />
        </TapTabLogoWrapper>

        <FormContainer
          onLayout={layoutViewDone}>
          <FieldContainer>
            <FieldWrapper>
              <FieldIcon
                source={IMAGES.ICONS.LOGIN_USERNAME} />

              <InputWrapper>
                <Input
                  ref={usernameRef}
                  returnKeyType="next"
                  placeholder="Email or Username"
                  onBlur={emailSelectionTextInput(0)}
                  placeholderTextColor={theme.COLOR_WHITE}
                  onFocus={emailSelectionTextInput(username.length)}
                  onSubmitEditing={() => passwordRef.current.focus()}
                  onChangeText={val => setUsername(val)} />
              </InputWrapper>
            </FieldWrapper>
            
            <FieldWrapper>
              <FieldIcon
                source={IMAGES.ICONS.LOGIN_PASSWORD} />

              <InputWrapper>
                <Input
                  ref={passwordRef}
                  returnKeyType="send"
                  placeholder="Password"
                  onFocus={inputOnFocus}
                  secureTextEntry={passShow}
                  placeholderTextColor={theme.COLOR_WHITE}
                  onChangeText={val => setPassword(val)}
                  onSubmitEditing={loginSubmit} />
              </InputWrapper>

              <ShowHideButton
                onPress={() => setPassShow(!passShow)}
                activeOpacity={0.9}>
                <IfElse condition={passShow}>
                  <Then>
                    <ShowHideIcon
                      source={IMAGES.ICONS.PASSWORD_HIDE} />
                  </Then>
                  
                  <Else>
                    <ShowHideIcon
                      source={IMAGES.ICONS.PASSWORD_SHOW} />
                  </Else>
                </IfElse>
              </ShowHideButton>
            </FieldWrapper>
          </FieldContainer>
        
          <ForgotPasswordButton
            onPress={() => NavigationService.navigate('ForgotPassword')}>
            <LabelForgotPassword>
              Forgot Password?
            </LabelForgotPassword>
          </ForgotPasswordButton>

          <IfElse condition={props.isLoggingIn}>
            <Then>
              <LoginButtonView>
                <ActivityIndicator color={theme.COLOR_WHITE} />
              </LoginButtonView>
            </Then>

            <Else>
              <IfElse condition={!props.isLoggedIn}>
                <Then>
                  <LoginButton
                    onPress={loginSubmit}>
                    <LabelLogin>
                      Login
                    </LabelLogin>

                    <LoginButtonIcon
                      source={IMAGES.ICONS.LOGIN_ARROW_RIGHT} />
                  </LoginButton>
                </Then>
              </IfElse>
            </Else>
          </IfElse>

          <LabelNormal>
            Don't have an account?
          </LabelNormal>

          <SignupButton
            onPress={() => NavigationService.navigate('SignUp')}>
            <LabelSignup>
              Sign up
            </LabelSignup>
          </SignupButton>
        </FormContainer>
      </LoginBackgroundImage>
    </ScrollView>
  )
}

const mapStateToProps = (state) => ({
	isLoggingIn: state.loginReducer.isLoggingIn,
	isLoggedIn: state.loginReducer.isLoggedIn
});

const mapDispatchToProps = (dispatch) => ({
	loginPressed: (email, password) => dispatch(AuthAction.login(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);