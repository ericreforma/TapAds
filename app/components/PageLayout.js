import React, { Component } from 'react';
import {
	View,
	Image,
	AppState,
  Animated,
	Dimensions,
	TouchableOpacity
} from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

import { CAMPAIGN, SIGNUP } from '../redux/actions/types.action';
import { AuthAction } from '../redux/actions/auth.action';
import { UserAction } from '../redux/actions/user.action';
import { CampaignAction } from '../redux/actions/campaign.action';
import NavigationService from '../services/navigation';
import { AuthController } from '../controllers';
import { getCurrentTime } from '../config/functions';
import { URL, IMAGES } from '../config/variables';

import { AppBackground } from '../components/AppBackground';
import HeaderNav from '../components/HeaderNav';
import ModalMenu from '../components/Modal/Navigation';
import { LabelText, CommonText } from '../components/Text';
import theme from '../styles/theme.style';

import Sound from 'react-native-sound';

const slideSpeed = 500;

class PageLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalFadeBackground: new Animated.Value(0),
			modalContainerzIndex: 0,
			modalXValue: new Animated.Value(Dimensions.get('window').width),
			carouselPage: 0,
			width: Dimensions.get('window').width,
			height: Dimensions.get('window').height,
			scrollEnable: true,
			appState: AppState.currentState,

			notificationBannerTop: new Animated.Value(-100),

			popupNotif: {
				title: '',
				body: [],
				data: {}
			}
		};

		this.woosh = new Sound('chat_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
			if (error) {
				console.log('failed to load the sound', error);
				return;
			}
		});
	}

  mountComponent = () => {
		this.messageListener();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  unmountComponent = () => {
    this.notificationListener();
    this.onTokenRefresh();
    AppState.removeEventListener('change', this._handleAppStateChange);
	}

  messageListener = async () => {
    this.notificationListener = firebase.notifications().onNotification((notification) => {
			const { data, title, body } = notification;
			const receivedData = JSON.parse(data.data);
			const { popupNotif } = this.state;
			popupNotif.title = title;
			popupNotif.data = receivedData;
			popupNotif.body = body;
			this.setState({ popupNotif });

			if(receivedData.page === 'Chat')
				this.woosh.play();

			if(receivedData.name === 'Campaign')
				this.props.dispatchMyList();
			
			this.checkPageFunction(receivedData.sender_id);
			if(!this.props.notif) {
				if(!this.props.messenger || (this.props.messenger && receivedData.name !== 'Chat')) {
					if(!this.props.message || ((this.props.message &&
							this.props.clientId !== receivedData.sender_id)
							|| receivedData.name !== 'Chat')
						|| (this.props.message && receivedData.name !== 'Chat')) {
						this.showBanner();
					}
				}
			}
    });

    this.onTokenRefresh = firebase.messaging().onTokenRefresh((fcmToken) => {
      FirebaseController.updateToken(fcmToken);
		});
	}

	showBanner = () => {
		if(this.notificationBannerInterval)
			clearTimeout(this.notificationBannerInterval);

		if(this.state.notificationBannerTop._value === -100)
			this.bannerSlideDown();

		this.notificationBannerInterval = setTimeout(this.bannerSlideUp, 4000);
	}
	
	bannerSlideDown = () => {
		Animated.timing(this.state.notificationBannerTop, {
			toValue: 0,
			duration: slideSpeed
		}).start();
	}

	bannerSlideUp = () => {
		Animated.timing(this.state.notificationBannerTop, {
			toValue: -100,
			duration: slideSpeed
		}).start();
	}

	checkPageFunction = senderId => {
		if(this.props.messenger || this.props.notif
			|| (this.props.message && this.props.clientId === senderId)) {
			this.props.reInitializePage();
		}

		if(!this.props.notif && !this.props.messenger) {
			this.props.updateNotificationCount();
		}
	}

	notificationBannerOnPress = () => {
		const { data } = this.state.popupNotif;
		this.notificationOpened(data);
	}

  notificationOpened = data => {
		const { sender_id, page, name, args, add_data } = data;
		if(page) {
			if(name === 'Custom') {
				if(add_data) {
					const navigationName = add_data.reset ? 'reset' : 'navigate';
					NavigationService[navigationName](page, args);
				} else if(page) {
					NavigationService.navigate(page, args);
				}
			} else if(this.props.message && name === 'Chat') {
				if(this.props.clientId !== sender_id)
					this.props.messageNewPage(sender_id);
			} else {
				const argsToPass = page === 'Chat' ? { id: sender_id } : null;
				NavigationService.navigate(page, argsToPass);
			}
		} else {
			clearTimeout(this.notificationBannerInterval);
			this.bannerSlideUp();
		}
  }

  _handleAppStateChange = (nextAppState) => {
    if(this.state.appState.match(/inactive|background/)
      && nextAppState === 'active') {
			this.setState({appState: nextAppState});
			this.appStateActive();
		} else {
			this.setState({appState: nextAppState});
			this.appStateInactive();
		}
	}
	
	appStateActive = () => {
		// this.props.getProfile();
	}

	appStateInactive = () => {
		// console.log(`App State: ${this.state.appState}, ${getCurrentTime()}`);
	}

	menuButtonOnPress = () => {
		Animated.timing(this.state.modalFadeBackground, {
			toValue: this.state.scrollEnable ? 0.7 : 0,
			duration: 500
		}).start(() => {
			this.setState({
				modalContainerzIndex: this.state.scrollEnable ? 0 : 1
			});
		});

		Animated.timing(this.state.modalXValue, {
			toValue: this.state.scrollEnable ? this.state.width - 330 : this.state.width,
			duration: 500
		}).start();

		this.setState({
			scrollEnable: !this.state.scrollEnable,
			modalContainerzIndex: 1
		});
	}

	navigateToPage = (page) => {
		this.menuButtonOnPress();
		this.navigate(page);
	}

	navigate = (page) => {
		if(page === 'logout') {
			AuthController.logout()
			.then(() => {
			  NavigationService.navigate('Loading');
				this.props.resetPropsValues();
			})
			.catch((e) => {
				console.log("error");
				console.log(e);
			});
		} else {
			NavigationService.navigate(page);
		}
	}

	render() {
		if(this.props.logout)	this.navigate('logout');

		if(this.props.nonPage) {
			return (
				<View	style={{ flex: 1, flexDirection: 'column' }}>
					<NavigationEvents
						onDidFocus={this.mountComponent}
						onWillBlur={this.unmountComponent}
					/>

					<Animated.View
						style={{
							position: 'absolute',
							top: this.state.notificationBannerTop,
							left: 0,
							width: Dimensions.get('window').width
						}}
					>
						<MessagePopupNotif
							popupNotif={this.state.popupNotif}
							notificationBannerOnPress={this.notificationBannerOnPress}
						/>
					</Animated.View>

					{this.props.children}
				</View>
			);
		} else {
			return (
				<View
					style={
						this.props.message || this.props.campaignPage
						? { flex: 1, flexDirection: 'column' }
						: {}
					}
				>
					<NavigationEvents
						onDidFocus={this.mountComponent}
						onWillBlur={this.unmountComponent}
					/>

					<Animated.View
						style={{
							position: 'absolute',
							top: this.state.notificationBannerTop,
							left: 0,
							width: Dimensions.get('window').width
						}}
					>
						<MessagePopupNotif
							popupNotif={this.state.popupNotif}
							notificationBannerOnPress={this.notificationBannerOnPress}
						/>
					</Animated.View>

					<AppBackground />
					
					<HeaderNav
						menuButtonOnPress={this.menuButtonOnPress}
						navigate={this.navigate}
					/>

					{this.props.children}

					<ModalMenu
						modalContainerzIndex={this.state.modalContainerzIndex}
						width={this.state.width}
						height={this.state.scrollEnable ? 0 : this.state.height}
						modalFadeBackground={this.state.modalFadeBackground}
						modalXValue={this.state.modalXValue}
						menuButtonOnPress={this.menuButtonOnPress}
						navigateToPage={this.navigateToPage}
					/>
				</View>
			);
		}
	}
}

