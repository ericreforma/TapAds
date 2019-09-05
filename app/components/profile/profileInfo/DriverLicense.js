import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { LabelText, CommonText } from '../../../components/Text';
import {
    Card,
    CardBody
} from '../../../components/Card';
import theme from '../../../styles/theme.style';

export default class DriverLicense extends Component {
    constructor(props) {
        super(props);
        this.updateUploadPhoto = this.props.updateUploadPhoto;
        this.removeImage = this.props.removeImage;
    }

    render() {
        const { state } = this.props;

        return (
            <View
                style={{
                    marginVertical: 7
                }}
            >
                <Card>
                    <CardBody
                        header={true}
                        footer={true}
                    >
                        <View
                            style={{
                                paddingHorizontal: 5,
                                flex: 1,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <LabelText>Driver's License</LabelText>

                                {state.loaders.driverLicense ? (
                                    <View
                                        style={{
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <ActivityIndicator size="small" color="#000000" />
                                    </View>
                                ) : (
                                    <View
                                        style={{
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <TouchableOpacity
                                            style={{
                                                marginRight: state.userData.licenseImage ? 15 : 0,
                                                borderBottomColor: theme.COLOR_BLACK,
                                                borderBottomWidth: 0.5,
                                            }}
                                            onPress={this.updateUploadPhoto('licenseImage')}
                                        >
                                            <CommonText
                                                xsmall={true}
                                            >{state.userData.licenseImage ? 'Update' : 'Upload'} Photo</CommonText>
                                        </TouchableOpacity>

                                        {state.userData.licenseImage ? (
                                            <TouchableOpacity
                                                style={{
                                                    borderBottomColor: theme.COLOR_GRAY_MEDIUM,
                                                    borderBottomWidth: 0.5,
                                                }}
                                                onPress={this.removeImage('licenseImage')}
                                            >
                                                <CommonText
                                                    xsmall={true}
                                                    color="gray"
                                                >Remove</CommonText>
                                            </TouchableOpacity>
                                        ) : null}
                                    </View>
                                )}
                            </View>

                            <View
                                style={{
                                    marginVertical: 20
                                }}
                            >
                                {state.userData.licenseImage ? (
                                    <View
                                        style={{
                                            width: state.width / 1.75,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                width: '100%',
                                                height: 150,
                                            }}
                                            resizeMode="contain"
                                            source={state.userData.licenseImage}
                                        />
                                    </View>
                                ) : (
                                    <View
                                        style={{
                                            width: state.width / 1.75,
                                            height: state.width / 3,
                                            padding: 20,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 5,
                                            backgroundColor: theme.COLOR_GRAY_HEAVY,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                            resizeMode="contain"
                                            source={require('../../../assets/image/icons/gallery-icon.png')}
                                        />
                                    </View>
                                )}
                            </View>
                        </View>
                    </CardBody>
                </Card>
            </View>
        );
    }
}
