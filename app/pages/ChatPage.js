import React, { Component } from 'react';
import {
	View,
	ScrollView,
	Dimensions,
	TouchableOpacity,
	TextInput,
	Image,
	Keyboard,
	ActivityIndicator,
	Alert
} from 'react-native';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';

import NavigationService from '../services/navigation';
import { LabelText, CommonText } from '../components/Text';
import UserInfo from '../components/UserInfo';
import { UserController, ChatController } from '../controllers';
import Page from './Page';

import { USER } from '../redux/actions/types.action';
import { UserAction } from '../redux/actions/user.action';

import theme from '../styles/theme.style';

class ChatPage extends Component {
	constructor(props) {
		super(props);

		this.cid = this.props.navigation.getParam('id', null);

		if(!this.cid) {
			NavigationService.navigate('Messenger');
		}

		this.state = {
			width: Dimensions.get('window').width,
			height: Dimensions.get('window').height,
			message: '',
			messageType: 0,
			keyboardPress: true,
			total_page: 0,
			loader: true,
			loaderLoadMore: false,
			messengerData: {
				id: '',
				brand: '',
				online: false,
			},
			messengerMessages: [],
			lastId: 0,
			threeTriesRequest: 0
		};

		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
	}

	componentDidMount = () => {
		this.getMessages();
	}

	componentWillUnmount = () => {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}
	
	getMessages = () => {
		UserController.request.chat.initial(`?cid=${this.cid}`)
		.then(response => {
			this.props.updateNotificationCount();
			const { chat, client, total_page } = response.data;
			const { messengerData } = this.state;
			const loader = false;
			const threeTriesRequest = 0;
			const lastId = chat[0].id;
			messengerData.id = client.id;
			messengerData.brand = client.business_name;

			this.setState({
				loader,
				lastId,
				total_page,
				messengerData,
				threeTriesRequest,
				messengerMessages: chat
			});
		})
		.catch(e => {
			console.log(e.response);
			if(this.state.threeTriesRequest === 3) {
				this.serverError();
			} else {
				setTimeout(() => {
					this.setState({ threeTriesRequest: this.state.threeTriesRequest + 1 });
					this.getMessages();
				}, 2000);
			}
		});
	}
	
	_keyboardDidShow = () => {
		this._scrollView.scrollToEnd({animated: true});
		this.setState({ keyboardPress: true });
	}

	_keyboardDidHide = () => {
		this.setState({ keyboardPress: false });
	}

	sendMessageOnPress = () => {
		const { state, cid } = this,
			{ message, messageType } = state;

		ChatController.request.sendMessage({
			message, cid,
			type: messageType
		})
		.then(res => {
			const { messengerMessages } = this.state;
			messengerMessages.push(res.data);
			this.setState({messengerMessages, message: ''});
		})
		.catch(error => {
			console.log(error.response);
		});
	}

	seeMoreOnPress = () => {
		this.setState({
			loaderLoadMore: true,
			keyboardPress: false
		});
		
		UserController.request.chat.paginate(`?cid=${this.cid}&last_id=${this.state.lastId}`)
		.then(res => {
			const threeTriesRequest = 0;
			const loaderLoadMore = false;
			const oldMessages = res.data;
			const { messengerMessages } = this.state;
			const mergedMessages = oldMessages.concat(messengerMessages);
			const lastId = oldMessages[0].id;

			this.setState({
				total_page: this.state.total_page - 1,
				threeTriesRequest,
				loaderLoadMore,
				lastId,
				messengerMessages: mergedMessages
			});
		})
		.catch(error => {
			console.log(error.response);
			if(this.state.threeTriesRequest === 3) {
				this.serverError();
			} else {
				setTimeout(() => {
					this.setState({ threeTriesRequest: this.state.threeTriesRequest + 1 });
					this.seeMoreOnPress();
				}, 2000);
			}
		});
	}

	messageNewPage = cid => {
		this.cid = cid;
		this.setState({ loader: true });
		this.getMessages();
	}

