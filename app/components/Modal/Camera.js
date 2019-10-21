import React, { Component } from 'react';
import { 
  Modal,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { RNCamera } from 'react-native-camera';

import {
  IMAGES
} from '../../config/variables';

import theme from '../../styles/theme.style';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const flash = [
  RNCamera.Constants.FlashMode.on,
  RNCamera.Constants.FlashMode.auto,
  RNCamera.Constants.FlashMode.off
];

export default class CameraView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageData: {},
      imageURI: false,
      flashMode: 1, // 0: on, 1: auto, 2: off
      backCamera: true,
    };
  }

  snapAgainView = () => {
    if(this.state.imageURI) {
      return (
        <View
          style={{
            position: 'absolute',
            top: 27,
            right: 30
          }}
        >
          <TouchableOpacity
            onPress={this.takeAnotherSnap}
          >
            <Image
              style={{
                width: width / 10,
                height: width / 10,
                maxWidth: 22,
                maxHeight: 22
              }}
              source={IMAGES.ICONS.close_white}
              resizeMode="center"
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  }

  sendButtonView = () => {
    if(this.state.imageURI) {
      return (
        <View
          style={{
            position: 'absolute',
            bottom: 30,
            right: 30
          }}
        >
          <TouchableOpacity
            onPress={this.sendButton}
          >
            <Image
              style={{
                width: width / 10,
                height: width / 10,
                maxWidth: 30,
                maxHeight: 30
              }}
              source={IMAGES.ICONS.send_icon}
              resizeMode="center"
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  }

  onSnapContainer = () => {
    if(!this.state.imageURI) {
      return (
        <View
          style={{
            position: 'absolute',
            width,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            bottom: 30
          }}
        >
          {/* flash mode */}
          <View>
            {this.state.backCamera ? (
              <TouchableOpacity onPress={this.flashModeOnChange}>
                {this.flashModeImages()}
              </TouchableOpacity>
            ) : this.flashModeImages(false)}
          </View>

          {/* snap button */}
          <TouchableOpacity
            style={{
              borderColor: theme.COLOR_WHITE,
              width: 61,
              height: 61,
              borderRadius: 40,
              borderWidth: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={this.snapButton}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 30,
                backgroundColor: theme.COLOR_WHITE
              }}
            ></View>
          </TouchableOpacity>
        
          {/* camera mode */}
          <TouchableOpacity onPress={this.cameraChangeDirection}>
            <Image
              style={{
                width: width / 10,
                height: width / 10,
                maxWidth: 35,
                maxHeight: 35
              }}
              source={IMAGES.ICONS.cameraRotate}
              resizeMode="center"
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  }

  cameraContainer = () => {
    var { flashMode, backCamera } = this.state;
    backCamera = backCamera ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front;
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
        }}
        type={backCamera}
        flashMode={flash[flashMode]}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
    );
  }

  flashModeImages = (visible = true) => {
    const { flashMode } = this.state;
    const flashImages = Object.values(IMAGES.ICONS.flash_icon);
    return (
      <Image
        style={{
          width: width / 10,
          height: width / 10,
          maxWidth: 32,
          maxHeight: 32,
          opacity: visible ? 1 : 0
        }}
        source={flashImages[flashMode]}
        resizeMode="center"
      />
    );
  }

  flashModeOnChange = () => {
    var flashMode = this.state.flashMode + 1;
    if(flashMode == 3) flashMode = 0;
    this.setState({flashMode});
  }

  cameraChangeDirection = () => {
    this.setState({
      backCamera: this.state.backCamera ? false : true
    });
  }
  
  snapButton = async () => {
    if (this.camera) {
      const options = {
        base64: true,
        pauseAfterCapture: true,
        orientation: 'portrait',
        fixOrientation: true
      };
      const data = await this.camera.takePictureAsync(options);
      const imageData = data;
      const imageURI = {uri: data.uri};
      this.setState({imageData, imageURI});
    }
  }

  sendButton = () => {
    this.props.getImageData(this.state.imageData);
    this.modalClose();
  }

  takeAnotherSnap = () => {
    this.camera.resumePreview();
    this.resetImageData();
  }

  resetImageData = () => {
    this.setState({
      imageData: {},
      imageURI: false
    });
  }

  modalClose = () => {
    this.resetImageData();
    this.props.close();
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        transparent={true}
        animationType="slide"
        onRequestClose={this.modalClose}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: theme.COLOR_BLACK
          }}
        >
          {this.cameraContainer()}

          {/* close icon */}
          <View
            style={{
              position: 'absolute',
              top: 25,
              left: 30
            }}
          >
            <TouchableOpacity
              onPress={this.modalClose}
            >
              <Image
                style={{
                  width: width / 10,
                  height: width / 10,
                  maxWidth: 25,
                  maxHeight: 25
                }}
                source={IMAGES.ICONS.back_icon_white}
                resizeMode="center"
              />
            </TouchableOpacity>
          </View>
          
          {this.snapAgainView()}
          {this.sendButtonView()}
          {this.onSnapContainer()}
        </View>
      </Modal>
    );
  }
}