import React, { Component } from 'react';
import { Text } from 'react-native';
import styles from '../styles/component.Text.style';
import theme from '../styles/theme.style';

class CommonText extends Component {
    render() {
        return (
            <Text
                style={[
                    (
                        this.props.bold
                        ? styles.textBold
                        : styles.commonText
                    ),
                    (
                        this.props.xsmall
                        ? styles.xsmallFontSize
                        : (
                            this.props.large
                            ? styles.textDefault
                            : styles.commonFontSize
                        )
                    ),
                    (
                        this.props.color == 'white'
                        ? styles.textWhite
                        : (
                            this.props.color == 'blue'
                            ? styles.textBlue
                            : (
                                this.props.color == 'gray'
                                ? styles.textGray
                                : (
                                    this.props.color == 'pink'
                                    ? styles.textPink
                                    : (
                                        this.props.color
                                        ? {color: this.props.color}
                                        : styles.textBlack
                                    )
                                )
                            )
                        )
                    ), {
                        textAlign: this.props.textAlign ? this.props.textAlign : 'left'
                    }
                ]}
                numberOfLines={this.props.numberOfLines ? this.props.numberOfLines : 0}
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
                            : (
                                this.props.color
                                ? {color: this.props.color}
                                : styles.textBlack
                            )
                        )
                    ),
                    (
                        this.props.large
                        ? styles.textLarge
                        : (
                            this.props.small
                            ? styles.commonFontSize
                            : styles.textDefault
                        )
                    ), {
                        textAlign: this.props.textAlign ? this.props.textAlign : 'left'
                    }
                ]}
                numberOfLines={this.props.numberOfLines ? this.props.numberOfLines : 0}
            >
                {this.props.children}
            </Text>
        );
    }
}

class Label extends Component {
    render() {
        return (
            <Text
                style={{
                    color: this.props.nonActive ? theme.NEW_COLOR.COLOR_GRAY : theme.NEW_COLOR.COLOR_BLACK,
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 16
                }}
            >
                {this.props.label}
            </Text>
        );
    }
}

class LabelOverflow extends Component {
    render() {
        return (
            <Text
                style={{
                    color: this.props.nonActive ? theme.NEW_COLOR.COLOR_GRAY : theme.NEW_COLOR.COLOR_BLACK,
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 16
                }}
                numberOfLines={this.props.numberOfLines}
            >
                {this.props.label}
            </Text>
        );
    }
}

class Common extends Component {
    render() {
        return (
            <Text
                style={{
                    color: this.props.nonActive ? theme.NEW_COLOR.COLOR_GRAY : theme.NEW_COLOR.COLOR_BLACK,
                    fontFamily: 'Montserrat-Medium',
                    fontSize: theme.FONT_SIZE_SMALL
                }}
                onLayout={this.props.onLayout}
            >
                {this.props.label}
            </Text>
        );
    }
}

class CommonOverflow extends Component {
    render() {
        return (
            <Text
                style={{
                    color: this.props.nonActive ? theme.NEW_COLOR.COLOR_GRAY : theme.NEW_COLOR.COLOR_BLACK,
                    fontFamily: 'Montserrat-Medium',
                    fontSize: theme.FONT_SIZE_SMALL
                }}
                numberOfLines={this.props.numberOfLines}
            >
                {this.props.label}
            </Text>
        );
    }
}

export { LabelText, CommonText, Label, Common, CommonOverflow, LabelOverflow };