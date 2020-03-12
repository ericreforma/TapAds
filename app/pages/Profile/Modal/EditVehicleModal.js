import React, {
  useState, useEffect
} from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  Alert,
  TextInput,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {
  Icon
} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import fileType from 'react-native-file-type';
import Modal from 'react-native-modal';

import {
  URL,
  IMAGES
} from '../../../config/variables';
import {UserController} from '../../../controllers';

import Loader from '../../../components/Loader';
import { IfElse, Then, Else } from '../../../components/IfElse';
import theme from '../../../styles/theme.style';
import AsyncImage from '../../../components/AsyncImage';
import { AlertFunction } from '../../../components/App/Alert/AlertContent';
import { UserAction } from '../../../redux/actions/user.action';

const VehicleText = {
  Manufacturer: ({text}) => {
    return (
      <Text
        style={{
          fontSize: 14,
          fontFamily: 'Montserrat-Bold',
          color: theme.COLOR_NORMAL_FONT,
        }}
      >{text}</Text>
    )
  },
  Label: ({text, white}) => {
    return (
      <Text
        style={{
          fontSize: 12,
          fontFamily: 'Montserrat-Regular',
          color: white ? theme.COLOR_WHITE : theme.COLOR_NORMAL_FONT
        }}
      >{text}</Text>
    )
  },
  Common: ({text, white}) => {
    return (
      <Text
        style={{
          fontSize: 12,
          fontFamily: 'Montserrat-Bold',
          color: white ? theme.COLOR_WHITE : theme.COLOR_NORMAL_FONT
        }}
      >{text}</Text>
    )
  },
}

const Divider = () => {
  return (
    <View
      style={{
        marginBottom: 15,
        height: 2,
        backgroundColor: theme.COLOR_LIGHT_BLUE
      }}
    />
  )
}

const Row = ({children, lastChild}) => {
  return (
    <View
      style={{
        paddingBottom: lastChild ? 0 : 15
      }}
    >{children}</View>
  )
}

const Card = ({children}) => {
  return (
    <View
      style={{
        width: theme.SCREEN_WIDTH * 0.85,
        backgroundColor: theme.COLOR_WHITE,
        borderRadius: theme.PAGE_CARD_RADIUS,
        elevation: 5,
        paddingHorizontal: 20,
        paddingVertical: 15
      }}
    >{children}</View>
  )
}

const PlateNumberInfo = ({children}) => {
  return (
    <View
      style={{
        flex: 1,
        paddingRight: 15
      }}
    >{children}</View>
  )
}

const PlateNumberContainer = ({children}) => {
  return (
    <View
      style={{
        backgroundColor: theme.COLOR_GRAY_LIGHT,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 5
      }}
    >{children}</View>
  )
}

