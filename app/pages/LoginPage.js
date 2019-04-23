import React, { Component } from 'react';
import {
	TouchableOpacity,
	ImageBackground,
	Text,
	View,
	Image } from 'react-native';
import Input from '../components/Input';
import ButtonBlue from '../components/ButtonBlue';
import styles from '../styles/page.Login.style';

export default class LogInPage extends Component {
	render() {
		return (
			<ImageBackground
				source={require('../assets/image/login_page_bg.png')}
				style={styles.containerView}
			>
				
				<View style={styles.loginCredentialsView}>
					<Input type="username"/>

					<Input type="password"/>
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
					/>
				</View>

				<Text style={styles.textNormalLabel}>
					Don't have an account?
				</Text>

				<TouchableOpacity>
					<Text style={styles.textSignUp}>
						Sign up
					</Text>
				</TouchableOpacity>

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

			</ImageBackground>
		);
  }
}
