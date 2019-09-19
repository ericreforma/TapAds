import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    Image,
    ActivityIndicator
} from 'react-native';
import styles from '../styles/component.ButtonBlue.style';

export default class ButtonBlue extends Component {
    checkIfLogin = (type) => {
        if(type) {
            return (
                <Image
                    style={styles.buttonIcon}
                    resizeMode="contain"
                    source={require('../assets/image/icons/login_arrow_right_icon.png')}
                />
            );
        }
    }

	render() {
		return (
            <TouchableOpacity onPress={this.props.onPress}
                style={[
                    styles.buttonStyle,
                    (
                        this.props.loginButton
                        ? styles.buttonJustifyContent
                        : styles.buttonCenterContent
                    )
                ]}
                onPress={this.props.onPress}
            >
                {this.props.isLoggingIn ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text
                        style={styles.buttonLabel}
                    >
                        {this.props.label}
                    </Text>
                )}
                {this.checkIfLogin(this.props.loginButton)}
            </TouchableOpacity>
		);
  }
}
