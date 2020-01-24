import React, { useState } from 'react';
import {
  View,
  Image,
  ActivityIndicator
} from 'react-native';
import theme from '../styles/theme.style';

const imageStyle = style => {
  return {
    ...style,
    position: 'absolute'
  }
}

const imageBeforeOnLoad = style => {
  return {
    ...style,
    backgroundColor: theme.COLOR_GRAY_HEAVY,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

const AsyncImage = props => {
  const {
    style,
    resizeMode,
    source,
  } = props;
  const [loaded, setLoaded] = useState(false);

  const onLoad = () => {
    // This only exists so the transition can be seen
    // if loaded too quickly.
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }

  return (
    <View style={style}>
      <Image
        source={source}
        resizeMode={resizeMode ? resizeMode : 'cover'}
        style={imageStyle(style)}
        onLoad={onLoad}
        onError={onLoad}
      />
        {!loaded &&
          <View style={imageBeforeOnLoad(style)}>
            <ActivityIndicator color="#fff" />
          </View>
        }
    </View>
  )
}

export default AsyncImage;