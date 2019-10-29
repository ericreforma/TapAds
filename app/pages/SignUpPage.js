import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';

import NavigationService from '../services/navigation';
import theme from '../styles/theme.style';
import DatePicker from 'react-native-datepicker';
import { AuthController, NetworkController } from '../controllers';
import { SignupAction } from '../redux/actions/signup.action';
import { URL, IMAGES } from '../config/variables';

// modals for terms and condition
import TermsAndCondition from '../components/Modal/signup/TermsAndCondition';

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
				},{
					placeholder: 'User Name',
					dataName: 'username',
				},{
					placeholder: 'Birthdate',
					dataName: 'birthdate'
				},{
					placeholder: 'Location',
					dataName: 'location'
				},{
					placeholder: 'Contact Number',
					dataName: 'contact_number'
				},{
					placeholder: 'E-mail Address',
					dataName: 'email'
				},{
					placeholder: 'Password',
					dataName: 'password'
				},{
					placeholder: 'Confirm Password',
					dataName: 'password_confirmation'
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

			loader: false,

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

	inputValueOnChangeText = (dataname) => (value) => {
		this.setState({
			[dataname]: value
		});
	}

	signUpButtonOnSubmit = () => {
		this.setState({loader: true});
		const userData = {};

		this.state.inputData.map(i => {
			userData[i.dataName] = this.state[i.dataName];
		});

		NetworkController.checkPing()
		.then(() => {
			if(this.state.privacyPolicyCheckbox) {
				AuthController.registerValidation(JSON.stringify(userData))
				.then((e) => {
					this.props.dispatchInfo(userData);
				})
				.catch((error) => {
					this.setState({loader: false});
					const errArr = error.response.data;
					
					let msg = '';
	
					errArr.map((item, i) => {
						msg += errArr[i] + '\n';
					});
	
					this.failedFlashMessage(`Please check the following fields:\n${msg}Thank you!`);
				});
			} else {
				this.setState({loader: false});
				this.failedFlashMessage('You must accept the Terms of Use and Privacy Policy to proceed');
			}
		})
		.catch(error => {
			this.setState({loader: false});
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

	render() {
		return (
			<View
				style={{
					backgroundColor: theme.COLOR_WHITE
				}}
			>
				<TermsAndCondition
					modalVisible={this.state.termsAndConditionModal}
					modalToggle={this.termsAndConditionModalToggle}
					title={this.state.modalTitle}
					uri={this.state.modalUri}
				/>

				<ScrollView
					overScrollMode='never'
					showsVerticalScrollIndicator={false}
				>
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							paddingVertical: 80
						}}
					>
						<Image
							source={require('../assets/image/app_logo.png')}
						/>
					</View>

					<View
						style={{
							// paddingHorizontal: Dimensions.get('window').width / 10
							paddingHorizontal: 30
						}}
					>
						<Text
							style={{
								color: theme.COLOR_BLUE,
								fontSize: theme.FONT_SIZE_LARGE,
								fontFamily: 'Montserrat-Bold'
							}}
						>
							Get Started
						</Text>

						<View
							style={{
								marginVertical: 20
							}}
						>
							{this.state.inputData.map((input, index) =>
								input.dataName == 'birthdate'
								? <DatePicker
									key={index}
									style={{
										// width: Dimensions.get('window').width - (Dimensions.get('window').width * 2 / 10),
										width: Dimensions.get('window').width - 60,
										marginVertical: 10
									}}
									date={this.state.birthdate}
									mode="date"
									showIcon={false}
									placeholder={input.placeholder}
									format="YYYY-MM-DD"
									confirmBtnText="Confirm"
									cancelBtnText="Cancel"
									androidMode="spinner"
									customStyles={{
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
									}}
									onDateChange={this.inputValueOnChangeText(input.dataName)}
								/>
								: <View key={index}>
									<TextInput
										style={[
											{
												borderBottomWidth: 2,
												borderBottomColor: theme.COLOR_LIGHT_BLUE,
												fontFamily: 'Montserrat-Light',
												fontSize: 16,
												paddingVertical: 7,
												marginVertical: 10,
												paddingHorizontal: 0,
												color: theme.COLOR_BLACK
											}
										]}
										keyboardType={input.dataName == 'contact_number' ? 'number-pad' : 'default'}
										secureTextEntry={input.dataName == 'password' || input.dataName == 'password_confirmation' ? true : false}
										placeholder={input.placeholder}
										placeholderTextColor={theme.COLOR_NORMAL_FONT + '70'}
										onChangeText={this.inputValueOnChangeText(input.dataName)}
									/>
								</View>
							)}
						</View>

						<View
							style={{
								marginBottom: 20,
								marginTop: 40,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<TouchableOpacity
								activeOpacity={0.9}
								style={{
									height: 25,
									width: 25,
									borderRadius: 5,
									borderColor: "#a7a7a7",
									borderWidth: 1,
									elevation: 2,
									justifyContent: 'center',
									alignItems: 'center',
									backgroundColor: theme.COLOR_WHITE
								}}
								onPress={() => this.setState({privacyPolicyCheckbox: !this.state.privacyPolicyCheckbox})}
							>
								{this.state.privacyPolicyCheckbox ? (
									<Image
										style={{
											height: 10,
											width: 10
										}}
										source={IMAGES.ICONS.check_blue}
										resizeMode="cover"
									/>
								) : null}
							</TouchableOpacity>

							<View
								style={{
									paddingLeft: 15
								}}
							>
								<View
									style={{
										flexDirection: 'row'
									}}
								>
									<Text
										style={{
											fontSize: theme.FONT_SIZE_SMALL,
											color: theme.COLOR_NORMAL_FONT,
											fontFamily: 'Montserrat-Light'
										}}
									>I agree to the </Text>

									<TouchableOpacity
										style={{
											borderBottomColor: theme.COLOR_NORMAL_FONT + '70',
											borderBottomWidth: 1,
										}}
										onPress={this.termsAndConditionButtonOnPress(0, url.termsOfUse)}
									>
										<Text
											style={{
												fontSize: theme.FONT_SIZE_SMALL,
												color: theme.COLOR_NORMAL_FONT,
												fontFamily: 'Montserrat-Light'
											}}
										>
											Terms of Use
										</Text>
									</TouchableOpacity>
								</View>

								<View
									style={{
										flexDirection: 'row',
									}}
								>
									<Text
										style={{
											fontSize: theme.FONT_SIZE_SMALL,
											color: theme.COLOR_NORMAL_FONT,
											fontFamily: 'Montserrat-Light'
										}}
									>and </Text>

									<TouchableOpacity
										style={{
											borderBottomColor: theme.COLOR_NORMAL_FONT + '70',
											borderBottomWidth: 1,
										}}
										onPress={this.termsAndConditionButtonOnPress(1, url.privacyPolicy)}
									>
										<Text
											style={{
												fontSize: theme.FONT_SIZE_SMALL,
												color: theme.COLOR_NORMAL_FONT,
												fontFamily: 'Montserrat-Light'
											}}
										>
											Privacy Policy
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>

						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								marginBottom: 20
							}}
						>
							<TouchableOpacity
								style={{
									backgroundColor: theme.COLOR_BLUE,
									borderRadius: 15,
									paddingHorizontal: 15,
									alignItems: 'center',
									justifyContent: 'center',
									width: Dimensions.get('window').width / 2,
									maxWidth: 300,
									height: 45,
								}}
								onPress={this.signUpButtonOnSubmit}
								disabled={this.state.loader}
							>
								{this.state.loader ? (
									<ActivityIndicator color="#fff" />
								) : (
									<Text
										style={{
											color: theme.COLOR_WHITE,
											fontFamily: 'Montserrat-Medium',
											fontSize: 16,
											paddingVertical: 11
										}}
									>
										Sign Up
									</Text>
								)}
							</TouchableOpacity>
						</View>

						<View
							style={{
								marginVertical: 50,
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<Text
								style={{
									fontSize: theme.FONT_SIZE_SMALL,
									color: theme.COLOR_NORMAL_FONT,
									fontFamily: 'Montserrat-Light'
								}}
							>Already a member? </Text>
							<TouchableOpacity
								style={{
									borderBottomColor: theme.COLOR_NORMAL_FONT + '70',
									borderBottomWidth: 1,
								}}
								onPress={() => NavigationService.navigate('Login')}
							>
								<Text
									style={{
										fontSize: theme.FONT_SIZE_SMALL,
										color: theme.COLOR_NORMAL_FONT,
										fontFamily: 'Montserrat-Light'
									}}
								>
									Log in
								</Text>
							</TouchableOpacity>
							<Text
								style={{
									fontSize: theme.FONT_SIZE_SMALL,
									color: theme.COLOR_NORMAL_FONT,
									fontFamily: 'Montserrat-Light'
								}}
							> instead.</Text>
						</View>
					</View>
				</ScrollView>
			
				<DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
			</View>
		);
  }
}

const mapDispatchToProps = (dispatch) => ({
	// login: (email, password) => dispatch(AuthAction.login(email, password))
	dispatchInfo: info => dispatch(SignupAction.info({info}))
});

export default connect(null, mapDispatchToProps)(SignUpPage);
