import React, { Component } from 'react';
import {
	Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    TextInput,
    Animated
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker';

import { HeaderNav, UserInfo } from '../components/HeaderNav';
import { LabelText, CommonText, Label } from '../components/Text';
import {
    Card,
    CardBody
} from '../components/Card';
import ModalMenu from '../components/Modal/Navigation';

import theme from '../styles/theme.style';
import styles from '../styles/page.Home.style';
import lang from '../assets/language';

export default class ProfileInfoPage extends Component {
    constructor() {
        super();
        this.state = {
            // navigation menu
            modalFadeBackground: new Animated.Value(0),
            modalContainerzIndex: 0,
            modalXValue: new Animated.Value(Dimensions.get('window').width),
            scrollEnable: true,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,

            userData: {
                name: 'Patrick Cua',
                username: 'patrickcua',
                email: 'PatrickCua@Cmail.com',
                contact_number: '0915 000 0000',
                birthdate: '1997-02-17',
                location: 'Rpapa Tondo Manila',
                rate: 4.60239,
                // licenseImage: require('../assets/image/license_sample.png'),
                licenseImage: null,
                image_url: null,
                totalRate: 35 //total number of clients(rating)
            },
            editUserData: {
                name: 'Patrick Cua',
                username: 'patrickcua',
                email: 'PatrickCua@Cmail.com',
                contact_number: '0915 000 0000',
                birthdate: '1997-02-17',
                location: 'Rpapa Tondo Manila',
                rate: 4.60239,
                // licenseImage: require('../assets/image/license_sample.png'),
                licenseImage: null,
                image_url: null,
                totalRate: 35 //total number of clients(rating)
            },

            carsOwned: [
                {
                    model: 'Kia Rio',
                    carYear: 2016,
                    vehicleType: 0
                },{
                    model: 'Toyota Hi-Ace',
                    carYear: 2019,
                    vehicleType: 0
                },{
                    model: 'Ford Ecosport',
                    carYear: 2016,
                    vehicleType: 1
                },{
                    model: 'Kia Rio',
                    carYear: 2016,
                    vehicleType: 2
                }
            ],
        
            personalDetailsData: [
                [
                    {
                        label: 'Name',
                        name: 'name',
                    },{
                        label: 'Contact Number',
                        name: 'contact_number',
                    }
                ],[
                    {
                        label: 'Username',
                        name: 'username',
                    },{
                        label: 'Email Address',
                        name: 'email',
                    }
                ],[
                    {
                        label: 'Birthdate',
                        name: 'birthdate',
                    },{
                        label: 'Location',
                        name: 'location',
                    }
                ]
            ],
            editMode: false,
            personalDetailsXPos: new Animated.Value(0),
            secondViewXPos: 0,
        };
    }

    componentDidMount = () => {

    }

    menuButtonOnPress = () => {
        Animated.timing(this.state.modalFadeBackground, {
            toValue: this.state.scrollEnable ? 0.7 : 0,
            duration: 600
        }).start(() => {
            this.setState({
                modalContainerzIndex: this.state.scrollEnable ? 0 : 1
            });
        });

        Animated.timing(this.state.modalXValue, {
            toValue: this.state.scrollEnable ? this.state.width - 330 : this.state.width,
            duration: 500
        }).start();

        this.setState({
            scrollEnable: !this.state.scrollEnable,
            modalContainerzIndex: 1
        });
    }

    updateUploadPhoto = (name) => () => {
        ImagePicker.launchImageLibrary({
            // options
        }, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                var { userData } = this.state;
            
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                userData[name] = source;
                this.setState({userData});
            }
        });
    }

    removeImage = (name) => () => {
        var { userData } = this.state;
        userData[name] = null;
        this.setState({userData});
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
        var {editUserData} = this.state;
        editUserData[name] = value;
        this.setState({editUserData});
    }

    newPersonalDetailsSave = (cancel) => () => {
        Animated.timing(this.state.personalDetailsXPos, {
            toValue: 0,
            duration: 300
        }).start();
        
        var {
            editUserData,
            userData } = this.state;

        if(cancel) {
            editUserData.name           = userData.name;
            editUserData.username       = userData.username;
            editUserData.email          = userData.email;
            editUserData.contact_number = userData.contact_number;
            editUserData.birthdate      = userData.birthdate;
            editUserData.location       = userData.location;

            this.setState({
                editMode: false,
                editUserData: editUserData
            });
        } else {
            userData.name           = editUserData.name;
            userData.username       = editUserData.username;
            userData.email          = editUserData.email;
            userData.contact_number = editUserData.contact_number;
            userData.birthdate      = editUserData.birthdate;
            userData.location       = editUserData.location;

            this.setState({
                editMode: false,
                userData: userData
            });
        }
    }

    editPersonalDetails = () => {
        Animated.timing(this.state.personalDetailsXPos, {
            toValue: -this.state.secondViewXPos,
            duration: 300
        }).start();

        this.setState({editMode: true});
    }

	render() {
		return (
            <View>
                <ImageBackground
                    style={styles.homePageBackgroundImage}
                    resizeMode="stretch"
                    source={require('../assets/image/common_page_background.png')}
                ></ImageBackground>
                
                <HeaderNav
                    menuButtonOnPress={this.menuButtonOnPress}
                    navigation={this.props.navigation}
                />

                <ScrollView
                    style={styles.homePageScrollView}
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={this.state.scrollEnable}
                >
                    <UserInfo 
                        profilePicture={this.state.userData.image_url ? this.state.userData.image_url : require('../assets/image/male_avatar.png')}
                        userData={this.state.userData}
                        navigation={this.props.navigation}
                    />

                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginVertical: 15,
                        }}
                    >
                        <LabelText color="white">Profile</LabelText>
                    </View>

                    <View
                        style={{
                            marginBottom: 20,
                            marginHorizontal: theme.PAGE_PADDING_HORIZONTAL
                        }}
                    >
                        {/* personal details */}
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
                                            
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <TouchableOpacity
                                                    onPress={!this.state.editMode ? this.editPersonalDetails : this.newPersonalDetailsSave(false)}
                                                >
                                                    <CommonText
                                                        color="gray"
                                                        bold={!this.state.editMode ? false : true}
                                                    >{!this.state.editMode ? 'Edit' : 'Save'}</CommonText>
                                                </TouchableOpacity>

                                                {this.state.editMode ? (
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
                                                    left: this.state.personalDetailsXPos
                                                }}
                                            >
                                                {/* show personal details */}
                                                <View
                                                    style={{
                                                        width: '50%'
                                                    }}
                                                >
                                                    {!this.state.editMode ?
                                                        <View>
                                                            {/* personal details */}
                                                            {this.state.personalDetailsData.map((data, index) =>
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
                                                                            >{d.name == 'birthdate' ? this.readableDate(this.state.userData[d.name]) : this.state.userData[d.name]}</CommonText>
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
                                                                            marginRight: this.state.userData.image_url ? 20 : 0,
                                                                        }}
                                                                        onPress={this.updateUploadPhoto('image_url')}
                                                                    >
                                                                        <CommonText
                                                                            xsmall={true}
                                                                        >{this.state.userData.image_url ? 'Edit' : 'Upload'}</CommonText>
                                                                    </TouchableOpacity>
                                                                    
                                                                    {this.state.userData.image_url ? (
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
                                                            </View>
                                                        </View>
                                                    : null}
                                                </View>

                                                {/* edit personal details */}
                                                <View
                                                    style={{
                                                        width: '50%'
                                                    }}
                                                    onLayout={e => this.setState({secondViewXPos: e.nativeEvent.layout.x})}
                                                >
                                                    {this.state.editMode ?
                                                        <View>
                                                            {this.state.personalDetailsData.map((data, index) =>
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
                                                                                date={this.state.editUserData[d.name]}
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
                                                                                value={this.state.editUserData[d.name]}
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
                        
                        {/* drivers license */}
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
                                            <View
                                                style={{
                                                    flexDirection: 'row'
                                                }}
                                            >
                                                <TouchableOpacity
                                                    style={{
                                                        marginRight: this.state.userData.licenseImage ? 15 : 0,
                                                        borderBottomColor: theme.COLOR_BLACK,
                                                        borderBottomWidth: 0.5,
                                                    }}
                                                    onPress={this.updateUploadPhoto('licenseImage')}
                                                >
                                                    <CommonText
                                                        xsmall={true}
                                                    >{this.state.userData.licenseImage ? 'Update' : 'Upload'} Photo</CommonText>
                                                </TouchableOpacity>
                                                
                                                {this.state.userData.licenseImage ? (
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
                                        </View>

                                        <View
                                            style={{
                                                marginVertical: 20
                                            }}
                                        >
                                            {this.state.userData.licenseImage ? (
                                                <View
                                                    style={{
                                                        width: this.state.width / 1.75,
                                                        height: this.state.width / 3,
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            width: '100%',
                                                            height: 150,
                                                        }}
                                                        resizeMode="contain"
                                                        source={this.state.userData.licenseImage}
                                                    />
                                                </View>
                                            ) : (
                                                <View
                                                    style={{
                                                        width: this.state.width / 1.75,
                                                        height: this.state.width / 3,
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
                                                        source={require('../assets/image/icons/gallery-icon.png')}
                                                    />
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                </CardBody>
                            </Card>
                        </View>
                        
                        {/* owned cars */}
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
                                                    onPress={e => this.props.navigation.navigate('Addvehicle')}
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

                                            {this.state.carsOwned.map((car, carIndex) =>
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
                                                            >{lang.vehicleType[car.vehicleType]}</CommonText>
                                                        </View>
                                                    </View>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                </CardBody>
                            </Card>
                        </View>

                        {/* buttons */}
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
                    </View>
                </ScrollView>

                <ModalMenu
                    modalContainerzIndex={this.state.modalContainerzIndex}
                    width={this.state.width}
                    height={this.state.scrollEnable ? 0 : this.state.height}
                    modalFadeBackground={this.state.modalFadeBackground}
                    modalXValue={this.state.modalXValue}
                    menuButtonOnPress={this.menuButtonOnPress}
                    navigation={this.props.navigation}
                />
            </View>
        );
    }
}
