import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles/component.HeaderNav.style';
import themeStyle from '../styles/theme.style';
import NavigationService from '../services/navigation';

class HeaderNav extends Component {
    render() {
        return (
            <View
                style={[styles.headerNavRowDirection, styles.headerNavTopContainer]}
            >
                <TouchableOpacity
                    onPress={() => NavigationService.reset('Home')}
                >
                    <Text
                        style={styles.headerNavTopAppName}
                    >
                        TAP ADS
                    </Text>
                </TouchableOpacity>

                <View
                    style={styles.headerNavTopButtons}
                >
                    <TouchableOpacity
                        style={{
                            marginRight: 20
                        }}
                        activeOpacity={0.8}
                        onPress={() => this.props.navigate('Notification')}
                    >
                        <Image
                            style={styles.headerNavTopNotification}
                            resizeMode="contain"
                            source={require('../assets/image/icons/notification_icon.png')}
                        />

                        {this.props.notification !== 0 ? (
                            <View
                                style={{
                                    position: 'absolute',
                                    backgroundColor: themeStyle.COLOR_BLUE,
                                    height: 20,
                                    width: 20,
                                    borderRadius: 20,
                                    top: 0,
                                    right: -10,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Text
                                    style={{
                                        color: themeStyle.COLOR_WHITE,
                                        fontSize: themeStyle.FONT_SIZE_XSMALL,
                                    }}
                                >{this.props.notification > 99 ? '99+' : `${this.props.notification}`}</Text>
                            </View>
                        ) : null}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this.props.menuButtonOnPress}
                    >
                        <Image
                            style={styles.headerNavTopMenu}
                            resizeMode="contain"
                            source={require('../assets/image/icons/navigation_icon.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    notification: state.userReducer.notification
});

export default connect(mapStateToProps)(HeaderNav);
