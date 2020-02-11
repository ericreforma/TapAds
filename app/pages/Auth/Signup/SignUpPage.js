import React, { Component } from 'react';
import {
	ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';

import NavigationService from '../../../services/navigation';
import theme from '../../../styles/theme.style';
import { AuthController, NetworkController } from '../../../controllers';
import { SignupAction } from '../../../redux/actions/signup.action';
import { URL, IMAGES } from '../../../config/variables';
import { IfElse, Then, Else } from '../../../components/IfElse';
import Loader from '../../../components/Loader';

// modals for terms and condition
import TermsAndCondition from '../../../components/Modal/signup/TermsAndCondition';
import {
	Container,
	AppLogo,
	ContentContainer,
	LabelHeading,
	FormGroup,
	InputWrapper,
	LabelNumberPrefix,
	Input,
	inputDatePicker,
	InputDate,
	TermsAndConditionContainer,
	CheckboxButton,
	CheckboxCheckImage,
	TermsTextWrapper,
	TermsRow,
	TermsAndConditionButton,
	SignUpButtonWrapper,
	SignUpButton,
	LabelSignUp,
	FooterWrapper,
	LabelNormal,
	LabelError,
	FormContainer
} from './SignUpPageStyledComponents';
import { SignUpText } from '../../../lang/en/SignUpPage';

const url = {
	privacyPolicy: `${URL.SERVER_MAIN}${URL.TERMS_AND_COND.PRIVACY_POLICY}`,
	termsOfUse: `${URL.SERVER_MAIN}${URL.TERMS_AND_COND.TERMS_OF_USE}`
};

class SignUpPage extends Component {
	constructor() {
		super();
		this.state = {
			inputData: [
				{
					placeholder: 'Name',
					dataName: 'name',
					error: '',
					next: 'username',
					ypos: 0,
				},{
					placeholder: 'User Name',
					dataName: 'username',
					error: '',
					next: 'birthdate',
					ypos: 0,
				},{
					placeholder: 'Birthdate',
					dataName: 'birthdate',
					error: '',
					next: 'location',
					ypos: 0,
				},{
					placeholder: 'Location',
					dataName: 'location',
					error: '',
					next: 'contact_number',
					ypos: 0,
				},{
					placeholder: 'Contact Number',
					dataName: 'contact_number',
					error: '',
					next: 'email',
					ypos: 0,
				},{
					placeholder: 'E-mail Address',
					dataName: 'email',
					error: '',
					next: 'password',
					ypos: 0,
				},{
					placeholder: 'Password',
					dataName: 'password',
					error: '',
					next: 'password_confirmation',
					ypos: 0,
				},{
					placeholder: 'Confirm Password',
					dataName: 'password_confirmation',
					error: '',
					next: 'submit',
					ypos: 0,
				}
			],

			// signup input values
			name: '',
			username: '',
			birthdate: '',
			contact_number: '',
			location: '',
			email: '',
			password: '',
			confirmPassword: '',

			// modal
			termsAndConditionModal: false,
			modalTitle: '',
			modalUri: '',

			signUpLoader: false,

			//terms of use
			privacyPolicyCheckbox: false
		};
	}

	failedFlashMessage = (description) => {
		this.dropDownAlertRef.alertWithType(
			'error',
			'Error!',
			description
		);
	}

	inputValueOnChangeText = item => value => {
		if(item.dataName !== 'contact_number') {
			this.setState({
				[item.dataName]: value
			});
		} else {
			if(value.length <= 10) {
				this.setState({
					[item.dataName]: value
				});
			}
		}

		if(item.dataName === 'birthdate')
			this[item.next].focus();
	}

	signUpButtonOnSubmit = () => {
		this.setState({signUpLoader: true});
		const userData = {};

		this.state.inputData.map(i => {
			userData[i.dataName] = this.state[i.dataName];
		});

		console.log(userData);

		NetworkController.checkPing()
		.then(() => {
			if(this.state.privacyPolicyCheckbox) {
				AuthController.registerValidation(JSON.stringify(userData))
				.then(res => {
					if(res.data.status) {
						this.props.dispatchInfo(userData);
					} else {
						this.setState({signUpLoader: false});
						const {errors} = res.data;
						
						const newData = this.state.inputData.map(i => {
							const err = errors[i.dataName];
							if(err) {
								i.error = err.join('\n');
								if(i.dataName === 'password')
									errors['password_confirmation'] = err;
							} else {
								i.error = '';
							} 

							return i;
						});

						this.setState({inputData: newData});
						this.inputOnFocus(0);
					}
				})
				.catch(error => {
					console.log(error)
					console.log(error.response);
					this.setState({signUpLoader: false});
					// const errArr = error.response.data;
					
					// let msg = '';
	
					// errArr.map((item, i) => {
					// 	msg += errArr[i] + '\n';
					// });
	
					// this.failedFlashMessage(`Please check the following fields:\n${msg}Thank you!`);
				});
			} else {
				this.setState({signUpLoader: false});
				this.failedFlashMessage('You must accept the Terms of Use and Privacy Policy to proceed');
			}
		})
		.catch(error => {
			this.setState({signUpLoader: false});
			console.log(error);
			this.failedFlashMessage(error.message);
		});
	}

	termsAndConditionButtonOnPress = (type, modalUri) => () => {
		const types = ['Terms of Use', 'Privacy Policy'];
		this.setState({
			modalTitle: types[type],
			modalUri
		});
		this.termsAndConditionModalToggle();
	}

	termsAndConditionModalToggle = () => {
		this.setState({termsAndConditionModal: !this.state.termsAndConditionModal});
	}

	inputOnSubmit = nextRef => () => {
		if(nextRef === 'birthdate') {
			this[nextRef].onPressDate();
		} else {
			if(nextRef === 'submit') {
				this.signUpButtonOnSubmit();
			} else {
				this[nextRef].focus();
			}
		}
	}

	inputOnLayout = dataName => ({nativeEvent}) => {
		const {y} = nativeEvent.layout;
		const newInputData = this.state.inputData.map(i => {
			if(i.dataName === dataName)
				i.ypos = y + 230;
			return i;
		});
		this.setState({inputData: newInputData});
	}

	inputOnFocus = y => () => {
		this.scrollViewRef.scrollTo(y);
	}

	render() {
		return (
			<Container>
				<TermsAndCondition
					modalVisible={this.state.termsAndConditionModal}
					modalToggle={this.termsAndConditionModalToggle}
					title={this.state.modalTitle}
					uri={this.state.modalUri}
				/>

				<ScrollView
					ref={ref => this.scrollViewRef = ref}
					overScrollMode='never'
					showsVerticalScrollIndicator={false}
				>
					<AppLogo source={IMAGES.LOGO.TAPTAB} />

					<ContentContainer>
						<LabelHeading>
							{SignUpText.Heading}
						</LabelHeading>

						<FormContainer>
							{this.state.inputData.map((input, index) =>
								<IfElse key={index} condition={input.dataName === 'birthdate'}>
									<Then>
										<FormGroup>
											<InputDate
												mode="date"
												showIcon={false}
												format="YYYY-MM-DD"
												androidMode="spinner"
												cancelBtnText="Cancel"
												confirmBtnText="Confirm"
												date={this.state.birthdate}
												placeholder={input.placeholder}
												ref={ref => this[input.dataName] = ref}
												customStyles={inputDatePicker.customStyles}
												onDateChange={this.inputValueOnChangeText(input)} />

											<IfElse condition={input.error}>
												<Then>
													<LabelError>
														{input.error}
													</LabelError>
												</Then>
											</IfElse>
										</FormGroup>
									</Then>

									<Else>
										<FormGroup
											onLayout={this.inputOnLayout(input.dataName)}>
											<InputWrapper>
												<IfElse condition={input.dataName === 'contact_number'}>
													<Then>
														<LabelNumberPrefix>
															{SignUpText.NumberPrefix}
														</LabelNumberPrefix>
													</Then>
												</IfElse>

												<Input
													ref={ref => this[input.dataName] = ref}
													value={this.state[input.dataName]}
													keyboardType={input.dataName == 'contact_number' ? 'number-pad' : 'default'}
													secureTextEntry={input.dataName == 'password' || input.dataName == 'password_confirmation' ? true : false}
													placeholder={input.placeholder}
													placeholderTextColor={theme.COLOR_NORMAL_FONT + '70'}
													onSubmitEditing={this.inputOnSubmit(input.next)}
													onFocus={this.inputOnFocus(input.ypos)}
													returnKeyType={input.next === 'submit' ? 'send' : 'next'}
													onChangeText={this.inputValueOnChangeText(input)} />
											</InputWrapper>

											<IfElse condition={input.error}>
												<Then>
													<LabelError>
														{input.error}
													</LabelError>
												</Then>
											</IfElse>
										</FormGroup>
									</Else>
								</IfElse>
							)}
						</FormContainer>

						<TermsAndConditionContainer>
							<CheckboxButton
								onPress={() =>
									this.setState({
										privacyPolicyCheckbox: !this.state.privacyPolicyCheckbox
									})
								}>
								<IfElse condition={this.state.privacyPolicyCheckbox}>
									<Then>
										<CheckboxCheckImage
											source={IMAGES.ICONS.check_blue} />
									</Then>
								</IfElse>
							</CheckboxButton>

							<TermsTextWrapper>
								<TermsRow>
									<LabelNormal>
										{SignUpText.TermsFirstRow}
									</LabelNormal>

									<TermsAndConditionButton
										onPress={this.termsAndConditionButtonOnPress(0, url.termsOfUse)}>
										<LabelNormal>
											{SignUpText.Buttons.Terms}
										</LabelNormal>
									</TermsAndConditionButton>
								</TermsRow>
								
								<TermsRow>
									<LabelNormal>
										{SignUpText.TermsSecondRow}
									</LabelNormal>

									<TermsAndConditionButton
										onPress={this.termsAndConditionButtonOnPress(1, url.privacyPolicy)}>
										<LabelNormal>
											{SignUpText.Buttons.Privacy}
										</LabelNormal>
									</TermsAndConditionButton>
								</TermsRow>
							</TermsTextWrapper>
						</TermsAndConditionContainer>

						<SignUpButtonWrapper>
							<SignUpButton
								onPress={this.signUpButtonOnSubmit}
								disabled={this.state.signUpLoader}>
								<Loader loading={this.state.signUpLoader}>
									<LabelSignUp>
										{SignUpText.Buttons.SignUp}
									</LabelSignUp>
								</Loader>
							</SignUpButton>
						</SignUpButtonWrapper>

						<FooterWrapper>
							<LabelNormal>
								{SignUpText.alreadyMember}
							</LabelNormal>

							<TermsAndConditionButton
								onPress={() => NavigationService.navigate('Login')}>
								<LabelNormal>
									{SignUpText.Buttons.Login}
								</LabelNormal>
							</TermsAndConditionButton>

							<LabelNormal>
								{SignUpText.instead}
							</LabelNormal>
						</FooterWrapper>
					</ContentContainer>
				</ScrollView>
			
				<DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
			</Container>
		);
  }
}

const mapDispatchToProps = (dispatch) => ({
	dispatchInfo: info => dispatch(SignupAction.info({info}))
});

export default connect(null, mapDispatchToProps)(SignUpPage);
