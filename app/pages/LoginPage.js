import React, { Component } from 'react';
import {
	TouchableOpacity,
	ImageBackground,
	Text,
	View,
	Image,
	Dimensions
} from 'react-native';
import axios from 'axios';
import InputLogin from '../components/Input';
import ButtonBlue from '../components/ButtonBlue';
import styles from '../styles/page.Login.style';
import theme from '../styles/theme.style';

export default class LogInPage extends Component {
	state = {
		username: '',
		password: '',
	}

	loginCredentialsOnChangeText = (inputType) => (text) => {
		var username = inputType == 'username' ? text : this.state.username,
			password = inputType == 'password' ? text : this.state.password;
   
		this.setState({
			username: username,
			password: password
		});
	}
	
	loginButtonOnPress = () => {
		var proceed = true;

		if(this.state.username == '') {
			proceed = false;
			alert('Input Username!');
		} else if(this.state.password == '') {
			proceed = false;
			alert('Input Password!');
		}

		if(proceed) {
			const form = {
				email: this.state.username,
				password: this.state.password
			};

			axios.post("http://dev.bcdpinpoint.com/TapAdsServer/public/api/login", form).then(response => {
				this.props.navigation.replace('Home');
			}).catch(error => {
				// console.log(error.response.data);
				alert('Login credentials unmatched');
			});
		}
	}

	signUpButtonOnPress = () => {
		this.props.navigation.navigate('Signup');
	}

	render() {
		return (
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
					style={{
						flex: 1,
						paddingTop: 30,
					}}
				>
					<View style={styles.loginCredentialsView}>
						<InputLogin
							type="username"
							onChangeText={this.loginCredentialsOnChangeText('username')}
						/>

						<InputLogin
							type="password"
							onChangeText={this.loginCredentialsOnChangeText('password')}
						/>
					</View>

					<TouchableOpacity>
						<Text style={[styles.textNormalLabel, styles.textNormalLabelMargin]}>
							Forgot Password?
						</Text>
					</TouchableOpacity>

					<View style={styles.loginButton}>
						<ButtonBlue
							loginButton={true}
							label="Login"
							onPress={this.loginButtonOnPress}
						/>
					</View>

					<Text style={styles.textNormalLabel}>
						Don't have an account?
					</Text>

					<TouchableOpacity
						onPress={this.signUpButtonOnPress}
					>
						<Text style={styles.textSignUp}>
							Sign up
						</Text>
					</TouchableOpacity>
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
		);
  }
}
