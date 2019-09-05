import React, { Component } from 'react';
import {
	Text,
    View,
    TouchableOpacity,
} from 'react-native';
import theme from '../../../styles/theme.style';

export default class ActionButton extends Component {
    render() {
        return (
            <View
                style={{
                    marginVertical: 12,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        flex: 4,
                        paddingRight: 5
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor: theme.COLOR_LIGHT_BLUE,
                            borderRadius: 15,
                            paddingHorizontal: 15,
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                color: theme.COLOR_WHITE,
                                fontFamily: 'Montserrat-Medium',
                                fontSize: 12,
                                paddingVertical: 13,
                            }}
                        >
                            Change Password
                        </Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        flex: 3,
                        paddingLeft: 5
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor: theme.COLOR_GRAY_HEAVY,
                            borderRadius: 15,
                            paddingHorizontal: 15,
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                color: theme.COLOR_WHITE,
                                fontFamily: 'Montserrat-Medium',
                                fontSize: 12,
                                paddingVertical: 13,
                            }}
                        >
                            Delete Account
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
