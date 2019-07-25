import React, { Component } from 'react';
import {
  View,
  Animated,
  Dimensions
} from 'react-native';
import { AppBackground } from '../components/AppBackground';
import { HeaderNav } from '../components/HeaderNav';
import ModalMenu from '../components/Modal/Navigation';

export class Page extends Component {

  constructor() {
    super();

    this.state = {
      modalFadeBackground: new Animated.Value(0),
      modalContainerzIndex: 0,
      modalXValue: new Animated.Value(Dimensions.get('window').width),
      scrollEnable: true,
      carouselPage: 0,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };
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

  render() {
    return (
      <View>
        <AppBackground />
        <HeaderNav
            menuButtonOnPress={this.menuButtonOnPress}
            navigation={this.props.navigation}
        />

        {this.props.children}

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
