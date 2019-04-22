import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import style from '../styles/component.Button.style';
import theme from '../styles/theme.style';

export default class ButtonGradient extends Component {
  render() {
    return (
      <TouchableOpacity style={style.buttonCommon}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[theme.COLOR_BLUE, theme.COLOR_BLUE_LIGHT]}
          style={[style.buttonCommon]}
        >
          <Text style={[style.buttonTextCommon, style.buttonGradientText]}>
            {this.props.text}
          </Text>

        </LinearGradient>
      </TouchableOpacity>
    );
  }
}
