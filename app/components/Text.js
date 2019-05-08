import React, { Component } from 'react';
import { Text } from 'react-native';
import styles from '../styles/component.Text.style';

class CommonText extends Component {
    render() {
        return (
            <Text
                style={[
                    styles.commonText,
                    (
                        this.props.color == 'white'
                        ? styles.textWhite
                        : styles.textCommonColor
                    )
                ]}
            >
                {this.props.children}
            </Text>
        );
    }
}

class LabelText extends Component {
    render() {
        return (
            <Text
                style={[
                    styles.labelText,
                    (
                        this.props.color == 'white'
                        ? styles.textWhite
                        : styles.textBlack
                    )
                ]}
            >
                {this.props.children}
            </Text>
        );
    }
}

export { LabelText, CommonText };