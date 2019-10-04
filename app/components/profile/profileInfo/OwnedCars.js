import React, { Component } from 'react';
import {
	Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { LabelText, CommonText } from '../../../components/Text';
import {
    Card,
    CardBody
} from '../../../components/Card';
import theme from '../../../styles/theme.style';
import NavigationService from '../../../services/navigation';

export default class OwnedCars extends Component {
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
                                paddingHorizontal: 5
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <LabelText>Owned Cars</LabelText>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={e => NavigationService.navigate('Addvehicle')}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: 'Montserrat-Regular',
                                                color: theme.COLOR_PINK,
                                                fontSize: theme.FONT_SIZE_SMALL
                                            }}
                                        >
                                            Add Vehicle
                                        </Text>
                                    </TouchableOpacity>

                                    <Text
                                            style={{
                                                fontFamily: 'Montserrat-Regular',
                                                color: theme.COLOR_PINK,
                                                fontSize: theme.FONT_SIZE_SMALL,
                                                marginHorizontal: 5
                                            }}
                                    >
                                        |
                                    </Text>

                                    <TouchableOpacity>
                                        <Text
                                            style={{
                                                fontFamily: 'Montserrat-Regular',
                                                color: theme.COLOR_PINK,
                                                fontSize: theme.FONT_SIZE_SMALL
                                            }}
                                        >
                                            Filter
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View
                                style={{
                                    marginTop: 30,
                                }}
                            >
                                <View
                                    style={{
                                        marginBottom: 20,
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            paddingRight: 5
                                        }}
                                    >
                                        <LabelText
                                            small={true}
                                        >Model</LabelText>
                                    </View>

                                    <View
                                        style={{
                                            flex: 1,
                                            paddingLeft: 5,
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                                paddingRight: 5
                                            }}
                                        >
                                            <LabelText
                                                small={true}
                                            >Car Year</LabelText>
                                        </View>

                                        <View
                                            style={{
                                                flex: 1,
                                                paddingLeft: 5
                                            }}
                                        >
                                            <LabelText
                                                small={true}
                                            >Type</LabelText>
                                        </View>
                                    </View>
                                </View>

                                {state.carsOwned.length !== 0 ?
                                    state.carsOwned.map((car, carIndex) =>
                                        <View
                                            key={carIndex}
                                            style={{
                                                marginBottom: 20,
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flex: 1,
                                                    paddingRight: 5
                                                }}
                                            >
                                                <CommonText
                                                    xsmall={true}
                                                >{car.model}</CommonText>
                                            </View>

                                            <View
                                                style={{
                                                    flex: 1,
                                                    paddingLeft: 5,
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        paddingRight: 5
                                                    }}
                                                >
                                                    <CommonText
                                                        xsmall={true}
                                                    >{car.carYear}</CommonText>
                                                </View>

                                                <View
                                                    style={{
                                                        flex: 1,
                                                        paddingLeft: 5
                                                    }}
                                                >
                                                    <CommonText
                                                        xsmall={true}
                                                    >{car.vehicleType.nameOnCaps}</CommonText>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                : (
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingBottom: 10
                                        }}
                                    >
                                        
                                        <CommonText
                                            xsmall={true}
                                        >-- No owned cars --</CommonText>
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
