import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Dimensions,
    Animated,
    Alert
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import FlashMessage, { showMessage } from "react-native-flash-message";

import { LabelText } from '../components/Text';
import { Page } from '../pages/Page';
import UserInfo from '../components/UserInfo';
import { USER } from '../redux/actions/types.action';
import { UserController } from '../controllers/UserController';

import theme from '../styles/theme.style';
import styles from '../styles/page.Home.style';
import { URL, VEHICLE, WEBSOCKET } from '../config/variables';

import PersonalDetails from '../components/profile/profileInfo/PersonalDetails';
import DriverLicense from '../components/profile/profileInfo/DriverLicense';
import OwnedCars from '../components/profile/profileInfo/OwnedCars';
import ActionButton from '../components/profile/profileInfo/ActionButton';

class ProfileInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // navigation menu
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            userData: {
                name: '',
                username: '',
                email: '',
                contact_number: '',
                birthdate: '',
                location: '',
                licenseImage: null,
                image_url: null,
            },
            editUserData: {
                name: '',
                username: '',
                email: '',
                contact_number: '',
                birthdate: '',
                location: '',
            },
            carsOwned: [],
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
            loaders: {
                personalDetails: false,
                displayPhoto: false,
                driverLicense: false
            },
            logout: false,
        };
    }

    componentDidMount() {
        console.log(WEBSOCKET.GET_TOKEN());
        var userData = {
                name: this.props.user.name,
                username: this.props.user.username,
                email: this.props.user.email,
                contact_number: this.props.user.contact_number,
                birthdate: this.props.user.birthdate,
                location: this.props.user.location,
                licenseImage: this.props.user.licenseImage ? { uri: `${URL.SERVER_MEDIA}/${this.props.user.licenseImage}` } : '',
                image_url: this.props.user.profilePicture,
            },
            editUserData = {
                name: this.props.user.name,
                username: this.props.user.username,
                email: this.props.user.email,
                contact_number: this.props.user.contact_number,
                birthdate: this.props.user.birthdate,
                location: this.props.user.location,
            },
            { vehicles } = this.props.user,
            carsOwned = vehicles.map(v => {
                var {vehicle} = v,
                    vehicleType = Object.keys(VEHICLE.TYPE)[v.type];
                return {
                    model: vehicle.model,
                    carYear: vehicle.year,
                    vehicleType: vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)
                };
            });
            
        this.setState({
            userData,
            editUserData,
            carsOwned
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
                var { data, type } = response;

                if(name === 'image_url') {
                    this.loadersToggle('displayPhoto');

                    UserController.request.update.photo({file: data, type: type})
                    .then(res => {
                        var { imageResponse, media } = res.data;
                        if(imageResponse) {
                            this.dispatchUserProfile(media);
                            this.successFlashMessage('Display photo successfully uploaded!');
                        } else {
                            this.failedFlashMessage('Error occured while uploading image.\nCan you try again later? Thanks!');
                        }
                        this.loadersToggle('displayPhoto');
                    })
                    .catch(error => {
                        console.log(error);
                        this.loadersToggle('displayPhoto');
                        this.failedFlashMessage('Error occured while uploading image.\nCan you try again later? Thanks!');
                    });
                } else if(name === 'licenseImage') {
                    this.loadersToggle('driverLicense');

                    UserController.request.update.license({file: data, type: type})
                    .then(res => {
                        var { imageResponse, media } = res.data;
                        if(imageResponse) {
                            var { userData } = this.state;
                            userData.licenseImage = { uri: `${URL.SERVER_MEDIA}/${media.url}` };
                            this.setState({userData});
                            this.dispatchUserProfile(false, media);
                            this.successFlashMessage('License photo successfully uploaded!');
                        } else {
                            this.failedFlashMessage('Error occured while uploading image.\nCan you try again later? Thanks!');
                        }
                        this.loadersToggle('driverLicense');
                    })
                    .catch(error => {
                        console.log(error);
                        this.loadersToggle('driverLicense');
                        this.failedFlashMessage('Error occured while uploading image.\nCan you try again later? Thanks!');
                    });
                }
            }
        });
    }

    removeImage = (name) => () => {
        Alert.alert(
            'Delete Photo',
            `Are you sure you want to remove ${name === 'image_url' ? 'Display Photo' : 'License Photo'}?`,
            [
                {text: 'Yes', onPress: () => this.proceedRemoveImage(name)},
                {text: 'Cancel', onPress: () => console.log('Remove photo cancelled')},
            ],
            {cancelable: false},
        );

        // var { userData } = this.state;
        // userData[name] = null;
        // this.setState({userData});
    }

    proceedRemoveImage = (name) => {
        if(name === 'image_url') {
            this.loadersToggle('displayPhoto');

            UserController.request.remove.photo()
            .then(res => {
                var { imageResponse, media } = res.data;
                if(imageResponse) {
                    this.dispatchUserProfile(media);
                    this.successFlashMessage('Display photo successfully deleted!');
                } else {
                    this.failedFlashMessage('Error occured while deleting image.\nCan you try again later? Thanks!');
                }
                this.loadersToggle('displayPhoto');
            })
            .catch(error => {
                console.log(error);
                this.loadersToggle('displayPhoto');
                this.failedFlashMessage('Error occured while deleting image.\nCan you try again later? Thanks!');
            });
        } else if(name === 'licenseImage') {
            this.loadersToggle('driverLicense');

            UserController.request.remove.license()
            .then(res => {
                var { imageResponse, media } = res.data;
                if(imageResponse) {
                    var { userData } = this.state;
                    userData.licenseImage = media.url;
                    this.setState({userData});
                    this.dispatchUserProfile(false, media);
                    this.successFlashMessage('License photo successfully deleted!');
                } else {
                    this.failedFlashMessage('Error occured while deleting image.\nCan you try again later? Thanks!');
                }
                this.loadersToggle('driverLicense');
            })
            .catch(error => {
                console.log(error);
                this.loadersToggle('driverLicense');
                this.failedFlashMessage('Error occured while deleting image.\nCan you try again later? Thanks!');
            });
        }
    }

    newPersonalDetailsSave = (cancel) => () => {
        var { editUserData,
            userData } = this.state;

        if(cancel) {
            Animated.timing(this.state.personalDetailsXPos, {
                toValue: 0,
                duration: 300
            }).start();

            editUserData.name           = userData.name;
            editUserData.username       = userData.username;
            editUserData.email          = userData.email;
            editUserData.contact_number = userData.contact_number;
            editUserData.birthdate      = userData.birthdate;
            editUserData.location       = userData.location;

            this.setState({ editUserData: editUserData });
            this.editModeToggle();
        } else {
            this.loadersToggle('personalDetails');
            UserController.request.update.details(editUserData)
            .then(res => {
                Animated.timing(this.state.personalDetailsXPos, {
                    toValue: 0,
                    duration: 300
                }).start();

                userData.name           = editUserData.name;
                userData.username       = editUserData.username;
                userData.email          = editUserData.email;
                userData.contact_number = editUserData.contact_number;
                userData.birthdate      = editUserData.birthdate;
                userData.location       = editUserData.location;
                
                this.setState({ userData });
                this.loadersToggle('personalDetails');
                this.editModeToggle();
                this.dispatchUserProfile();
                this.successFlashMessage("Edited details saved successfully!");
            })
            .catch(error => {
                console.log(error);
                this.loadersToggle('personalDetails');
                this.failedFlashMessage("Error occured while saving.\nYou can try again later. Thanks!");
            });
        }
    }

    editPersonalDetails = () => {
        Animated.timing(this.state.personalDetailsXPos, {
            toValue: -this.state.secondViewXPos,
            duration: 300
        }).start();

        this.editModeToggle();
    }

    loadersToggle = (cardName) => {
        var {loaders} = this.state;
        loaders[cardName] = !loaders[cardName];
        this.setState({loaders});
    }

    editModeToggle = () => {
        this.setState({editMode: !this.state.editMode});
    }

    dispatchUserProfile = (ppUpdate = false, lpUpdate = false) => {
        var { user } = this.props,
            { userData } = this.state,
            created_at = ppUpdate ? ppUpdate.created_at : (lpUpdate ? lpUpdate.created_at : user.updated_at);
            userDispatch = {
                id: user.id,
                name: userData.name,
                username: userData.username,
                media_id: user.media_id,
                profilePicture: ppUpdate ? ppUpdate.url : user.profilePicture,
                licenseImage: lpUpdate ? lpUpdate.url : user.licenseImage,
                birthdate: userData.birthdate,
                contact_number: userData.contact_number,
                location: userData.location,
                email: userData.email,
                created_at: user.created_at,
                updated_at: created_at ? created_at : user.updated_at,
                ratings: user.ratings
            };
        this.props.dispatchUpdateProfile(userDispatch);
    }

    mainSetState = (data) => {
        var dataKeys = Object.keys(data),
            dataValues = Object.values(data);
        
        for(var x in dataKeys) {
            var key = dataKeys[x], val = dataValues[x];
            this.setState({ [key]: val });
        }
    }

    successFlashMessage = (description) => {
        this.refs.mainFlashMessage.showMessage({
            message: 'Great!',
            description,
            duration: 5000,
            type: "success",
            icon: "success"
        });
    }

    failedFlashMessage = (description) => {
        this.refs.mainFlashMessage.showMessage({
            message: 'Error!',
            description,
            duration: 5000,
            type: "danger",
            icon: "danger"
        });
    }

	render() {
		return (
            <Page logout={this.state.logout}>
                <ScrollView
                    style={styles.homePageScrollView}
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                >
                    <UserInfo />

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
                        <PersonalDetails {...this} />
                        <DriverLicense {...this} />
                        <OwnedCars {...this} />
                        <ActionButton {...this} />
                    </View>
                </ScrollView>

                <FlashMessage ref="mainFlashMessage" position="top" />
            </Page>
        );
    }
}
const mapStateToProps = (state) => ({
	user: state.userReducer.user
});

const mapDispatchToProps = (dispatch) => ({
    dispatchUpdateProfile: (user) => dispatch({ type: USER.GET.PROFILE.SUCCESS, user }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfoPage);