const EditVehicleModal = props => {
  const {d, update, deleteVehicle} = props;
  const [vehicleData, setVehicleData] = useState(d);
  const [vehiclePhotos, setVehiclePhotos] = useState([]);
  const [plateNumber, setPlateNumber] = useState('');
  const [vehicleToUpload, setVehicleToUpload] = useState([]);
  const [vehicleToRemove, setVehicleToRemove] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [submitLoadingPN, setSubmitLoadingPN] = useState(false);
  const [submitLoadingVP, setSubmitLoadingVP] = useState(false);
  const [PNAlertVisible, setPNAlertVisible] = useState(false);
  const [PNAlertText, setPNAlertText] = useState('');
  const [PNAlertType, setPNAlertType] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [loadingDeleted, setLoadingDeleted] = useState(false);
  let PNTimer = null;
  
  useEffect(() => {
    if(modalVisible) {
      const newVehiclePhotos = d.photo.map(v => {
        return {
          url: {uri: `${URL.SERVER_MEDIA}/${v.url}`},
          id: v.id,
          media_id: v.media_id
        };
      });
      setVehicleData(d);
      setVehiclePhotos([
        {url: IMAGES.ICONS.add},
        ...newVehiclePhotos
      ]);
    }
  }, [modalVisible]);

  const toggleModal = () => setModalVisible(!modalVisible);

  const toggleAlertModal = () => setAlertModal(!alertModal);

  const editPlateNumberButtonOnPress = () => {
    setSubmitLoadingPN(true);
    clearTimeout(PNTimer);
    setPNAlertVisible(false);

    const form = {
      uvid: d.id,
      pnumber: plateNumber
    };

    UserController.request.update
    .pNumber(form)
    .then(res => {
      const {status, message} = res.data;
      setPNAlertType(status);
      setPNAlertText(message);
      setSubmitLoadingPN(false);

      // reset platenumber
      setPlateNumber('');

      setPNAlertVisible(true);
      PNTimer = setTimeout(() => {
        setPNAlertVisible(false);
      }, 7000);
    })
    .catch(err => {
      console.log(err);
      console.log(err.response);
      alert('Server error');
      setSubmitLoadingPN(false);
    });
  }

  const uploadVehiclePhotos = () => {
    if(vehicleToUpload.length !== 0 || vehicleToRemove.length !== 0) {
      setSubmitLoadingVP(true);
      
      UserController.request.update.vehiclePhoto({
        user_vehicle_id: d.id,
        new_vehicle_photos: vehicleToUpload,
        delete_vehicle_photos: vehicleToRemove
      })
      .then(res => {
        const {status, message} = res.data;
        setPNAlertType(status);
        setPNAlertText(message);
        setPNAlertVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          update();
        }, 1000);
      })
      .catch(err => {
        console.log(err);
        console.log(err.response);
        alert('Server error');
        setSubmitLoadingVP(false);
      });
    }
  }

  const addVehicleButtonOnPress = () => {
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
          { data, type, path } = response,
          newVehiclePhotos = vehiclePhotos.map(v => v),
          newVehicleToUpload = vehicleToUpload.map(v => v);
        
        if(!type) {
          fileType(path).then(file => {
            newVehiclePhotos.splice(1, 0, { url: source });
            newVehicleToUpload.push({ data, type: file.mime });
            setVehiclePhotos(newVehiclePhotos);
            setVehicleToUpload(newVehicleToUpload);
          }); 
        } else {
          newVehiclePhotos.splice(1, 0, { url: source });
          newVehicleToUpload.push({ data, type });
          setVehiclePhotos(newVehiclePhotos);
          setVehicleToUpload(newVehicleToUpload);
        }
      }
    });
  }
  
  const removeVehicle = (item, index) => () => {
    if(vehiclePhotos.length > 2) {
      Alert.alert(
        'Deleting Vehicle Photo',
        'Are you sure you want to delete this photo?',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'OK', onPress: () => {
            const newVehiclePhotos = vehiclePhotos.filter((v, vIdx) => vIdx !== index);
            const newVehicleToRemove = vehicleToRemove.map(vr => vr);
            const newVehicleToUpload = vehicleToUpload.map(vp => vp);
            
            if(item.id) {
              newVehicleToRemove.push(item.id);
            } else {
              newVehicleToUpload.splice((index - 1), 1);
            }
      
            setVehiclePhotos(newVehiclePhotos);
            setVehicleToRemove(newVehicleToRemove);
            setVehicleToUpload(newVehicleToUpload);
          }}
        ]
      );
    } else {
      Alert.alert(
        'Deleting Vehicle Photo',
        'Unable to delete photo. You must have atleast 1 photo to proceed.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'OK'}
        ]
      );
    }
  }

  const EditPlateNumberButton = () => {
    return (
      <TouchableOpacity onPress={editPlateNumberButtonOnPress}>
        <Loader
          loading={submitLoadingPN}
          spinnerColor={theme.COLOR_NORMAL_FONT} >
          <Icon
            size={20}
            name='send'
            type='font-awesome'
            color={plateNumber ? theme.COLOR_BLUE : theme.COLOR_NORMAL_FONT} />
        </Loader>
      </TouchableOpacity>
    )
  }

  const renderVehicles = ({item, index}) => {
    return (
			<View
				style={{
					height: theme.SCREEN_WIDTH / 3.5,
					width: theme.SCREEN_WIDTH / 3.5,
					marginLeft: index == 0 ? 0 : 3,
					marginRight: index == (vehiclePhotos.length - 1) ? 0 : 3
				}}
			>
        <IfElse condition={index === 0}>
          <Then>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.COLOR_LIGHT_BLUE + '90',
                borderRadius: 10,
              }}
              activeOpacity={0.8}
              onPress={addVehicleButtonOnPress}
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
          </Then>

          <Else>
            <View>
              <AsyncImage
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 10,
                  backgroundColor: theme.COLOR_BLUE,
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
                onPress={removeVehicle(item, index)}
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
          </Else>
        </IfElse>
      </View>
    )
  }

  const AlertContainer = ({children}) => {
    return (
      <View
        style={{
          alignItems: 'center',
          borderRadius: 7,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: PNAlertType ? theme.COLOR_GREEN : theme.COLOR_RED,
          marginBottom: 10
        }}
      >{children}</View>
    )
  }

  const deleteButtonOnPress = () => {
    toggleAlertModal();
  }

  const deleteProceedOnPress = () => {
    if(modalVisible) {
      setLoadingDeleted(true);
      deleteVehicle(d.id, () => {
        toggleAlertModal();
        toggleModal();
        setTimeout(() => setLoadingDeleted(false), 500);
      });
    }
  }

  return (
    <View>
      {/* <EditButton /> */}
      <TouchableOpacity
        activeOpacity={0.9} 
        onPress={toggleModal} >
        {props.children}
      </TouchableOpacity>

      <AlertFunction
        title="Delete Vehicle"
        body="Are you sure you want to delete this vehicle? Press Proceed to continue"
        proceedText="Continue"
        cancelText="Cancel"
        loading={loadingDeleted}
        confirmOnPress={deleteProceedOnPress}
        isVisible={alertModal}
        toggleModal={toggleAlertModal} />

      <Modal
        style={{
          margin: 0,
          backgroundColor: theme.COLOR_BLACK + '81',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        visible={modalVisible}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}>
        <Card>
          <IfElse condition={PNAlertVisible}>
            <Then>
              <AlertContainer>
                <VehicleText.Common text={PNAlertText} white />
              </AlertContainer>
            </Then>
          </IfElse>

          <Row>
            <VehicleText.Manufacturer text={vehicleData.vehicle.manufacturer} />
            <VehicleText.Label text={vehicleData.vehicle.model} />
            <VehicleText.Label text={vehicleData.vehicle.year} />
          </Row>
          <Divider />

          <Row>
            <VehicleText.Common text="Plate Number / Conduction Sticker" />
            <VehicleText.Label
              text={vehicleData.plate_number
                ? vehicleData.plate_number
                : '----'} />
            <PlateNumberContainer>
              <PlateNumberInfo>
                <TextInput
                  style={{
                    color: theme.COLOR_NORMAL_FONT,
                    borderColor: theme.COLOR_NORMAL_FONT,
                    borderBottomWidth: 2,
                    paddingTop: 0,
                    paddingBottom: 5,
                    paddingHorizontal: 5,
                    fontSize: 12,
                  }}
                  value={plateNumber}
                  placeholder="new plate number/conduction sticker"
                  onSubmitEditing={editPlateNumberButtonOnPress}
                  onChangeText={value => setPlateNumber(value)} />
              </PlateNumberInfo>

              <EditPlateNumberButton />
            </PlateNumberContainer>
          </Row>

          <Row lastChild>
            <VehicleText.Common text="Vehicle Photos" />
            <View
              style={{
                borderRadius: 10,
                overflow: 'hidden',
                backgroundColor: theme.COLOR_GRAY_LIGHT,
                marginTop: 10,
                marginBottom: 15
              }} >
              <FlatList
                data={vehiclePhotos}
                renderItem={renderVehicles}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                overScrollMode="never"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 30,
                  paddingVertical: 20,
                }}
              />

              <IfElse condition={submitLoadingVP}>
                <Then>
                  <View
                    style={{
                      alignSelf: 'center',
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      borderRadius: 15,
                      marginBottom: 15,
                      backgroundColor: theme.COLOR_LIGHT_BLUE
                    }} >
                    <Loader loading={true} />
                  </View>
                </Then>

                <Else>
                  <TouchableOpacity
                    style={{
                      alignSelf: 'center',
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      borderRadius: 15,
                      marginBottom: 15,
                      backgroundColor: theme.COLOR_LIGHT_BLUE
                    }}
                    onPress={uploadVehiclePhotos} >
                    <VehicleText.Label text="Update Vehicle Photos" white />
                  </TouchableOpacity>
                </Else>
              </IfElse>
            </View>
            
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 15,
                backgroundColor: theme.COLOR_RED
              }}
              onPress={deleteButtonOnPress}>
              <VehicleText.Label text="Delete Vehicle" white />
            </TouchableOpacity>
          </Row>
        </Card>
      </Modal>
    </View>
  );
}

const mapDispatchToProps = dispatch => ({
  deleteVehicle: (args, callback) =>
    dispatch(UserAction.removeVehicle(args, callback))
});

export default connect(null, mapDispatchToProps)(EditVehicleModal);