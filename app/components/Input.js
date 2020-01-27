import React, { Component } from 'react';
import { View, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/component.Input.style';
import theme from '../styles/theme.style';

export default class Input extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false
		};
	}

	componentDidMount = () => {
		if(this.props.type === 'password' && this.props.loginPage) {
			this.props.passwordRefFunction(this.textInputRef);
		} else if(this.props.type === 'email' && this.props.loginPage) {
			this.props.emailRefFunction(this.textInputRef);
		}
	}

	icons = (type) => {
		let icons = [
			{
				type: 'email',
				placeholder: 'Email or Username',
				security: false,
				url: require('../assets/image/icons/login_username_icon.png')
			}, {
				type: 'password',
				placeholder: 'Password',
				security: this.state.show ? false : true,
				url: require('../assets/image/icons/login_password_icon.png')
			}
		];

		return icons.filter(i => i.type == type)[0];
	}

	render() {
		var iconData = this.icons(this.props.type);

		return (
			<View style={styles.inputTextArea}>
				<Image
					style={styles.inputIconStyle}
					resizeMode="contain"
					source={iconData.url}
				/>

				<View style={{flex: 1}}>
					<TextInput
						ref={ref => this.textInputRef = ref}
						name={this.props.name}
						value={this.props.value}
						style={[styles.inputText, styles.inputFont]}
						secureTextEntry={iconData.security}
						placeholder={iconData.placeholder}
						placeholderTextColor={theme.COLOR_WHITE}
						onChangeText={this.props.onChangeText}
						onSubmitEditing={this.props.onSubmitEditing}
						returnKeyType={this.props.returnKeyType}
						onBlur={this.props.onBlur}
						onFocus={this.props.onFocus}
					/>
				</View>

				{this.props.type === 'password' ? (
					<TouchableOpacity
						onPress={() => this.setState({show: !this.state.show})}
						activeOpacity={0.9} >
						{this.state.show ? (
							<Image
								style={styles.showHideVisiblity}
								resizeMode="contain"
								source={require('../assets/image/icons/login_password_hide_icon.png')}
							/>
						) : (
							<Image
								style={styles.showHideVisiblity}
								resizeMode="contain"
								source={require('../assets/image/icons/login_password_show_icon.png')}
							/>
						)}
					</TouchableOpacity>
				) : null}
			</View>
		);
	}
}
