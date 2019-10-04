import React, { Component } from 'react';
import {
	Modal,
	View,
	TextInput,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import { UserController } from '../../../controllers/UserController';

import {
	CommonText,
	LabelText
} from '../../Text';
import theme from '../../../styles/theme.style';

export default class BankDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			accountNumber: '',
			password: '',
			submitLoader: false,
		};
	}

	submitAccountDetails = () => {
		var { accountNumber,
			password } = this.state,
			form = { accountNumber, password },
			errorsAccountNumber = false,
			errorsPassword = false,
			errorsAccountNumberLength = false;

		console.log(accountNumber.toString().length);

		if(accountNumber === '') {
			errorsAccountNumber = true;
		}

		if(password === '') {
			errorsPassword = true;
		}

		if(accountNumber.toString().length < 9
			|| accountNumber.toString().length > 16) {
			errorsAccountNumberLength = true;
		}

		if(!errorsAccountNumber && !errorsPassword) {
			if(errorsAccountNumberLength) {
				this.dropDownAlertRef.alertWithType(
					'error',
					'Account number invalid!',
					'Account number must be 9-15 digits long.'
				);
			} else {
				this.toggleSubmitLoader();
				UserController.request.update.bankDetails(form)
				.then(res => {
					if(res.data) {
						this.props.getUserProfile();
					} else {
						this.dropDownAlertRef.alertWithType(
							'error',
							'Unauthorized password!',
							'You have entered a wrong password\nPlease try again and enter a correct one\nThank you!'
						);
					}
					this.toggleSubmitLoader();
				})
				.catch(error => {
					console.log(error);
					this.toggleSubmitLoader();
					this.dropDownAlertRef.alertWithType(
						'error',
						'Error saving account number!',
						'We apologize for the inconvenience,\nplease try again later'
					);
				});
			}
		} else {
			const descAccountNumber = errorsAccountNumber ? 'Account Number' : '';
			const descPassword = errorsPassword ? 'your current Password' : '';
			const divider = errorsAccountNumber && errorsPassword ? ' and ' : '';
			const description = [descAccountNumber, divider, descPassword].join('');
			this.dropDownAlertRef.alertWithType(
				'error',
				'Please fill up the following fields!',
				`Hi! In order to proceed you need to fill up \n${description}`
			);
		}
	}

	toggleSubmitLoader = () => {
		this.setState({ submitLoader: !this.state.submitLoader });
	}

	render() {
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={this.props.modalVisible}
			>
				<View
					style={{
						backgroundColor: theme.COLOR_BLACK + '81',
						padding: 20,
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<View
						style={{
							width: '100%',
							backgroundColor: theme.COLOR_DIRTY_WHITE,
							padding: 20,
							borderRadius: theme.PAGE_CARD_RADIUS
						}}
					>
						<View
							style={{
								alignSelf: 'center'
							}}
						>
							<LabelText large>Bank Details</LabelText>
						</View>

						<View
							style={{
								marginBottom: 20,
								marginTop: 15
							}}
						>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									marginBottom: 15,
									padding: 15,
									borderRadius: 10,
									backgroundColor: theme.COLOR_GRAY_HEAVY
								}}
							>
								<View
									style={{
										paddingRight: 15
									}}
								>
									<CommonText color="white">
										Account number:
									</CommonText>
								</View>
								
								<LabelText color="white">
									{this.props.accountNumber
										? this.props.accountNumber
										: '----'
									}
								</LabelText>
							</View>

							<View
								style={{
									paddingBottom: 10
								}}
							>
								{this.props.accountNumber ? (
									<CommonText>
										{'If you wish to change your current account number.\nPlease proceed and fill up the field below:'}
									</CommonText>
								) : (
									<CommonText>
										{'Currently, you presented no account number.\nIn order to withdraw any earnings, please proceed and fill up the field below:'}
									</CommonText>
								)}
							</View>

							<TextInput
								style={[
									{
										borderBottomWidth: 2,
										borderBottomColor: theme.COLOR_LIGHT_BLUE,
										fontFamily: 'Montserrat-Light',
										fontSize: 15,
										paddingVertical: 7,
										marginVertical: 10,
										paddingHorizontal: 0,
										color: theme.COLOR_BLACK
									}
								]}
								placeholder="Account number"
								keyboardType="number-pad"
								onChangeText={accountNumber => this.setState({accountNumber})}
								placeholderTextColor={theme.COLOR_NORMAL_FONT + '50'}
							/>

							<TextInput
								style={[
									{
										borderBottomWidth: 2,
										borderBottomColor: theme.COLOR_LIGHT_BLUE,
										fontFamily: 'Montserrat-Light',
										fontSize: 15,
										paddingVertical: 7,
										marginVertical: 10,
										paddingHorizontal: 0,
										color: theme.COLOR_BLACK
									}
								]}
								placeholder="Current Password"
								secureTextEntry={true}
								onChangeText={password => this.setState({password})}
								placeholderTextColor={theme.COLOR_NORMAL_FONT + '50'}
							/>
						</View>
							
						<View
							style={{
								justifyContent: 'space-evenly',
								flexDirection: 'row'
							}}
						>
							<TouchableOpacity
								activeOpacity={0.8}
								style={{
									paddingHorizontal: 30,
									paddingVertical: 10,
									backgroundColor: theme.COLOR_BLUE,
									borderRadius: 15,
									alignSelf: 'center',
								}}
								onPress={this.submitAccountDetails}
								disabled={this.state.submitLoader}
							>
								{this.state.submitLoader ? (
									<ActivityIndicator color="#fff" style={{height: 16}} />
								) : (
									<CommonText color="white">Submit</CommonText>
								)}
							</TouchableOpacity>

							<TouchableOpacity
								activeOpacity={0.8}
								style={{
									paddingHorizontal: 30,
									paddingVertical: 10,
									backgroundColor: theme.COLOR_GRAY_BUTTON,
									borderRadius: 15,
									alignSelf: 'center',
								}}
								onPress={this.props.modalToggle}
								disabled={this.state.submitLoader}
							>
								<CommonText color="white">Close</CommonText>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			
				<DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
			</Modal>
		);
	}
}
