import React, { useState } from 'react';
import {
  Button,
  View,
  Image,
  ActivityIndicator
} from 'react-native';

import theme from '../styles/theme.style';

const AsyncImage = props => {
  const {
    style,
    source
  } = props;
  const [loaded, setLoaded] = useState(false);

  const onLoad = () => {
    // This only exists so the transition can be seen
    // if loaded too quickly.
    setTimeout(() => {
      setLoaded(true);
    }, 1000)
  }

  return (
    <View style={style}>
      <Image
        source={source}
        resizeMode="cover"
        style={imageStyle(style)}
        onLoad={onLoad}
      />
        {!loaded &&
          <View style={imageBeforeOnLoad(style)}>
            <ActivityIndicator color="#fff" />
          </View>
        }
    </View>
  )
}

const TestPage = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>

      <Button
        title="Click me"
        onPress={() => alert('test clicked')}
      />

      <AsyncImage
        style={{
          height: 100,
          width: 100,
          borderRadius: 25
        }}
        source={{
          uri: 'https://dev.bcdpinpoint.com/TapAdsServer/public/storage/images/campaigns/a540abed969dffda01980b9a71a2f197.jpeg'
        }}
      />

    </View>
  );
}

const imageStyle = style => {
  return {
    ...style,
    position: 'absolute',
    resizeMode: 'cover'
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

export default TestPage;
