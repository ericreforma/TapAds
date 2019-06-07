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
                        : (
                            this.props.color == 'blue'
                            ? styles.textBlue
                            : styles.textBlack
                        )
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
                        : (
                            this.props.color == 'blue'
                            ? styles.textBlue
                            : styles.textBlack
                        )
                    ),
                    (
                        this.props.large
                        ? styles.textLarge
                        : styles.textDefault
                    )
                ]}
            >
                {this.props.children}
            </Text>
        );
    }
}

export { LabelText, CommonText };