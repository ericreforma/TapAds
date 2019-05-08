import React, { Component } from 'react';
import { View, Text, Animated, TouchableHighlight, TouchableOpacity } from 'react-native';
import { LabelText, CommonText } from '../Text';
import theme from '../../styles/theme.style';

export default class ModalMenu extends Component {
    render() {
        return (
            <View
                style={{
                    position: 'absolute',
                    zIndex: this.props.modalContainerzIndex,
                    top: 0
                }}
            >
                <TouchableHighlight
                    onPress={this.props.menuButtonOnPress}
                >
                    <Animated.View
                        style={{
                            backgroundColor: theme.COLOR_BLACK,
                            width: this.props.width,
                            height: this.props.height,
                            opacity: this.props.modalFadeBackground
                        }}
                    ></Animated.View>
                </TouchableHighlight>
                
                <Animated.View
                    style={{
                        backgroundColor: theme.COLOR_BLUE,
                        width: 330,
                        position: 'absolute',
                        top: 70,
                        left: this.props.modalXValue,
                        borderTopLeftRadius: 15,
                        borderBottomLeftRadius: 15,
                        padding: 15
                    }}
                >
                    <TouchableHighlight
                        style={{
                            alignSelf: 'flex-start',
                        }}
                        onPress={this.props.menuButtonOnPress}
                    >
                        <Text
                            style={{
                                color: theme.COLOR_WHITE,
                                fontFamily: 'Montserrat-Regular'
                            }}
                        >X</Text>
                    </TouchableHighlight>

                    <View
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            padding: 20
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'flex-end',
                            }}
                        >
                            <View
                                style={{
                                    width: 210,
                                    borderTopWidth: 1,
                                    borderTopColor: theme.COLOR_WHITE,
                                    borderBottomWidth: 1,
                                    borderBottomColor: theme.COLOR_WHITE,
                                    paddingVertical: 10,
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <CommonText color="white">{'<'}</CommonText>
                                    <LabelText color="white">My Profile</LabelText>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    width: 210,
                                    borderBottomWidth: 1,
                                    borderBottomColor: theme.COLOR_WHITE,
                                    paddingVertical: 10,
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <CommonText color="white">{'<'}</CommonText>
                                    <LabelText color="white">Messenger</LabelText>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    width: 210,
                                    borderBottomWidth: 1,
                                    borderBottomColor: theme.COLOR_WHITE,
                                    paddingVertical: 10,
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <CommonText color="white">{'<'}</CommonText>
                                    <LabelText color="white">Terms and Conditions</LabelText>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View
                            style={{
                                flex: 1,
                                width: 150,
                                marginTop: 100,
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end'
                            }}
                        >
                            <View
                                style={{
                                    borderBottomWidth: 0.5,
                                    borderBottomColor: theme.COLOR_WHITE,
                                    paddingVertical: 10
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'Montserrat-Regular',
                                        fontSize: theme.FONT_SIZE_SMALL,
                                        color: theme.COLOR_WHITE,
                                        textAlign: 'right'
                                    }}
                                >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do mpore et dolore magna
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={{
                                    paddingVertical: 10
                                }}
                            >
                                <LabelText color="white">Log out</LabelText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </View>
        );
    }
}