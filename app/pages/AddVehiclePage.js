import React, { Component } from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Dimensions,
    FlatList,
    Text,
    ActivityIndicator,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import DropdownAlert from 'react-native-dropdownalert';
import fileType from 'react-native-file-type';

import { USER } from '../redux/actions/types.action';
import Page from './Page';
import UserInfo from '../components/UserInfo';
import {
		LabelText,
    Common,
    Label,
} from '../components/Text';
import { IMAGES, VEHICLE } from '../config/variables';
import { UserController } from '../controllers/UserController';
import AutoComplete from '../components/AutoComplete';
import NavigationService from '../services/navigation';

import theme from '../styles/theme.style';
import { Card, CardBody } from '../components/Card';

import PopupMessage from '../components/Modal/popup';

class AddVehiclePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			width: Dimensions.get('window').width,
			height: Dimensions.get('window').height,
			activeTypeVehicle: 0,
			vehicleClassification: 0,
			plateNumber: '',
			vehicles: [{ url: IMAGES.ICONS.add }],
			vehicleToUpload: [],
			uploadManufacturer: '',
			uploadManufacturerOnFocus: false,
			uploadModel: '',
			uploadModelOnFocus: false,
			uploadYear: '',
			uploadYearOnFocus: false,
			uploadColor: '',
			uploadColorOnFocus: false,
			addCarLoading: false,
			vehicleDatabase: [],

			popupModal: {
				visible: false,
				message: '',
				description: ''
			}
		};
	}

	componentDidMount = () => {
			UserController.request.vehicleDB()
			.then(res => this.setState({ vehicleDatabase: res.data }))
			.catch(error => console.log(error));
	}

	addVehicleButtonOnPress = () => {
			ImagePicker.showImagePicker({
				title: 'Select Vehicle Photo',
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
							const source = { uri: response.uri },
									{ vehicles, vehicleToUpload } = this.state,
									{ data, type, path } = response;
							
							if(!type) {
								fileType(path).then(file => {
									vehicles.splice(1, 0, { url: source });
									vehicleToUpload.push({ data, type: file.mime });
									this.setState({ vehicles, vehicleToUpload });
								});
							} else {
								vehicles.splice(1, 0, { url: source });
								vehicleToUpload.push({ data, type });
								this.setState({ vehicles, vehicleToUpload });
							}
					}
			});
	}

	removeCar = (index) => () => {
			var { vehicles, vehicleToUpload } = this.state;
			vehicles.splice(index, 1);
			vehicleToUpload.splice((index - 1), 1);
			this.setState({vehicles});
	}

	submitAddedCar = (e) => {
		this.toggleAddCarLoading(true);
		var { vehicleToUpload,
			activeTypeVehicle,
			vehicleClassification,
			uploadManufacturer,
			uploadModel,
			uploadYear,
			uploadColor,
			plateNumber,
			vehicleDatabase } = this.state,
			alertMessage = '',
			newVehicle = null,
			vehicleId;

		if(uploadManufacturer === '')
			alertMessage += 'Pick car manufacturer\n';
				
		if(uploadModel === '')
			alertMessage += 'Pick car model\n';
				
		if(uploadYear === '')
			alertMessage += 'Pick car year\n';

		if(vehicleToUpload.length === 0)
			alertMessage += 'Upload Vehicle Photo\n';

		if(plateNumber === '')
			alertMessage += 'Input plate number';

		if(alertMessage === '') {
			vehicleId = vehicleDatabase.find(v =>
				v.manufacturer.toString().toLowerCase() == uploadManufacturer.toString().toLowerCase()
				&& v.model.toString().toLowerCase() == uploadModel.toString().toLowerCase()
				&& v.year.toString() == uploadYear.toString()
			);

			if(vehicleId) {
				vehicleId = vehicleId.id;
			} else {
				newVehicle = {
					manufacturer: uploadManufacturer,
					model: uploadModel,
					year: uploadYear,
					class: vehicleClassification
				};
			}

			UserController.request.create.vehicle({
				vehicleToUpload,
				activeTypeVehicle,
				vehicleId,
				newVehicle,
				uploadColor,
				plateNumber
			})
			.then(res => {
				UserController.request.profile()
				.then(res => {
					this.props.dispatchGetProfile(res.data);
					this.resetInputFields();

					const { popupModal } = this.state;
					popupModal.visible = true;
					popupModal.message = 'Great!';
					popupModal.description = 'Vehicle added successfully!';
					this.setState({popupModal});
				})
				.catch(error => {
					console.log(error);
				});
			})
			.catch(error => {
				console.log(error);
				this.failedFlashMessage(
					'Error',
					'Error connecting to the server, could you please try again later? Thanks!',
				);
				this.toggleAddCarLoading(false);
			});
		} else {
			this.failedFlashMessage(
				'Please fill in fields.',
				alertMessage
			);
			this.toggleAddCarLoading(false);
		}
	}

	toggleAddCarLoading = (addCarLoading) => {
			this.setState({ addCarLoading });
	}

	renderVehicles = ({item, index}) => {
			return (
					<View
							style={{
									height: this.state.width / 3.5,
									width: this.state.width / 3.5,
									marginLeft: index == 0 ? 0 : 3,
									marginRight: index == (this.state.vehicles - 1) ? 0 : 3
							}}
					>
							{index == 0 ? (
									<TouchableOpacity
											style={{
													flex: 1,
													justifyContent: 'center',
													alignItems: 'center',
													backgroundColor: theme.COLOR_LIGHT_BLUE + '90',
													borderRadius: 10,
											}}
											activeOpacity={0.8}
											onPress={this.addVehicleButtonOnPress}
									>
											<Image
													style={{
															width: '33%',
															height: '33%'
													}}
													resizeMode="contain"
													source={item.url}
											/>
									</TouchableOpacity>
							) : (
									<View>
											<Image
													style={{
															width: '100%',
															height: '100%',
															borderRadius: 10,
															backgroundColor: theme.COLOR_BLUE,
															borderRadius: 10,
													}}
													resizeMode="cover"
													source={item.url}
											/>

											<TouchableOpacity
													style={{
															width: 15,
															height: 15,
															position: 'absolute',
															top: 10,
															right: 10
													}}
													onPress={this.removeCar(index)}
											>
													<Image
															style={{
																	width: 15,
																	height: 15,
															}}
															resizeMode="contain"
															source={IMAGES.ICONS.close_red}
													/>
											</TouchableOpacity>
									</View>
							)}
					</View>
			);
	}

	successFlashMessage = (message, description) => {
			this.dropDownAVPAlertRef.alertWithType(
					'success',
					message,
					description
			);
	}

	failedFlashMessage = (message, description) => {
			this.dropDownAVPAlertRef.alertWithType(
					'error',
					message,
					description
			);
	}

	resetInputFields = () => {
			this.setState({
					activeTypeVehicle: 0,
					vehicleClassification: 0,
					vehicles: [{ url: IMAGES.ICONS.add }],
					vehicleToUpload: [],
					uploadManufacturer: '',
					uploadManufacturerOnFocus: false,
					uploadModel: '',
					uploadModelOnFocus: false,
					uploadYear: '',
					uploadYearOnFocus: false,
					uploadColor: '',
					uploadColorOnFocus: false,
			});
	}

	newCarModel = () => {
		const { uploadManufacturer,
			uploadModel,
			uploadYear,
			vehicleDatabase } = this.state,
			manufacturer = vehicleDatabase.find(v =>
				v.manufacturer.toString() === uploadManufacturer.toString()
			),
			model = vehicleDatabase.find(v =>
				v.manufacturer.toString() === uploadManufacturer.toString()
				&& v.model.toString() === uploadModel.toString()
			),
			year = vehicleDatabase.find(v =>
				v.manufacturer.toString() === uploadManufacturer.toString()
				&& v.model.toString() === uploadModel.toString()
				&& v.year.toString() === uploadYear.toString()
			);

		if(!manufacturer
			|| !model
			|| !year) {
			return (
				<View
					style={{
						marginTop: 25
					}}
				>
					<Common label="Classification of Vehicle" />

					<View
						style={{
							paddingLeft: 10,
							paddingTop: 15
						}}
					>
						{Object.values(VEHICLE.CLASS).map(v =>
							<View
								key={v.id}
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									paddingBottom: 7
								}}
							>
								<TouchableOpacity
									activeOpacity={0.8}
									style={{
										flexDirection: 'row',
										alignItems: 'center',
									}}
									onPress={
										() => this.setState({vehicleClassification: v.id})
									}
								>
									<View
										style={{
											height: 26,
											width: 26,
											marginRight: 10,
											borderRadius: 13,
											borderWidth: 4,
											borderColor: theme.COLOR_GRAY_MEDIUM,
											backgroundColor: this.state.vehicleClassification == v.id ? theme.COLOR_BLUE : theme.COLOR_GRAY_MEDIUM
										}}
									></View>

									<Common label={v.name.charAt(0).toUpperCase() + v.name.slice(1)} />
								</TouchableOpacity>
							</View>
						)}
					</View>
				</View>
			);
		} else {
			return null;
		}
	}

	closePopupModal = () => {
		const { popupModal } = this.state;
		popupModal.visible = false;
		this.setState({popupModal});
		NavigationService.navigate('Profile');
	}

	render() {
		return (
			<Page>
				<PopupMessage
					isVisible={this.state.popupModal.visible}
					message={this.state.popupModal.message}
					description={this.state.popupModal.description}
					closeModal={this.closePopupModal}
				/>

				<ScrollView
					overScrollMode='never'
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps='always'
				>
					<UserInfo />

					<View
						style={{
							margin: 20,
							marginBottom: 90
						}}
					>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								marginBottom: 20,
							}}
						>
							<LabelText color="white">Add Vehicle</LabelText>
						</View>

						<View>
							{/* car details */}
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
												paddingHorizontal: 10
											}}
										>
											<Label
												label="Car Details"
											/>

											<View
												style={{
													marginVertical: 15
												}}
											>
												{/* car manufacturer */}
												<View
													style={{
														marginVertical: 12
													}}
												>
													<TextInput
														ref="refCarManufacturer"
														placeholder="Car Manufacturer"
														placeholderTextColor={theme.NEW_COLOR.COLOR_GRAY}
														style={{
															fontFamily: 'Montserrat-Medium',
															fontSize: theme.FONT_SIZE_SMALL,
															color: theme.NEW_COLOR.COLOR_BLACK,
															paddingHorizontal: 0,
															borderBottomColor: theme.COLOR_LIGHT_BLUE,
															borderBottomWidth: 2,
															paddingVertical: 5
														}}
														value={this.state.uploadManufacturer}
														onChangeText={uploadManufacturer => this.setState({ uploadManufacturer })}
														onFocus={() => this.setState({ uploadManufacturerOnFocus: true })}
														onBlur={() => this.setState({ uploadManufacturerOnFocus: false })}
													/>
													{this.state.uploadManufacturerOnFocus ? (
														<AutoComplete
															data={this.state.vehicleDatabase}
															text={this.state.uploadManufacturer}
															name='manufacturer'
															carDetailsOnChangeText={(uploadManufacturer) => this.setState({ uploadManufacturer })}
														/>
													) : null}
												</View>

												{/* car model */}
												<View
													style={{
														marginVertical: 12,
													}}
												>
													<TextInput
														ref="refCarModel"
														placeholder="Car Model"
														placeholderTextColor={theme.NEW_COLOR.COLOR_GRAY}
														style={{
															fontFamily: 'Montserrat-Medium',
															fontSize: theme.FONT_SIZE_SMALL,
															color: theme.NEW_COLOR.COLOR_BLACK,
															paddingHorizontal: 0,
															borderBottomColor: theme.COLOR_LIGHT_BLUE,
															borderBottomWidth: 2,
															paddingVertical: 5
														}}
														value={this.state.uploadModel}
														onChangeText={uploadModel => this.setState({ uploadModel })}
														onFocus={() => {
															if(this.state.uploadManufacturer === '') {
																this.refs.refCarModel.blur();
																this.refs.refCarManufacturer.focus();
															} else {
																this.setState({ uploadModelOnFocus: true });
															}
														}}
														onBlur={() => this.setState({ uploadModelOnFocus: false })}
													/>
													{this.state.uploadModelOnFocus ? (
														<AutoComplete
															data={this.state.vehicleDatabase}
															text={this.state.uploadModel}
															manufacturer={this.state.uploadManufacturer}
															name='model'
															carDetailsOnChangeText={(uploadModel) => this.setState({ uploadModel })}
														/>
													) : null}
												</View>

												{/* car year */}
												<View
													style={{
														marginVertical: 12
													}}
												>
													<TextInput
														ref="refCarYear"
														placeholder="Car Year"
														placeholderTextColor={theme.NEW_COLOR.COLOR_GRAY}
														style={{
															fontFamily: 'Montserrat-Medium',
															fontSize: theme.FONT_SIZE_SMALL,
															color: theme.NEW_COLOR.COLOR_BLACK,
															paddingHorizontal: 0,
															borderBottomColor: theme.COLOR_LIGHT_BLUE,
															borderBottomWidth: 2,
															paddingVertical: 5
														}}
														keyboardType={'numeric'}
														value={this.state.uploadYear}
														onChangeText={uploadYear => this.setState({ uploadYear })}
														onFocus={() => {
															if(this.state.uploadModel === '') {
																this.refs.refCarModel.blur();
																this.refs.refCarManufacturer.focus();
															} else {
																this.setState({ uploadYearOnFocus: true });
															}
														}}
														onBlur={() => this.setState({ uploadYearOnFocus: false })}
													/>
													{this.state.uploadYearOnFocus ? (
														<AutoComplete
															data={this.state.vehicleDatabase}
															text={this.state.uploadYear}
															model={this.state.uploadModel}
															manufacturer={this.state.uploadManufacturer}
															name='year'
															carDetailsOnChangeText={(uploadYear) => this.setState({ uploadYear })}
														/>
													) : null}
												</View>

												{/* car color */}
												<View
													style={{
														marginVertical: 12
													}}
												>
													<TextInput
														ref="refCarColor"
														placeholder="Car Color"
														placeholderTextColor={theme.NEW_COLOR.COLOR_GRAY}
														style={{
															fontFamily: 'Montserrat-Medium',
															fontSize: theme.FONT_SIZE_SMALL,
															color: theme.NEW_COLOR.COLOR_BLACK,
															paddingHorizontal: 0,
															borderBottomColor: theme.COLOR_LIGHT_BLUE,
															borderBottomWidth: 2,
															paddingVertical: 5
														}}
														value={this.state.uploadColor}
														onChangeText={uploadColor => this.setState({ uploadColor })}
													/>
												</View>
												
												{this.newCarModel()}
											</View>

											{/* type of vehicle */}
											<View
												style={{
													marginVertical: 12
												}}
											>
												<Common label="Type of Vehicle" />

												<View
													style={{
														paddingTop: 15,
														paddingLeft: 10
													}}
												>
													<View
														style={{
															flexDirection: 'row',
															alignItems: 'center',
															paddingBottom: 7
														}}
													>
														<TouchableOpacity
															activeOpacity={0.8}
															onPress={(e) => this.setState({activeTypeVehicle: 0})}
															style={{
																flexDirection: 'row',
																alignItems: 'center',
															}}
														>
															<View
																style={{
																	height: 26,
																	width: 26,
																	marginRight: 10,
																	borderRadius: 13,
																	borderWidth: 4,
																	borderColor: theme.COLOR_GRAY_MEDIUM,
																	backgroundColor: this.state.activeTypeVehicle == 0 ? theme.COLOR_BLUE : theme.COLOR_GRAY_MEDIUM
																}}
															></View>

															<Common label="Private" />
														</TouchableOpacity>
													</View>
													
													<View
														style={{
															flexDirection: 'row',
															alignItems: 'center',
															paddingBottom: 7
														}}
													>
														<TouchableOpacity
															activeOpacity={0.8}
															onPress={(e) => this.setState({activeTypeVehicle: 1})}
															style={{
																flexDirection: 'row',
																alignItems: 'center',
															}}
														>
															<View
																style={{
																	height: 26,
																	width: 26,
																	marginRight: 10,
																	borderRadius: 13,
																	borderWidth: 4,
																	borderColor: theme.COLOR_GRAY_MEDIUM,
																	backgroundColor: this.state.activeTypeVehicle == 1 ? theme.COLOR_BLUE : theme.COLOR_GRAY_MEDIUM
																}}
															></View>

															<Common
																label="Public/TNVs"
															/>
														</TouchableOpacity>
													</View>
													
													<View
														style={{
															flexDirection: 'row',
															alignItems: 'center'
														}}
													>
														<TouchableOpacity
															activeOpacity={0.8}
															onPress={(e) => this.setState({activeTypeVehicle: 2})}
															style={{
																flexDirection: 'row',
																alignItems: 'center',
															}}
														>
															<View
																style={{
																	height: 26,
																	width: 26,
																	marginRight: 10,
																	borderRadius: 13,
																	borderWidth: 4,
																	borderColor: theme.COLOR_GRAY_MEDIUM,
																	backgroundColor: this.state.activeTypeVehicle == 2 ? theme.COLOR_BLUE : theme.COLOR_GRAY_MEDIUM
																}}
															></View>

															<Common label="Mixed" />
														</TouchableOpacity>
													</View>
												</View>
											</View>
										</View>
									</CardBody>
								</Card>
							</View>
							
							{/* car plate number */}
							<View
								style={{
									marginVertical: 7
								}}
							>
								<View
									style={{
										backgroundColor: theme.COLOR_WHITE,
										borderRadius: 15,
										paddingVertical: 15,
										paddingHorizontal: 30
									}}
								>
									<LabelText>
										Plate Number
									</LabelText>

									<View
										style={{
											marginTop: 10
										}}
									>
										<Common
												nonActive={true}
												label='Plate number lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
										/>
									</View>

									<View
										style={{
											marginVertical: 10,
										}}
									>
										<TextInput
											placeholder="Plate Number.."
											placeholderTextColor={theme.NEW_COLOR.COLOR_GRAY}
											style={{
												fontFamily: 'Montserrat-Medium',
												fontSize: theme.FONT_SIZE_SMALL,
												color: theme.NEW_COLOR.COLOR_BLACK,
												paddingHorizontal: 0,
												borderBottomColor: theme.COLOR_LIGHT_BLUE,
												borderBottomWidth: 2,
												paddingVertical: 5
											}}
											value={this.state.plateNumber}
											onChangeText={plateNumber => this.setState({ plateNumber })}
										/>
									</View>
								</View>
							</View>

							{/* car photos */}
							<View
									style={{
											marginVertical: 7
									}}
							>
									<View
											style={{
													backgroundColor: theme.COLOR_WHITE,
													borderRadius: 15,
													paddingVertical: 15
											}}
									>
											<View
													style={{
															paddingHorizontal: 30
													}}
											>
													{/* label */}
													<Label
															label="Car Photos"
													/>

													{/* description */}
													<View
															style={{
																	marginTop: 10
															}}
													>
															<Common
																	nonActive={true}
																	label='Add the best photos of your said Vehicle.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
															/>
													</View>
											</View>
											
											{/* images */}
											<View
													style={{
															marginVertical: 30
													}}
											>
													<FlatList
															data={this.state.vehicles}
															renderItem={this.renderVehicles}
															keyExtractor={(item, index) => index.toString()}
															horizontal={true}
															overScrollMode="never"
															showsHorizontalScrollIndicator={false}
															contentContainerStyle={{
																	paddingHorizontal: 30
															}}
													/>
											</View>
									</View>
							</View>

							<View
									style={{
											marginTop: 10,
											alignItems: 'center',
											justifyContent: 'center'
									}}
							>
									<TouchableOpacity
											style={{
													backgroundColor: theme.COLOR_LIGHT_BLUE,
													borderRadius: 15,
													paddingHorizontal: 25,
													alignItems: 'center',
													paddingVertical: 13,
											}}
											onPress={this.submitAddedCar}
									>
											{this.state.addCarLoading ? (
													<ActivityIndicator size="small" color="#ffffff" />
											) : (
													<Text
															style={{
																	textAlign: 'center',
																	color: theme.COLOR_WHITE,
																	fontFamily: 'Montserrat-Medium',
																	fontSize: 12,
															}}
													>Add Car</Text>
											)}
									</TouchableOpacity>
							</View>
						</View>
					</View>
				</ScrollView>

				<DropdownAlert ref={ref => this.dropDownAVPAlertRef = ref} />
			</Page>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	dispatchGetProfile: (user) => dispatch({ type: USER.GET.PROFILE.SUCCESS, user }),
});
  
export default connect(null, mapDispatchToProps)(AddVehiclePage);