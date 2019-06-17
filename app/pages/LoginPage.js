import React, { Component } from 'react';
import {
	TouchableOpacity,
	ImageBackground,
	Text,
	View,
	Image,
	Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import Input from '../components/Input';
import ButtonBlue from '../components/ButtonBlue';
import { AuthAction } from '../redux/actions/auth.action';
import styles from '../styles/page.Login.style';

class LogInPage extends Component {
	state = {
		email: '',
		password: ''
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
						<Input
							type="username"
							onChangeText={(email) => this.setState({ email })}
						/>
						<Input
							type="password"
							onChangeText={(password) => this.setState({ password })}
						/>
					</View>

					<TouchableOpacity>
						<Text style={[styles.textNormalLabel, styles.textNormalLabelMargin]}>
							Forgot Password?
						</Text>
					</TouchableOpacity>

					<View style={styles.loginButton}>
						<ButtonBlue
							loginButton
							label="Login"
							onPress={
							() => this.props.loginPressed(this.state.email, this.state.password)
							}
						/>
					</View>

					<Text style={styles.textNormalLabel}>
						Don't have an account?
					</Text>
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate('Signup')}
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

const mapStateToProps = (state) => ({
	email: state.email,
	password: state.password
});

const mapDispatchToProps = (dispatch) => ({
	loginPressed: (email, password) => dispatch(AuthAction.login(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);
