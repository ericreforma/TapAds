import React, { Component } from 'react';
import {
	Keyboard,
	Alert
} from 'react-native';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';

import NavigationService from '../../../services/navigation';
import { LabelText, CommonText } from '../../../components/Text';
import { UserController, ChatController } from '../../../controllers';

import { USER } from '../../../redux/actions/types.action';
import { UserAction } from '../../../redux/actions/user.action';

import theme from '../../../styles/theme.style';
import PageLayout from '../../../components/PageLayout';
import PageContainer from '../../../components/PageContainer';
import {
	MessageContainer,
	MessageHeaderWrapper,
	MessageBody,
	MessageLoader,
	MessageNoData,
	MessageSeeMoreButtonWrapper,
	MessageSeeMoreButtonLoader,
	MessageSeeMoreButton,
	MessageSeeMoreButtonNone,
	MessageClientContainer,
	MessageClientContainerTailWrapper,
	MessageClientContainerTail,
	MessageClientContainerWrapper,
	MessageUserContainer,
	MessageUserContainerTailWrapper,
	MessageUserContainerTail,
	MessageUserContainerWrapper,
	MessageFooterContainer,
	MessageFilesWrapper,
	MessageFilesButton,
	MessageFilesImage,
	MessageInputContainer,
	MessageInput,
	MessageMicButton,
	MessageMicImage,
	MessageSendButton,
	MessageSendImage,
	MessageSendWrapper,
	MessageHeaderAddInfoWrapper,
	MessageHeaderAddInfoDotWrapper
} from './MessageChatStyledComponents';
import { IfElse, Then, Else } from '../../../components/IfElse';
import MessageFilter from './MessageFilter';

const micIcon = require('../../../assets/image/icons/mic_icon.png');
const clipIcon = require('../../../assets/image/icons/clip_icon.png');
const sendIcon = require('../../../assets/image/icons/send_icon.png');

