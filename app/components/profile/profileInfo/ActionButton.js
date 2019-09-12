import React, { Component } from 'react';
import {
	Text,
    View,
    TouchableOpacity,
    Modal,
    ActivityIndicator
} from 'react-native';
import FlashMessage, { showMessage } from "react-native-flash-message";

import { UserController } from '../../../controllers/UserController';
import { LabelText, CommonText } from '../../../components/Text';
import Input from '../../Input';
import theme from '../../../styles/theme.style';

export default class ActionButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            visibleModal: '',
        };
        this.successFlashMessage = this.props.successFlashMessage;
        this.mainSetState = this.props.mainSetState;
        this.modalFlash = React.createRef();
    }

    setModalVisible = (modalVisible, visibleModal) => {
        this.setState({ modalVisible, visibleModal });
    }

    failedFlashMessage = (message, description, icon) => {
        this.refs.modalFlash.showMessage({
            message,
            description,
            duration: 3000,
            type: "danger",
            icon,
        });
    }
    
    render() {
        return (
            <View
                style={{
                    marginVertical: 12,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    style={{
                        zIndex: 1
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: theme.COLOR_BLACK + '90',
                            zIndex: -5
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: theme.COLOR_LIGHT_BLUE,
                                paddingVertical: 30,
                                paddingHorizontal: 20,
                                borderRadius: 20,
                                width: '90%'
                            }}
                        >
                            {this.state.visibleModal === 'changePassword'
                                ? <ChangePassword {...this} />
                                : <DeleteAccount {...this} />
                            }
                        </View>
                    </View>

                    <FlashMessage ref="modalFlash" position="top" />
                </Modal>

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
                        onPress={() => {
                            this.setModalVisible(true, 'changePassword');
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
                        onPress={() => {
                            this.setModalVisible(true, 'deleteAccount');
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

class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            curPass: '',
            newPass: '',
            loaders: false
        };
        this.setModalVisible = this.props.setModalVisible;
        this.successFlashMessage = this.props.successFlashMessage;
        this.failedFlashMessage = this.props.failedFlashMessage;
    }

    changePasswordOnPress = () => {
        const { state } = this.props;
        var { curPass, newPass } = this.state;
        
        this.loadersToggle(true);
        if(curPass !== '') {
            if(newPass !== '') {
                UserController.request.update.password({curPass, newPass})
                .then(res => {
                    if(res.data) {
                        this.loadersToggle(false);
                        this.setModalVisible(!state.modalVisible, state.visibleModal);
                        this.successFlashMessage('Your new password saved successfully!');
                    } else {
                        this.loadersToggle(false);
                        this.failedFlashMessage(
                            'Wrong password',
                            'Your fill in a wrong password.\nPlease insert a correct one. Thank you!',
                            'danger'
                        );
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.loadersToggle(false);
                    this.failedFlashMessage(
                        'Server error!',
                        'Error occured while saving your new password,\ncould you please try again later? Thanks!',
                        'danger'
                    );
                });
            } else {
                this.loadersToggle(false);
                this.failedFlashMessage(
                    'Fill in new password',
                    'Hi! I think you forgot\nto fill in your new password.',
                    'warning'
                );
            }
        } else {
            this.loadersToggle(false);
            this.failedFlashMessage(
                'Fill in current password',
                'Please input your current password to proceed. Thanks!',
                'warning'
            );
        }
    }

    loadersToggle = (loaders) => {
        this.setState({ loaders });
    }
    
    render() {
        const { state } = this.props;

        return (
            <View>
                <View
                    style={{
                        paddingBottom: 30
                    }}
                >
                    <LabelText color="white">Input current password:</LabelText>
                    <Input
                        type="password"
                        onChangeText={(curPass) => this.setState({ curPass })}
                    />
                </View>
                
                <View>
                    <LabelText color="white">Input new password:</LabelText>
                    <Input
                        type="password"
                        onChangeText={(newPass) => this.setState({ newPass })}
                    />
                </View>
                
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        paddingTop: 30
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor: theme.COLOR_BLUE,
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                            borderRadius: 10
                        }}
                        onPress={this.changePasswordOnPress}
                    >
                        {this.state.loaders
                            ? <ActivityIndicator size="small" color="#ffffff" />
                            : <CommonText color="white">Change Password</CommonText>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: theme.COLOR_GRAY_HEAVY,
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                            borderRadius: 10
                        }}
                        onPress={() => {
                            this.setModalVisible(!state.modalVisible, state.visibleModal);
                        }}
                    >
                        <CommonText color="white">Cancel</CommonText>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

class DeleteAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            curPass: '',
            loader: false
        };
        this.setModalVisible = this.props.setModalVisible;
        this.mainSetState = this.props.mainSetState;
        this.failedFlashMessage = this.props.failedFlashMessage;
    }

    deleteAccountOnPress = () => {
        const { state } = this.props;
        var { curPass } = this.state;
        this.loadersToggle(true);

        if(curPass !== '') {
            UserController.request.remove.account({curPass})
            .then(res => {
                this.loadersToggle(false);
                if(res.data) {
                    this.setModalVisible(!state.modalVisible, state.visibleModal);
                    this.mainSetState({ logout: true });
                } else {
                    this.failedFlashMessage(
                        'Wrong password',
                        'Your fill in a wrong password.\nPlease insert a correct one. Thank you!',
                        'danger'
                    );
                }
            })
            .catch(error => {
                console.log(error);
                this.loadersToggle(false);
                this.failedFlashMessage(
                    'Server error!',
                    'Error occured while saving removing your account.\nCould you please try again later? Thank you!',
                    'danger'
                );
            });
        } else {
            this.loadersToggle(false);
            this.failedFlashMessage(
                'Fill in password',
                'Please input your password to proceed. Thanks!',
                'warning'
            );
        }
    }

    loadersToggle = (loaders) => {
        this.setState({ loaders });
    }

    render() {
        const { state } = this.props;

        return (
            <View>
                <LabelText color="white" large>Delete Account</LabelText>

                <View
                    style={{
                        paddingTop: 10
                    }}
                >
                    <CommonText color="white">
                        Are you sure you want to delete your account? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque luctus eros nec sapien ornare, quis imperdiet felis dignissim. Praesent in.
                    </CommonText>
                </View>
                
                <View
                    style={{
                        paddingTop: 10
                    }}
                >
                    <CommonText color="white">
                        Fill in password to delete your account permanently.
                    </CommonText>
                </View>
                
                <View
                    style={{
                        paddingTop: 10
                    }}
                >
                    <Input
                        type="password"
                        onChangeText={(curPass) => this.setState({ curPass })}
                    />
                </View>
                
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        paddingTop: 30
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor: theme.COLOR_BLUE,
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                            borderRadius: 10
                        }}
                        onPress={this.deleteAccountOnPress}
                    >
                        {this.state.loaders
                            ? <ActivityIndicator size="small" color="#ffffff" />
                            : <CommonText color="white">Delete Account</CommonText>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: theme.COLOR_GRAY_HEAVY,
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                            borderRadius: 10
                        }}
                        onPress={() => {
                            this.setModalVisible(!state.modalVisible, state.visibleModal);
                        }}
                    >
                        <CommonText color="white">Cancel</CommonText>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}