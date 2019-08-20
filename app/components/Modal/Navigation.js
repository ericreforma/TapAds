import React, { Component } from 'react';
import { View,
      Text,
      Animated,
      TouchableHighlight,
      TouchableOpacity
} from 'react-native';
import {
  LabelText,
  CommonText
} from '../Text';
import { AuthController } from '../../controllers';
import NavigationService from '../../services/navigation';
import styles from '../../styles/component.Navigation.style';


export default class ModalMenu extends Component {

    logout() {
      AuthController.logout()
      .then(() => {
        NavigationService.navigate('Loading');
      })
      .catch((e) => {
        console.log("error");
        console.log(e);
      })
    }

    menuNavOnPress = (index) => (e) => {
        switch(index){
            case 0:
                this.props.navigateToPage('MyCampaign')
                break;
            case 1:
                this.props.navigateToPage('Profile')
                break;
            case 2:
                this.props.navigateToPage('Messenger')
                break;
            case 3:
                this.props.navigateToPage('TermsAndCondition')
                break;
        }
    }

    render() {
        return (
            <View
                style={[
                    styles.navigationContainer,
                    {
                        zIndex: this.props.modalContainerzIndex
                    }
                ]}
            >
                <TouchableHighlight
                    onPress={this.props.menuButtonOnPress}
                >
                    <Animated.View
                        style={[
                            styles.navigationBackground,
                            {
                                width: this.props.width,
                                height: this.props.height,
                                opacity: this.props.modalFadeBackground
                            }
                        ]}
                    />
                </TouchableHighlight>

                <Animated.View
                    style={[
                        styles.navigationContentContainer,
                        {
                            left: this.props.modalXValue
                        }
                    ]}
                >
                    <View style={styles.navigationCloseButton}>
                        <TouchableOpacity
                            onPress={this.props.menuButtonOnPress}
                        >
                            <Text
                                style={styles.navigationCloseText}
                            >
                                X
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={styles.navigationContentBody}
                    >
                        <View
                            style={styles.navigationContentBodyTop}
                        >
                            {['My Campaigns', 'My Profile', 'Messenger', 'Terms and Conditions'].map((value, index) =>
                                <View
                                    key={index}
                                    style={[
                                        styles.navigationContentBodyTopWrapper,
                                        (
                                            index == 0
                                            ? styles.navigationContentBodyTopWrapperFirstChild
                                            : {}
                                        )
                                    ]}
                                >
                                    <TouchableOpacity
                                        style={styles.navigationContentBodyTopSpaceBetween}
                                        onPress={this.menuNavOnPress(index)}
                                    >
                                        <CommonText color="white">{'<'}</CommonText>
                                        <LabelText color="white">{value}</LabelText>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>

                        <View
                            style={styles.navigationContentBodyBottom}
                        >
                            <View
                                style={styles.navigationContentBodyBottomWrapper}
                            >
                                <Text
                                    style={styles.navigationContentBodyBottomText}
                                >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do mpore et dolore magna
                                </Text>
                            </View>

                            <View
                                style={styles.navigationContentBodyBottomLogout}
                            >
                                <TouchableOpacity
                                    onPress={() => { this.logout() }}
                                >
                                    <LabelText color="white">Log out</LabelText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Animated.View>
            </View>
        );
    }
}
