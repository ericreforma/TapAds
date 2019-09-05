import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    TextInput,
    Animated,
    ActivityIndicator
} from 'react-native';
import DatePicker from 'react-native-datepicker';

import { LabelText, CommonText } from '../../../components/Text';
import {
    Card,
    CardBody
} from '../../../components/Card';
import theme from '../../../styles/theme.style';

export default class PersonalDetails extends Component {
    constructor(props) {
        super(props);
        this.editPersonalDetails = this.props.editPersonalDetails;
        this.newPersonalDetailsSave = this.props.newPersonalDetailsSave;
        this.updateUploadPhoto = this.props.updateUploadPhoto;
        this.removeImage = this.props.removeImage;
        this.mainSetState = this.props.mainSetState;
    }

    readableDate = (date) => {
        var year = date.split('-')[0],
            month = parseInt(date.split('-')[1]) - 1,
            day = date.split('-')[2],
            months = [
                'Jan', 'Feb', 'Mar', 'Apr',
                'May', 'Jun', 'Jul', 'Aug',
                'Sep', 'Oct', 'Nov', 'Dec'
            ];

        return `${months[month]}-${day}-${year}`;
    }

    // personal details edit >>>>>>>>>>>>>>
    personalDetailsOnChange = (name) => (value) => {
        var {editUserData} = this.props.state;
        editUserData[name] = value;
        this.mainSetState({editUserData});
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
                                <LabelText>Personal Details</LabelText>

                                {state.editMode && state.loaders.personalDetails ? (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <ActivityIndicator size="small" color="#000000" />
                                    </View>
                                ) : (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={!state.editMode ? this.editPersonalDetails : this.newPersonalDetailsSave(false)}
                                        >
                                            <CommonText
                                                color="gray"
                                                bold={!state.editMode ? false : true}
                                            >{!state.editMode ? 'Edit' : 'Save'}</CommonText>
                                        </TouchableOpacity>

                                        {state.editMode ? (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        marginHorizontal: 5
                                                    }}
                                                >
                                                    <CommonText
                                                        color="gray"
                                                    >|</CommonText>
                                                </View>

                                                <TouchableOpacity
                                                    onPress={this.newPersonalDetailsSave(true)}
                                                >
                                                    <CommonText
                                                        color="gray"
                                                    >Cancel</CommonText>
                                                </TouchableOpacity>
                                            </View>
                                        ) : null}
                                    </View>
                                )}
                            </View>

                            <View
                                style={{
                                    width: '100%',
                                    overflow: 'hidden'
                                }}
                            >
                                <Animated.View
                                    style={{
                                        marginTop: 30,
                                        marginBottom: 20,
                                        flexDirection: 'row',
                                        width: '200%',
                                        left: state.personalDetailsXPos
                                    }}
                                >
                                    {/* show personal details */}
                                    <View
                                        style={{
                                            width: '50%'
                                        }}
                                    >
                                        {!state.editMode ?
                                            <View>
                                                {/* personal details */}
                                                {state.personalDetailsData.map((data, index) =>
                                                    <View
                                                        key={index}
                                                        style={{
                                                            marginBottom: 20,
                                                            flexDirection: 'row',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        {data.map((d, dIdx) =>
                                                            <View
                                                                key={dIdx}
                                                                style={{
                                                                    flex: 1
                                                                }}
                                                            >
                                                                <View
                                                                    style={{
                                                                        marginBottom: 5
                                                                    }}
                                                                >
                                                                    <CommonText bold={true}>{d.label}</CommonText>
                                                                </View>

                                                                <CommonText
                                                                    xsmall={true}
                                                                >{d.name == 'birthdate' ? this.readableDate(state.userData[d.name]) : state.userData[d.name]}</CommonText>
                                                            </View>
                                                        )}
                                                    </View>
                                                )}

                                                {/* display photo */}
                                                <View>
                                                    <View
                                                        style={{
                                                            marginBottom: 5
                                                        }}
                                                    >
                                                        <CommonText bold={true}>Display Photo</CommonText>
                                                    </View>
                                                    
                                                    {state.loaders.displayPhoto ? (
                                                        <View
                                                            style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            <ActivityIndicator size="small" color="#000000" />
                                                        </View>
                                                    ) : (
                                                        <View
                                                            style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            <TouchableOpacity
                                                                style={{
                                                                    borderBottomColor: theme.COLOR_BLACK,
                                                                    borderBottomWidth: 0.5,
                                                                    marginRight: state.userData.image_url ? 20 : 0,
                                                                }}
                                                                onPress={this.updateUploadPhoto('image_url')}
                                                            >
                                                                <CommonText
                                                                    xsmall={true}
                                                                >{state.userData.image_url ? 'Edit' : 'Upload'}</CommonText>
                                                            </TouchableOpacity>
    
                                                            {state.userData.image_url ? (
                                                                <TouchableOpacity
                                                                    style={{
                                                                        borderBottomColor: theme.COLOR_GRAY_MEDIUM,
                                                                        borderBottomWidth: 0.5,
                                                                    }}
                                                                    onPress={this.removeImage('image_url')}
                                                                >
                                                                    <CommonText
                                                                        xsmall={true}
                                                                        color="gray"
                                                                    >Remove Current Photo</CommonText>
                                                                </TouchableOpacity>
                                                            ) : null}
                                                        </View>
                                                    )}
                                                </View>
                                            </View>
                                        : null}
                                    </View>

                                    {/* edit personal details */}
                                    <View
                                        style={{
                                            width: '50%'
                                        }}
                                        onLayout={e => this.mainSetState({secondViewXPos: e.nativeEvent.layout.x})}
                                    >
                                        {state.editMode ?
                                            <View>
                                                {state.personalDetailsData.map((data, index) =>
                                                    data.map((d, dIdx) =>
                                                        <View
                                                            key={index + dIdx}
                                                            style={{
                                                                marginTop: index == 0 ? 0 : 10,
                                                                marginBottom: 10
                                                            }}
                                                        >
                                                            <CommonText
                                                                bold={true}
                                                            >{d.label}</CommonText>

                                                            {d.name == 'birthdate' ? (
                                                                <DatePicker
                                                                    style={{
                                                                        width: '100%',
                                                                    }}
                                                                    date={state.editUserData[d.name]}
                                                                    mode="date"
                                                                    showIcon={false}
                                                                    placeholder="Birthdate"
                                                                    format="YYYY-MM-DD"
                                                                    confirmBtnText="Confirm"
                                                                    cancelBtnText="Cancel"
                                                                    androidMode="spinner"
                                                                    customStyles={{
                                                                        dateInput: {
                                                                            borderWidth: 0,
                                                                            borderBottomWidth: 1,
                                                                            borderBottomColor: theme.COLOR_LIGHT_BLUE,
                                                                            justifyContent: 'center',
                                                                            alignItems: 'flex-start',
                                                                            padding: 0,
                                                                        },
                                                                        dateText: {
                                                                            fontFamily: 'Montserrat-Light',
                                                                            fontSize: theme.FONT_SIZE_SMALL,
                                                                            color: theme.COLOR_BLACK
                                                                        },
                                                                        placeholderText: {
                                                                            fontFamily: 'Montserrat-Light',
                                                                            fontSize: theme.FONT_SIZE_SMALL,
                                                                            color: theme.COLOR_NORMAL_FONT + '70'
                                                                        }
                                                                    }}
                                                                    onDateChange={this.personalDetailsOnChange(d.name)}
                                                                />
                                                            ) : (
                                                                <TextInput
                                                                    style={[
                                                                        {
                                                                            borderBottomWidth: 1,
                                                                            borderBottomColor: theme.COLOR_LIGHT_BLUE,
                                                                            fontFamily: 'Montserrat-Light',
                                                                            fontSize: theme.FONT_SIZE_SMALL,
                                                                            paddingVertical: 6,
                                                                            paddingHorizontal: 0,
                                                                            color: theme.COLOR_BLACK
                                                                        }
                                                                    ]}
                                                                    keyboardType={d.name == 'contact_number' ? 'number-pad' : 'default'}
                                                                    placeholder={d.label}
                                                                    placeholderTextColor={theme.COLOR_NORMAL_FONT + '70'}
                                                                    onChangeText={this.personalDetailsOnChange(d.name)}
                                                                    value={state.editUserData[d.name]}
                                                                />
                                                            )}
                                                        </View>
                                                    )
                                                )}
                                            </View>
                                        : null}
                                    </View>
                                </Animated.View>
                            </View>
                        </View>
                    </CardBody>
                </Card>
            </View>
        );
    }
}
