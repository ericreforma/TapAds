import React, { Component } from 'react';
import {
	TouchableOpacity,
	ImageBackground,
	Text,
	View,
	Image,
	ScrollView,
	Keyboard,
	Dimensions
} from 'react-native';

import { connect } from 'react-redux';
import Input from '../components/Input';
import ButtonBlue from '../components/ButtonBlue';
import { AuthAction } from '../redux/actions/auth.action';
import NavigationService from '../services/navigation';
import styles from '../styles/page.Login.style';

class LogInPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			firstSubmit: false,
			yPosition: 0
		};

		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
	}

	componentWillUnmount = () => {
		this.keyboardDidShowListener.remove();
	}
  
	_keyboardDidShow = () => {
		this._scrollRef.scrollTo({ y: this.state.yPosition - 10 });
	}

	layoutViewDone = (e) => {
		this.setState({ yPosition: e.nativeEvent.layout.y });
	}

	passwordRefFunction = (ref) => {
		this.passwordRef = ref;
	}

	loginSubmit = () => {
		this.setState({firstSubmit: true});
		this.props.loginPressed(this.state.email, this.state.password);
	}

	render() {
		return (
			<ScrollView
				overScrollMode='never'
				showsVerticalScrollIndicator={false}
				ref={ref => { this._scrollRef = ref; }}
			>
				<ImageBackground
					resizeMode="stretch"
					source={require('../assets/image/login_page_bg.png')}
					style={styles.containerView}
				>
					{/* logo taptab */}
					<View
						style={{
							height: '40%',
							justifyContent: 'center',
							alignItems: 'flex-end',
						}}
					>
						<Image
							style={{
								width: Dimensions.get('window').width / 2.5
							}}
							resizeMode="contain"
							source={require('../assets/image/app_logo.png')}
						/>
					</View>

					{/* main login input values */}
					<View
						style={styles.mainLoginBodyContainer}
						onLayout={this.layoutViewDone}
					>
						<View
							style={styles.loginCredentialsView}
						>
							<Input
								type="email"
								onSubmitEditing={() => {
									this.passwordRef.focus();
								}}
								returnKeyType="next"
								onChangeText={(email) => this.setState({ email })}
							/>
							<Input
								loginPage
								type="password"
								passwordRefFunction={this.passwordRefFunction}
								onSubmitEditing={this.loginSubmit}
								returnKeyType="send"
								onChangeText={(password) => this.setState({ password })}
							/>
						</View>

						<View 
							style={{
								alignItems: 'flex-start'
							}}
						>
							<TouchableOpacity
								onPress={() => NavigationService.navigate('ForgotPassword')}
							>
								<Text style={[styles.textNormalLabel, styles.textNormalLabelMargin]}>
									Forgot Password?
								</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.loginButton}>
							<ButtonBlue
								loginButton
								label="Login"
								disabled={this.state.firstSubmit ? (
									this.props.isLoggedIn ? true : this.props.isLoggingIn
								) : false}
								onPress={this.loginSubmit}
							/>
						</View>

						<Text style={styles.textNormalLabel}>
							Don't have an account?
						</Text>

						<View 
							style={{
								alignItems: 'flex-start'
							}}
						>
							<TouchableOpacity
								onPress={() => { NavigationService.navigate('SignUp') } }
							>
								<Text style={styles.textSignUp}>
									Sign up
								</Text>
							</TouchableOpacity>
						</View>
					</View>

					{/* alternative login */}
					<View
						style={{
							justifyContent: 'flex-end',
							alignItems: 'flex-end'
						}}
					>
						<Text style={styles.loginAlternativeLabel}>
							or login with
						</Text>

						<View style={styles.loginAlternativeIconView}>
							<TouchableOpacity>
								<Image
									source={require('../assets/image/icons/google_icon.png')}
								/>
							</TouchableOpacity>

							<TouchableOpacity>
								<Image
									style={styles.loginAlternativeIconFacebook}
									source={require('../assets/image/icons/facebook_icon.png')}
								/>

							</TouchableOpacity>
						</View>
					</View>
				</ImageBackground>
			</ScrollView>
		);
  }
}

const mapStateToProps = (state) => ({
	email: state.email,
	password: state.password,
	isLoggingIn: state.loginReducer.isLoggingIn,
	isLoggedIn: state.loginReducer.isLoggedIn
});

const mapDispatchToProps = (dispatch) => ({
	loginPressed: (email, password) => dispatch(AuthAction.login(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);
