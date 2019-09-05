import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import styles from '../styles/component.HeaderNav.style';

export class HeaderNav extends Component {
    render() {
        return (
            <View
                style={[styles.headerNavRowDirection, styles.headerNavTopContainer]}
            >
                <TouchableOpacity
                    onPress={() => this.props.navigate('Home')}
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
                        onPress={() => this.props.navigate('Notification')}
                    >
                        <Image
                            style={styles.headerNavTopNotification}
                            resizeMode="contain"
                            source={require('../assets/image/icons/notification_icon.png')}
                        />
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