const mapStateToProps = (state) => ({
	
});

const mapDispatchToProps = (dispatch) => ({
	resetPropsValues: () => dispatch({ type: CAMPAIGN.RESET }),
	resetSignupValues: () => dispatch({ type: SIGNUP.RESET }),
	getProfile: () => dispatch(AuthAction.getProfile()),
	updateNotificationCount: () => dispatch(UserAction.getNotification()),
	dispatchMyList: callback => dispatch(CampaignAction.mylist(callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout);

class MessagePopupNotif extends Component {
	chatBanner = () => {
		const { title, body, data } = this.props.popupNotif;
		const { name, image, second_body } = data;
		const bodyContent = second_body !== '' ? [body, second_body] : [body];
		if(name === 'Chat') {
			return (
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center'
					}}
				>
					<View
						style={{
							height: 45,
							width: 45,
							borderRadius: 45,
							overflow: 'hidden'
						}}
					>
						{image ? (
							<Image
								style={{
									width: '100%',
									height: '100%',
									backgroundColor: theme.COLOR_GRAY_HEAVY,
								}}
								resizeMode="cover"
								source={{uri: `${URL.SERVER_MEDIA}/${image}`}}
							/>
						) : (
							<Image
								style={{
									width: '100%',
									height: '100%',
									backgroundColor: theme.COLOR_GRAY_HEAVY,
								}}
								resizeMode="cover"
								source={IMAGES.ICONS.avatar.male}
							/>
						)}
					</View>
		
					<View
						style={{
							flex: 1,
							paddingLeft: 15
						}}
					>
						<LabelText numberOfLines={1}>{title}</LabelText>
						{bodyContent.map((b, index) =>
							<CommonText key={index}>{b}</CommonText>
						)}
					</View>
				</View>
			);
		}
	}

	paymentBanner = () => {
		const { title, body, data } = this.props.popupNotif;
		const { name, second_body } = data;
		const bodyContent = second_body !== '' ? [body, second_body] : [body];
		if(name === 'Payment') {
			return (
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center'
					}}
				>
					<View
						style={{
							flex: 1,
							paddingLeft: 5,
							paddingRight: 15
						}}
					>
						<LabelText numberOfLines={1}>{title}</LabelText>
						{bodyContent.map((b, index) =>
							<CommonText key={index}>{b}</CommonText>
						)}
					</View>
		
					<View
						style={{
							height: 45,
							width: 45,
							overflow: 'hidden'
						}}
					>
						<Image
							style={{
								width: '100%',
								height: '100%',
							}}
							resizeMode="contain"
							source={IMAGES.ICONS.payment_icon}
						/>
					</View>
				</View>
			);
		}
	}

	campaignBanner = () => {
		const { title, body, data } = this.props.popupNotif;
		const { name, second_body } = data;
		const imageSource = [null, IMAGES.ICONS.approve_icon, IMAGES.ICONS.rejected_icon];
		const bodyContent = second_body !== '' ? [body, second_body] : [body];
		if(name === 'Campaign') {
			return (
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center'
					}}
				>
					<View
						style={{
							flex: 1,
							paddingRight: 15
						}}
					>
						<LabelText numberOfLines={1}>{title}</LabelText>
						{bodyContent.map((b, index) =>
							<CommonText key={index}>{b}</CommonText>
						)}
					</View>
		
					<View
						style={{
							height: 40,
							width: 40,
							overflow: 'hidden'
						}}
					>
						<Image
							style={{
								width: '100%',
								height: '100%',
							}}
							resizeMode="contain"
							source={imageSource[data.action]}
						/>
					</View>
				</View>
			);
		}
	}

	customBanner = () => {
		const { title, body, data } = this.props.popupNotif;
		const { name, second_body } = data;
		const bodyContent = second_body !== '' ? [body, second_body] : [body];
		if(name === 'Custom') {
			return (
				<View>
					<LabelText numberOfLines={1}>{title}</LabelText>
					{bodyContent.map((b, index) =>
						<CommonText key={index}>{b}</CommonText>
					)}
				</View>
			);
		}
	}

	render() {
		return (
			<TouchableOpacity
				activeOpacity={0.9}
				style={{
					flex: 1,
					backgroundColor: theme.COLOR_WHITE,
					elevation: 5,
					margin: 15,
					padding: 15,
					zIndex: 5,
					borderRadius: theme.PAGE_CARD_RADIUS
				}}
				onPress={this.props.notificationBannerOnPress}
			>
				{this.chatBanner()}
				{this.paymentBanner()}
				{this.campaignBanner()}
				{this.customBanner()}
			</TouchableOpacity>
		);
	}
}