import React, { Component } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import styles from '../styles/component.Input.style';
import theme from '../styles/theme.style';

export default class Input extends Component {

    icons = (type) => {
        var icons = [
            {
                type: 'username',
                placeholder: 'Username',
                security: false,
                url: require('../assets/image/icons/login_username_icon.png')
            },{
                type: 'password',
                placeholder: 'Password',
                security: true,
                url: require('../assets/image/icons/login_password_icon.png')
            }
        ]

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
                        name={this.props.name}
                        value={this.props.value}
                        style={[styles.inputText, styles.inputFont]}
                        secureTextEntry={iconData.security}
                        placeholder={iconData.placeholder}
                        placeholderTextColor={theme.COLOR_WHITE}
                        onChangeText={this.props.onChangeText}
                    />
                </View>
            </View>
        );
    }
}