	newMessage = async () => {
		await UserController.request.chat.latest(`?cid=${this.cid}`)
		.then(res => {
			const newMessages = res.data;
			const { messengerMessages } = this.state;
			const mergedMessages = messengerMessages.concat(newMessages);
			const threeTriesRequest = 0;
			
			mergedMessages.sort(function(a,b){
				return new Date(a.created_at) - new Date(b.created_at);
			});

			this.setState({
				threeTriesRequest,
				messengerMessages: mergedMessages
			});
		})
		.catch(error => {
			console.log(error.response);
			if(this.state.threeTriesRequest === 3) {
				this.serverError();
			} else {
				setTimeout(() => {
					this.setState({ threeTriesRequest: this.state.threeTriesRequest + 1 });
					this.newMessage();
				}, 2000);
			}
		});
	}

	serverError = () => {
		Alert.alert(
			'Error',
			'Server Error, please try again later.',
			[
				{text: 'OK', onPress: () => NavigationService.reset('Home')},
			]
		);
	}

	render() {
		return (
			<Page
				message
				reInitializePage={this.newMessage}
				messageNewPage={this.messageNewPage}
				clientId={this.cid}
			>
				<View
					style={{
						flex: 1,
					}}
				>
					<ScrollView
						overScrollMode='never'
						showsVerticalScrollIndicator={false}
						ref={ref => this._scrollView = ref}
						onContentSizeChange={() => {
							var { keyboardPress } = this.state;
							if(keyboardPress) {
								this._scrollView.scrollToEnd({ animated: true });
							}
						}}
					>
						<UserInfo />

						<View
							style={{
								marginHorizontal: 15,
								marginTop: 30
							}}
						>
							<View
								style={{
									backgroundColor: theme.COLOR_DIRTY_WHITE,
									paddingVertical: 20,
									justifyContent: 'center',
									alignItems: 'center',
									borderTopLeftRadius: theme.PAGE_CARD_RADIUS,
									borderTopRightRadius: theme.PAGE_CARD_RADIUS,
									flexDirection: 'row'
								}}
							>
								<LabelText>{this.state.messengerData.brand}</LabelText>
								
								{this.state.messengerData.online ? (
									<View
										style={{
											backgroundColor: theme.COLOR_GREEN,
											height: 13,
											width: 13,
											borderRadius: 10,
											marginLeft: 5,
										}}
									></View>
								) : null}
							</View>

							<View
								style={{
									backgroundColor: theme.COLOR_WHITE,
									paddingHorizontal: 10,
								}}
							>
								{this.state.loader ? (
									<ActivityIndicator color="#000" style={{ height: 75 }} />
								) : (
									this.state.messengerMessages.length === 0 ? (
										<View
											style={{
												justifyContent: 'center',
												alignItems: 'center',
												flex: 1
											}}
										>
											<CommonText color={'black'} >
												-- No message available --
											</CommonText>
										</View>
									) : (
										<View>
											{this.state.loaderLoadMore ? (
												<View
													style={{
														justifyContent: 'center',
														alignItems: 'center',
														paddingVertical: 20
													}}
												>
													<ActivityIndicator color="#000" />
												</View>
											) : (
												this.state.total_page > 1 ? (
													<TouchableOpacity
														style={{
															justifyContent: 'center',
															alignItems: 'center',
															paddingVertical: 20
														}}
														onPress={this.seeMoreOnPress}
													>
														<CommonText color={'black'} >
															-- See More --
														</CommonText>
													</TouchableOpacity>
												) : (
													<View
														style={{
															height: 15
														}}
													></View>
												)
											)}
											
											{this.state.messengerMessages.map((message, index) =>
												<View
													key={index}
													style={{
														marginTop: 5,
														marginBottom: index == (this.state.messengerMessages.length - 1) ? 20 : 5,
														justifyContent: message.sender ? 'flex-start' : 'flex-end',
														alignItems: message.sender ? 'flex-end' : 'flex-end',
														flexDirection: 'row',
													}}
												>
													<View
														style={{
															backgroundColor: message.sender ? theme.COLOR_GRAY_CHAT : theme.COLOR_LIGHT_BLUE,
															position: 'absolute',
															left: message.sender ? 0 : null,
															right: message.sender ? null : 0,
															bottom: 0
														}}
													>
														<View
															style={{
																backgroundColor: theme.COLOR_WHITE,
																borderBottomRightRadius: message.sender ? 12 : 0,
																borderBottomLeftRadius: message.sender ? 0 : 12,
																width: 21,
																height: 20
															}}
														></View>
													</View>

													<View
														style={{
															backgroundColor: message.sender ? theme.COLOR_GRAY_CHAT : theme.COLOR_LIGHT_BLUE,
															borderRadius: 20,
															borderBottomLeftRadius: message.sender ? 0 : 20,
															borderBottomRightRadius: message.sender ? 20 : 0,
															paddingVertical: 10,
															paddingHorizontal: 20,
															maxWidth: '80%',
															zIndex: 10,
															marginLeft: message.sender ? 20 : 0,
															marginRight: message.sender ? 0 : 20,
															flexWrap: 'wrap',
															flexDirection: 'row'
														}}
													>
														<CommonText
															color={message.sender ? 'black' : 'white'}
														>
															{message.message}
														</CommonText>
													</View>
												</View>
											)}
										</View>
									)
								)}
							</View>
						</View>
					</ScrollView>
				</View>
				
				{/* message input container */}
				<View
					style={{
						width: '100%',
						backgroundColor: theme.COLOR_GRAY_HEAVY,
						paddingVertical: 10,
						paddingHorizontal: 20,
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'flex-start'
						}}
					>
						<TouchableOpacity
							onPress={() => alert('Open files')}
						>
							<Image
								style={{
									width: 30,
									height: 30,
								}}
								resizeMode="contain"
								source={require('../assets/image/icons/clip_icon.png')}
							/>
						</TouchableOpacity>
					</View>

					<View
						style={{
							flex: 6,
							justifyContent: 'flex-end',
							alignItems: 'flex-end'
						}}
					>
						<View
							style={{
								width: '100%',
								paddingLeft: 20,
								paddingRight: 45,
								borderRadius: 50,
								backgroundColor: theme.COLOR_WHITE,
								justifyContent: 'center'
							}}
						>
							<TextInput
								style={{
									fontSize: theme.PAGE_CARD_RADIUS,
									maxHeight: this.state.height / 7
								}}
								placeholderTextColor={theme.COLOR_GRAY_MEDIUM}
								placeholder="Message"
								keyboardAppearance="dark"
								multiline={true}
								value={this.state.message}
								onChangeText={message => this.setState({message})}
							/>

							<TouchableOpacity
								style={{
									position: 'absolute',
									right: 5
								}}
								onPress={() => alert('Open mic')}
							>
								<Image
									style={{
										width: 38,
										height: 38,
									}}
									resizeMode="contain"
									source={require('../assets/image/icons/mic_icon.png')}
								/>
							</TouchableOpacity>
						</View>
					</View>

					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'flex-end'
						}}
					>
						<TouchableOpacity
							onPress={this.sendMessageOnPress}
						>
							<Image
								style={{
									width: 30,
									height: 30,
								}}
								resizeMode="contain"
								source={require('../assets/image/icons/send_icon.png')}
							/>
						</TouchableOpacity>
					</View>
				</View>
				
				<DropdownAlert ref={ref => this.dropDownChatAlertRef = ref} />
			</Page>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.userReducer.user
});

const mapDispatchToProps = (dispatch) => ({
	updateUserNotification: (notification) => dispatch({ type: USER.NOTIFICATION.UPDATE, notification }),
  updateNotificationCount: () => dispatch(UserAction.getNotification())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);