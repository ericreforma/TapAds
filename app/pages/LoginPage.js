import React, { Component } from 'react';
import {
	TouchableOpacity,
	ImageBackground,
	Text,
	View,
	Image } from 'react-native';
import { connect } from 'react-redux';
import Input from '../components/Input';
import ButtonBlue from '../components/ButtonBlue';
import styles from '../styles/page.Login.style';
import { AuthAction } from '../redux/actions/auth.action';


class LogInPage extends Component {

	state = {
		email: '',
		password: ''
	}

	render() {
		return (

			<ImageBackground
				source={require('../assets/image/login_page_bg.png')}
				style={styles.containerView}
			>

				<View style={styles.loginCredentialsView}>
					<Input
						type="username"
						name="email"
						value={this.state.email}
						onChangeText={(email) => this.setState({ email })}
					/>
					<Input type="password"
						name="password"
						value={this.state.password}
						onChangeText={(password) => this.setState({ password })}
					/>
				</View>

				<TouchableOpacity>
					<Text style={[styles.textNormalLabel, styles.textNormalLabelMargin]}>
						Forgot Password?
					</Text>
				</TouchableOpacity>

				<View style={styles.loginButton} >
					<ButtonBlue
						loginButton={true}
						label="Login"
						onPress={
							() => this.props.loginPressed(this.state.email, this.state.password)
						}
					/>
				</View>

				<Text style={styles.textNormalLabel}>
					Don't have an account?
				</Text>

				<TouchableOpacity onPress={() => this.loginPressed }>
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

const mapStateToProps = (state) => ({
		email: state.email,
		password: state.password
});

const mapDispatchToProps = (dispatch) => ({
		loginPressed: (email, password) => dispatch(AuthAction.login(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);
