import React from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';

const LoadingView = ({style, color}) => {
  return (
    <View
      style={{
        ...style,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <ActivityIndicator color={`${color ? color : '#fff'}`} />
    </View>
  )
}

const Loader = ({
  children,
  loading,
  contentStyle,
  spinnerStyle,
  spinnerColor
}) => {
  return (
    <View style={contentStyle}>
      {
        loading
        ? <LoadingView style={spinnerStyle} color={spinnerColor} />
        : children
      }
    </View>
  );
}

export default Loader;