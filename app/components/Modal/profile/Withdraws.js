import React, { Component } from 'react';
import {
	Modal,
	View,
	ScrollView,
	TouchableOpacity,
	Dimensions,
	Image,
	Text,
	ActivityIndicator
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import { UserController } from '../../../controllers/UserController';

import { CommonText, LabelText } from '../../Text';
import { IMAGES } from '../../../config/variables';
import {
	getTotalEarnings,
	numberWithCommas,
	getTotalWithdrawals,
	checkPendingPayment
} from '../../../config/functions';

import theme from '../../../styles/theme.style';

export default class Withdraws extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loaders: []
		};
	}
	
	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.campaigns.length !== prevState.loaders.length) {
			const loaders = Array(nextProps.campaigns.length).fill(false);
			return { loaders };
		} else {
			return null;
		}
	}

	getRemaning = (c) => {
		const earnings = parseFloat(getTotalEarnings(c));
		const withdraws = parseFloat(getTotalWithdrawals(c));
		const pending = parseFloat(this.checkPendingAmount(c).replace(',', ''));
		const diff = earnings - (withdraws + pending);
		return numberWithCommas(diff.toFixed(2));
	}

	checkPendingAmount = (c) => {
		const pendingPayment = checkPendingPayment(c);
		return !pendingPayment ? '0.00' : numberWithCommas(pendingPayment);
	}

	withdrawButtonOnPress = (index, c) => () => {
		const earnings = parseFloat(getTotalEarnings(c));
		const pending = parseFloat(this.checkPendingAmount(c).replace(',', ''));
		const remaining = parseFloat(this.getRemaning(c).replace(',', ''));
		
		if(earnings < 1
			&& remaining < 1
			&& pending < 1) {
			this.errorFlashMessage(
				'Insufficient balance',
				'Your total earnings is not suited for withdrawal.\nStart your campaign to earn more!'
			);
		} else if(pending >= 1 && remaining < 1) {
			this.errorFlashMessage(
				'Withdraw request already sent!',
				'You will receive a notification once the transfer has been made. Thank you!'
			);
		} else if(remaining < 1) {
			this.errorFlashMessage(
				'Maximum withdrawal exceeded!',
				'You withdrawn all your earnings in this campaign.\nStart your campaign to earn more!'
			);
		} else {
			this.toggleLoader(index);
			const campaignId = c.campaignDetails.id;
			const amount = remaining;
			this.submitPayment({amount, campaignId}, index);
		}
	}

	submitPayment = (form, index) => {
		UserController.request.submitPayment(form)
		.then(() => {
			this.props.dispatchUpdateMyList();
			this.toggleLoader(index);
			this.successFlashMessage(
				'Request has been sent!',
				'You will receive a notification once the transfer has been made.\nThank you!'
			);
		})
		.catch(error => {
			this.toggleLoader(index);
			console.log(error);
		});
	}

	toggleLoader = (index) => {
		var { loaders } = this.state;
		loaders[index] = !loaders[index];
		this.setState({ loaders });
	}

	errorFlashMessage = (message, description) => {
		this.dropDownAlertRef.alertWithType(
			'error',
			message,
			description
		);
	}

	successFlashMessage = (message, description) => {
		this.dropDownAlertRef.alertWithType(
			'success',
			message,
			description
		);
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
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<ScrollView
						overScrollMode='never'
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							marginVertical: 30,
						}}
					>
						<View
							style={{
								backgroundColor: theme.COLOR_DIRTY_WHITE,
								width: Dimensions.get('window').width - 50,
								borderRadius: theme.PAGE_CARD_RADIUS,
								overflow: 'hidden',
								padding: 20,
								marginBottom: 60
							}}
						>
							<View
								style={{
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								<LabelText large>Earnings</LabelText>

								<TouchableOpacity
									style={{
										position: 'absolute',
										right: 0,
										top: 0,
									}}
									onPress={this.props.modalToggle}
								>
									<Text
										style={{
											fontFamily: 'Montserrat-Regular',
											fontSize: theme.FONT_SIZE_MEDIUM
										}}
									>X</Text>
								</TouchableOpacity>
							</View>

							<View
								style={{
									marginTop: 20,
								}}
							>
								{this.props.campaigns.map((c, cIdx) =>
									<View
										key={cIdx}
										style={{
											paddingVertical: 7
										}}
									>
										<CardContainer>
											{/* body */}
											<View
												style={{
													paddingVertical: 20,
													marginHorizontal: 20,
													borderBottomWidth: 2,
													borderBottomColor: '#e7e7e7',
												}}
											>
												<View
													style={{
														marginBottom: 15,
														alignItems: 'center'
													}}
												>
													<LabelText>{c.campaignDetails.name}</LabelText>
													<CommonText>{c.client.business_name}</CommonText>
												</View>

												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														alignItems: 'center'
													}}
												>
													<CommonText>Earnings</CommonText>
													<LabelText small>{numberWithCommas(getTotalEarnings(c))}</LabelText>
												</View>

												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														alignItems: 'center'
													}}
												>
													<CommonText>Withdrawn</CommonText>
													<LabelText small>{numberWithCommas(getTotalWithdrawals(c))}</LabelText>
												</View>
												
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														alignItems: 'center'
													}}
												>
													<CommonText>Pending</CommonText>
													<LabelText small>{this.checkPendingAmount(c)}</LabelText>
												</View>

												<View
													style={{
														height: 2,
														width: 80,
														backgroundColor: '#e7e7e7',
														alignSelf: 'flex-end',
														marginTop: 5
													}}
												></View>

												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														alignItems: 'center'
													}}
												>
													<CommonText>Remaining</CommonText>
													<LabelText color="blue">{this.getRemaning(c)}</LabelText>
												</View>
											</View>
											
											<View
												style={{
													paddingVertical: 15,
													paddingRight: 20,
													flexDirection: 'row',
													justifyContent: 'space-between',
													alignItems: 'center'
												}}
											>
												<View
													style={{
														width: 90,
														paddingVertical: 5,
														justifyContent: 'center',
														alignItems: 'center',
														borderTopRightRadius: 20,
														borderBottomRightRadius: 20,
														backgroundColor: theme.COLOR_BLUE
													}}
												>
													<Image
														style={{
															width: 45,
															height: 45,
														}}
														resizeMode="contain"
														source={IMAGES.ICONS.payment_white_icon}
													/>
												</View>
												
												<View
													style={{
														alignItems: 'flex-end',
														flex: 1
													}}
												>
													<LabelText color="blue">PENDING PAYMENT</LabelText>
													<LabelText>{this.checkPendingAmount(c)}</LabelText>
												</View>
											</View>
										
											<View
												style={{
													backgroundColor: theme.COLOR_GRAY_HEAVY,
												}}
											>
												<TouchableOpacity
													style={{
														alignItems: 'center',
														paddingVertical: 15
													}}
													onPress={this.withdrawButtonOnPress(cIdx, c)}
												>
													{this.state.loaders[cIdx] ? (
														<ActivityIndicator color="#fff" />
													) : (
														<LabelText color="white">Withdraw</LabelText>
													)}
												</TouchableOpacity>
											</View>
										</CardContainer>
									</View>
								)}
							</View>
						</View>
					</ScrollView>
				</View>
				
				<DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
			</Modal>
		);
	}
}

class CardContainer extends Component {
	render() {
		return (
			<View
				style={{
					borderRadius: theme.PAGE_CARD_RADIUS,
					backgroundColor: theme.COLOR_WHITE,
					overflow: 'hidden',
					elevation: 3,
				}}
			>
				{this.props.children}
			</View>
		);
	}
}