import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import style from '../styles/component.Button.style';

export default class ButtonWhite extends Component {
  render() {
    return (
      <TouchableOpacity style={[style.buttonCommon, style.buttonWhite]}>
        <Text style={[style.buttonTextCommon, style.buttonWhiteText]}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}