class MessageChatPage extends Component {
	constructor(props) {
		super(props);

		this.chatDetails = this.props.navigation.getParam('chatDetails', null);

		if(!this.chatDetails) {
			NavigationService.navigate('Messenger');
		} else {
			this.cid = this.chatDetails.clientId;
			this.campaignId = this.chatDetails.campaignId;
			this.vehicleId = this.chatDetails.vehicleId;
		}

		this.state = {
			loader: true,
			loaderLoadMore: false,
			
			message: '',
			messageType: 0,

			keyboardPress: true,
			threeTriesRequest: 0,
			
			lastId: 0,
			total_page: 0,
			messengerMessages: [],

			client: '',
			campaignName: '',
			vehiclePlateNumber: ''
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
		const { campaignId, vehicleId } = this;
		const query = `?cid=${this.cid}&campaign_id=${campaignId}&vehicle_id=${vehicleId}`;

		UserController.request.chat
		.initial(query)
		.then(res => {
			const { status, message } = res.data;
			if(status) {
				this.props.updateNotificationCount();
				const { chat, chat_data } = message;
				const lastId = chat.length !== 0 ? chat[0].id : 0;
				const total_page = chat_data.total_page;
				const client = chat_data.business_name;
				const campaignName = chat_data.campaign_name;
				const vehiclePlateNumber = chat_data.plate_number;
				const loader = false;
				const threeTriesRequest = 0;
				const messengerMessages = chat;
	
				this.setState({
					lastId,
					total_page,
					client,
					campaignName,
					vehiclePlateNumber,
					loader,
					threeTriesRequest,
					messengerMessages
				});
			} else {
				alert(message);
				NavigationService.navigate('Home');
			}
		})
		.catch(e => {
			console.log(e);
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
		const {
			cid,
			campaignId,
			vehicleId } = this,
			{ message, messageType } = this.state,
			campaign_id = campaignId,
			vehicle_id = vehicleId,
			type = messageType;

		ChatController.request.sendMessage({
			message, cid,
			campaign_id,
			vehicle_id,
			type
		})
		.then(res => {
			const { messengerMessages } = this.state;
			messengerMessages.push(res.data);
			console.log(res.data);
			this.setState({messengerMessages, message: ''});
		})
		.catch(error => {
			console.log(error.response);
		});
	}

	seeMoreOnPress = () => {
		const {
			cid,
			state,
			campaignId,
			vehicleId } = this;
		this.setState({
			loaderLoadMore: true,
			keyboardPress: false
		});
		
		const query = `?cid=${cid}&last_id=${state.lastId}&campaign_id=${campaignId}&vehicle_id=${vehicleId}`;
		UserController.request.chat
		.paginate(query)
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
		const { cid, campaignId, vehicleId } = this;
		const { messengerMessages } = this.state;
		var firstId = 0;
		if(messengerMessages.length !== 0) {
			firstId = messengerMessages[messengerMessages.length - 1].id;
		}
		
		const query = `?cid=${cid}&first_id=${firstId}&campaign_id=${campaignId}&vehicle_id=${vehicleId}`;
		await UserController.request.chat
		.latest(query)
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
			<PageLayout
				message
				reInitializePage={this.newMessage}
				messageNewPage={this.messageNewPage}
				clientId={this.cid}
				campaignId={this.campaignId}
				vehicleId={this.vehicleId}>
				<PageContainer
					overScrollMode='never'
					showsVerticalScrollIndicator={false}
					ref={ref => this._scrollView = ref}
					onContentSizeChange={() => {
						var { keyboardPress } = this.state;
						if(keyboardPress) {
							this._scrollView.scrollToEnd({ animated: true });
						}
					}}>
					<MessageContainer>
						<IfElse condition={this.state.loader}>
							<Then>
								<MessageLoader color="#fff" />
							</Then>

							<Else>
								<MessageHeaderWrapper>
									<LabelText>{this.state.campaignName}</LabelText>
									<LabelText
										color={theme.COLOR_NORMAL_FONT}
										textAlign="center"
										small>
										{this.state.client}
									</LabelText>

									<MessageHeaderAddInfoWrapper>
										<MessageHeaderAddInfoDotWrapper>
											<LabelText
												color={theme.COLOR_NORMAL_FONT}
												small>
												•
											</LabelText>
										</MessageHeaderAddInfoDotWrapper>

										<LabelText
											color={theme.COLOR_NORMAL_FONT}
											small>
											{this.state.vehiclePlateNumber}
										</LabelText>

										<MessageHeaderAddInfoDotWrapper>
											<LabelText
												color={theme.COLOR_NORMAL_FONT}
												small>
												•
											</LabelText>
										</MessageHeaderAddInfoDotWrapper>
									</MessageHeaderAddInfoWrapper>
								</MessageHeaderWrapper>
						
								<MessageBody>
										<IfElse condition={this.state.messengerMessages.length === 0}>
											<Then>
												<MessageNoData>
													<CommonText color={'black'} >
														-- No message available --
													</CommonText>
												</MessageNoData>
											</Then>

											<Else>
												<IfElse condition={this.state.loaderLoadMore}>
													<Then>
														<MessageSeeMoreButtonWrapper>
															<MessageSeeMoreButtonLoader />
														</MessageSeeMoreButtonWrapper>
													</Then>

													<Else>
														<IfElse condition={this.state.total_page > 1}>
															<Then>
																<MessageSeeMoreButton
																	onPress={this.seeMoreOnPress}>
																	<CommonText color={'black'}>
																		-- See More --
																	</CommonText>
																</MessageSeeMoreButton>
															</Then>

															<Else>
																<MessageSeeMoreButtonNone />
															</Else>
														</IfElse>
													</Else>
												</IfElse>
											
												{this.state.messengerMessages.map((message, index) =>
													<IfElse key={index} condition={message.sender}>
														<Then>
															<MessageClientContainer
																last={index == (this.state.messengerMessages.length - 1)}>
																<MessageClientContainerTailWrapper>
																	<MessageClientContainerTail />
																</MessageClientContainerTailWrapper>

																<MessageClientContainerWrapper>
																	<CommonText color="black">
																		{message.message}
																	</CommonText>
																</MessageClientContainerWrapper>
															</MessageClientContainer>
														</Then>

														<Else>
															<MessageUserContainer
																last={index == (this.state.messengerMessages.length - 1)}>
																<MessageUserContainerTailWrapper>
																	<MessageUserContainerTail />
																</MessageUserContainerTailWrapper>

																<MessageUserContainerWrapper>
																	<CommonText color="white">
																		{message.message}
																	</CommonText>
																</MessageUserContainerWrapper>
															</MessageUserContainer>
														</Else>
													</IfElse>
												)}
											</Else>
										</IfElse>
									</MessageBody>
							</Else>
						</IfElse>
					</MessageContainer>
				</PageContainer>
				
				<MessageFooterContainer>
					<MessageFilesWrapper>
						<MessageFilesButton
							onPress={() => alert('Open files')}>
							<MessageFilesImage source={clipIcon} />
						</MessageFilesButton>
					</MessageFilesWrapper>

					<MessageInputContainer>
						<MessageInput
							placeholderTextColor={theme.COLOR_GRAY_MEDIUM}
							placeholder="Message"
							keyboardAppearance="dark"
							multiline={true}
							value={this.state.message}
							onChangeText={message => this.setState({message})} />

						<MessageMicButton
							onPress={() => alert('Open mic')}>
							<MessageMicImage source={micIcon} />
						</MessageMicButton>
					</MessageInputContainer>
					
					<MessageSendWrapper>
						<MessageSendButton
							onPress={this.sendMessageOnPress}>
							<MessageSendImage
								source={sendIcon} />
						</MessageSendButton>
					</MessageSendWrapper>
				</MessageFooterContainer>

				<DropdownAlert ref={ref => this.dropDownChatAlertRef = ref} />
			</PageLayout>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.userReducer.user,
	mylist: state.campaignReducer.mylist
});

const mapDispatchToProps = (dispatch) => ({
	updateUserNotification: (notification) => dispatch({ type: USER.NOTIFICATION.UPDATE, notification }),
  updateNotificationCount: () => dispatch(UserAction.getNotification())
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageChatPage);