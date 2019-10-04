import React, { Component } from 'react';
import {
  Modal,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  BackHandler
} from 'react-native';
import { WebView } from 'react-native-webview';

import { CommonText, LabelText } from '../../Text';

import theme from '../../../styles/theme.style';

export class TermsAndCondition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      opacity: new Animated.Value(1),
      canGoBack: false
    };

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    if(this.state.canGoBack && this.props.modalVisible) {
      this.webviewRef.goBack();
      return true;
    } else if(!this.state.canGoBack && this.props.modalVisible) {
      this.modalClose();
      return true;
    }
    return false;
  }

  webviewOnLoadProgress = ({ nativeEvent }) => {
    const { progress } = nativeEvent;
    this.setState({
      progress: Dimensions.get('window').width * progress
    });

    if(progress === 1) {
      setTimeout(() => {
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 600
        }).start();
      }, 700);
    }
  }

  webviewOnLoadEnd = () => {
    this.setState({
      progress: Dimensions.get('window').width
    });

    setTimeout(() => {
      Animated.timing(this.state.opacity, {
        toValue: 0
      }).start();
    }, 700);
  }

  modalClose = () => {
    this.props.modalToggle();
    this.setState({ progress: 0 });
    Animated.timing(this.state.opacity, {
      toValue: 0
    }).start();
  }

  componentWillUnmount = () => {
    this.backHandler.remove();
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={this.handleBackPress}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: theme.COLOR_BLACK + '80'
          }}
        >
          <View
            style={{
              flex: 1,
              marginTop: Dimensions.get('window').height / 8,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              backgroundColor: theme.COLOR_WHITE
            }}
          >
            {/* header */}
            <View
              style={{
                padding: 18,
                borderBottomColor: '#e7e7e7',
                borderBottomWidth: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <View
                style={{
                  alignSelf: 'center'
                }}
              >
                <LabelText large>{this.props.title}</LabelText>
              </View>

              <View
                style={{
                  position: 'absolute',
                  right: 20
                }}
              >
                <TouchableOpacity
                  onPress={this.modalClose}
                >
                  <LabelText large>X</LabelText>
                </TouchableOpacity>
              </View>
            </View>
  
            {/* content */}
            <View
              style={{
                flex: 1,
                backgroundColor: theme.COLOR_GRAY_BUTTON
              }}
            >
              <View
                style={{
                  height: 4,
                  width: Dimensions.get('window').width,
                  zIndex: 5,
                  position: 'absolute'
                }}
              >
                <Animated.View
                  style={{
                    height: 4,
                    width: this.state.progress,
                    backgroundColor: theme.COLOR_BLUE,
                    opacity: this.state.opacity,
                  }}
                ></Animated.View>
              </View>

              <WebView
                ref={ref => this.webviewRef = ref}
                source={{ uri: this.props.uri }}
                onNavigationStateChange={navState => {
                  this.setState({canGoBack: navState.canGoBack});
                }}
                onLoadProgress={this.webviewOnLoadProgress}
                onLoadEnd={this.webviewOnLoadEnd}
              />
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

export default TermsAndCondition;