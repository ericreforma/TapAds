import React, { Component } from 'react';
import {
  View,
  Animated,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';

import { CAMPAIGN } from '../redux/actions/types.action';

import { AppBackground } from '../components/AppBackground';
import HeaderNav from '../components/HeaderNav';
import ModalMenu from '../components/Modal/Navigation';
import NavigationService from '../services/navigation';
import { AuthController } from '../controllers';

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
			scrollEnable: true
		};

			this.woosh = new Sound('chat_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
			if (error) {
				console.log('failed to load the sound', error);
				return;
			}
		});
		
		// this.woosh.play();
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
		
		return (
			<View
				style={
					this.props.message ? {
						flex: 1,
						flexDirection: 'column'
					} : {}
				}
			>
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

const mapDispatchToProps = (dispatch) => ({
	resetPropsValues: () => dispatch({ type: CAMPAIGN.RESET })
});

export default connect(null, mapDispatchToProps)(Page);