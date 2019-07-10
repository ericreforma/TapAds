import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import styles from '../styles/component.HeaderNav.style';

class HeaderNav extends Component {
    render() {
        return (
            <View
                style={[styles.headerNavRowDirection, styles.headerNavTopContainer]}
            >
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Home')}
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
                        onPress={() => this.props.navigation.navigate('Notification')}
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

class UserInfo extends Component {
    rating = (rate) => {
        rate = Math.trunc(Math.round(this.props.userData.rate * 10) / 10);

        return (
            <View
                style={styles.headerNavUserStarContainer}
            >
                {Array(5).fill(0).map((star, starIndex) =>
                    <Image
                        key={starIndex}
                        style={styles.headerNavUserStar}
                        source={
                            (
                                starIndex < rate
                                ? require('../assets/image/icons/star_highlight_icon.png')
                                : require('../assets/image/icons/star_icon.png')
                            )
                        }
                    />
                )}
            </View>
        );
    }


    render() {
        return (
            <View
                style={styles.HeaderNavContainer}
            >
                <View
                    style={[styles.headerNavCenter, styles.headerNavProfilePicture]}
                >
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this.props.navigation.navigate('Profile')}
                    >
                        <Image
                            style={styles.headerNavProfilePictureImage}
                            resizeMode="cover"
                            source={this.props.profilePicture}
                        />
                    </TouchableOpacity>
                </View>

                <View
                    style={[styles.headerNavCenter, styles.headerNavUserContainer]}
                >
                    <Text
                        style={styles.headerNavUserName}
                    >
                        {this.props.userData.name}
                    </Text>

                    <View
                        style={styles.headerNavRowDirection}
                    >
                        <Text
                            style={styles.headerNavUserRating}
                        >
                            {Math.round(this.props.userData.rate * 10) / 10}
                        </Text>

                        {this.rating(this.props.userData.rate)}

                        <Text
                            style={styles.headerNavUserTotalRating}
                        >
                            ({this.props.userData.totalRate})
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

export {
    HeaderNav,
    UserInfo
}