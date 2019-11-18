import React, { Component } from 'react';
import {
	View,
	AppState,
  Animated,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

import { CAMPAIGN, SIGNUP, FIREBASE } from '../redux/actions/types.action';
import { AuthAction } from '../redux/actions/auth.action';
import NavigationService from '../services/navigation';
import { AuthController } from '../controllers';
import { getCurrentTime } from '../config/functions';

import { AppBackground } from '../components/AppBackground';
import HeaderNav from '../components/HeaderNav';
import ModalMenu from '../components/Modal/Navigation';

import Sound from 'react-native-sound';

class Page extends Component {
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
			appState: AppState.currentState
		};

		this.woosh = new Sound('chat_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
			if (error) {
				console.log('failed to load the sound', error);
				return;
			}
		});

		// this.woosh.play();		
	}

  mountComponent = () => {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  unmountComponent = () => {
    AppState.removeEventListener('change', this._handleAppStateChange);
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
		this.props.getProfile();
	}

	appStateInactive = () => {
		console.log(`App State: ${this.state.appState}, ${getCurrentTime()}`);
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
		if(this.props.logout) {
			this.navigate('logout');
		}
		
		if(this.props.nonPage) {
			return (
				<View style={{flex: 1}}>
					<NavigationEvents
						onDidFocus={this.mountComponent}
						onWillBlur={this.unmountComponent}
					/>

					{this.props.children}
				</View>
			);
		} else {
			return (
				<View
					style={
						this.props.message || this.props.campaignPage ? {
							flex: 1,
							flexDirection: 'column'
						} : {}
					}
				>
					<NavigationEvents
						onDidFocus={this.mountComponent}
						onWillBlur={this.unmountComponent}
					/>

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
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);