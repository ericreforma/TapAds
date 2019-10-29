import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Alert,
    ActivityIndicator
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import fileType from 'react-native-file-type';
import DropdownAlert from 'react-native-dropdownalert';
import { connect } from 'react-redux';

import { SignupAction } from '../redux/actions/signup.action';

import { CommonText, LabelText } from '../components/Text';
import theme from '../styles/theme.style';

class SignUpAddImagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      licenseImage: null,
      profileImage: null,
      loader: false
    };
  }

  proceedToNext = () => {
		if(this.state.licenseImage) {
			this.props.dispatchImages(this.state.licenseImage, this.state.profileImage);
		} else {
			this.failedFlashMessage('You must upload a license photo to proceed. Thank you!');
		}
	}
	
	uploadPhoto = (name) => () => {
		ImagePicker.showImagePicker({
			title: name === 'profile' ? 'Upload Display Photo' : 'Upload License Photo',
			chooseFromLibraryButtonTitle: 'Open gallery',
			takePhotoButtonTitle: 'Take a photo',
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
		}, response => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				if(!response.type) {
					fileType(response.path).then(file => {
						response.type = file.mime;
						this.updateImageState(name, response);
					});
				} else {
					this.updateImageState(name, response);
				}
			}
		});
	}

	updateImageState = (name, response) => {
		this.setState({ [`${name}Image`]: response });
	}

	failedFlashMessage = (description) => {
		this.dropDownAlertRef.alertWithType(
			'error',
			'Error!',
			description
		);
	}

  render() {
    return (
			<View
				style={{
					backgroundColor: theme.COLOR_WHITE
				}}
			>
				<ScrollView
					overScrollMode='never'
					showsVerticalScrollIndicator={false}
				>
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							paddingVertical: 80
						}}
					>
						<Image
							source={require('../assets/image/app_logo.png')}
						/>
					</View>

					<View
						style={{
							paddingHorizontal: 30
						}}
					>
						{/* profile photo label */}
						<View
							style={{
								alignSelf: 'center'
							}}
						>
							<Text
								style={{
									color: theme.COLOR_BLUE,
									fontSize: theme.FONT_SIZE_LARGE,
									fontFamily: 'Montserrat-Bold'
								}}
							>
								Profile Photo
							</Text>
						</View>

						{/* profile photo card */}
            <View
              style={{
                marginVertical: 20
              }}
            >
							<View
								style={{
									backgroundColor: theme.COLOR_GRAY_MEDIUM,
									borderRadius: theme.PAGE_CARD_RADIUS,
									marginTop: ((Dimensions.get('window').width / 3.5) / 2) - 10
								}}
							>
								<View
									style={{
										alignSelf: 'center',
										position: 'absolute',
										top: (Dimensions.get('window').width / 3.5) / -2
									}}
								>
									{this.state.profileImage ? (
										<Image
											style={{
												width: Dimensions.get('window').width / 3.5,
												height: Dimensions.get('window').width / 3.5,
												borderRadius: (Dimensions.get('window').width / 3.5) / 2,
												borderWidth: 3,
												borderColor: theme.COLOR_MEDIUM_BLUE,
												backgroundColor: theme.COLOR_WHITE
											}}
											source={{uri: this.state.profileImage.uri}}
										/>
									) : (
										<Image
											style={{
												width: Dimensions.get('window').width / 3.5,
												height: Dimensions.get('window').width / 3.5,
												borderRadius: (Dimensions.get('window').width / 3.5) / 2,
												borderWidth: 3,
												borderColor: theme.COLOR_MEDIUM_BLUE,
												backgroundColor: theme.COLOR_WHITE
											}}
											source={require('../assets/image/male_avatar.png')}
										/>
									)}
								</View>

								<View
									style={{
										paddingHorizontal: 20,
										paddingTop: ((Dimensions.get('window').width / 4) / 2) + 20,
										paddingBottom: 20,
										alignSelf: 'center'
									}}
								>
									<TouchableOpacity
										style={{
											backgroundColor: theme.COLOR_BLUE,
											borderRadius: 15,
											paddingHorizontal: 15,
											alignItems: 'center',
											justifyContent: 'center',
											width: Dimensions.get('window').width / 2,
											maxWidth: 300,
											height: 45,
										}}
										onPress={this.uploadPhoto('profile')}
										disabled={this.state.loader}
									>
										<Text
											style={{
												color: theme.COLOR_WHITE,
												fontFamily: 'Montserrat-Medium',
												fontSize: 16,
												paddingVertical: 11
											}}
										>
											Upload Photo
										</Text>
									</TouchableOpacity>
								</View>
							</View>
            </View>
						
						{/* license photo label */}
						<View
							style={{
								alignSelf: 'center',
								marginTop: 10
							}}
						>
							<Text
								style={{
									color: theme.COLOR_BLUE,
									fontSize: theme.FONT_SIZE_LARGE,
									fontFamily: 'Montserrat-Bold'
								}}
							>
								License Photo
							</Text>
						</View>

						{/* license photo card */}
						<View
							style={{
								backgroundColor: theme.COLOR_DIRTY_WHITE,
								borderRadius: theme.PAGE_CARD_RADIUS,
								elevation: 5,
								padding: 20,
								alignItems: 'center',
								justifyContent: 'center',
								marginTop: 10,
								marginBottom: 20
							}}
						>
							<View
								style={{
									marginBottom: 20
								}}
							>
								{this.state.licenseImage ? (
									<View
										style={{
											width: Dimensions.get('window').width / 1.75,
										}}
									>
										<Image
											style={{
												width: '100%',
												height: 150,
											}}
											resizeMode="contain"
											source={{uri: this.state.licenseImage.uri}}
										/>
									</View>
								) : (
									<View
										style={{
											width: Dimensions.get('window').width / 1.75,
											height: Dimensions.get('window').width / 3,
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

							<TouchableOpacity
								style={{
									backgroundColor: theme.COLOR_BLUE,
									borderRadius: 15,
									paddingHorizontal: 15,
									alignItems: 'center',
									justifyContent: 'center',
									width: Dimensions.get('window').width / 2,
									maxWidth: 300,
									height: 45,
								}}
								onPress={this.uploadPhoto('license')}
								disabled={this.state.loader}
							>
								<Text
									style={{
										color: theme.COLOR_WHITE,
										fontFamily: 'Montserrat-Medium',
										fontSize: 16,
										paddingVertical: 11
									}}
								>
									Upload Photo
								</Text>
							</TouchableOpacity>
						</View>

						{/* next button */}
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: 10,
								marginBottom: 30
							}}
						>
							<TouchableOpacity
								style={{
									backgroundColor: theme.COLOR_BLUE,
									borderRadius: 15,
									paddingHorizontal: 15,
									alignItems: 'center',
									justifyContent: 'center',
									width: Dimensions.get('window').width / 2,
									maxWidth: 300,
									height: 45,
								}}
								onPress={this.proceedToNext}
								disabled={this.state.loader}
							>
								{this.state.loader ? (
									<ActivityIndicator color="#fff" />
								) : (
									<Text
										style={{
											color: theme.COLOR_WHITE,
											fontFamily: 'Montserrat-Medium',
											fontSize: 16,
											paddingVertical: 11
										}}
									>
										Next
									</Text>
								)}
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>

				<DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
			</View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
	dispatchImages: (licenseImage, profileImage) => dispatch(SignupAction.license_profile_image({licenseImage, profileImage}))
});

export default connect(null, mapDispatchToProps)(SignUpAddImagePage);