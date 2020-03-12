import React, { useState } from 'react';
import {
	Alert
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';

import {
	LabelText,
	Common,
	CommonOverflow,
	LabelOverflow
} from '../../../components/Text';
import { USER } from '../../../redux/actions/types.action';
import { UserController } from '../../../controllers/UserController';
import { URL } from '../../../config/variables';
import NavigationService from '../../../services/navigation';

import PageLayout from '../../../components/PageLayout';
import PageContainer from '../../../components/PageContainer';
import { IfElse, Then, Else } from '../../../components/IfElse';
import { convert12HourTime } from '../../../config/functions';
import {
	MessageListContainer,
	MessageListLabelWrapper,
	MessageListBodyContainer,
	MessageListClientImageWrapper,
	MessageListClientImage,
	MessageListClientOnlineIndicator,
	MessageListChatInfoWrapper,
	MessageListChatInfoBottomWrapper,
	MessageListChatInfoMessageWrapper,
	MessageListConversationLoader,
	MessageListNoConversationWrapper,
	MessageListConversationWrapper,
	MessageListChatInfoTopWrapper,
	MessageListChatInfoTopCampaignWrapper,
	MessageListChatInfoNotification,
	MessageListChatInfoNotificationLabel
} from './MessageListStyledComponents';
import { MessageListText } from '../../../lang/en';

const galleryIcon = require('../../../assets/image/icons/gallery-icon.png');

const MessageListPage = props => {
	const [serverRequest, setServerRequest] = useState(0);
	const [loader, setLoader] = useState(true);
	const [conversations, setConversations] = useState([]);

	const getChatList = () => {
		UserController.request.chat.chatList()
		.then(res => {
			setServerRequest(0);
			setConversations(res.data);
			setLoader(false);
		})
		.catch(e => {
			console.log(e.response);
			if(serverRequest === 3) {
				serverError();
			} else {
				setServerRequest(serverRequest + 1);
				setTimeout(getChatList, 2000);
			}
		});
	}

	const addNewChat = newClientChat => {
		var newConversations = conversations,
			{ user } = props,
			userKeys = Object.keys(user),
			toDispatchUser = {};

		for(var x in userKeys) {
			var key = userKeys[x];
			if(key === 'notificationCount') {
				toDispatchUser[key] = user[key] + 1;
			} else {
				toDispatchUser[key] = user[key];
			}
		}

		newConversations.splice(0, 0, newClientChat);
		props.dispatchUpdateNotification(toDispatchUser);
		setConversations(newConversations);
	}

	const serverError = () => {
		Alert.alert(
			'Error',
			'Server Error, please try again later.',
			[
				{text: 'OK', onPress: () => NavigationService.reset('Home')},
			]
		);
	}

	const messageOnPress = chat => () => {
		const chatDetails = {
			clientId: chat.client_id,
			campaignId: chat.campaign_id,
			vehicleId: chat.user_vehicle_id
		};

		NavigationService.navigate('Chat', {chatDetails});
	}

	return (
		<PageLayout
			messenger
			reInitializePage={getChatList}>
			<NavigationEvents
				onDidFocus={getChatList}
				onDidBlur={() => setLoader(!loader)} />

			<PageContainer
				overScrollMode='never'
				showsVerticalScrollIndicator={false}>
				<MessageListContainer>
					<MessageListLabelWrapper>
						<LabelText color="white">
							{MessageListText.heading}
						</LabelText>
					</MessageListLabelWrapper>

					{/* <MessageListBodyContainer> */}
					<IfElse condition={loader}>
						<Then>
							<MessageListConversationLoader color="#fff" />
						</Then>

						<Else>
							<IfElse condition={conversations.length === 0}>
								<Then>
									<MessageListNoConversationWrapper>
										<LabelText small color="white">
											-- No message available --
										</LabelText>
									</MessageListNoConversationWrapper>
								</Then>

								<Else>
									{conversations.map(c =>
										<MessageListConversationWrapper
											key={c.id}
											onPress={messageOnPress(c)}>
											<MessageListClientImageWrapper>
												<MessageListClientImage
													urlExist={c.url}
													source={
														c.url
														? {uri: `${URL.SERVER_MEDIA}/${c.url}`}
														: galleryIcon
													} />
									
												<IfElse condition={c.online}>
													<Then>
														<MessageListClientOnlineIndicator />
													</Then>
												</IfElse>
											</MessageListClientImageWrapper>

											<MessageListChatInfoWrapper>
												<MessageListChatInfoTopWrapper>
													<MessageListChatInfoTopCampaignWrapper>
														<LabelOverflow
															label={c.name}
															nonActive={c.sender == 0 ? true : (c.seen === 0 ? false : true)}
															numberOfLines={1} />

														<CommonOverflow
															label={c.plate_number}
															nonActive={c.sender == 0 ? true : (c.seen === 0 ? false : true)}
															numberOfLines={1} />
													</MessageListChatInfoTopCampaignWrapper>
													
													<IfElse condition={c.notif_count}>
														<Then>
															<MessageListChatInfoNotification>
																<MessageListChatInfoNotificationLabel>
																	{c.notif_count < 10 ? c.notif_count : '9+'}
																</MessageListChatInfoNotificationLabel>
															</MessageListChatInfoNotification>
														</Then>
													</IfElse>
												</MessageListChatInfoTopWrapper>
									
												<MessageListChatInfoBottomWrapper>
													<MessageListChatInfoMessageWrapper>
														<CommonOverflow
															label={c.sender == 0 ? `You: ${c.message}` : c.message}
															numberOfLines={1}
															nonActive={c.sender == 0 ? true : (c.seen === 0 ? false : true)} />
													</MessageListChatInfoMessageWrapper>
									
													<Common
														label={convert12HourTime(c.created_at)}
														nonActive={c.sender == 0 ? true : (c.seen === 0 ? false : true)} />
												</MessageListChatInfoBottomWrapper>
											</MessageListChatInfoWrapper>
										</MessageListConversationWrapper>
									)}
								</Else>
							</IfElse>
						</Else>
					</IfElse>
					{/* </MessageListBodyContainer> */}
				</MessageListContainer>
			</PageContainer>
		</PageLayout>
	)
}

const mapStateToProps = (state) => ({
	user: state.userReducer.user
});

const mapDispatchToProps = (dispatch) => ({
	dispatchUpdateNotification: (user) => dispatch({ type: USER.GET.PROFILE.SUCCESS, user }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageListPage);

