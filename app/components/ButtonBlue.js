import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import theme from '../styles/theme.style';
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
            <TouchableOpacity
                style={[
                    styles.buttonStyle,
                    (
                        this.props.loginButton
                        ? styles.buttonJustifyContent
                        : styles.buttonCenterContent
                    )
                ]}
            >
                <Text
                    style={styles.buttonLabel}
                >
                    {this.props.label}
                </Text>

                {this.checkIfLogin(this.props.loginButton)}
            </TouchableOpacity>
		);
  }
}
